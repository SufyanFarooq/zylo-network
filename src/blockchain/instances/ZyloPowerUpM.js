import { BrowserProvider, Contract } from "ethers";
import { ZyloPowerUpM_ADDRESS } from "../addresses/addresses.js";
import ZyloPowerUpM_ABI from "../abis/ZyloPowerUpM.json";

/**
 * Create contract instance with provider (for read operations)
 * @param {Object} provider - Ethers provider
 * @returns {Contract} Contract instance
 */
const createContractInstance = (provider) => {
    if (!provider) {
        throw new Error("Provider is required to create contract instance");
    }

    return new Contract(
        ZyloPowerUpM_ADDRESS,
        ZyloPowerUpM_ABI,
        provider
    );
};

/**
 * Create contract instance with signer (for write operations)
 * @param {Object} signer - Ethers signer
 * @returns {Contract} Contract instance
 */
const createContractInstanceWithSigner = (signer) => {
    if (!signer) {
        throw new Error("Signer is required to create contract instance with signer");
    }

    return new Contract(
        ZyloPowerUpM_ADDRESS,
        ZyloPowerUpM_ABI,
        signer
    );
};

/**
 * Add partner accounts to ZyloPowerUpM contract
 * @param {Object} walletClient - Wallet client from wagmi
 * @param {string} userAddress - User wallet address
 * @param {string[]} partnerAddresses - Array of partner addresses
 * @param {number[]} percentages - Array of percentages corresponding to partner addresses
 * @returns {Promise<{success: boolean, error?: string, txHash?: string}>}
 */
export const addPartnerAccount = async (walletClient, userAddress, partnerAddresses, percentages) => {
    try {
        // Validation checks
        if (!userAddress) {
            return {
                success: false,
                error: 'Please connect your wallet first'
            };
        }

        if (!partnerAddresses || !Array.isArray(partnerAddresses) || partnerAddresses.length === 0) {
            return {
                success: false,
                error: 'At least one partner address is required'
            };
        }

        if (!percentages || !Array.isArray(percentages) || percentages.length === 0) {
            return {
                success: false,
                error: 'Percentages are required for each partner address'
            };
        }

        if (partnerAddresses.length !== percentages.length) {
            return {
                success: false,
                error: 'Number of addresses must match number of percentages'
            };
        }

        if (!walletClient) {
            return {
                success: false,
                error: 'Unable to get wallet client'
            };
        }

        // Check for duplicate addresses (case-insensitive)
        const addressSet = new Set();
        const duplicateAddresses = [];
        for (let i = 0; i < partnerAddresses.length; i++) {
            const addr = partnerAddresses[i].trim().toLowerCase();
            if (addr && addressSet.has(addr)) {
                duplicateAddresses.push(partnerAddresses[i].trim());
            }
            if (addr) {
                addressSet.add(addr);
            }
        }

        if (duplicateAddresses.length > 0) {
            return {
                success: false,
                error: `Duplicate addresses found. Each address can only be added once: ${duplicateAddresses.join(', ')}`
            };
        }

        // Validate all addresses
        const validAddresses = [];
        const validPercentages = [];
        const invalidAddresses = [];

        for (let i = 0; i < partnerAddresses.length; i++) {
            const addr = partnerAddresses[i];
            const percentage = percentages[i];

            const trimmedAddr = addr.trim();
            if (trimmedAddr.startsWith('0x') && trimmedAddr.length === 42) {
                // Additional validation: check for valid hex
                if (/^0x[a-fA-F0-9]{40}$/.test(trimmedAddr)) {
                    // Validate percentage (0-100, cannot exceed 100)
                    const percentNum = parseFloat(percentage);
                    if (isNaN(percentNum) || percentNum < 0) {
                        return {
                            success: false,
                            error: `Invalid percentage for address ${trimmedAddr}. Percentage must be 0 or greater.`
                        };
                    }
                    if (percentNum > 100) {
                        return {
                            success: false,
                            error: `Percentage cannot exceed 100 for address ${trimmedAddr}.`
                        };
                    }
                    validAddresses.push(trimmedAddr);
                    validPercentages.push(percentNum);
                } else {
                    invalidAddresses.push(trimmedAddr);
                }
            } else {
                invalidAddresses.push(trimmedAddr);
            }
        }

        if (invalidAddresses.length > 0) {
            return {
                success: false,
                error: 'address valid ni ha',
                invalidAddresses: invalidAddresses
            };
        }

        if (validAddresses.length === 0) {
            return {
                success: false,
                error: 'Please provide at least one valid partner address'
            };
        }

        // Convert wallet client to ethers provider
        const provider = new BrowserProvider(walletClient);
        const signer = await provider.getSigner();

        // Create contract instance with signer
        const contract = createContractInstanceWithSigner(signer);

        try {
            // Call addPartnerAccount function on the contract
            // Contract requires: address[] _accounts, uint256[] _percentages
            // Percentages are typically stored in basis points in Solidity contracts
            // Basis points: 10000 = 100%, 5000 = 50%, 100 = 1%
            // User inputs 0-100, we convert to basis points by multiplying by 100
            const percentagesAsBigInt = validPercentages.map(p => {
                // Convert percentage (0-100) to basis points (0-10000)
                // Example: 50% becomes 5000, 1% becomes 100
                return BigInt(Math.floor(p * 100));
            });

            console.log('Calling addPartnerAccount with:', {
                partnerAddresses: validAddresses,
                partnerPercentages: validPercentages,
                percentagesAsBigInt: percentagesAsBigInt.map(p => p.toString()),
                from: userAddress
            });

            let tx;
            try {
                // Call the function with both addresses and percentages arrays
                tx = await contract.addPartnerAccount(validAddresses, percentagesAsBigInt);
            } catch (callError) {
                console.error('Contract call error:', callError);

                // Check if it's a revert error
                const errorStr = (callError.message || String(callError)).toLowerCase();
                const errorCode = callError.code || '';

                // Handle "missing revert data" or CALL_EXCEPTION
                if (errorStr.includes('missing revert data') ||
                    errorStr.includes('call_exception') ||
                    errorCode === 'CALL_EXCEPTION') {
                    return {
                        success: false,
                        error: 'Transaction failed. Please verify the addresses are valid and you have sufficient balance.'
                    };
                }

                // Check for user rejection
                if (errorStr.includes('user rejected') || errorStr.includes('user denied')) {
                    return {
                        success: false,
                        error: 'Transaction was rejected by user.'
                    };
                }

                // Re-throw if it's a different error
                throw callError;
            }

            console.log('Add Partner Account transaction sent:', tx.hash);

            // Wait for transaction to be mined
            const receipt = await tx.wait();

            console.log('Add Partner Account transaction confirmed:', receipt.transactionHash);

            return {
                success: true,
                txHash: receipt.transactionHash,
                message: 'Successfully added partner accounts!'
            };
        } catch (txError) {
            console.error('Transaction error:', txError);

            // Try to extract revert reason
            if (txError.reason) {
                return {
                    success: false,
                    error: txError.reason
                };
            }

            // Check error data
            if (txError.data) {
                try {
                    const errorStr = String(txError.data);
                    if (errorStr.includes('invalid address') || errorStr.includes('invalid')) {
                        return {
                            success: false,
                            error: 'address valid ni ha'
                        };
                    }
                } catch (parseError) {
                    console.error('Error parsing txError.data:', parseError);
                }
            }

            // Default error message
            return {
                success: false,
                error: txError.message || 'Transaction failed. Please try again.'
            };
        }
    } catch (error) {
        console.error('Error in addPartnerAccount:', error);
        return {
            success: false,
            error: error.message || 'Failed to add partner accounts'
        };
    }
};

