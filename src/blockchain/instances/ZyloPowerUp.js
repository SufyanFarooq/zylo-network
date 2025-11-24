import { BrowserProvider, Contract } from "ethers";
import { ZyloPowerUp_ADDRESS, ZillowToken_ADDRESS } from "../addresses/addresses.js";
import ZyloPowerUp_ABI from "../abis/ZyloPowerUp.json";
import ZillowToken_ABI from "../abis/ZillowToken_ABI.json";

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
        ZyloPowerUp_ADDRESS,
        ZyloPowerUp_ABI,
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
        ZyloPowerUp_ADDRESS,
        ZyloPowerUp_ABI,
        signer
    );
};

/**
 * Connect Wallet Function
 * Opens the wallet connection modal
 * @param {Function} open - The open function from useAppKit hook
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const connectWallet = async (open) => {
    try {
        if (!open) {
            return {
                success: false,
                error: 'Wallet connection is not available. Please refresh the page.'
            };
        }

        await open({ view: "Connect" });

        return {
            success: true
        };
    } catch (error) {
        console.error('Error opening wallet connection:', error);
        return {
            success: false,
            error: 'Failed to open wallet connection. Please try again.'
        };
    }
};

/**
 * Get user details from ZyloPowerUp contract
 * @param {Object} provider - Ethers provider
 * @param {string} userAddress - User wallet address
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const getUserDetails = async (provider, userAddress) => {
    try {
        if (!provider) {
            throw new Error("Provider is required to get user details");
        }

        if (!userAddress) {
            throw new Error("User address is required");
        }

        const contract = createContractInstance(provider);
        const userDetails = await contract.userDetails(userAddress);

        return {
            success: true,
            data: userDetails
        };
    } catch (error) {
        console.error("Error getting user details:", error);
        return {
            success: false,
            error: error.message || "Failed to get user details"
        };
    }
};

/**
 * Check if user is already registered
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @returns {Promise<{success: boolean, isRegistered: boolean, error?: string, referralLink?: string}>}
 */
export const checkUserRegistration = async (provider, address) => {
    try {
        if (!provider) {
            return {
                success: false,
                isRegistered: false,
                error: 'Provider is required'
            };
        }

        if (!address) {
            return {
                success: false,
                isRegistered: false,
                error: 'Address is required'
            };
        }

        const userDetailsResult = await getUserDetails(provider, address);

        if (!userDetailsResult.success) {
            return {
                success: false,
                isRegistered: false,
                error: userDetailsResult.error || 'Error checking registration status'
            };
        }

        if (userDetailsResult.data) {
            const userDetails = userDetailsResult.data;

            // Safe access to get inviter address (inceptAddress)
            let inviterAddress = null;
            try {
                // Try named property first (ethers.js tuple)
                if (userDetails.inceptAddress !== undefined) {
                    inviterAddress = userDetails.inceptAddress;
                } else if (Array.isArray(userDetails) && userDetails.length > 1) {
                    inviterAddress = userDetails[1]; // inceptAddress is at index 1
                } else if (userDetails[1] !== undefined) {
                    inviterAddress = userDetails[1];
                }
            } catch (e) {
                console.error('Error accessing inviter address:', e);
            }

            // Check if inviter address is not zero address (means user is already registered)
            const zeroAddress = '0x0000000000000000000000000000000000000000';
            const isRegistered = inviterAddress &&
                inviterAddress !== zeroAddress &&
                inviterAddress !== '0x0' &&
                inviterAddress.toString() !== zeroAddress;

            if (isRegistered) {
                const referralLink = `${window.location.origin}/register/${address}`;

                return {
                    success: true,
                    isRegistered: true,
                    referralLink: referralLink
                };
            }
        }

        return {
            success: true,
            isRegistered: false
        };
    } catch (error) {
        console.error('Error checking user registration:', error);
        return {
            success: false,
            isRegistered: false,
            error: error.message || 'Error checking registration status'
        };
    }
};

/**
 * Register/Join Community Function
 * Handles all validation and registration logic
 * @param {Object} walletClient - Wallet client from wagmi
 * @param {string} address - User wallet address
 * @param {string} referralAddress - Referral address
 * @param {string} userName - User name
 * @returns {Promise<{success: boolean, error?: string, referralLink?: string, isAlreadyRegistered?: boolean}>}
 */
