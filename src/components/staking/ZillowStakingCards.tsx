'use client';

import React from 'react';
import './ZillowStake.css';

type Stat = { label: string; value: string; sub?: string; icon?: React.ReactNode };

interface ZillowStakingCardsProps {
  index2Value: string;
  index3Value: string;
  index4Value: string;
  isLoading?: boolean;
}

const ZapIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="#09141a" opacity=".9" />
  </svg>
);

const GaugeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="#09141a" opacity=".14" />
    <path d="M12 12l6-3" stroke="#09141a" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const UsersIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="9" r="4" fill="#09141a" opacity=".9" />
    <path d="M4 20c.7-3.5 3.8-6 8-6s7.3 2.5 8 6" stroke="#09141a" strokeWidth="2" opacity=".9" />
  </svg>
);

export default function ZillowStakingCards({ index2Value, index3Value, index4Value, isLoading = false }: ZillowStakingCardsProps) {
  const cards: Stat[] = [
    { label: 'Register Time', value: isLoading ? 'Loading...' : `${index2Value}`, icon: <ZapIcon /> },
    { label: 'Total Instant Incept', value: isLoading ? 'Loading...' : `${index3Value}`, icon: <GaugeIcon /> },
    { label: 'Total Force of Incept', value: isLoading ? 'Loading...' : `${index4Value}`, icon: <UsersIcon /> },
  ];
  return (
    <section className="stats-strip">
      <div className="container-fluid">
        <div className="row g-3">
          {cards.map(({ label, value, sub, icon }) => (
            <div className="col-12" key={label}>
              <div className="stat-card">
                <div className="stat-ambient" aria-hidden="true" />
                <div className="stat-inner d-flex align-items-center justify-content-between">
                  <div className="stat-copy">
                    <div className="stat-value">{value}</div>
                    <div className="stat-label">{label}</div>
                    {sub && <div className="stat-sub">{sub}</div>}
                  </div>
                  <div className="stat-icon">{icon}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