/**
 * Get partner count for a user
 * @param {Object} provider - Ethers provider
 * @param {string} userAddress - User wallet address
 * @returns {Promise<{success: boolean, count?: number, error?: string}>}
 */
const getPartnerCount = async (provider, userAddress) => {
    try {
        if (!provider) {
            return {
                success: false,
                error: "Provider is required"
            };
        }

        if (!userAddress) {
            return {
                success: false,
                error: "User address is required"
            };
        }

        const contract = createContractInstance(provider);

        // Call getPartnerCount function
        const count = await contract.getPartnerCount(userAddress);

        return {
            success: true,
            count: Number(count)
        };
    } catch (error) {
        console.error("Error getting partner count:", error);
        return {
            success: false,
            error: error.message || "Failed to get partner count"
        };
    }
};

/**
 * Get a specific partner account by index
 * @param {Object} provider - Ethers provider
 * @param {string} userAddress - User wallet address
 * @param {number} index - Index of the partner account
 * @returns {Promise<{success: boolean, partner?: {address: string, percentage: number}, error?: string}>}
 */
const getPartnerAccountByIndex = async (provider, userAddress, index) => {
    try {
        if (!provider) {
            return {
                success: false,
                error: "Provider is required"
            };
        }

        if (!userAddress) {
            return {
                success: false,
                error: "User address is required"
            };
        }

        const contract = createContractInstance(provider);

        // Call partnerAccounts function with userAddress and index
        const result = await contract.partnerAccounts(userAddress, index);

        // Extract address and percentage from the result
        let partnerAddress = null;
        let percentage = BigInt(0);

        if (result && result.length >= 2) {
            partnerAddress = result[0];
            percentage = result[1];
        } else if (result && typeof result === 'object') {
            partnerAddress = result.account || result[0];
            percentage = result.percentage || result[1];
        }

        // Check if we got a valid partner (non-zero address)
        if (!partnerAddress || partnerAddress === '0x0000000000000000000000000000000000000000') {
            return {
                success: true,
                partner: null
            };
        }

        return {
            success: true,
            partner: {
                address: partnerAddress,
                percentage: Number(percentage)
            }
        };
    } catch (error) {
        console.error("Error getting partner account by index:", error);
        return {
            success: false,
            error: error.message || "Failed to get partner account"
        };
    }
};

