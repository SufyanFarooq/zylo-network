import { Contract, formatEther } from "ethers";
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
 * Get current self claimX for a specific unit
 * @param {Object} provider - Ethers provider
 * @param {string} userAddress - User wallet address
 * @param {number} unitIndex - Unit index (0-4)
 * @returns {Promise<{success: boolean, data?: string, error?: string}>}
 */
export const getCurrentSelfClaimX = async (provider, userAddress, unitIndex) => {
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

        // Call getCurrentSelfClaimX function
        const result = await contract.getCurrentSelfClaimX(userAddress, unitIndex);

        // Convert from wei to ether
        const formattedResult = formatEther(result);

        return {
            success: true,
            data: formattedResult
        };
    } catch (error) {
        console.error("Error getting current self claimX:", error);
        return {
            success: false,
            error: error.message || "Failed to get current self claimX"
        };
    }
};

/**
 * Get current referral claimX for a specific unit
 * @param {Object} provider - Ethers provider
 * @param {string} userAddress - User wallet address
 * @param {number} unitIndex - Unit index (0-4)
 * @returns {Promise<{success: boolean, data?: string, error?: string}>}
 */
export const getCurrentReferralClaimX = async (provider, userAddress, unitIndex) => {
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

        // Call getCurrentReferralClaimX function
        const result = await contract.getCurrentReferralClaimX(userAddress, unitIndex);

        // Convert from wei to ether
        const formattedResult = formatEther(result);

        return {
            success: true,
            data: formattedResult
        };
    } catch (error) {
        console.error("Error getting current referral claimX:", error);
        return {
            success: false,
            error: error.message || "Failed to get current referral claimX"
        };
    }
};

/**
 * Get claimX self unit power up for a specific unit
 * @param {Object} provider - Ethers provider
 * @param {string} userAddress - User wallet address
 * @param {number} unitIndex - Unit index (0-4)
 * @returns {Promise<{success: boolean, data?: string, error?: string}>}
 */
export const claimXSelfUnitPowerUp = async (provider, userAddress, unitIndex) => {
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

        // Call claimXSelfUnitPowerUp function
        const result = await contract.claimXSelfUnitPowerUp(userAddress, unitIndex);

        // Convert from wei to ether
        const formattedResult = formatEther(result);

        return {
            success: true,
            data: formattedResult
        };
    } catch (error) {
        console.error("Error getting claimX self unit power up:", error);
        return {
            success: false,
            error: error.message || "Failed to get claimX self unit power up"
        };
    }
};

/**
 * Get claimX referral unit power up for a specific unit
 * @param {Object} provider - Ethers provider
 * @param {string} userAddress - User wallet address
 * @param {number} unitIndex - Unit index (0-4)
 * @returns {Promise<{success: boolean, data?: string, error?: string}>}
 */
export const claimXReferralUnitPowerUp = async (provider, userAddress, unitIndex) => {
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

        // Call claimXReferralUnitPowerUp function
        const result = await contract.claimXReferralUnitPowerUp(userAddress, unitIndex);

        // Convert from wei to ether
        const formattedResult = formatEther(result);

        return {
            success: true,
            data: formattedResult
        };
    } catch (error) {
        console.error("Error getting claimX referral unit power up:", error);
        return {
            success: false,
            error: error.message || "Failed to get claimX referral unit power up"
        };
    }
};
