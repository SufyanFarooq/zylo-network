'use client';

import React, { JSX, useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider, formatEther } from 'ethers';
import { getCurrentSelfClaimInUnit, getCurrentTeamClaimInUnit, getTotalVestingClaimInUnit } from '@/blockchain/instances/ZyloPowerUp';
import { getUnitName } from '../staking/utils/unitCategoryMapping';
import { getCurrentSelfClaimX, getCurrentReferralClaimX, claimXSelfUnitPowerUp as fetchClaimXSelfUnitPowerUp, claimXReferralUnitPowerUp as fetchClaimXReferralUnitPowerUp } from '@/blockchain/instances/ClaimXFunctions';
import { claimX, getUserClaimXDetailsLength, userClaimXHistory } from '@/blockchain/instances/ZyloPowerUpM';
import './ClaimStaticsCards.css';

type Card = { title: string; icon: 'stake' | 'level' | 'waste' | 'wallet' | 'coins' | 'bars' | 'wasteMini' | 'trophy' };

const ICON: Record<Card['icon'], JSX.Element> = {
    stake: (
        <svg className="z-icon" viewBox="0 0 64 64" aria-hidden="true">
            <defs>
                <linearGradient id="coinStack" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFF176" />
                    <stop offset="100%" stopColor="var(--primary-yellow)" />
                </linearGradient>
            </defs>
            <g fill="url(#coinStack)" stroke="#09141a" strokeWidth="2">
                <ellipse cx="22" cy="44" rx="10" ry="6" />
                <ellipse cx="32" cy="36" rx="10" ry="6" />
                <ellipse cx="42" cy="28" rx="10" ry="6" />
            </g>
        </svg>
    ),
    level: (
        <svg className="z-icon" viewBox="0 0 64 64" aria-hidden="true">
            <g fill="var(--primary-yellow)" stroke="#09141a" strokeWidth="2" strokeLinejoin="round">
                <circle cx="32" cy="32" r="10" />
                <circle cx="16" cy="16" r="6" />
                <circle cx="48" cy="16" r="6" />
                <circle cx="16" cy="48" r="6" />
                <circle cx="48" cy="48" r="6" />
                <path d="M16 16 L32 32 M48 16 L32 32 M16 48 L32 32 M48 48 L32 32" />
            </g>
        </svg>
    ),
    waste: (
        <svg className="z-icon" viewBox="0 0 64 64" aria-hidden="true">
            <g fill="var(--primary-yellow)" stroke="#09141a" strokeWidth="2">
                <rect x="18" y="22" width="28" height="28" rx="6" />
                <rect x="16" y="18" width="32" height="6" rx="3" />
                <circle cx="40" cy="14" r="1.5" fill="#09141a" />
                <circle cx="44" cy="10" r="1.5" fill="#09141a" />
            </g>
        </svg>
    ),
    wallet: (
        <svg className="z-icon" viewBox="0 0 64 64" aria-hidden="true">
            <g fill="var(--primary-yellow)" stroke="#09141a" strokeWidth="2">
                <rect x="10" y="22" width="44" height="22" rx="8" />
                <circle cx="44" cy="33" r="4" fill="#09141a" />
                <rect x="10" y="18" width="34" height="6" rx="3" />
            </g>
        </svg>
    ),
    coins: (
        <svg className="z-icon" viewBox="0 0 64 64" aria-hidden="true">
            <g fill="var(--primary-yellow)" stroke="#09141a" strokeWidth="2">
                <circle cx="32" cy="24" r="8" />
                <circle cx="24" cy="40" r="8" />
                <circle cx="40" cy="40" r="8" />
            </g>
        </svg>
    ),
    bars: (
        <svg className="z-icon" viewBox="0 0 64 64" aria-hidden="true">
            <g fill="var(--primary-yellow)" stroke="#09141a" strokeWidth="2">
                <rect x="10" y="38" width="8" height="16" rx="2" />
                <rect x="24" y="32" width="8" height="22" rx="2" />
                <rect x="38" y="26" width="8" height="28" rx="2" />
                <polygon points="54,18 50,26 58,26" />
            </g>
        </svg>
    ),
    wasteMini: (
        <svg className="z-icon" viewBox="0 0 64 64" aria-hidden="true">
            <g fill="var(--primary-yellow)" stroke="#09141a" strokeWidth="2">
                <rect x="20" y="26" width="24" height="24" rx="6" />
                <rect x="18" y="22" width="28" height="6" rx="3" />
                <circle cx="44" cy="18" r="2" fill="#09141a" />
                <circle cx="38" cy="14" r="2" fill="#09141a" />
            </g>
        </svg>
    ),
    trophy: (
        <svg className="z-icon" viewBox="0 0 64 64" aria-hidden="true">
            <g fill="var(--primary-yellow)" stroke="#09141a" strokeWidth="2">
                <rect x="24" y="18" width="16" height="16" rx="2" />
                <path d="M24 22h-8c0 8 6 10 8 10M40 22h8c0 8-6 10-8 10" fill="none" />
                <rect x="28" y="34" width="8" height="6" rx="2" />
                <rect x="22" y="40" width="20" height="6" rx="2" />
            </g>
        </svg>
    ),
};