export const registerUser = async (walletClient, address, referralAddress, userName) => {
    try {
        // Validation checks
        if (!address) {
            return {
                success: false,
                error: 'Please connect your wallet first'
            };
        }

        if (!userName || !userName.trim()) {
            return {
                success: false,
                error: 'Your name is required to join the community'
            };
        }

        if (!referralAddress || !referralAddress.trim()) {
            return {
                success: false,
                error: 'Referral address is required to join the community'
            };
        }

        if (!walletClient) {
            return {
                success: false,
                error: 'Unable to get wallet client'
            };
        }

        if (typeof walletClient !== 'object' || walletClient === null) {
            return {
                success: false,
                error: 'Invalid wallet client'
            };
        }

        // Validate referral address format
        if (!referralAddress.startsWith('0x') || referralAddress.length !== 42) {
            return {
                success: false,
                error: 'Invalid referral address format'
            };
        }

        // Root address - this is allowed as referral address
        const ROOT_ADDRESS = '0x3b0a3638ab65d2bd557aac645d60d39e0c868f7e';
        const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
        const referralLower = referralAddress.toLowerCase();

        // Allow zero address or root address as referral (root address case)
        const isZeroAddress = referralLower === ZERO_ADDRESS.toLowerCase();
        const isRootAddress = referralLower === ROOT_ADDRESS.toLowerCase();

        // If it's zero address but not root address, it's invalid
        if (isZeroAddress && !isRootAddress) {
            return {
                success: false,
                error: 'Invalid referral address. Zero address is not allowed.'
            };
        }

        // Convert wallet client to ethers provider
        const provider = new BrowserProvider(walletClient);

        // Check if user is already registered
        const registrationCheck = await checkUserRegistration(provider, address);

        if (!registrationCheck.success) {
            return {
                success: false,
                error: registrationCheck.error || 'Error checking registration status'
            };
        }

        if (registrationCheck.isRegistered) {
            return {
                success: false,
                error: 'You are already registered in the community!',
                isAlreadyRegistered: true,
                referralLink: registrationCheck.referralLink || `${window.location.origin}/register/${address}`
            };
        }

        // Get signer for transaction
        const signer = await provider.getSigner();

        // Create contract instance with signer
        const contract = createContractInstanceWithSigner(signer);

        // Validate user name length
        const trimmedUserName = userName.trim();
        if (trimmedUserName.length < 2) {
            return {
                success: false,
                error: 'User name must be at least 2 characters long'
            };
        }

        if (trimmedUserName.length > 50) {
            return {
                success: false,
                error: 'User name must be less than 50 characters'
            };
        }

        // Verify referral address is registered (skip for root/zero address)
        // Note: isRootAddress and isZeroAddress are already declared above
        if (!isRootAddress && !isZeroAddress) {
            try {
                const referralCheck = await checkUserRegistration(provider, referralAddress);
                if (!referralCheck.success || !referralCheck.isRegistered) {
                    return {
                        success: false,
                        error: 'Invalid referral address. The referral address must be registered in the community.'
                    };
                }
            } catch (refError) {
                console.warn('Could not verify referral address, proceeding anyway:', refError);
                // Continue - let the contract handle the validation
            }
        } else {
            console.log('Using root/zero address as referral, skipping registration check');
        }

        try {
            // Call inceptNow function directly without gas estimation
            // Gas estimation can fail with "missing revert data" even when transaction would succeed
            console.log('Calling inceptNow with:', {
                referralAddress,
                userName: trimmedUserName,
                from: address
            });

            let tx;
            try {
                // Call the function directly
                tx = await contract.inceptNow(referralAddress, trimmedUserName);
            } catch (callError) {
                console.error('Contract call error:', callError);

                // Check if it's a revert error
                const errorStr = (callError.message || String(callError)).toLowerCase();
                const errorCode = callError.code || '';

                // Handle "missing revert data" or CALL_EXCEPTION
                if (errorStr.includes('missing revert data') ||
                    errorStr.includes('call_exception') ||
                    errorCode === 'CALL_EXCEPTION') {

                    // Check if user is already registered
                    try {
                        const registrationCheck = await checkUserRegistration(provider, address);
                        if (registrationCheck.success && registrationCheck.isRegistered) {
                            return {
                                success: false,
                                error: 'You are already registered in the community!',
                                isAlreadyRegistered: true,
                                referralLink: registrationCheck.referralLink
                            };
                        }
                    } catch (regError) {
                        console.error('Error checking registration:', regError);
                    }

                    // Check if referral address is valid (is registered)
                    try {
                        const referralCheck = await checkUserRegistration(provider, referralAddress);
                        if (!referralCheck.success || !referralCheck.isRegistered) {
                            return {
                                success: false,
                                error: 'Invalid referral address. The referral address must be registered in the community.'
                            };
                        }
                    } catch (refError) {
                        console.error('Error checking referral:', refError);
                    }

                    return {
                        success: false,
                        error: 'Transaction failed. Please verify: 1) You are not already registered, 2) Referral address is valid and registered, 3) You have sufficient balance.'
                    };
                }

                // Check for other specific errors
                if (errorStr.includes('user rejected') || errorStr.includes('user denied')) {
                    return {
                        success: false,
                        error: 'Transaction was rejected by user.'
                    };
                }

                // Re-throw if it's a different error
                throw callError;
            }

            console.log('Registration transaction sent:', tx.hash);

            // Wait for transaction to be mined
            const receipt = await tx.wait();

            console.log('Registration transaction confirmed:', receipt.transactionHash);

            // Generate referral link for the user
            const referralLink = `${window.location.origin}/register/${address}`;

            return {
                success: true,
                referralLink: referralLink,
                txHash: receipt.transactionHash
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
                    // Try to decode error
                    const errorStr = String(txError.data);
                    if (errorStr.includes('already registered') || errorStr.includes('already exists')) {
                        return {
                            success: false,
                            error: 'You are already registered in the community!',
                            isAlreadyRegistered: true
                        };
                    }
                } catch (e) {
                    console.error('Error decoding error data:', e);
                }
            }

            throw txError; // Re-throw to be caught by outer catch
        }
    } catch (error) {
        console.error('Error in registerUser:', error);

        // Handle specific error cases
        let errorMessage = 'Unknown error occurred';

        if (error.message) {
            errorMessage = error.message;

            // User-friendly error messages
            if (error.message.includes('user rejected') || error.message.includes('User denied') || error.message.includes('rejected')) {
                errorMessage = 'Transaction was rejected. Please try again.';
            } else if (error.message.includes('insufficient funds') || error.message.includes('insufficient balance')) {
                errorMessage = 'Insufficient funds for transaction.';
            } else if (error.message.includes('already registered') || error.message.includes('already exists')) {
                errorMessage = 'You are already registered in the community!';
            } else if (error.message.includes('missing revert data') || error.message.includes('CALL_EXCEPTION')) {
                errorMessage = 'Transaction failed. Please check: 1) You are not already registered, 2) Referral address is valid, 3) You have sufficient balance.';
            } else if (error.message.includes('invalid referral') || error.message.includes('invalid inviter')) {
                errorMessage = 'Invalid referral address. Please check and try again.';
            }
        } else if (error.reason) {
            errorMessage = error.reason;
        }

        return {
            success: false,
            error: errorMessage
        };
    }
};

