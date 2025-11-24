import React, { useState, useEffect } from 'react';
import { Contract, BrowserProvider, ethers } from 'ethers';
import { FaSearch, FaTimes, FaCheck, FaSpinner } from 'react-icons/fa';
import swapContractAbi from './swapContractAbi.json';
import './TokenSelectionModal.css';


interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance?: string;
}

interface TokenSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectToken: (_token: Token) => void;
  currentToken?: Token;
  title: string;
}

// Contract address for BSC (works on both testnet and mainnet)
const SWAP_CONTRACT_ADDRESS = "0xA5175be2cf43382a3E29827894480088Ffde2d06";

// Standard ERC20 ABI for token info
const erc20Abi = [
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

const TokenSelectionModal: React.FC<TokenSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectToken,
  currentToken: _currentToken,
  title
}) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isCheckingPair] = useState(false);

  // Switch to BSC Testnet
  const switchToBSCNetwork = async () => {
    if (!window.ethereum) {
      console.error('No ethereum provider found');
      return;
    }

    // Try BSC Mainnet first (Chain ID: 56)
    try {
      await (window.ethereum as unknown as { request: (_args: { method: string; params?: unknown[] }) => Promise<unknown> }).request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }], // BSC Mainnet chainId in hex
      });
    } catch (switchError: unknown) {
      // If mainnet doesn't exist, try testnet
      if ((switchError as { code?: number }).code === 4902) {
        try {
          await (window.ethereum as unknown as { request: (_args: { method: string; params?: unknown[] }) => Promise<unknown> }).request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x61' }], // BSC Testnet chainId in hex
          });
        } catch (testnetError: unknown) {
          // If testnet doesn't exist, add BSC Mainnet
          if ((testnetError as { code?: number }).code === 4902) {
            try {
              await (window.ethereum as unknown as { request: (_args: { method: string; params?: unknown[] }) => Promise<unknown> }).request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0x38',
                  chainName: 'BSC Mainnet',
                  rpcUrls: ['https://bsc-dataseed.binance.org/'],
                  nativeCurrency: {
                    name: 'BNB',
                    symbol: 'BNB',
                    decimals: 18,
                  },
                  blockExplorerUrls: ['https://bscscan.com/'],
                }],
              });
            } catch (addError) {
              console.error('Failed to add BSC Mainnet:', addError);
            }
          } else {
            console.error('Failed to switch to BSC Testnet:', testnetError);
          }
        }
      } else {
        console.error('Failed to switch to BSC Mainnet:', switchError);
      }
    }
  };

  // Fetch tokens from blockchain
  const fetchTokens = async () => {
    if (!window.ethereum) {
      setError('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const provider = new BrowserProvider(window.ethereum as unknown as ethers.Eip1193Provider);

      // Create contract instance
      const swapContract = new Contract(SWAP_CONTRACT_ADDRESS, swapContractAbi, provider);

      console.log('Fetching tokens from contract:', SWAP_CONTRACT_ADDRESS);
      console.log('Contract instance:', swapContract);
      console.log('Contract ABI functions:', swapContract.interface.fragments.map(f => {
        if (f.type === 'function') {
          const funcFragment = f as { name?: string };
          return funcFragment.name || 'unnamed';
        }
        return f.type;
      }));

      // Check network
      const network = await provider.getNetwork();
      console.log('Current network:', network);
      console.log('Network chainId:', network.chainId);
      console.log('Expected chainId (BSC Testnet):', BigInt(97));
      console.log('Expected chainId (BSC Mainnet):', BigInt(56));

      // Ensure we're on BSC Testnet (chainId: 97) or BSC Mainnet (chainId: 56)
      if (network.chainId !== BigInt(97) && network.chainId !== BigInt(56)) {
        setError(`Please switch to BSC Testnet or BSC Mainnet. Current network: ${network.name} (Chain ID: ${network.chainId})`);
        return;
      }

      // Log which network we're on
      if (network.chainId === BigInt(97)) {
        console.log('✅ Connected to BSC Testnet');
      } else if (network.chainId === BigInt(56)) {
        console.log('✅ Connected to BSC Mainnet');
      }

      // Skip contract connectivity test due to RPC issues
      // The contract exists as confirmed by BscScan
      console.log('Skipping contract connectivity test due to RPC issues');
      console.log('Contract confirmed to exist on BscScan with 2 tokens');

      // Check if contract is paused
      //   try {
      //     const isPaused = await swapContract.paused();
      //     console.log('Contract paused status:', isPaused);
      //     if (isPaused) {
      //       setError('Contract is currently paused');
      //       return;
      //     }
      //   } catch (pauseErr) {
      //     console.warn('Could not check pause status:', pauseErr);
      //   }

      // Try to get token list length
      let tokenCountNum = 0;
      try {
        console.log('Attempting to call getTokenListLength()...');
        console.log('Contract address:', SWAP_CONTRACT_ADDRESS);
        console.log('Provider network:', network);

        console.log('Calling getTokenListLength()...');
        const tokenCount = await swapContract.getTokenListLength();
        console.log('Raw token count from contract:', tokenCount);
        console.log('Token count type:', typeof tokenCount);
        console.log('Token count as number:', Number(tokenCount));
        console.log('Token count as string:', tokenCount.toString());
        tokenCountNum = Number(tokenCount);
      } catch (getTokenListErr: unknown) {
        console.error('getTokenListLength() failed with error:', getTokenListErr);
        const errorObj = getTokenListErr as { message?: string; code?: string; reason?: string; data?: unknown };
        console.error('Error details:', {
          message: errorObj.message,
          code: errorObj.code,
          reason: errorObj.reason,
          data: errorObj.data
        });

        // Check if it's a BAD_DATA error (could not decode result data)
        const errorMsg = (getTokenListErr as Error).message || '';
        const errorString = String(getTokenListErr);
        
        // Check for BAD_DATA error - this happens when contract returns "0x" (empty result)
        const isBadDataError = errorMsg.includes('could not decode result data') || 
                              errorMsg.includes('BAD_DATA') ||
                              errorString.includes('could not decode result data') ||
                              errorString.includes('BAD_DATA') ||
                              errorMsg.includes('value="0x"') ||
                              errorObj.code === 'BAD_DATA' ||
                              (errorObj.data && typeof errorObj.data === 'object' && 'value' in errorObj.data && errorObj.data.value === '0x');
        
        // Check if it's an RPC error
        const isRpcError = errorMsg.includes('missing trie node') ||
                          errorMsg.includes('Internal JSON-RPC error') ||
                          errorMsg.includes('missing revert data');

        if (isBadDataError || isRpcError) {
          console.warn('Contract returned empty data or RPC error detected, trying fallback approach...');
          if (isBadDataError) {
            console.warn('getTokenListLength() returned empty result (0x), using fallback method to fetch tokens directly');
          } else {
            setError('BSC RPC is experiencing issues. Trying alternative method...');
          }
        } else {
          console.warn('Trying fallback approach...');
        }

        // Fallback: try to fetch tokens directly by index
        console.log('Trying fallback approach - checking tokenList indices...');

        // Try to fetch tokens by index until we hit an invalid address
        // Start with a reasonable limit (e.g., 10 tokens) to avoid infinite loops
        const maxTokensToTry = 10;
        const fallbackPromises = [];
        
        for (let i = 0; i < maxTokensToTry; i++) {
          fallbackPromises.push(
            swapContract.tokenList(i).then((address: string) => {
              console.log(`tokenList(${i}) returned:`, address);
              // Check if address is valid (not zero address)
              if (address && address !== '0x0000000000000000000000000000000000000000') {
                return { index: i, address };
              }
              return null;
            }).catch((err: unknown) => {
              console.log(`tokenList(${i}) failed:`, (err as Error).message);
              return null;
            })
          );
        }

        const fallbackResults = await Promise.all(fallbackPromises);
        const validAddresses = fallbackResults.filter(result => result !== null && result.address);
        console.log('Valid token addresses found:', validAddresses);

        if (validAddresses.length === 0) {
          // If all else fails, show error message
          setError('Unable to fetch tokens. The contract may not have any tokens registered, or there may be RPC issues. Please try again later.');
          setIsLoading(false);
          return;
        }

        tokenCountNum = validAddresses.length;
      }

      if (tokenCountNum === 0) {
        setError('No tokens found in the contract');
        return;
      }

      console.log(`Starting to fetch ${tokenCountNum} tokens...`);

      const tokenPromises = [];
      for (let i = 0; i < tokenCountNum; i++) {
        console.log(`Adding token fetch promise for index ${i}`);
        tokenPromises.push(fetchTokenByIndex(swapContract, i, provider));
      }

      console.log(`Executing ${tokenPromises.length} token fetch promises...`);
      const tokenResults = await Promise.all(tokenPromises);
      console.log('All token fetch results:', tokenResults);

      const validTokens = tokenResults.filter(token => token !== null) as Token[];

      console.log('Successfully fetched tokens:', validTokens.length);
      console.log('Valid tokens:', validTokens);
      console.log('Failed tokens:', tokenResults.filter(token => token === null).length);

      if (validTokens.length === 0) {
        setError('No valid tokens could be fetched from the contract');
        return;
      }

      setTokens(validTokens);
      setFilteredTokens(validTokens);
    } catch (err: unknown) {
      console.error('Error fetching tokens:', err);
      setError(`Failed to fetch tokens from blockchain: ${(err as Error).message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch individual token by index
  const fetchTokenByIndex = async (swapContract: Contract, index: number, provider: BrowserProvider): Promise<Token | null> => {
    try {
      console.log(`Starting to fetch token at index ${index}...`);
      const tokenAddress = await swapContract.tokenList(index);
      console.log(`Got token address at index ${index}:`, tokenAddress);

      if (!tokenAddress || tokenAddress === '0x0000000000000000000000000000000000000000') {
        console.warn(`Invalid token address at index ${index}:`, tokenAddress);
        return null;
      }

      const tokenContract = new Contract(tokenAddress, erc20Abi, provider);
      console.log(`Fetching token details for address: ${tokenAddress}`);

      const [symbol, name, decimals] = await Promise.all([
        tokenContract.symbol(),
        tokenContract.name(),
        tokenContract.decimals()
      ]);

      console.log(`Token details for ${tokenAddress}:`, { symbol, name, decimals });

      const token = {
        address: tokenAddress,
        symbol,
        name,
        decimals: Number(decimals)
      };

      console.log(`Successfully fetched token at index ${index}:`, token);
      return token;
    } catch (err: unknown) {
      const errorObj = err as { message?: string; code?: string; reason?: string };
      console.error(`Failed to fetch token at index ${index}:`, err);
      console.error(`Error details:`, {
        message: errorObj.message,
        code: errorObj.code,
        reason: errorObj.reason
      });
      return null;
    }
  };

  // Check if token pair exists
  const _checkPairExists = async (tokenA: string, tokenB: string): Promise<boolean> => {
    try {
      const provider = new BrowserProvider(window.ethereum as unknown as ethers.Eip1193Provider);
      const swapContract = new Contract(SWAP_CONTRACT_ADDRESS, swapContractAbi, provider);

      console.log('Checking pair existence:', { tokenA, tokenB });

      // rates function returns [numerator, denominator, active] - we need the active boolean
      const ratesResult = await swapContract.rates(tokenA, tokenB);
      console.log('Rates result:', ratesResult);

      // Extract the active boolean from the result
      const [numerator, denominator, active] = ratesResult;
      console.log('Pair details:', { numerator: numerator.toString(), denominator: denominator.toString(), active });

      return active; // Return the active boolean
    } catch (err: unknown) {
      console.error('Error checking pair existence:', err);

      // Check if it's an RPC error (missing revert data)
        const errorMsg = (err as Error).message;
        if (errorMsg?.includes('missing revert data') ||
        errorMsg?.includes('Internal JSON-RPC error')) {
        console.warn('RPC error detected for pair check, skipping pair validation due to BSC Testnet issues');
        // Return true to allow token selection when RPC is having issues
        // The user can still try to swap and will get appropriate error messages if the pair doesn't exist
        return true;
      }

      // For other errors, return false
      return false;
    }
  };

  // Handle token selection
  const handleTokenSelect = async (token: Token) => {
    setSelectedToken(token);
    setError(null); // Clear any previous errors

    // Allow token selection without checking pairs
    // Pair validation will be done in the main swap component after both tokens are selected
    onSelectToken(token);
    onClose();
  };

  // Filter tokens based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredTokens(tokens);
      return;
    }

    const filtered = tokens.filter(token =>
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTokens(filtered);
  }, [searchTerm, tokens]);

  // Fetch tokens when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchTokens();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="token-modal-overlay">
      <div className="token-modal">
        <div className="token-modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="token-modal-content">
          {/* Search Bar */}
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by symbol, name, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
              {error.includes('Please switch to BSC') && (
                <button
                  className="switch-network-button"
                  onClick={switchToBSCNetwork}
                >
                  Switch to BSC Network
                </button>
              )}
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="loading-container">
              <FaSpinner className="spinner" />
              <p>Loading tokens from blockchain...</p>
            </div>
          ) : (
            <div className="token-list">
              {filteredTokens.length === 0 ? (
                <div className="no-tokens">
                  <p>No tokens found</p>
                </div>
              ) : (
                filteredTokens.map((token, _index) => (
                  <div
                    key={token.address}
                    className={`token-item ${selectedToken?.address === token.address ? 'selected' : ''}`}
                    onClick={() => handleTokenSelect(token)}
                  >
                    <div className="token-info">
                      <div className="token-symbol">{token.symbol}</div>
                      <div className="token-name">{token.name}</div>
                      <div className="token-address">
                        {token.address.slice(0, 6)}...{token.address.slice(-4)}
                      </div>
                    </div>
                    <div className="token-actions">
                      {isCheckingPair && selectedToken?.address === token.address ? (
                        <FaSpinner className="spinner" />
                      ) : (
                        <FaCheck className="check-icon" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenSelectionModal;