interface ClaimStaticsCardsProps {
    isLoading?: boolean;
}

const ClaimStaticsCards: React.FC<ClaimStaticsCardsProps> = () => {
    const { address, isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();

    // State for Total Claimed Self Reward (used for refresh logic only)
    const [_userTotalCSRAmount, setUserTotalCSRAmount] = useState<string>('0.00');
    const [_isLoadingTotalCSR, setIsLoadingTotalCSR] = useState<boolean>(false);


    // State for Current Self Reward (used for refresh logic only)
    const [_currentSelfReward, setCurrentSelfReward] = useState<string>('0.00');
    const [_isLoadingCurrentSelfReward, setIsLoadingCurrentSelfReward] = useState<boolean>(false);

    // State for Current Team Reward (used for refresh logic only)
    const [_currentTeamReward, setCurrentTeamReward] = useState<string>('0.00');
    const [_isLoadingCurrentTeamReward, setIsLoadingCurrentTeamReward] = useState<boolean>(false);

    // State for Wasting Reward (used for refresh logic only)
    const [_wastingAmount, setWastingAmount] = useState<string>('0.00');
    const [_isLoadingWastingAmount, setIsLoadingWastingAmount] = useState<boolean>(false);

    // State for selected unit index (0-4)
    const [selectedUnitIndex, setSelectedUnitIndex] = useState<number>(0);

    // State for individual unit values
    const [currentSelfClaimXValue, setCurrentSelfClaimXValue] = useState<string>('0.00');
    const [currentReferralClaimXValue, setCurrentReferralClaimXValue] = useState<string>('0.00');
    const [claimXSelfUnitPowerUpValue, setClaimXSelfUnitPowerUpValue] = useState<string>('0.00');
    const [claimXReferralUnitPowerUpValue, setClaimXReferralUnitPowerUpValue] = useState<string>('0.00');

    // State for loading individual values
    const [isLoadingCurrentSelfClaimX, setIsLoadingCurrentSelfClaimX] = useState<boolean>(true);
    const [isLoadingCurrentReferralClaimX, setIsLoadingCurrentReferralClaimX] = useState<boolean>(true);
    const [isLoadingClaimXSelfUnitPowerUp, setIsLoadingClaimXSelfUnitPowerUp] = useState<boolean>(true);
    const [isLoadingClaimXReferralUnitPowerUp, setIsLoadingClaimXReferralUnitPowerUp] = useState<boolean>(true);

    // State for claim operation
    const [isClaiming, setIsClaiming] = useState<boolean>(false);

    // State for claim history
    const [claimXHistory, setClaimXHistory] = useState<Array<{ amount: string; timestamp: string; formattedTime: string }>>([]);
    const [isLoadingClaimXHistory, setIsLoadingClaimXHistory] = useState(true);

    // Pagination states for claim history
    const [currentClaimHistoryPage, setCurrentClaimHistoryPage] = useState(1);
    const claimHistoryItemsPerPage = 10;




    // Fetch current self claim in unit (sum of indices 0-4)
    useEffect(() => {
        const fetchCurrentSelfClaimInUnit = async () => {
            if (!isConnected || !address || !walletClient) {
                setCurrentSelfReward('0.00');
                setIsLoadingCurrentSelfReward(false);
                return;
            }

            try {
                setIsLoadingCurrentSelfReward(true);
                const provider = new BrowserProvider(walletClient);

                let totalSum = 0;

                // Loop through indices 0-4
                for (let index = 0; index <= 4; index++) {
                    try {
                        const result = await getCurrentSelfClaimInUnit(provider, address, index);
                        if (result.success && result.data) {
                            const value = parseFloat(result.data || '0');
                            totalSum += value;
                            console.log(`Current Self Claim in Unit index ${index}:`, result.data);
                        }
                    } catch (err) {
                        console.error(`Error fetching currentSelfClaimInUnit for index ${index}:`, err);
                    }
                }

                setCurrentSelfReward(totalSum.toFixed(2));
            } catch (error) {
                console.error('Error fetching current self claim in unit:', error);
                setCurrentSelfReward('0.00');
            } finally {
                setIsLoadingCurrentSelfReward(false);
            }
        };

        fetchCurrentSelfClaimInUnit();
    }, [isConnected, address, walletClient]);

    // Fetch current team claim in unit (sum of indices 0-4)
    useEffect(() => {
        const fetchCurrentTeamClaimInUnit = async () => {
            if (!isConnected || !address || !walletClient) {
                setCurrentTeamReward('0.00');
                setIsLoadingCurrentTeamReward(false);
                return;
            }

            try {
                setIsLoadingCurrentTeamReward(true);
                const provider = new BrowserProvider(walletClient);

                let totalSum = 0;

                // Loop through indices 0-4
                for (let index = 0; index <= 4; index++) {
                    try {
                        const result = await getCurrentTeamClaimInUnit(provider, address, index);
                        if (result.success && result.data) {
                            const value = parseFloat(result.data || '0');
                            totalSum += value;
                            console.log(`Current Team Claim in Unit index ${index}:`, result.data);
                        }
                    } catch (err) {
                        console.error(`Error fetching currentTeamClaimInUnit for index ${index}:`, err);
                    }
                }

                setCurrentTeamReward(totalSum.toFixed(2));
            } catch (error) {
                console.error('Error fetching current team claim in unit:', error);
                setCurrentTeamReward('0.00');
            } finally {
                setIsLoadingCurrentTeamReward(false);
            }
        };

        fetchCurrentTeamClaimInUnit();
    }, [isConnected, address, walletClient]);

    // Fetch total vesting claim in unit (sum of indices 0-4)
    useEffect(() => {
        const fetchTotalVestingClaimInUnit = async () => {
            if (!isConnected || !address || !walletClient) {
                setWastingAmount('0.00');
                setIsLoadingWastingAmount(false);
                return;
            }

            try {
                setIsLoadingWastingAmount(true);
                const provider = new BrowserProvider(walletClient);

                let totalSum = 0;

                // Loop through indices 0-4
                for (let index = 0; index <= 4; index++) {
                    try {
                        const result = await getTotalVestingClaimInUnit(provider, address, index);
                        if (result.success && result.data) {
                            const value = parseFloat(result.data || '0');
                            totalSum += value;
                            console.log(`Total Vesting Claim in Unit index ${index}:`, result.data);
                        }
                    } catch (err) {
                        console.error(`Error fetching totalVestingClaimInUnit for index ${index}:`, err);
                    }
                }

                setWastingAmount(totalSum.toFixed(2));
            } catch (error) {
                console.error('Error fetching total vesting claim in unit:', error);
                setWastingAmount('0.00');
            } finally {
                setIsLoadingWastingAmount(false);
            }
        };

        fetchTotalVestingClaimInUnit();
    }, [isConnected, address, walletClient]);

    // Fetch current self claimX for selected unit
    useEffect(() => {
        const fetchCurrentSelfClaimX = async () => {
            if (!isConnected || !address || !walletClient) {
                setCurrentSelfClaimXValue('0.00');
                setIsLoadingCurrentSelfClaimX(false);
                return;
            }

            try {
                setIsLoadingCurrentSelfClaimX(true);
                const provider = new BrowserProvider(walletClient);
                const result = await getCurrentSelfClaimX(provider, address, selectedUnitIndex);
                if (result.success && result.data) {
                    setCurrentSelfClaimXValue(result.data);
                } else {
                    setCurrentSelfClaimXValue('0.00');
                }
            } catch (error) {
                console.error('Error fetching current self claimX:', error);
                setCurrentSelfClaimXValue('0.00');
            } finally {
                setIsLoadingCurrentSelfClaimX(false);
            }
        };

        fetchCurrentSelfClaimX();
    }, [isConnected, address, walletClient, selectedUnitIndex]);

    // Fetch current referral claimX for selected unit
    useEffect(() => {
        const fetchCurrentReferralClaimX = async () => {
            if (!isConnected || !address || !walletClient) {
                setCurrentReferralClaimXValue('0.00');
                setIsLoadingCurrentReferralClaimX(false);
                return;
            }

            try {
                setIsLoadingCurrentReferralClaimX(true);
                const provider = new BrowserProvider(walletClient);
                const result = await getCurrentReferralClaimX(provider, address, selectedUnitIndex);
                if (result.success && result.data) {
                    setCurrentReferralClaimXValue(result.data);
                } else {
                    setCurrentReferralClaimXValue('0.00');
                }
            } catch (error) {
                console.error('Error fetching current referral claimX:', error);
                setCurrentReferralClaimXValue('0.00');
            } finally {
                setIsLoadingCurrentReferralClaimX(false);
            }
        };

        fetchCurrentReferralClaimX();
    }, [isConnected, address, walletClient, selectedUnitIndex]);

    // Fetch claimX self unit power up for selected unit
    useEffect(() => {
        const loadClaimXSelfUnitPowerUp = async () => {
            if (!isConnected || !address || !walletClient) {
                setClaimXSelfUnitPowerUpValue('0.00');
                setIsLoadingClaimXSelfUnitPowerUp(false);
                return;
            }

            try {
                setIsLoadingClaimXSelfUnitPowerUp(true);
                const provider = new BrowserProvider(walletClient);
                const result = await fetchClaimXSelfUnitPowerUp(provider, address, selectedUnitIndex);
                if (result.success && result.data) {
                    setClaimXSelfUnitPowerUpValue(result.data);
                } else {
                    setClaimXSelfUnitPowerUpValue('0.00');
                }
            } catch (error) {
                console.error('Error fetching claimX self unit power up:', error);
                setClaimXSelfUnitPowerUpValue('0.00');
            } finally {
                setIsLoadingClaimXSelfUnitPowerUp(false);
            }
        };

        loadClaimXSelfUnitPowerUp();
    }, [isConnected, address, walletClient, selectedUnitIndex]);

    // Fetch claimX referral unit power up for selected unit
    useEffect(() => {
        const loadClaimXReferralUnitPowerUp = async () => {
            if (!isConnected || !address || !walletClient) {
                setClaimXReferralUnitPowerUpValue('0.00');
                setIsLoadingClaimXReferralUnitPowerUp(false);
                return;
            }

            try {
                setIsLoadingClaimXReferralUnitPowerUp(true);
                const provider = new BrowserProvider(walletClient);
                const result = await fetchClaimXReferralUnitPowerUp(provider, address, selectedUnitIndex);
                if (result.success && result.data) {
                    setClaimXReferralUnitPowerUpValue(result.data);
                } else {
                    setClaimXReferralUnitPowerUpValue('0.00');
                }
            } catch (error) {
                console.error('Error fetching claimX referral unit power up:', error);
                setClaimXReferralUnitPowerUpValue('0.00');
            } finally {
                setIsLoadingClaimXReferralUnitPowerUp(false);
            }
        };

        loadClaimXReferralUnitPowerUp();
    }, [isConnected, address, walletClient, selectedUnitIndex]);

    // Fetch claimX history for selected unit
    useEffect(() => {
        const loadClaimXHistory = async () => {
            if (!isConnected || !address || !walletClient || selectedUnitIndex === null) {
                return;
            }

            setIsLoadingClaimXHistory(true);
            try {
                const provider = new BrowserProvider(walletClient);

                // Get length
                const lengthResult = await getUserClaimXDetailsLength(provider, address, selectedUnitIndex);
                if (!lengthResult.success || !lengthResult.length) {
                    setClaimXHistory([]);
                    setIsLoadingClaimXHistory(false);
                    return;
                }

                const length = lengthResult.length;
                const records: Array<{ amount: string; timestamp: string; formattedTime: string }> = [];

                // Loop through length
                for (let i = 0; i < length; i++) {
                    try {
                        const detailsResult = await userClaimXHistory(provider, address, selectedUnitIndex, i);
                        if (detailsResult.success && detailsResult.amount && detailsResult.timestamp) {
                            const timestamp = parseInt(detailsResult.timestamp);
                            const date = new Date(timestamp * 1000);
                            const formattedTime = date.toLocaleString('en-US', {
                                timeZone: 'UTC',
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false
                            }) + ' UTC';

                            records.push({
                                amount: detailsResult.amount,
                                timestamp: detailsResult.timestamp,
                                formattedTime: formattedTime
                            });
                        }
                    } catch (err) {
                        console.error(`Error fetching claimX history at index ${i}:`, err);
                    }
                }

                // Reverse to show latest first
                records.reverse();
                setClaimXHistory(records);
            } catch (error) {
                console.error('Error loading claimX history:', error);
                setClaimXHistory([]);
            } finally {
                setIsLoadingClaimXHistory(false);
            }
        };

        loadClaimXHistory();
    }, [selectedUnitIndex, isConnected, address, walletClient]);

    // Calculate total claim amount (self + referral)
    const totalClaimAmount = (parseFloat(currentSelfClaimXValue || '0') + parseFloat(currentReferralClaimXValue || '0')).toFixed(4);

    // Loading state for total claim amount (shows loading if either individual value is loading)
    const isLoadingTotalClaimAmount = isLoadingCurrentSelfClaimX || isLoadingCurrentReferralClaimX;

    // Claim function
    const handleClaimX = async () => {
        if (!isConnected || !address || !walletClient) {
            return;
        }

        setIsClaiming(true);
        console.log('Claiming started, button should show "Claiming..."');
        try {
            const provider = new BrowserProvider(walletClient);
            const signer = await provider.getSigner();
            const result = await claimX(signer, address, selectedUnitIndex);
            if (result.success) {
                // Refresh all data
                window.dispatchEvent(new Event('claimCompleted'));
                console.log('ClaimX successful');
            } else {
                console.error('ClaimX failed:', result.error);
            }
        } catch (error) {
            console.error('Error claiming:', error);
        } finally {
            setIsClaiming(false);
            console.log('Claiming finished, button should show normal text');
        }
    };

    // Listen for claim completed event to refresh all cards
    useEffect(() => {
        const handleClaimCompleted = async () => {
            console.log('Claim completed event received, refreshing all claim statics cards...');

            if (!isConnected || !address || !walletClient) {
                return;
            }

            try {
                const provider = new BrowserProvider(walletClient);


                // Total Claimed Team Reward refresh removed - function not available

                // Refresh Current Self Reward
                setIsLoadingCurrentSelfReward(true);
                let currentSelfSum = 0;
                for (let index = 0; index <= 4; index++) {
                    try {
                        const result = await getCurrentSelfClaimInUnit(provider, address, index);
                        if (result.success && result.data) {
                            currentSelfSum += parseFloat(result.data || '0');
                        }
                    } catch (err) {
                        console.error(`Error refreshing currentSelfClaimInUnit for index ${index}:`, err);
                    }
                }
                setCurrentSelfReward(currentSelfSum.toFixed(2));
                setIsLoadingCurrentSelfReward(false);

                // Refresh Current Team Reward
                setIsLoadingCurrentTeamReward(true);
                let currentTeamSum = 0;
                for (let index = 0; index <= 4; index++) {
                    try {
                        const result = await getCurrentTeamClaimInUnit(provider, address, index);
                        if (result.success && result.data) {
                            currentTeamSum += parseFloat(result.data || '0');
                        }
                    } catch (err) {
                        console.error(`Error refreshing currentTeamClaimInUnit for index ${index}:`, err);
                    }
                }
                setCurrentTeamReward(currentTeamSum.toFixed(2));
                setIsLoadingCurrentTeamReward(false);

                // Refresh Wasting Reward
                setIsLoadingWastingAmount(true);
                let wastingSum = 0;
                for (let index = 0; index <= 4; index++) {
                    try {
                        const result = await getTotalVestingClaimInUnit(provider, address, index);
                        if (result.success && result.data) {
                            wastingSum += parseFloat(result.data || '0');
                        }
                    } catch (err) {
                        console.error(`Error refreshing totalVestingClaimInUnit for index ${index}:`, err);
                    }
                }
                setWastingAmount(wastingSum.toFixed(2));
                setIsLoadingWastingAmount(false);

                console.log('All claim statics cards refreshed');
            } catch (error) {
                console.error('Error refreshing claim statics cards:', error);
            }
        };

        window.addEventListener('claimCompleted', handleClaimCompleted);

        return () => {
            window.removeEventListener('claimCompleted', handleClaimCompleted);
        };
    }, [isConnected, address, walletClient]);


    return (
        <section className="staking-overview-section py-5 position-relative">
            <div className="container-fluid">
                {/* Title */}
                <div className="text-center mb-4">
                    <h2 className="text-yellow fw-bold display-5" style={{
                        textShadow: '2px 2px 4px rgba(254, 230, 0, 0.3)',
                        letterSpacing: '2px'
                    }}>
                        ClaimX OVERVIEW
                    </h2>
                </div>


                {/* 5 Unit Selection Buttons */}
                <div className="text-center mb-4">
                    <h3 className="text-yellow fw-bold mb-3" style={{
                        textShadow: '2px 2px 4px rgba(254, 230, 0, 0.3)',
                        letterSpacing: '1px'
                    }}>
                        Select Unit
                    </h3>
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (selectedUnitIndex !== index) {
                                        setSelectedUnitIndex(index);
                                        // Set loading states immediately when unit changes
                                        setIsLoadingCurrentSelfClaimX(true);
                                        setIsLoadingCurrentReferralClaimX(true);
                                        setIsLoadingClaimXSelfUnitPowerUp(true);
                                        setIsLoadingClaimXReferralUnitPowerUp(true);
                                        setIsLoadingClaimXHistory(true);
                                        // Note: isLoadingTotalClaimAmount is computed from the above states
                                    }
                                }}
                                className={`btn ${selectedUnitIndex === index ? 'btn-warning' : 'btn-outline-warning'} px-4 py-2`}
                                style={{
                                    minWidth: '60px',
                                    fontWeight: '600',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {getUnitName(index)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Unit-Specific Information Cards */}
                <div className="row justify-content-center g-3 mb-4">
                    {/* Current Self ClaimX */}
                    <div className="col-12 col-md-6">
                        <div className="z-card z-card--neon h-100 yellow-card">
                            <div className="z-card-ambient" aria-hidden="true" />
                            <div className="z-card-body d-flex align-items-center">
                                <div className="icon-container me-3">
                                    <div className="z-badge">
                                        {ICON['stake']}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="main-value">
                                        <span className="value-text">
                                            {isLoadingCurrentSelfClaimX ? 'Loading...' : `${parseFloat(currentSelfClaimXValue || '0').toFixed(4)} Zylo`}
                                        </span>
                                    </div>
                                    <div className="value-label">Current Self ClaimX</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Current Referral ClaimX */}
                    <div className="col-12 col-md-6">
                        <div className="z-card z-card--neon h-100 yellow-card">
                            <div className="z-card-ambient" aria-hidden="true" />
                            <div className="z-card-body d-flex align-items-center">
                                <div className="icon-container me-3">
                                    <div className="z-badge">
                                        {ICON['wallet']}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="main-value">
                                        <span className="value-text">
                                            {isLoadingCurrentReferralClaimX ? 'Loading...' : `${parseFloat(currentReferralClaimXValue || '0').toFixed(4)} Zylo`}
                                        </span>
                                    </div>
                                    <div className="value-label">Current Referral ClaimX</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Total ClaimX Self Unit Power Up */}
                    <div className="col-12 col-md-6">
                        <div className="z-card z-card--neon h-100 yellow-card">
                            <div className="z-card-ambient" aria-hidden="true" />
                            <div className="z-card-body d-flex align-items-center">
                                <div className="icon-container me-3">
                                    <div className="z-badge">
                                        {ICON['coins']}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="main-value">
                                        <span className="value-text">
                                            {isLoadingClaimXSelfUnitPowerUp ? 'Loading...' : `${parseFloat(claimXSelfUnitPowerUpValue || '0').toFixed(4)} Zylo`}
                                        </span>
                                    </div>
                                    <div className="value-label">Total Self Power Up</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Total ClaimX Referral Unit Power Up */}
                    <div className="col-12 col-md-6">
                        <div className="z-card z-card--neon h-100 yellow-card">
                            <div className="z-card-ambient" aria-hidden="true" />
                            <div className="z-card-body d-flex align-items-center">
                                <div className="icon-container me-3">
                                    <div className="z-badge">
                                        {ICON['level']}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="main-value">
                                        <span className="value-text">
                                            {isLoadingClaimXReferralUnitPowerUp ? 'Loading...' : `${parseFloat(claimXReferralUnitPowerUpValue || '0').toFixed(4)} Zylo`}
                                        </span>
                                    </div>
                                    <div className="value-label">Total Referral Power Up</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Claim Section */}
                <div className="row justify-content-center g-3">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="z-card z-card--neon h-100 yellow-card">
                            <div className="z-card-ambient" aria-hidden="true" />
                            <div className="z-card-body text-center">
                                <div className="icon-container mb-3">
                                    <div className="z-badge">
                                        {ICON['trophy']}
                                    </div>
                                </div>

                                {/* Claim description */}
                                <div className="mb-4">
                                    <h3 className="text-yellow fw-bold mb-3">ClaimX Your Rewards</h3>
                                    <p className="text-white-50">
                                        Your earned rewards from Power Up and Milestone Progress are fully synced and ready for ClaimX.
                                    </p>
                                </div>
                                <div className="value-label mb-4">Total ClaimX Amount</div>
                                <div className="main-value mb-3">
                                    <span className="value-text" style={{ fontSize: '2rem' }}>
                                        {isLoadingTotalClaimAmount ? (
                                            <div className="d-inline-flex align-items-center">
                                                <span className="spinner-border spinner-border-sm text-warning me-2" role="status" aria-hidden="true"></span>
                                                Loading...
                                            </div>
                                        ) : (
                                            `${totalClaimAmount} Zylo`
                                        )}
                                    </span>
                                </div>


                                <button
                                    onClick={handleClaimX}
                                    disabled={isClaiming || isLoadingTotalClaimAmount || parseFloat(totalClaimAmount) === 0}
                                    className="btn btn-warning btn-lg px-5 py-3"
                                    style={{
                                        fontWeight: '700',
                                        borderRadius: '12px',
                                        transition: 'all 0.3s ease',
                                        boxShadow: isClaiming ? '0 0 20px rgba(254, 231, 57, 0.8)' : '0 4px 15px rgba(254, 231, 57, 0.3)',
                                        opacity: isClaiming ? '0.9' : '1'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isClaiming && !isLoadingTotalClaimAmount && parseFloat(totalClaimAmount) > 0) {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(254, 231, 57, 0.5)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = isClaiming ? '0 0 20px rgba(254, 231, 57, 0.8)' : '0 4px 15px rgba(254, 231, 57, 0.3)';
                                    }}
                                >
                                    {isClaiming ? (
                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                            <i className="fas fa-spinner fa-spin" style={{ fontSize: '1rem' }}></i>
                                            Claiming...
                                        </span>
                                    ) : (
                                        `Claim ${getUnitName(selectedUnitIndex)}`
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ClaimX History Table */}
                <div className="row justify-content-center g-3 mt-4">
                    <div className="col-12 col-lg-10">
                        <div style={{
                            background: 'linear-gradient(145deg, #0a0a1a 0%, #0f0f23 50%, #1a1a2e 100%)',
                            borderRadius: '20px',
                            padding: '2rem',
                            border: '2px solid rgba(254, 231, 57, 0.3)',
                            boxShadow: '0 8px 32px rgba(254, 231, 57, 0.2)',
                        }}>
                            <h3 style={{ color: '#FEE739', marginBottom: '1.5rem', textAlign: 'center', fontWeight: '700' }}>
                                ClaimX History - {getUnitName(selectedUnitIndex)}
                            </h3>

                            {isLoadingClaimXHistory ? (
                                <div className="text-center py-4">
                                    <div className="spinner-border text-warning" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="text-white-50 mt-2">Loading claim history...</p>
                                </div>
                            ) : claimXHistory.length === 0 ? (
                                <div className="text-center py-4">
                                    <p className="text-white-50">No claim history found for this unit.</p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-dark table-striped" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                                        <thead style={{ background: 'rgba(254, 231, 57, 0.1)' }}>
                                            <tr>
                                                <th style={{ color: '#FEE739', border: 'none', padding: '1rem', fontWeight: '600', width: '80px' }}>#</th>
                                                <th style={{ color: '#FEE739', border: 'none', padding: '1rem', fontWeight: '600' }}>Amount</th>
                                                <th style={{ color: '#FEE739', border: 'none', padding: '1rem', fontWeight: '600' }}>Date & Time (UTC)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {claimXHistory.slice((currentClaimHistoryPage - 1) * claimHistoryItemsPerPage, currentClaimHistoryPage * claimHistoryItemsPerPage).map((record, index) => (
                                                <tr key={index} style={{ borderBottom: '1px solid rgba(254, 231, 57, 0.1)' }}>
                                                    <td style={{ color: '#FEE739', padding: '1rem', border: 'none', fontWeight: '600' }}>
                                                        {(currentClaimHistoryPage - 1) * claimHistoryItemsPerPage + index + 1}
                                                    </td>
                                                    <td style={{ color: '#fff', padding: '1rem', border: 'none' }}>
                                                        {parseFloat(formatEther(record.amount)).toFixed(4)} ZYLO
                                                    </td>
                                                    <td style={{ color: '#fff', padding: '1rem', border: 'none' }}>
                                                        {record.formattedTime}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Beautiful Pagination Controls for ClaimX History */}
                                    {claimXHistory.length > 0 && (
                                        <div style={{
                                            marginTop: '2.5rem',
                                            padding: '1.5rem',
                                            background: 'linear-gradient(145deg, rgba(10, 10, 26, 0.8) 0%, rgba(15, 15, 35, 0.8) 50%, rgba(26, 26, 46, 0.8) 100%)',
                                            borderRadius: '16px',
                                            border: '1px solid rgba(254, 231, 57, 0.2)',
                                            boxShadow: '0 4px 20px rgba(254, 231, 57, 0.1)',
                                            backdropFilter: 'blur(10px)'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                flexWrap: 'wrap'
                                            }}>
                                                {/* Previous Button */}
                                                <button
                                                    onClick={() => setCurrentClaimHistoryPage(prev => Math.max(1, prev - 1))}
                                                    disabled={currentClaimHistoryPage === 1}
                                                    style={{
                                                        background: currentClaimHistoryPage === 1
                                                            ? 'linear-gradient(145deg, rgba(254, 231, 57, 0.1) 0%, rgba(254, 231, 57, 0.05) 100%)'
                                                            : 'linear-gradient(145deg, rgba(254, 231, 57, 0.15) 0%, rgba(254, 231, 57, 0.08) 100%)',
                                                        border: '2px solid rgba(254, 231, 57, 0.4)',
                                                        color: currentClaimHistoryPage === 1 ? 'rgba(254, 231, 57, 0.4)' : '#FEE739',
                                                        padding: '0.75rem 1.25rem',
                                                        borderRadius: '12px',
                                                        fontWeight: '700',
                                                        cursor: currentClaimHistoryPage === 1 ? 'not-allowed' : 'pointer',
                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        fontSize: '0.9rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        boxShadow: currentClaimHistoryPage === 1 ? 'none' : '0 4px 12px rgba(254, 231, 57, 0.15)',
                                                        minWidth: '100px',
                                                        justifyContent: 'center'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (currentClaimHistoryPage !== 1) {
                                                            e.currentTarget.style.background = 'linear-gradient(145deg, rgba(254, 231, 57, 0.25) 0%, rgba(254, 231, 57, 0.15) 100%)';
                                                            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                                                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(254, 231, 57, 0.25)';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (currentClaimHistoryPage !== 1) {
                                                            e.currentTarget.style.background = 'linear-gradient(145deg, rgba(254, 231, 57, 0.15) 0%, rgba(254, 231, 57, 0.08) 100%)';
                                                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(254, 231, 57, 0.15)';
                                                        }
                                                    }}
                                                >
                                                    <i className="fas fa-chevron-left" style={{ fontSize: '0.8rem' }}></i>
                                                    <span>Previous</span>
                                                </button>

                                                {/* Page Number Buttons */}
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    flexWrap: 'wrap'
                                                }}>
                                                    {Array.from({ length: Math.ceil(claimXHistory.length / claimHistoryItemsPerPage) }, (_, i) => i + 1)
                                                        .filter(page => {
                                                            const totalPages = Math.ceil(claimXHistory.length / claimHistoryItemsPerPage);
                                                            // Show first page, last page, current page, and pages around current
                                                            return page === 1 ||
                                                                page === totalPages ||
                                                                (page >= currentClaimHistoryPage - 1 && page <= currentClaimHistoryPage + 1);
                                                        })
                                                        .map((page, index, filteredPages) => {
                                                            // Add ellipsis if there are gaps
                                                            const prevPage = filteredPages[index - 1];
                                                            const showEllipsis = index > 0 && page - prevPage > 1;

                                                            return (
                                                                <React.Fragment key={page}>
                                                                    {showEllipsis && (
                                                                        <div style={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            width: '40px',
                                                                            height: '40px',
                                                                            color: 'rgba(254, 231, 57, 0.6)',
                                                                            fontSize: '1.2rem',
                                                                            fontWeight: 'bold',
                                                                            userSelect: 'none'
                                                                        }}>
                                                                            ⋯
                                                                        </div>
                                                                    )}
                                                                    <button
                                                                        onClick={() => setCurrentClaimHistoryPage(page)}
                                                                        disabled={currentClaimHistoryPage === page}
                                                                        style={{
                                                                            background: currentClaimHistoryPage === page
                                                                                ? 'linear-gradient(145deg, #FEE739 0%, rgba(254, 231, 57, 0.8) 100%)'
                                                                                : 'linear-gradient(145deg, rgba(254, 231, 57, 0.1) 0%, rgba(254, 231, 57, 0.05) 100%)',
                                                                            border: currentClaimHistoryPage === page
                                                                                ? '2px solid #FEE739'
                                                                                : '2px solid rgba(254, 231, 57, 0.3)',
                                                                            color: currentClaimHistoryPage === page ? '#0a0a1a' : '#FEE739',
                                                                            width: '40px',
                                                                            height: '40px',
                                                                            borderRadius: '10px',
                                                                            fontWeight: '700',
                                                                            cursor: 'pointer',
                                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                            fontSize: '0.9rem',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            boxShadow: currentClaimHistoryPage === page
                                                                                ? '0 4px 16px rgba(254, 231, 57, 0.4)'
                                                                                : '0 2px 8px rgba(254, 231, 57, 0.1)',
                                                                        }}
                                                                        onMouseEnter={(e) => {
                                                                            if (currentClaimHistoryPage !== page) {
                                                                                e.currentTarget.style.background = 'linear-gradient(145deg, rgba(254, 231, 57, 0.2) 0%, rgba(254, 231, 57, 0.1) 100%)';
                                                                                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                                                                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(254, 231, 57, 0.2)';
                                                                            }
                                                                        }}
                                                                        onMouseLeave={(e) => {
                                                                            if (currentClaimHistoryPage !== page) {
                                                                                e.currentTarget.style.background = 'linear-gradient(145deg, rgba(254, 231, 57, 0.1) 0%, rgba(254, 231, 57, 0.05) 100%)';
                                                                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                                                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(254, 231, 57, 0.1)';
                                                                            }
                                                                        }}
                                                                    >
                                                                        {page}
                                                                    </button>
                                                                </React.Fragment>
                                                            );
                                                        })}
                                                </div>

                                                {/* Next Button */}
                                                <button
                                                    onClick={() => setCurrentClaimHistoryPage(prev => Math.min(Math.ceil(claimXHistory.length / claimHistoryItemsPerPage), prev + 1))}
                                                    disabled={currentClaimHistoryPage === Math.ceil(claimXHistory.length / claimHistoryItemsPerPage)}
                                                    style={{
                                                        background: currentClaimHistoryPage === Math.ceil(claimXHistory.length / claimHistoryItemsPerPage)
                                                            ? 'linear-gradient(145deg, rgba(254, 231, 57, 0.1) 0%, rgba(254, 231, 57, 0.05) 100%)'
                                                            : 'linear-gradient(145deg, rgba(254, 231, 57, 0.15) 0%, rgba(254, 231, 57, 0.08) 100%)',
                                                        border: '2px solid rgba(254, 231, 57, 0.4)',
                                                        color: currentClaimHistoryPage === Math.ceil(claimXHistory.length / claimHistoryItemsPerPage) ? 'rgba(254, 231, 57, 0.4)' : '#FEE739',
                                                        padding: '0.75rem 1.25rem',
                                                        borderRadius: '12px',
                                                        fontWeight: '700',
                                                        cursor: currentClaimHistoryPage === Math.ceil(claimXHistory.length / claimHistoryItemsPerPage) ? 'not-allowed' : 'pointer',
                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        fontSize: '0.9rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        boxShadow: currentClaimHistoryPage === Math.ceil(claimXHistory.length / claimHistoryItemsPerPage) ? 'none' : '0 4px 12px rgba(254, 231, 57, 0.15)',
                                                        minWidth: '100px',
                                                        justifyContent: 'center'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (currentClaimHistoryPage !== Math.ceil(claimXHistory.length / claimHistoryItemsPerPage)) {
                                                            e.currentTarget.style.background = 'linear-gradient(145deg, rgba(254, 231, 57, 0.25) 0%, rgba(254, 231, 57, 0.15) 100%)';
                                                            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                                                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(254, 231, 57, 0.25)';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (currentClaimHistoryPage !== Math.ceil(claimXHistory.length / claimHistoryItemsPerPage)) {
                                                            e.currentTarget.style.background = 'linear-gradient(145deg, rgba(254, 231, 57, 0.15) 0%, rgba(254, 231, 57, 0.08) 100%)';
                                                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(254, 231, 57, 0.15)';
                                                        }
                                                    }}
                                                >
                                                    <span>Next</span>
                                                    <i className="fas fa-chevron-right" style={{ fontSize: '0.8rem' }}></i>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClaimStaticsCards;