/**
 * Refresh user registration status after registration
 * @param {Object} walletClient - Wallet client from wagmi
 * @param {string} address - User wallet address
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const refreshUserRegistrationStatus = async (walletClient, address) => {
    try {
        if (!walletClient || !address) {
            return {
                success: false,
                error: 'Wallet client and address are required'
            };
        }

        const provider = new BrowserProvider(walletClient);
        const userDetailsResult = await getUserDetails(provider, address);

        if (userDetailsResult.success && userDetailsResult.data) {
            return {
                success: true
            };
        } else {
            return {
                success: false,
                error: userDetailsResult.error || 'Failed to refresh user details'
            };
        }
    } catch (error) {
        console.error('Error refreshing user registration status:', error);
        return {
            success: false,
            error: error.message || 'Error refreshing registration status'
        };
    }
};

/**
 * Get incept count for a user at a specific level
 * @param {Object} provider - Ethers provider
 * @param {string} walletAddress - User wallet address
 * @param {number} levelIndex - Level index (0-9)
 * @returns {Promise<{success: boolean, count?: number, error?: string}>}
 */
export const getInceptCount = async (provider, walletAddress, levelIndex) => {
    try {
        if (!provider) {
            return {
                success: false,
                error: 'Provider is required'
            };
        }

        if (!walletAddress) {
            return {
                success: false,
                error: 'Wallet address is required'
            };
        }

        if (levelIndex < 0 || levelIndex > 9) {
            return {
                success: false,
                error: 'Level index must be between 0 and 9'
            };
        }

        const contract = createContractInstance(provider);
        const count = await contract.inceptCount(walletAddress, levelIndex);

        // Convert BigInt to number
        const countNumber = Number(count.toString());

        return {
            success: true,
            count: countNumber
        };
    } catch (error) {
        console.error('Error getting incept count:', error);
        return {
            success: false,
            error: error.message || 'Failed to get incept count'
        };
    }
};

/**
 * Get incept node address for a user at a specific level and index
 * @param {Object} provider - Ethers provider
 * @param {string} walletAddress - User wallet address
 * @param {number} levelIndex - Level index (0-9)
 * @param {number} index - Index within the level (0 to count-1)
 * @returns {Promise<{success: boolean, address?: string, error?: string}>}
 */
export const getInceptNodeAddress = async (provider, walletAddress, levelIndex, index) => {
    try {
        if (!provider) {
            return {
                success: false,
                error: 'Provider is required'
            };
        }

        if (!walletAddress) {
            return {
                success: false,
                error: 'Wallet address is required'
            };
        }

        if (levelIndex < 0 || levelIndex > 9) {
            return {
                success: false,
                error: 'Level index must be between 0 and 9'
            };
        }

        if (index < 0) {
            return {
                success: false,
                error: 'Index must be 0 or greater'
            };
        }

        const contract = createContractInstance(provider);
        const nodeAddress = await contract.inceptNodeAddress(walletAddress, levelIndex, index);

        return {
            success: true,
            address: nodeAddress.toString()
        };
    } catch (error) {
        console.error('Error getting incept node address:', error);
        return {
            success: false,
            error: error.message || 'Failed to get incept node address'
        };
    }
};

/**
 * Get level team details by fetching all team members for a specific level
 * @param {Object} provider - Ethers provider
 * @param {string} walletAddress - User wallet address
 * @param {number} level - Level number (1-10, will be converted to index 0-9)
 * @returns {Promise<{success: boolean, data?: {teamRewards: Array}, error?: string}>}
 */
