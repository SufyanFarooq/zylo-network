'use client';

import React from 'react';
import './StakingStatsCards.css';

interface StakingStatsCardsProps {
    totalStaked?: string;
    totalRewards?: string;
    calculateSelfReward?: string;
    userTotalWSRAmount?: string;
    finalReward?: string;
    isLoading?: boolean;
}

const StakingStatsCards: React.FC<StakingStatsCardsProps> = ({
    totalStaked: _totalStaked = '0.0000',
    totalRewards: _totalRewards = '0.0000',
    calculateSelfReward: _calculateSelfReward = '0.0000',
    userTotalWSRAmount = '0.0000',
    finalReward = '0.0000',
    isLoading = false
}) => {
    // Format large numbers (only convert to millions when crossing 10 lakh)
    const formatNumber = (value: string) => {
        const num = parseFloat(value);
        if (num >= 1000000) {
            return (num / 1000000).toFixed(2) + 'M';
        } else {
            return num.toFixed(2);
        }
    };
    return (
        <div className="staking-stats-cards">
            <div className="row g-4 mb-5">
                {/* Total Staked Card */}
                <div className="col-12 col-md-6">
                    <div className="stats-card staked-card">
                        <div className="card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="card-content">
                            <div className="card-title">Total Self Reward Quick Outgo amount</div>
                            <div className="card-value">
                                {isLoading ? (
                                    <div className="loading-skeleton"></div>
                                ) : (
                                    <>
                                        {formatNumber(userTotalWSRAmount)}
                                        <span className="token-symbol">ZYLO</span>
                                    </>
                                )}
                            </div>
                            {/* <div className="card-subtitle">Your total WSR amount</div> */}
                        </div>
                    </div>
                </div>

                {/* Final Reward Card */}
                <div className="col-12 col-md-6">
                    <div className="stats-card rewards-card">
                        <div className="card-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="card-content">
                            <div className="card-title">Current Self Reward</div>
                            <div className="card-value">
                                {isLoading ? (
                                    <div className="loading-skeleton"></div>
                                ) : (
                                    <>
                                        {formatNumber(finalReward)}
                                        <span className="token-symbol">ZYLO</span>
                                    </>
                                )}
                            </div>
                            {/* <div className="card-subtitle">Your final calculated reward</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StakingStatsCards;
