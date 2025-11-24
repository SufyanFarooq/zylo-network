'use client';

import React, { JSX, useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { getUserRewardDetails } from '@/blockchain/instances/ZyloPowerUp';
import './WithdrawStaticsCards.css';

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

// const CARDS: Card[] = [
//     { title: 'Total Self Stake', icon: 'stake' },
//     { title: 'Total Withdraw Self Reward', icon: 'coins' },
//     { title: 'Total Withdraw Team Reward', icon: 'bars' },
//     { title: 'Total Active Stake', icon: 'wallet' },
//     { title: 'Current Self Reward', icon: 'level' },
//     { title: 'Current Team Reward', icon: 'trophy' },
//     { title: 'New Card 1', icon: 'waste' },
//     { title: 'New Card 2', icon: 'wasteMini' },
//     { title: 'New Card 3', icon: 'stake' },
//     { title: 'New Card 4', icon: 'coins' },
//     { title: 'Current Rewards', icon: 'coins' },
// ];

interface WithdrawStaticsCardsProps {
    isLoading?: boolean;
}

const WithdrawStaticsCards: React.FC<WithdrawStaticsCardsProps> = ({
    isLoading = false
}) => {
    const cardStyle: 'neon' | 'soft' | 'split' = 'neon';

    // State for user data - only getUserRewardDetails values
    const [userTotalWithdrawAmount, setUserTotalWithdrawAmount] = useState<string>('0.00');
    const [userTotalCurrentWAmount, setUserTotalCurrentWAmount] = useState<string>('0.00');
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
    const [dataError, setDataError] = useState<string>('');

    // Wagmi hooks
    const { address, isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();

    // Fetch user data from community contract and reward network
    useEffect(() => {
        const fetchUserData = async () => {
            if (!isConnected || !address || !walletClient) {
                console.log('Wallet not connected or address not available');
                return;
            }

            setIsLoadingData(true);
            setDataError('');

            try {
                // Convert wallet client to ethers provider
                const provider = new BrowserProvider(walletClient);

                // Get user reward details from reward network contract
                const rewardResult: unknown = await getUserRewardDetails(provider, address);
                console.log('User reward details from reward network:', rewardResult);

                const reward = rewardResult as { success?: boolean; data?: { userTotalWithdrawAmount?: unknown; userTotalCurrentWAmount?: unknown } };
                if (reward.success && reward.data) {
                    const { userTotalWithdrawAmount: wsrAmount, userTotalCurrentWAmount: userTotalCurrentWAmountValue } = reward.data;

                    // Set values even if they are "0" (fallback from blockchain)
                    setUserTotalWithdrawAmount(parseFloat(String(wsrAmount || "0")).toFixed(2));
                    setUserTotalCurrentWAmount(parseFloat(String(userTotalCurrentWAmountValue || "0")).toFixed(2));

                    console.log('Reward values - userTotalWithdrawAmount:', wsrAmount, 'userTotalCurrentWAmount:', userTotalCurrentWAmountValue);
                } else {
                    const reward = rewardResult as { error?: string };
                    console.error('Error fetching reward details:', reward.error);
                    setDataError('Failed to fetch reward data');
                }

            } catch (error: unknown) {
                console.error('Error in fetchUserData:', error);
                // Only set error if it's a critical error, not contract call failures
                const err = error as { message?: string };
                if (err.message && err.message.includes('Provider is required')) {
                    setDataError('Please connect your wallet to view data');
                } else {
                    console.warn('Non-critical error in fetchUserData, continuing with available data');
                }
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchUserData();
    }, [isConnected, address, walletClient]);


    // Listen for withdraw completed event to refresh data
    useEffect(() => {
        const handleWithdrawCompleted = async () => {
            console.log('🔄 Withdraw completed event received, refreshing withdraw data...');

            if (isConnected && address && walletClient) {
                setIsLoadingData(true);
                setDataError('');

                try {
                    const provider = new BrowserProvider(walletClient);

                    // Refresh reward details after withdraw
                    console.log('📊 Refreshing withdraw statistics after withdraw completion...');

                    const rewardResult = await getUserRewardDetails(provider, address);
                    if (rewardResult.success && rewardResult.data) {
                        const data = rewardResult.data;
                        // Set values even if they are "0" (fallback from blockchain)
                        setUserTotalWithdrawAmount(parseFloat(String(data.userTotalWithdrawAmount || "0")).toFixed(2));
                        setUserTotalCurrentWAmount(parseFloat(String(data.userTotalCurrentWAmount || "0")).toFixed(2));
                        console.log('✅ Reward details refreshed after withdraw completion');
                    }

                    console.log('Withdraw statistics refreshed successfully after withdraw completion!');

                } catch (error) {
                    console.error('Error refreshing withdraw statistics after withdraw:', error);
                } finally {
                    setIsLoadingData(false);
                }
            }
        };

        window.addEventListener('withdrawCompleted', handleWithdrawCompleted);

        return () => {
            window.removeEventListener('withdrawCompleted', handleWithdrawCompleted);
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
                        Quick Outgo OVERVIEW
                    </h2>
                </div>

                {/* 2 Cards - getUserRewardDetails data */}
                <div className="row justify-content-center g-4 mb-4">
                    {/* Total Withdraw Self Reward Card */}
                    <div className="col-12 col-md-6 col-lg-5">
                        <div className={`z-card z-card--${cardStyle} h-100 yellow-card ${isLoading || isLoadingData ? 'loading' : ''}`}>
                            <div className="z-card-ambient" aria-hidden="true" />
                            <div className="z-card-body d-flex align-items-center">
                                <div className="icon-container me-3">
                                    <div className="z-badge">
                                        {ICON['coins']}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="main-value">
                                        {isLoadingData ? (
                                            <div className="spinner-border spinner-border-sm text-dark" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : dataError ? (
                                            <span className="text-danger">Error</span>
                                        ) : (
                                            <span className="value-text">{userTotalWithdrawAmount} ZYLO</span>
                                        )}
                                    </div>
                                    <div className="value-label">Total Quick Outgo Reward</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Current Self Reward Card */}
                    <div className="col-12 col-md-6 col-lg-5">
                        <div className={`z-card z-card--${cardStyle} h-100 yellow-card ${isLoading || isLoadingData ? 'loading' : ''}`}>
                            <div className="z-card-ambient" aria-hidden="true" />
                            <div className="z-card-body d-flex align-items-center">
                                <div className="icon-container me-3">
                                    <div className="z-badge">
                                        {ICON['level']}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="main-value">
                                        {isLoadingData ? (
                                            <div className="spinner-border spinner-border-sm text-dark" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : dataError ? (
                                            <span className="text-danger">Error</span>
                                        ) : (
                                            <span className="value-text">{userTotalCurrentWAmount} ZYLO</span>
                                        )}
                                    </div>
                                    <div className="value-label">Current Quick Outgo Reward</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WithdrawStaticsCards;
