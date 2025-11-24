'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ZillowStake from '@/components/staking/ZillowStake';
import ApplyForZylo from '@/components/staking/ApplyForZylo';
import { getAllUserStakes } from '@/blockchain/instances/ZyloPowerUp';
import '../globals.css';
import '@/components/common/StakingLevelsTable.css';

interface StakeRecord {
  id: number;
  level: string;
  requiredStake: string;
  reward: string;
  stakeTime?: string;
  status: 'active' | 'inactive' | 'locked';
}

interface BlockchainStake {
  timestamp: string;
  amount: string;
  reward: string;
  duration: string;
}

const StakingPage: React.FC = () => {
  const [, setUserStakes] = useState<StakeRecord[]>([]);
  const [, setIsLoadingStakes] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Wagmi hooks
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  // Ensure client-side rendering to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);


  // Fetch user stakes from blockchain
  useEffect(() => {
    if (!isClient) return; // Only run on client side

    const fetchUserStakes = async () => {
      if (isConnected && address && walletClient) {
        setIsLoadingStakes(true);
        try {
          const provider = new BrowserProvider(walletClient);
          const result = await getAllUserStakes(provider, address);

          if (result.success) {
            console.log('Raw contract data:', result.data);

            if (result.data && result.data.length > 0) {
              // Convert blockchain data to table format
              const stakesForTable = result.data.map((stake: BlockchainStake, index: number) => {
                // Convert timestamp to readable date
                const timestamp = parseFloat(stake.timestamp);
                const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
                // Format as MM/DD/YYYY, H:MM:SS AM/PM
                const formattedDate = date.toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true
                });

                // Convert wei to tokens (assuming 18 decimals)
                const stakeAmount = (parseFloat(stake.amount) / 1e18).toFixed(4);
                const rewardAmount = (parseFloat(stake.reward) / 1e18).toFixed(4);

                return {
                  id: index + 1,
                  level: `Power Up #${index + 1}`,
                  requiredStake: stakeAmount,
                  reward: rewardAmount,
                  stakeTime: formattedDate,
                  status: 'active' as const
                };
              });

              setUserStakes(stakesForTable);
              console.log('Formatted user stakes:', stakesForTable);
            } else {
              // No stakes found
              setUserStakes([]);
              console.log('No stakes found for user');
            }
          } else {
            console.error('Error fetching user stakes:', result.error);
            setUserStakes([]);
          }
        } catch (error) {
          console.error('Error fetching user stakes:', error);
          setUserStakes([]);
        } finally {
          setIsLoadingStakes(false);
        }
      } else {
        // Clear stakes when not connected
        setUserStakes([]);
        console.log('Wallet not connected, clearing stakes');
      }
    };

    fetchUserStakes();
  }, [isClient, isConnected, address, walletClient]);

  return (
    <>
      <Header />

      <main className="min-vh-100" style={{ paddingTop: '100px', background: 'var(--dark-bg)' }}>
        <div className="container py-5">

          {/* Participate IDO Stack Section */}
          <ApplyForZylo />
          <div className="zillow-stake-section">
            <ZillowStake />
          </div>

          {/* Apply for IGO Section */}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default StakingPage; 