export const getLevelTeamDetails = async (provider, walletAddress, level) => {
    try {
        if (!provider) {
            return {
                success: false,
                error: 'Provider is required'
            };
        }

        if (!walletAddress) {
            return {
                success: false,
                error: 'Wallet address is required'
            };
        }

        // Convert level (1-10) to levelIndex (0-9)
        const levelIndex = level - 1;

        if (levelIndex < 0 || levelIndex > 9) {
            return {
                success: false,
                error: 'Level must be between 1 and 10'
            };
        }

        // Step 1: Get incept count for this level
        const countResult = await getInceptCount(provider, walletAddress, levelIndex);

        if (!countResult.success) {
            return {
                success: false,
                error: countResult.error || 'Failed to get incept count'
            };
        }

        const count = countResult.count || 0;

        if (count === 0) {
            return {
                success: true,
                data: {
                    teamRewards: []
                }
            };
        }

        // Step 2: Loop through all indices and get addresses
        const teamRewards = [];

        for (let i = 0; i < count; i++) {
            try {
                // Step 2a: Get node address at index i
                const nodeAddressResult = await getInceptNodeAddress(provider, walletAddress, levelIndex, i);

                if (!nodeAddressResult.success || !nodeAddressResult.address) {
                    console.warn(`Failed to get node address at index ${i}:`, nodeAddressResult.error);
                    continue;
                }

                const nodeAddress = nodeAddressResult.address;

                // Step 2b: Get user details for this address
                const userDetailsResult = await getUserDetails(provider, nodeAddress);

                if (!userDetailsResult.success || !userDetailsResult.data) {
                    console.warn(`Failed to get user details for address ${nodeAddress}:`, userDetailsResult.error);
                    continue;
                }

                const userDetails = userDetailsResult.data;

                // Extract data from userDetails
                // userDetails structure: [name, inceptAddress, registeredTime, powerUPTotalToken, powerUPActiveTotalToken, countDirectIncept, TotalTeamUnderIncept]
                let registeredTime = BigInt(0);
                let powerUPTotalToken = BigInt(0);

                try {
                    // Try named properties first (ethers.js tuple)
                    if (userDetails.registeredTime !== undefined) {
                        registeredTime = userDetails.registeredTime;
                    } else if (Array.isArray(userDetails) && userDetails.length > 2) {
                        registeredTime = userDetails[2];
                    } else if (userDetails[2] !== undefined) {
                        registeredTime = userDetails[2];
                    }

                    if (userDetails.powerUPTotalToken !== undefined) {
                        powerUPTotalToken = userDetails.powerUPTotalToken;
                    } else if (Array.isArray(userDetails) && userDetails.length > 3) {
                        powerUPTotalToken = userDetails[3];
                    } else if (userDetails[3] !== undefined) {
                        powerUPTotalToken = userDetails[3];
                    }
                } catch (e) {
                    console.error('Error extracting user details:', e);
                }

                // Format powerUPTotalToken from wei to ether
                let powerUPTotalTokenFormatted = '0';
                try {
                    const { formatEther } = await import('ethers');
                    powerUPTotalTokenFormatted = formatEther(powerUPTotalToken);
                } catch {
                    // Fallback: convert BigInt to string
                    powerUPTotalTokenFormatted = powerUPTotalToken.toString();
                }

                // Add to team rewards array
                teamRewards.push({
                    address: nodeAddress,
                    timestamp: registeredTime.toString(), // registeredTime at index 2
                    totalSelfDepositedAmount: powerUPTotalTokenFormatted, // powerUPTotalToken at index 3
                    registerTM: registeredTime.toString(),
                    depositTM: registeredTime.toString() // Using registeredTime as depositTM for now
                });
            } catch (error) {
                console.error(`Error processing team member at index ${i}:`, error);
                // Continue to next member
            }
        }

        return {
            success: true,
            data: {
                teamRewards: teamRewards
            }
        };
    } catch (error) {
        console.error('Error getting level team details:', error);
        return {
            success: false,
            error: error.message || 'Failed to get level team details'
        };
    }
};

/**
 * Placeholder functions for compatibility
 * These functions may need to be implemented based on contract ABI
 */

