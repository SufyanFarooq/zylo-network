'use client';

import React, { JSX } from 'react';
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

    // Static values - all set to 0.00
    const userTotalCSRAmount = '0.00';
    const userTotalCTRAmount = '0.00';
    const currentSelfReward = '0.00';
    const currentTeamReward = '0.00';
    const wastingAmount = '0.00';


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
                                        <span className="value-text">{userTotalCSRAmount} Token</span>
                                    </div>
                                    <div className="value-label">Total Claimed Self Reward</div>
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
                                        <span className="value-text">{userTotalCTRAmount} Token</span>
                                    </div>
                                    <div className="value-label">Total Claimed Team Reward</div>
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
                                        <span className="value-text">{currentSelfReward} Token</span>
                                    </div>
                                    <div className="value-label">Current Self Reward</div>
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
                                        <span className="value-text">{currentTeamReward} Token</span>
                                    </div>
                                    <div className="value-label">Current Team Reward</div>
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
                                        <span className="value-text">{wastingAmount} Token</span>
                                    </div>
                                    <div className="value-label">Wasting Reward</div>
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

