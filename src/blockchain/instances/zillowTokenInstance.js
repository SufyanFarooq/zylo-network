import { Contract, formatEther, parseEther } from "ethers";
import { ZillowToken_ADDRESS } from "../addresses/addresses.js";

// Standard ERC20 ABI - includes balanceOf, approve, allowance
const ERC20_ABI = [
    {
        "constant": true,
        "inputs": [{ "name": "_owner", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "balance", "type": "uint256" }],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            { "name": "_spender", "type": "address" },
            { "name": "_value", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [{ "name": "", "type": "bool" }],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            { "name": "_owner", "type": "address" },
            { "name": "_spender", "type": "address" }
        ],
        "name": "allowance",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "name": "", "type": "uint8" }],
        "type": "function"
    }
];

/**
 * Create token contract instance with provider (for read operations)
 * @param {Object} provider - Ethers provider
 * @returns {Contract} Contract instance
 */
const createTokenContractInstance = (provider) => {
    if (!provider) {
        throw new Error("Provider is required to create token contract instance");
    }

    if (!ZillowToken_ADDRESS) {
        throw new Error("ZillowToken_ADDRESS is not defined");
    }

    return new Contract(
        ZillowToken_ADDRESS,
        ERC20_ABI,
        provider
    );
};

/**
 * Create token contract instance with signer (for write operations)
 * @param {Object} signer - Ethers signer
 * @returns {Contract} Contract instance
 */
const createTokenContractInstanceWithSigner = (signer) => {
    if (!signer) {
        throw new Error("Signer is required to create token contract instance with signer");
    }

    if (!ZillowToken_ADDRESS) {
        throw new Error("ZillowToken_ADDRESS is not defined");
    }

    return new Contract(
        ZillowToken_ADDRESS,
        ERC20_ABI,
        signer
    );
};

/**
 * Get token balance for a user
 * @param {Object} provider - Ethers provider
 * @param {string} userAddress - User wallet address
 * @returns {Promise<{success: boolean, balance?: string, error?: string, fallback?: boolean}>}
 */
export const getTokenBalance = async (provider, userAddress) => {
    try {
        if (!provider) {
            throw new Error("Provider is required to get token balance");
        }

        if (!userAddress) {
            throw new Error("User address is required");
        }

        if (!ZillowToken_ADDRESS) {
            throw new Error("Token contract address is not defined");
        }

        const tokenContract = createTokenContractInstance(provider);

        try {
            const balance = await tokenContract.balanceOf(userAddress);
            const balanceFormatted = formatEther(balance);

            return {
                success: true,
                balance: balanceFormatted,
                fallback: false
            };
        } catch (contractError) {
            console.error("Contract call error:", contractError);

            // Check for specific error types
            const errorMessage = contractError.message || String(contractError);

            if (errorMessage.includes("missing revert data") ||
                errorMessage.includes("execution reverted")) {
                return {
                    success: false,
                    error: "Contract call failed: missing revert data. Token contract may not be deployed or network issue.",
                    fallback: true
                };
            }

            if (errorMessage.includes("network") || errorMessage.includes("RPC")) {
                return {
                    success: false,
                    error: "RPC issue: Unable to connect to blockchain network",
                    fallback: true
                };
            }

            throw contractError;
        }
    } catch (error) {
        console.error("Error getting token balance:", error);
        const errorMessage = error.message || String(error);

        // Check if it's a network/contract issue
        if (errorMessage.includes("network") ||
            errorMessage.includes("RPC") ||
            errorMessage.includes("contract may not be deployed") ||
            errorMessage.includes("Token contract not found")) {
            return {
                success: false,
                error: `Token contract not found on current network. Please check your network settings.`,
                fallback: true
            };
        }

        return {
            success: false,
            error: errorMessage || "Failed to get token balance",
            fallback: false
        };
    }
};

/**
 * Approve tokens for a spender
 * @param {Object} signer - Ethers signer
 * @param {string} spenderAddress - Address to approve tokens for
 * @param {string} amount - Amount to approve (in token units, not wei)
 * @returns {Promise<{success: boolean, error?: string, txHash?: string}>}
 */
export const approveTokens = async (signer, spenderAddress, amount) => {
    try {
        if (!signer) {
            throw new Error("Signer is required to approve tokens");
        }

        if (!spenderAddress) {
            throw new Error("Spender address is required");
        }

        if (!amount || parseFloat(amount) <= 0) {
            throw new Error("Amount must be greater than 0");
        }

        if (!ZillowToken_ADDRESS) {
            throw new Error("Token contract address is not defined");
        }

        const tokenContract = createTokenContractInstanceWithSigner(signer);

        // Convert amount to wei
        const amountInWei = parseEther(amount);

        console.log("Approving tokens:", {
            tokenAddress: ZillowToken_ADDRESS,
            spender: spenderAddress,
            amount: amount,
            amountInWei: amountInWei.toString()
        });

        // Call approve function
        const tx = await tokenContract.approve(spenderAddress, amountInWei);

        console.log("Approval transaction sent:", tx.hash);

        // Wait for transaction to be mined
        const receipt = await tx.wait();

        console.log("Approval transaction confirmed:", receipt.transactionHash);

        return {
            success: true,
            txHash: receipt.transactionHash
        };
    } catch (error) {
        console.error("Error approving tokens:", error);
        const errorMessage = error.message || String(error);

        // Handle user rejection
        if (errorMessage.includes("user rejected") ||
            errorMessage.includes("User denied") ||
            errorMessage.includes("rejected")) {
            return {
                success: false,
                error: "Transaction rejected by user"
            };
        }

        return {
            success: false,
            error: errorMessage || "Failed to approve tokens"
        };
    }
};

/**
 * Get token allowance for a spender
 * @param {Object} provider - Ethers provider
 * @param {string} ownerAddress - Token owner address
 * @param {string} spenderAddress - Spender address
 * @returns {Promise<{success: boolean, allowance?: string, error?: string}>}
 */
export const getAllowance = async (provider, ownerAddress, spenderAddress) => {
    try {
        if (!provider) {
            throw new Error("Provider is required to get allowance");
        }

        if (!ownerAddress) {
            throw new Error("Owner address is required");
        }

        if (!spenderAddress) {
            throw new Error("Spender address is required");
        }

        if (!ZillowToken_ADDRESS) {
            throw new Error("Token contract address is not defined");
        }

        const tokenContract = createTokenContractInstance(provider);

        const allowance = await tokenContract.allowance(ownerAddress, spenderAddress);
        const allowanceFormatted = formatEther(allowance);

        return {
            success: true,
            allowance: allowanceFormatted
        };
    } catch (error) {
        console.error("Error getting allowance:", error);
        return {
            success: false,
            error: error.message || "Failed to get allowance"
        };
    }
};