/**
 * Get inviter level unlock status
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @param {number} levelId - Level ID
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const inviterLevelUnLock = async (_provider, _address, _levelId) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in inviterLevelUnLock:', error);
        return {
            success: false,
            error: error.message || 'Failed to get inviter level unlock status'
        };
    }
};

/**
 * Get all levels unlock status
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const getAllLevelsUnlockStatus = async (_provider, _address) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getAllLevelsUnlockStatus:', error);
        return {
            success: false,
            error: error.message || 'Failed to get all levels unlock status'
        };
    }
};

/**
 * Get inviter level unlock time
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @param {number} levelId - Level ID
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const getInviterLevelUnLockTime = async (_provider, _address, _levelId) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getInviterLevelUnLockTime:', error);
        return {
            success: false,
            error: error.message || 'Failed to get inviter level unlock time'
        };
    }
};

/**
 * Get user rewards
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const getUserRewards = async (_provider, _address) => {
    try {
        // TODO: Implement based on contract ABI
        // Return gracefully without logging error - this is expected behavior
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        // Only log actual errors, not the expected "not implemented" case
        const errorMessage = error.message || String(error);
        if (!errorMessage.includes('not yet implemented')) {
            console.error('Error in getUserRewards:', error);
        }
        return {
            success: false,
            error: errorMessage || 'Failed to get user rewards'
        };
    }
};

/**
 * Get daily deposits
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const getDailyDeposits = async (_provider, _address) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getDailyDeposits:', error);
        return {
            success: false,
            error: error.message || 'Failed to get daily deposits'
        };
    }
};

/**
 * Get weekly deposits
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const getWeeklyDeposits = async (_provider, _address) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getWeeklyDeposits:', error);
        return {
            success: false,
            error: error.message || 'Failed to get weekly deposits'
        };
    }
};

/**
 * Get monthly deposits
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const getMonthlyDeposits = async (_provider, _address) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getMonthlyDeposits:', error);
        return {
            success: false,
            error: error.message || 'Failed to get monthly deposits'
        };
    }
};

/**
 * Get daily deposits referral
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const getDailyDepositsReferral = async (_provider, _address) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getDailyDepositsReferral:', error);
        return {
            success: false,
            error: error.message || 'Failed to get daily deposits referral'
        };
    }
};

/**
 * Get weekly deposits referral
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const getWeeklyDepositsReferral = async (_provider, _address) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getWeeklyDepositsReferral:', error);
        return {
            success: false,
            error: error.message || 'Failed to get weekly deposits referral'
        };
    }
};

/**
 * Get monthly deposits referral
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const getMonthlyDepositsReferral = async (_provider, _address) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getMonthlyDepositsReferral:', error);
        return {
            success: false,
            error: error.message || 'Failed to get monthly deposits referral'
        };
    }
};

/**
 * Reward Network Instance Functions
 * Placeholder functions for compatibility
 */

/**
 * Get level team rewards
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @param {number} level - Level number
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const getLevelTeamRewards = async (_provider, _address, _level) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getLevelTeamRewards:', error);
        return {
            success: false,
            error: error.message || 'Failed to get level team rewards'
        };
    }
};

/**
 * Get team reward
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @param {number} level - Level number
 * @param {number} index - Index
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const getTeamReward = async (_provider, _address, _level, _index) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getTeamReward:', error);
        return {
            success: false,
            error: error.message || 'Failed to get team reward'
        };
    }
};

/**
 * Get user reward details
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const getUserRewardDetails = async (_provider, _address) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getUserRewardDetails:', error);
        return {
            success: false,
            error: error.message || 'Failed to get user reward details'
        };
    }
};

/**
 * Get user withdraw info
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const getUserWithdrawInfo = async (_provider, _address) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getUserWithdrawInfo:', error);
        return {
            success: false,
            error: error.message || 'Failed to get user withdraw info'
        };
    }
};

/**
 * Withdraw function
 * @param {Object} signer - Ethers signer
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const withdraw = async (_signer) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in withdraw:', error);
        return {
            success: false,
            error: error.message || 'Failed to withdraw'
        };
    }
};

/**
 * Get claim data
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const getClaimData = async (_provider, _address) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getClaimData:', error);
        return {
            success: false,
            error: error.message || 'Failed to get claim data'
        };
    }
};

/**
 * Claim function
 * @param {Object} signer - Ethers signer
 * @param {number} unit - Unit number
 * @param {number} index - Index
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const claimed = async (_signer, _unit, _index) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in claimed:', error);
        return {
            success: false,
            error: error.message || 'Failed to claim'
        };
    }
};

/**
 * Get user claim info
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const getUserClaimInfo = async (_provider, _address) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getUserClaimInfo:', error);
        return {
            success: false,
            error: error.message || 'Failed to get user claim info'
        };
    }
};

/**
 * ZNetwork Instance Functions
 * Placeholder functions for compatibility
 */

/**
 * Deposit/Power Up function
 * Calls the powerUp function on ZyloPowerUp contract
 * @param {Object} signer - Ethers signer
 * @param {string} amount - Amount to deposit (in token units, not wei)
 * @returns {Promise<{success: boolean, error?: string, txHash?: string}>}
 */
