'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { formatEther } from 'ethers';
import {
  getTotalNetworkMembers,
  getTotalDepositInNetwork,
  getTotalActiveDepositInNetwork
} from '../../blockchain/instances/ZyloPowerUp';
import '../../app/home.css';

const NetworkStats: React.FC = () => {
  const [networkData, setNetworkData] = useState({
    totalMembers: 0,
    totalDeposit: 0,
    totalActiveDeposit: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Create a provider for BSC testnet without wallet connection
        const { JsonRpcProvider } = await import('ethers');
        const provider = new JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');

        const [members, deposit, activeDeposit] = await Promise.all([
          getTotalNetworkMembers(provider),
          getTotalDepositInNetwork(provider),
          getTotalActiveDepositInNetwork(provider)
        ]);

        setNetworkData({
          totalMembers: Number(members.data || 0),
          totalDeposit: Number(formatEther(deposit.data || 0)),
          totalActiveDeposit: Number(formatEther(activeDeposit.data || 0))
        });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isMounted]);

  const stats = [
    {
      icon: '/assets/networkicons/members icon.svg',
      value: isLoading ? 'Loading...' : networkData.totalMembers.toLocaleString(),
      label: 'All members in network',
      color: 'green'
    },
    {
      icon: '/assets/networkicons/total staked.svg',
      value: isLoading ? 'Loading...' : networkData.totalDeposit.toLocaleString('en-US', { maximumFractionDigits: 2 }),
      label: 'Total Power Up in network',
      color: 'yellow'
    },
    {
      icon: '/assets/networkicons/active stake.svg',
      value: isLoading ? 'Loading...' : networkData.totalActiveDeposit.toLocaleString('en-US', { maximumFractionDigits: 2 }),
      label: 'Total active Power Up in network',
      color: 'teal'
    },
    {
      icon: '/assets/networkicons/withdrawal.svg',
      value: '0',
      label: 'Total Quick Outgo in network',
      color: 'yellow'
    }
  ];

  return (
    <section className="network-stats">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="text-white fw-bold">Vortex Stream Stats</h2>
        </div>

        <div className="row g-4">
          {stats.map((stat, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className={`stats-card-network ${stat.color}`}>
                <div className="stats-icon mb-3">
                  <Image
                    src={stat.icon}
                    alt={stat.label}
                    width={45}
                    height={45}
                    loading="lazy"
                    style={{
                      filter: 'brightness(0) invert(1)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>
                <div
                  className="stats-value"
                  style={{
                    color: stat.color === 'yellow' ? '#FCE400' : '#00d4a3'
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="stats-label"
                  style={{
                    color: stat.color === 'yellow' ? 'rgba(252, 228, 0, 0.9)' : 'rgba(0, 212, 163, 0.9)'
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NetworkStats; 