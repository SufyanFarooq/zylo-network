'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ZillowStake from '@/components/staking/ZillowStake';
import ApplyForZylo from '@/components/staking/ApplyForZylo';
import PowerUpStakingSection from '@/components/staking/PowerUpStakingSection';
import UnitsRewardsSection from '@/components/staking/UnitsRewardsSection';
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

// Separate component for content that uses searchParams
const StakingContent: React.FC<{
  currentSection: 'zones' | 'powerup' | 'units';
  selectedUnit: number | null;
  setCurrentSection: (section: 'zones' | 'powerup' | 'units') => void;
  setSelectedUnit: (unit: number | null) => void;
  updateURL: (section: 'zones' | 'powerup' | 'units', unit: number | null) => void;
  claimedSelfReward: string;
  claimedTeamReward: string;
  currentSelfReward: string;
  currentTeamReward: string;
  isLoadingRewards: boolean;
}> = ({
  currentSection,
  selectedUnit,
  setCurrentSection,
  setSelectedUnit,
  updateURL,
  claimedSelfReward,
  claimedTeamReward,
  currentSelfReward,
  currentTeamReward,
  isLoadingRewards,
}) => {
  return (
    <>
      {/* Initial State: ApplyForZylo + Zone Cards */}
      {currentSection === 'zones' ? (
        <>
          <ApplyForZylo />
          <div className="zillow-stake-section">
            <ZillowStake 
              onShowZoneCardsChange={(show) => {
                if (show) {
                  setCurrentSection('zones');
                  setSelectedUnit(null);
                  updateURL('zones', null);
                }
              }}
              onPowerUpClick={(unitIndex) => {
                setSelectedUnit(unitIndex);
                setCurrentSection('powerup');
                updateURL('powerup', unitIndex);
              }}
              onUnitsClick={(unitIndex) => {
                setSelectedUnit(unitIndex);
                setCurrentSection('units');
                updateURL('units', unitIndex);
              }}
              showRewardsSection={false}
              externalShowZoneCards={true}
            />
          </div>
        </>
      ) : currentSection === 'powerup' ? (
        /* Power UP Section - Staking Form + Selected Unit's Power Ups */
        <PowerUpStakingSection
          selectedUnit={selectedUnit}
          onBackToZones={() => {
            setCurrentSection('zones');
            setSelectedUnit(null);
            updateURL('zones', null);
          }}
        />
      ) : (
        /* Units Section - Reward Cards + Selected Unit's Power Ups Only */
        <UnitsRewardsSection
          selectedUnit={selectedUnit}
          onBackToZones={() => {
            setCurrentSection('zones');
            setSelectedUnit(null);
            updateURL('zones', null);
          }}
          claimedSelfReward={claimedSelfReward}
          claimedTeamReward={claimedTeamReward}
          currentSelfReward={currentSelfReward}
          currentTeamReward={currentTeamReward}
          isLoadingRewards={isLoadingRewards}
        />
      )}
    </>
  );
};

const StakingPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, setUserStakes] = useState<StakeRecord[]>([]);
  const [, setIsLoadingStakes] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Get section and unit from URL params
  const urlSection = searchParams.get('section') as 'zones' | 'powerup' | 'units' | null;
  const urlUnit = searchParams.get('unit');
  
  const [selectedUnit, setSelectedUnit] = useState<number | null>(
    urlUnit ? parseInt(urlUnit, 10) : null
  );
  const [currentSection, setCurrentSection] = useState<'zones' | 'powerup' | 'units'>(
    urlSection || 'zones'
  );
  
  // Update URL when section or unit changes
  const updateURL = (section: 'zones' | 'powerup' | 'units', unit: number | null) => {
    const params = new URLSearchParams();
    if (section !== 'zones') {
      params.set('section', section);
    }
    if (unit !== null) {
      params.set('unit', unit.toString());
    }
    const queryString = params.toString();
    const newUrl = queryString ? `/staking?${queryString}` : '/staking';
    router.push(newUrl, { scroll: false });
  };
  
  // Sync state with URL on mount
  useEffect(() => {
    if (urlSection) {
      setCurrentSection(urlSection);
    }
    if (urlUnit) {
      setSelectedUnit(parseInt(urlUnit, 10));
    }
  }, [urlSection, urlUnit]);
  
  // Reward states (for UnitsRewardsSection)
  const [claimedSelfReward] = useState('0.00');
  const [claimedTeamReward] = useState('0.00');
  const [currentSelfReward] = useState('0.00');
  const [currentTeamReward] = useState('0.00');
  const [isLoadingRewards] = useState(false);

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
          <Suspense fallback={<div className="text-center py-5"><div className="spinner-border text-warning" role="status" /></div>}>
            <StakingContent 
              currentSection={currentSection}
              selectedUnit={selectedUnit}
              setCurrentSection={setCurrentSection}
              setSelectedUnit={setSelectedUnit}
              updateURL={updateURL}
              claimedSelfReward={claimedSelfReward}
              claimedTeamReward={claimedTeamReward}
              currentSelfReward={currentSelfReward}
              currentTeamReward={currentTeamReward}
              isLoadingRewards={isLoadingRewards}
            />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default StakingPage;