export const deposit = async (signer, amount) => {
    try {
        if (!signer) {
            return {
                success: false,
                error: "Signer is required to deposit"
            };
        }

        if (!amount || parseFloat(amount) <= 0) {
            return {
                success: false,
                error: "Amount must be greater than 0"
            };
        }

        const contract = createContractInstanceWithSigner(signer);

        // Convert amount to wei (assuming 18 decimals)
        const { parseEther } = await import("ethers");
        const amountInWei = parseEther(amount);

        console.log("Calling powerUp function:", {
            contractAddress: ZyloPowerUp_ADDRESS,
            amount: amount,
            amountInWei: amountInWei.toString()
        });

        // Call powerUp function on the contract
        const tx = await contract.powerUp(amountInWei);

        console.log("Power Up transaction sent:", tx.hash);

        // Wait for transaction to be mined
        const receipt = await tx.wait();

        console.log("Power Up transaction confirmed:", receipt.transactionHash);

        return {
            success: true,
            txHash: receipt.transactionHash
        };
    } catch (error) {
        console.error("Error in deposit/powerUp:", error);
        const errorMessage = error.message || String(error);
        const errorCode = error.code || '';
        const errorInfo = error.info || {};

        // Handle user rejection - return silently without error
        if (errorMessage.includes("user rejected") ||
            errorMessage.includes("User denied") ||
            errorMessage.includes("rejected") ||
            errorMessage.includes("ACTION_REJECTED") ||
            errorCode === 'ACTION_REJECTED' ||
            errorCode === 4001 ||
            (errorInfo.error && errorInfo.error.code === 4001)) {
            return {
                success: false,
                error: '',
                userRejected: true
            };
        }

        // Handle insufficient balance
        if (errorMessage.includes("insufficient") ||
            errorMessage.includes("balance")) {
            return {
                success: false,
                error: "Insufficient token balance"
            };
        }

        // Handle allowance issues
        if (errorMessage.includes("allowance") ||
            errorMessage.includes("approve")) {
            return {
                success: false,
                error: "Insufficient token allowance. Please approve tokens first."
            };
        }

        return {
            success: false,
            error: errorMessage || "Failed to deposit"
        };
    }
};

/**
 * Get all user stakes
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const getAllUserStakes = async (_provider, _address) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: true,
            data: []
        };
    } catch (error) {
        console.error('Error in getAllUserStakes:', error);
        return {
            success: false,
            error: error.message || 'Failed to get all user stakes'
        };
    }
};

/**
 * Get power up length
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @param {number} unit - Unit index (0-3)
 * @returns {Promise<{success: boolean, data?: number, error?: string}>}
 */
export const getPowerUpLength = async (provider, address, unit) => {
    try {
        if (!provider) {
            return {
                success: false,
                error: 'Provider is required'
            };
        }

        if (!address) {
            return {
                success: false,
                error: 'Address is required'
            };
        }

        if (unit === undefined || unit === null || unit < 0) {
            return {
                success: false,
                error: 'Unit index is required and must be 0 or greater'
            };
        }

        const contract = createContractInstance(provider);
        const length = await contract.getPowerUpLength(address, unit);

        // Convert BigInt to number
        const lengthNumber = Number(length.toString());

        return {
            success: true,
            data: lengthNumber
        };
    } catch (error) {
        console.error('Error in getPowerUpLength:', error);
        return {
            success: false,
            error: error.message || 'Failed to get power up length'
        };
    }
};

