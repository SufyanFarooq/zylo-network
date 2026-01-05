'use client';

import React, { JSX, useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { getTotalSelfClaimInClaimX, getTotalTeamClaimInClaimX, getCurrentSelfClaimInUnit, getCurrentTeamClaimInUnit, getTotalVestingClaimInUnit } from '@/blockchain/instances/ZyloPowerUp';
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
    const cardStyle: 'neon' | 'soft' | 'split' = 'neon';
    const { address, isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();

    // State for Total Claimed Self Reward
    const [userTotalCSRAmount, setUserTotalCSRAmount] = useState<string>('0.00');
    const [isLoadingTotalCSR, setIsLoadingTotalCSR] = useState<boolean>(false);

    // State for Total Claimed Team Reward
    const [userTotalCTRAmount, setUserTotalCTRAmount] = useState<string>('0.00');
    const [isLoadingTotalCTR, setIsLoadingTotalCTR] = useState<boolean>(false);

    // State for Current Self Reward
    const [currentSelfReward, setCurrentSelfReward] = useState<string>('0.00');
    const [isLoadingCurrentSelfReward, setIsLoadingCurrentSelfReward] = useState<boolean>(false);

    // State for Current Team Reward
    const [currentTeamReward, setCurrentTeamReward] = useState<string>('0.00');
    const [isLoadingCurrentTeamReward, setIsLoadingCurrentTeamReward] = useState<boolean>(false);

    // State for Wasting Reward
    const [wastingAmount, setWastingAmount] = useState<string>('0.00');
    const [isLoadingWastingAmount, setIsLoadingWastingAmount] = useState<boolean>(false);

    // Fetch total self claim in ClaimX (sum of indices 0-4)
    useEffect(() => {
        const fetchTotalSelfClaimInClaimX = async () => {
            if (!isConnected || !address || !walletClient) {
                setUserTotalCSRAmount('0.00');
                setIsLoadingTotalCSR(false);
                return;
            }

            try {
                setIsLoadingTotalCSR(true);
                const provider = new BrowserProvider(walletClient);

                let totalSum = 0;

                // Loop through indices 0-4
                for (let index = 0; index <= 4; index++) {
                    try {
                        const result = await getTotalSelfClaimInClaimX(provider, address, index);
                        if (result.success && result.data) {
                            const value = parseFloat(result.data || '0');
                            totalSum += value;
                            console.log(`Total Self Claim in ClaimX index ${index}:`, result.data);
                        }
                    } catch (err) {
                        console.error(`Error fetching totalSelfClaimInClaimX for index ${index}:`, err);
                    }
                }

                setUserTotalCSRAmount(totalSum.toFixed(2));
            } catch (error) {
                console.error('Error fetching total self claim in ClaimX:', error);
                setUserTotalCSRAmount('0.00');
            } finally {
                setIsLoadingTotalCSR(false);
            }
        };

        fetchTotalSelfClaimInClaimX();
    }, [isConnected, address, walletClient]);

    // Fetch total team claim in ClaimX (sum of indices 0-4)
    useEffect(() => {
        const fetchTotalTeamClaimInClaimX = async () => {
            if (!isConnected || !address || !walletClient) {
                setUserTotalCTRAmount('0.00');
                setIsLoadingTotalCTR(false);
                return;
            }

            try {
                setIsLoadingTotalCTR(true);
                const provider = new BrowserProvider(walletClient);

                let totalSum = 0;

                // Loop through indices 0-4
                for (let index = 0; index <= 4; index++) {
                    try {
                        const result = await getTotalTeamClaimInClaimX(provider, address, index);
                        if (result.success && result.data) {
                            const value = parseFloat(result.data || '0');
                            totalSum += value;
                            console.log(`Total Team Claim in ClaimX index ${index}:`, result.data);
                        }
                    } catch (err) {
                        console.error(`Error fetching totalTeamClaimInClaimX for index ${index}:`, err);
                    }
                }

                setUserTotalCTRAmount(totalSum.toFixed(2));
            } catch (error) {
                console.error('Error fetching total team claim in ClaimX:', error);
                setUserTotalCTRAmount('0.00');
            } finally {
                setIsLoadingTotalCTR(false);
            }
        };

        fetchTotalTeamClaimInClaimX();
    }, [isConnected, address, walletClient]);

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

    // Listen for claim completed event to refresh all cards
    useEffect(() => {
        const handleClaimCompleted = async () => {
            console.log('Claim completed event received, refreshing all claim statics cards...');

            if (!isConnected || !address || !walletClient) {
                return;
            }

            try {
                const provider = new BrowserProvider(walletClient);

                // Refresh Total Claimed Self Reward
                setIsLoadingTotalCSR(true);
                let totalSelfSum = 0;
                for (let index = 0; index <= 4; index++) {
                    try {
                        const result = await getTotalSelfClaimInClaimX(provider, address, index);
                        if (result.success && result.data) {
                            totalSelfSum += parseFloat(result.data || '0');
                        }
                    } catch (err) {
                        console.error(`Error refreshing totalSelfClaimInClaimX for index ${index}:`, err);
                    }
                }
                setUserTotalCSRAmount(totalSelfSum.toFixed(2));
                setIsLoadingTotalCSR(false);

                // Refresh Total Claimed Team Reward
                setIsLoadingTotalCTR(true);
                let totalTeamSum = 0;
                for (let index = 0; index <= 4; index++) {
                    try {
                        const result = await getTotalTeamClaimInClaimX(provider, address, index);
                        if (result.success && result.data) {
                            totalTeamSum += parseFloat(result.data || '0');
                        }
                    } catch (err) {
                        console.error(`Error refreshing totalTeamClaimInClaimX for index ${index}:`, err);
                    }
                }
                setUserTotalCTRAmount(totalTeamSum.toFixed(2));
                setIsLoadingTotalCTR(false);

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

                {/* 10 Cards - 2 per row */}
                <div className="row justify-content-center g-4 mb-4">
                    {/* Total Claimed Self Reward Card */}
                    <div className="col-12 col-md-6 col-lg-5">
                        <div className={`z-card z-card--${cardStyle} h-100 yellow-card`}>
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
                                            {isLoadingTotalCSR ? 'Loading...' : `${userTotalCSRAmount} Token`}
                                        </span>
                                    </div>
                                    <div className="value-label">Total ClaimX Self Reward</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Total Claimed Team Reward Card */}
                    <div className="col-12 col-md-6 col-lg-5">
                        <div className={`z-card z-card--${cardStyle} h-100 yellow-card`}>
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
                                            {isLoadingTotalCTR ? 'Loading...' : `${userTotalCTRAmount} Token`}
                                        </span>
                                    </div>
                                    <div className="value-label">Total ClaimX Team Reward</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Current Self Reward Card */}
                    <div className="col-12 col-md-6 col-lg-5">
                        <div className={`z-card z-card--${cardStyle} h-100 yellow-card`}>
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
                                            {isLoadingCurrentSelfReward ? 'Loading...' : `${currentSelfReward} Token`}
                                        </span>
                                    </div>
                                    <div className="value-label">Current ClaimX Self Reward</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Current Self Reward Card */}
                    <div className="col-12 col-md-6 col-lg-5">
                        <div className={`z-card z-card--${cardStyle} h-100 yellow-card`}>
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
                                            {isLoadingCurrentTeamReward ? 'Loading...' : `${currentTeamReward} Token`}
                                        </span>
                                    </div>
                                    <div className="value-label">Current ClaimX Team Reward</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Current Wasting Card */}
                    <div className="col-12 col-md-12 col-lg-10">
                        <div className={`z-card z-card--${cardStyle} h-100 yellow-card`}>
                            <div className="z-card-ambient" aria-hidden="true" />
                            <div className="z-card-body d-flex align-items-center">
                                <div className="icon-container me-3">
                                    <div className="z-badge">
                                        {ICON['wasteMini']}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="main-value">
                                        <span className="value-text">
                                            {isLoadingWastingAmount ? 'Loading...' : `${wastingAmount} Token`}
                                        </span>
                                    </div>
                                    <div className="value-label">Wasting ClaimX Reward</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClaimStaticsCards;

