

'use client';

import React, { JSX } from 'react';
import './WithdrawHero.css';

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

const CARDS: Card[] = [
    { title: 'Power Up Rewards', icon: 'stake' },
    { title: 'Vortex Zone Reward', icon: 'level' },
    { title: 'Wasting Reward', icon: 'waste' },
    { title: 'Total Quick Outgo', icon: 'wallet' },
    { title: 'Current Power Up Rewards', icon: 'coins' },
    { title: 'Current Referral Rewards', icon: 'bars' },
    { title: 'Current Wasting Rewards', icon: 'wasteMini' },
    { title: 'Current Rewards', icon: 'trophy' },
];

export default function AccountStatistics() {
    const withdrawal = 35;
    const remaining = 65;

    const cardStyle: 'neon' | 'soft' | 'split' = 'neon'; // ← pick your favorite

    return (
        <section className="stats-section py-5 position-relative">
            <div className="container-fluid">

                {/* Title */}
                <div className="text-center mb-4">
                    {/* <h2 className="stats-title fw-black">ACCOUNT STATISTICS</h2> */}
                    <h2 className="text-yellow fw-bold display-5" style={{
                        textShadow: '2px 2px 4px rgba(254, 230, 0, 0.3)',
                        letterSpacing: '2px'
                    }}>
                        Vortex Stream Stats
                    </h2>
                </div>

                {/* Progress row */}
                <div className="row g-4 align-items-end mb-4">
                    <div className="col-md-6">
                        <div className="d-flex justify-content-between mb-2">
                            <span className="stats-label">Quick Outgo</span>
                            <span className="stats-percent">{withdrawal}%</span>
                        </div>
                        <div className="z-progress">
                            <div className="z-progress-bar" style={{ width: `${withdrawal}%` }} />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="d-flex justify-content-between mb-2">
                            <span className="stats-label">Remaining</span>
                            <span className="stats-percent">{remaining}%</span>
                        </div>
                        <div className="z-progress">
                            <div className="z-progress-bar" style={{ width: `${remaining}%` }} />
                        </div>
                    </div>
                </div>

                {/* Cards */}
                {/* <div className="row g-4">
          {CARDS.map(({ title, icon }) => (
            <div key={title} className="col-12 col-md-6 col-lg-3">
              <div className="z-card h-100">
                <div className="z-card-ambient" aria-hidden="true" />
                <div className="z-card-body text-center">
                  <div className="z-icon-wrap">{ICON[icon]}</div>
                  <h6 className="z-card-title">{title}</h6>
                </div>
              </div>
            </div>
          ))}
        </div> */}

                <div className="row g-4">
                    {CARDS.map(({ title, icon }) => (
                        <div key={title} className="col-12 col-md-6 col-lg-3">
                            <div className={`z-card z-card--${cardStyle} h-100`}>
                                <div className="z-card-ambient" aria-hidden="true" />
                                <div className="z-card-body text-center">
                                    <div className="z-badge-wrap">
                                        <span className="z-badge">
                                            {ICON[icon]}
                                        </span>
                                        <i className="z-badge-halo" />
                                    </div>
                                    <h6 className="z-card-title">{title}</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