/**
 * Get user power up details
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @param {number} unit - Unit index (0-3)
 * @param {number} index - Power up index within the unit
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const userPowerUpDetails = async (provider, address, unit, index) => {
    try {
        if (!provider) {
            return {
                success: false,
                error: 'Provider is required'
            };
        }

        if (!address) {
            return {
                success: false,
                error: 'Address is required'
            };
        }

        if (unit === undefined || unit === null || unit < 0) {
            return {
                success: false,
                error: 'Unit index is required and must be 0 or greater'
            };
        }

        if (index === undefined || index === null || index < 0) {
            return {
                success: false,
                error: 'Index is required and must be 0 or greater'
            };
        }

        const contract = createContractInstance(provider);
        const details = await contract.userPowerUpDetails(address, unit, index);

        // Extract data from the tuple
        // Structure: [powerUpToken, powerUpTime, powerUpMonth, powerUpBlock, powerUpRemainingBlock, assetsNo, unitAssetX, unPowerUp]
        let powerUpToken = BigInt(0);
        let powerUpTime = BigInt(0);
        let powerUpMonth = BigInt(0);
        let powerUpBlock = BigInt(0);
        let powerUpRemainingBlock = BigInt(0);
        let assetsNo = 0;
        let unitAssetX = BigInt(0);
        let unPowerUp = false;

        try {
            // Try named properties first (ethers.js tuple)
            if (details.powerUpToken !== undefined) {
                powerUpToken = details.powerUpToken;
            } else if (Array.isArray(details) && details.length > 0) {
                powerUpToken = details[0];
            } else if (details[0] !== undefined) {
                powerUpToken = details[0];
            }

            if (details.powerUpTime !== undefined) {
                powerUpTime = details.powerUpTime;
            } else if (Array.isArray(details) && details.length > 1) {
                powerUpTime = details[1];
            } else if (details[1] !== undefined) {
                powerUpTime = details[1];
            }

            if (details.powerUpMonth !== undefined) {
                powerUpMonth = details.powerUpMonth;
            } else if (Array.isArray(details) && details.length > 2) {
                powerUpMonth = details[2];
            } else if (details[2] !== undefined) {
                powerUpMonth = details[2];
            }

            if (details.powerUpBlock !== undefined) {
                powerUpBlock = details.powerUpBlock;
            } else if (Array.isArray(details) && details.length > 3) {
                powerUpBlock = details[3];
            } else if (details[3] !== undefined) {
                powerUpBlock = details[3];
            }

            if (details.powerUpRemainingBlock !== undefined) {
                powerUpRemainingBlock = details.powerUpRemainingBlock;
            } else if (Array.isArray(details) && details.length > 4) {
                powerUpRemainingBlock = details[4];
            } else if (details[4] !== undefined) {
                powerUpRemainingBlock = details[4];
            }

            if (details.assetsNo !== undefined) {
                assetsNo = Number(details.assetsNo.toString());
            } else if (Array.isArray(details) && details.length > 5) {
                assetsNo = Number(details[5].toString());
            } else if (details[5] !== undefined) {
                assetsNo = Number(details[5].toString());
            }

            if (details.unitAssetX !== undefined) {
                unitAssetX = details.unitAssetX;
            } else if (Array.isArray(details) && details.length > 6) {
                unitAssetX = details[6];
            } else if (details[6] !== undefined) {
                unitAssetX = details[6];
            }

            if (details.unPowerUp !== undefined) {
                unPowerUp = details.unPowerUp;
            } else if (Array.isArray(details) && details.length > 7) {
                unPowerUp = details[7];
            } else if (details[7] !== undefined) {
                unPowerUp = details[7];
            }
        } catch (e) {
            console.error('Error extracting power up details:', e);
        }

        // Format powerUpToken from wei to ether
        let powerUpTokenFormatted = '0';
        try {
            const { formatEther } = await import('ethers');
            powerUpTokenFormatted = formatEther(powerUpToken);
        } catch {
            powerUpTokenFormatted = powerUpToken.toString();
        }

        return {
            success: true,
            data: {
                powerUpToken: powerUpTokenFormatted,
                powerUpTime: powerUpTime.toString(),
                powerUpMonth: powerUpMonth.toString(),
                powerUpBlock: powerUpBlock.toString(),
                powerUpRemainingBlock: powerUpRemainingBlock.toString(),
                assetsNo: assetsNo,
                unitAssetX: unitAssetX.toString(),
                unPowerUp: unPowerUp
            }
        };
    } catch (error) {
        console.error('Error in userPowerUpDetails:', error);
        return {
            success: false,
            error: error.message || 'Failed to get user power up details'
        };
    }
};

/**
 * Get self power up reward
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @param {number} unit - Unit index (0-3)
 * @param {number} index - Power up index within the unit
 * @returns {Promise<{success: boolean, data?: string, error?: string}>}
 */
export const getSelfPowerUpReward = async (provider, address, unit, index) => {
    try {
        if (!provider) {
            return {
                success: false,
                error: 'Provider is required'
            };
        }

        if (!address) {
            return {
                success: false,
                error: 'Address is required'
            };
        }

        if (unit === undefined || unit === null || unit < 0) {
            return {
                success: false,
                error: 'Unit index is required and must be 0 or greater'
            };
        }

        if (index === undefined || index === null || index < 0) {
            return {
                success: false,
                error: 'Index is required and must be 0 or greater'
            };
        }

        const contract = createContractInstance(provider);
        const reward = await contract.selfPowerUpReward(address, unit, index);

        // Format reward from wei to ether
        let rewardFormatted = '0';
        try {
            const { formatEther } = await import('ethers');
            rewardFormatted = formatEther(reward);
        } catch {
            rewardFormatted = reward.toString();
        }

        return {
            success: true,
            data: rewardFormatted
        };
    } catch (error) {
        console.error('Error in getSelfPowerUpReward:', error);
        return {
            success: false,
            error: error.message || 'Failed to get self power up reward'
        };
    }
};

/**
 * Get total staked amount
 * @param {Object} provider - Ethers provider
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const getTotalStakedAmount = async (_provider) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getTotalStakedAmount:', error);
        return {
            success: false,
            error: error.message || 'Failed to get total staked amount'
        };
    }
};

/**
 * Get total users
 * @param {Object} provider - Ethers provider
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const getTotalUsers = async (_provider) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getTotalUsers:', error);
        return {
            success: false,
            error: error.message || 'Failed to get total users'
        };
    }
};

/**
 * Get total rewards distributed
 * @param {Object} provider - Ethers provider
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const getTotalRewardsDistributed = async (_provider) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getTotalRewardsDistributed:', error);
        return {
            success: false,
            error: error.message || 'Failed to get total rewards distributed'
        };
    }
};

/**
 * Get total network members
 * @param {Object} provider - Ethers provider
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const getTotalNetworkMembers = async (_provider) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getTotalNetworkMembers:', error);
        return {
            success: false,
            error: error.message || 'Failed to get total network members'
        };
    }
};

/**
 * Get total deposit in network
 * @param {Object} provider - Ethers provider
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const getTotalDepositInNetwork = async (_provider) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getTotalDepositInNetwork:', error);
        return {
            success: false,
            error: error.message || 'Failed to get total deposit in network'
        };
    }
};

/**
 * Get total active deposit in network
 * @param {Object} provider - Ethers provider
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const getTotalActiveDepositInNetwork = async (_provider) => {
    try {
        // TODO: Implement based on contract ABI
        return {
            success: false,
            error: 'Function not yet implemented in ZyloPowerUp contract'
        };
    } catch (error) {
        console.error('Error in getTotalActiveDepositInNetwork:', error);
        return {
            success: false,
            error: error.message || 'Failed to get total active deposit in network'
        };
    }
};

/**
 * Zillow Token Instance Functions
 * Token-related functions for ZillowToken contract
 */