/**
 * Gets all partner accounts for a user
 * @param {Object} provider - Ethers provider
 * @param {string} userAddress - User wallet address
 * @returns {Promise<{success: boolean, partners?: Array<{address: string, percentage: number}>, error?: string}>}
 */
export const getAllPartnerAccounts = async (provider, userAddress) => {
    try {
        // First get the count
        const countResult = await getPartnerCount(provider, userAddress);

        if (!countResult.success) {
            return countResult;
        }

        const count = countResult.count;
        const partners = [];

        // Get each partner account by index
        for (let i = 0; i < count; i++) {
            const partnerResult = await getPartnerAccountByIndex(provider, userAddress, i);

            if (!partnerResult.success) {
                return partnerResult;
            }

            if (partnerResult.partner) {
                partners.push(partnerResult.partner);
            }
        }

        return {
            success: true,
            partners: partners
        };
    } catch (error) {
        console.error("Error getting all partner accounts:", error);
        return {
            success: false,
            error: error.message || "Failed to get partner accounts"
        };
    }
};

/**
 * Get user claimX details length for a specific unit
 * @param {Object} provider - Ethers provider
 * @param {string} userAddress - User wallet address
 * @param {number} unitIndex - Unit index (0-4)
 * @returns {Promise<{success: boolean, length?: number, error?: string}>}
 */
export const getUserClaimXDetailsLength = async (provider, userAddress, unitIndex) => {
    try {
        if (!provider) {
            return {
                success: false,
                error: "Provider is required"
            };
        }

        if (!userAddress) {
            return {
                success: false,
                error: "User address is required"
            };
        }

        const contract = createContractInstance(provider);

        // Call getUserClaimXDetailsLength function
        const length = await contract.getUserClaimXDetailsLength(userAddress, unitIndex);

        return {
            success: true,
            length: Number(length)
        };
    } catch (error) {
        console.error("Error getting user claimX details length:", error);
        return {
            success: false,
            error: error.message || "Failed to get user claimX details length"
        };
    }
};

/**
 * Get user claimX history for a specific unit and index
 * @param {Object} provider - Ethers provider
 * @param {string} userAddress - User wallet address
 * @param {number} unitIndex - Unit index (0-4)
 * @param {number} historyIndex - History index
 * @returns {Promise<{success: boolean, amount?: string, timestamp?: string, error?: string}>}
 */
export const userClaimXHistory = async (provider, userAddress, unitIndex, historyIndex) => {
    try {
        if (!provider) {
            return {
                success: false,
                error: "Provider is required"
            };
        }

        if (!userAddress) {
            return {
                success: false,
                error: "User address is required"
            };
        }

        const contract = createContractInstance(provider);

        // Call userClaimXHistory function
        const result = await contract.userClaimXHistory(userAddress, unitIndex, historyIndex);

        // Extract amount and timestamp from the result
        let amount = '0';
        let timestamp = '0';

        if (result && result.length >= 2) {
            amount = result[0].toString();
            timestamp = result[1].toString();
        } else if (result && typeof result === 'object') {
            amount = result.amount ? result.amount.toString() : '0';
            timestamp = result.time ? result.time.toString() : '0';
        }

        return {
            success: true,
            amount: amount,
            timestamp: timestamp
        };
    } catch (error) {
        console.error("Error getting user claimX history:", error);
        return {
            success: false,
            error: error.message || "Failed to get user claimX history"
        };
    }
};

/**
 * Claim X for a specific unit
 * @param {Object} signer - Ethers signer
 * @param {string} userAddress - User wallet address
 * @param {number} unitIndex - Unit index (0-4)
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const claimX = async (signer, userAddress, unitIndex) => {
    try {
        if (!signer) {
            return {
                success: false,
                error: "Signer is required"
            };
        }

        if (!userAddress) {
            return {
                success: false,
                error: "User address is required"
            };
        }

        const contract = createContractInstanceWithSigner(signer);

        // Call claimX function
        const tx = await contract.claimX(unitIndex);

        // Wait for transaction to be mined
        await tx.wait();

        return {
            success: true
        };
    } catch (error) {
        console.error("Error claiming X:", error);
        return {
            success: false,
            error: error.message || "Failed to claim X"
        };
    }
};