/**
 * Create ZillowToken contract instance with provider
 * @param {Object} provider - Ethers provider
 * @returns {Contract} Contract instance
 */
const createZillowTokenContractInstance = (provider) => {
    if (!provider) {
        throw new Error("Provider is required to create ZillowToken contract instance");
    }

    return new Contract(
        ZillowToken_ADDRESS,
        ZillowToken_ABI,
        provider
    );
};

/**
 * Create ZillowToken contract instance with signer
 * @param {Object} signer - Ethers signer
 * @returns {Contract} Contract instance
 */
const createZillowTokenContractInstanceWithSigner = (signer) => {
    if (!signer) {
        throw new Error("Signer is required to create ZillowToken contract instance with signer");
    }

    return new Contract(
        ZillowToken_ADDRESS,
        ZillowToken_ABI,
        signer
    );
};

/**
 * Get token balance for an address
 * @param {Object} provider - Ethers provider
 * @param {string} address - User wallet address
 * @returns {Promise<{success: boolean, balance?: string, error?: string}>}
 */
export const getTokenBalance = async (provider, address) => {
    try {
        if (!provider) {
            return {
                success: false,
                error: 'Provider is required'
            };
        }

        if (!address) {
            return {
                success: false,
                error: 'Address is required'
            };
        }

        const contract = createZillowTokenContractInstance(provider);
        const balance = await contract.balanceOf(address);

        // Format balance from wei to ether
        const { formatEther } = await import('ethers');
        const formattedBalance = formatEther(balance);

        return {
            success: true,
            balance: formattedBalance
        };
    } catch (error) {
        console.error('Error getting token balance:', error);
        return {
            success: false,
            error: error.message || 'Failed to get token balance'
        };
    }
};

/**
 * Get token allowance for a spender
 * @param {Object} provider - Ethers provider
 * @param {string} owner - Token owner address
 * @param {string} spender - Spender address
 * @returns {Promise<{success: boolean, allowance?: string, error?: string}>}
 */
export const getAllowance = async (provider, owner, spender) => {
    try {
        if (!provider) {
            return {
                success: false,
                error: 'Provider is required'
            };
        }

        if (!owner || !spender) {
            return {
                success: false,
                error: 'Owner and spender addresses are required'
            };
        }

        const contract = createZillowTokenContractInstance(provider);
        const allowance = await contract.allowance(owner, spender);

        // Format allowance from wei to ether
        const { formatEther } = await import('ethers');
        const formattedAllowance = formatEther(allowance);

        return {
            success: true,
            allowance: formattedAllowance
        };
    } catch (error) {
        console.error('Error getting token allowance:', error);
        return {
            success: false,
            error: error.message || 'Failed to get token allowance'
        };
    }
};

/**
 * Approve tokens for a spender
 * @param {Object} signer - Ethers signer
 * @param {string} spender - Spender address
 * @param {string} amount - Amount to approve (in ether, will be converted to wei)
 * @returns {Promise<{success: boolean, transactionHash?: string, error?: string}>}
 */
export const approveTokens = async (signer, spender, amount) => {
    try {
        if (!signer) {
            return {
                success: false,
                error: 'Signer is required'
            };
        }

        if (!spender) {
            return {
                success: false,
                error: 'Spender address is required'
            };
        }

        if (!amount) {
            return {
                success: false,
                error: 'Amount is required'
            };
        }

        const contract = createZillowTokenContractInstanceWithSigner(signer);

        // Convert amount from ether to wei
        const { parseEther } = await import('ethers');
        const amountInWei = parseEther(amount.toString());

        // Approve tokens
        const tx = await contract.approve(spender, amountInWei);

        // Wait for transaction to be mined
        await tx.wait();

        return {
            success: true,
            transactionHash: tx.hash
        };
    } catch (error) {
        console.error('Error approving tokens:', error);

        // Check if user rejected the transaction
        const errorMessage = error.message || String(error);
        const errorCode = error.code || '';

        if (errorMessage.includes('user rejected') ||
            errorMessage.includes('User denied') ||
            errorMessage.includes('rejected') ||
            errorMessage.includes('ACTION_REJECTED') ||
            errorCode === 'ACTION_REJECTED' ||
            errorCode === 4001) {
            // User rejected - return success: false but with a user-friendly message
            return {
                success: false,
                error: 'Transaction was cancelled. Please approve tokens to continue.',
                userRejected: true
            };
        }

        let errorMsg = 'Failed to approve tokens';
        if (error.message) {
            errorMsg = error.message;
        }

        return {
            success: false,
            error: errorMsg
        };
    }
};
