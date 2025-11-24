'use client';

import React, { useMemo, useState, useEffect } from 'react';
import TeamRewardsTable from '@/components/common/TeamRewardsTable';
// import { useRouter } from 'next/navigation';
import { useLevelUnlockStatus } from '@/hooks/useLevelUnlockStatus';
import { getLevelTeamRewards, getTeamReward } from '@/blockchain/instances/ZyloPowerUp';
import { getInviterLevelUnLockTime } from '@/blockchain/instances/ZyloPowerUp';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import './level.css';

type LevelDetailsProps = {
  id?: number;
};


const MAX_LEVEL = 10;

const LevelDetails: React.FC<LevelDetailsProps> = ({ id }) => {
  // Mocked stats and rows; replace with real data wiring when available
  // const router = useRouter();
  const levelId = Math.min(Math.max(id ?? 1, 1), MAX_LEVEL);
  // const prevId = Math.max(1, levelId - 1);
  // const nextId = Math.min(MAX_LEVEL, levelId + 1);

  // Get wallet connection
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  // Get level unlock status
  const { unlockStatus, isLoading: isLoadingUnlock, isLevelUnlocked, error: unlockError } = useLevelUnlockStatus(levelId);

  // Team rewards state
  const [teamRewards, setTeamRewards] = useState<Array<{
    address: string;
    totalSelfDepositedAmount: string;
    teamReward: string;
  }>>([]);
  const [isLoadingTeamRewards, setIsLoadingTeamRewards] = useState(false);
  const [teamRewardsError, setTeamRewardsError] = useState<string | null>(null);

  // Unlock time state
  const [unlockTime, setUnlockTime] = useState<string | null>(null);
  const [isLoadingUnlockTime, setIsLoadingUnlockTime] = useState(false);
  const [unlockTimeError, setUnlockTimeError] = useState<string | null>(null);

  // Team reward state
  const [teamReward, setTeamReward] = useState<string>('0');
  const [isLoadingTeamReward, setIsLoadingTeamReward] = useState(false);
  const [teamRewardError, setTeamRewardError] = useState<string | null>(null);

  // Debug logging
  console.log(`LevelDetails - Level ${levelId}:`, {
    unlockStatus,
    isLoadingUnlock,
    isUnlocked: isLevelUnlocked(levelId),
    unlockError
  });

  // Fetch team rewards data
  useEffect(() => {
    const fetchTeamRewards = async () => {
      if (!isConnected || !address || !walletClient) {
        setTeamRewards([]);
        return;
      }

      setIsLoadingTeamRewards(true);
      setTeamRewardsError(null);

      try {
        const provider = new BrowserProvider(walletClient);
        const result = await getLevelTeamRewards(provider, address, levelId);

        if (result.success && result.data) {
          setTeamRewards(result.data.teamRewards || []);
          console.log(`Team rewards for level ${levelId}:`, result.data);
        } else {
          setTeamRewardsError(result.error || 'Failed to fetch team rewards');
          setTeamRewards([]);
        }
      } catch (error) {
        console.error('Error fetching team rewards:', error);
        setTeamRewardsError(error instanceof Error ? error.message : 'Unknown error');
        setTeamRewards([]);
      } finally {
        setIsLoadingTeamRewards(false);
      }
    };

    fetchTeamRewards();
  }, [isConnected, address, walletClient, levelId]);

  // Fetch unlock time data
  useEffect(() => {
    const fetchUnlockTime = async () => {
      if (!isConnected || !address || !walletClient) {
        setUnlockTime(null);
        return;
      }

      setIsLoadingUnlockTime(true);
      setUnlockTimeError(null);

      try {
        const provider = new BrowserProvider(walletClient);
        const result = await getInviterLevelUnLockTime(provider, address, levelId);

        if (result.success && result.data) {
          const timestamp = result.data.timestamp;
          console.log(`Raw timestamp from contract:`, timestamp);
          console.log(`Timestamp type:`, typeof timestamp);

          // Check if timestamp is 0 (not unlocked yet)
          const timestampNum = Number(timestamp);
          if (timestampNum === 0 || !timestamp) {
            setUnlockTime('Not unlocked yet');
          } else {
            const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
            const formattedTime = date.toLocaleString();
            setUnlockTime(formattedTime);
            console.log(`Unlock time for level ${levelId}:`, formattedTime);
            console.log(`Date object:`, date);
          }
        } else {
          // Handle specific error cases
          if (result.error && result.error.includes("not implemented")) {
            setUnlockTime('Function not available');
            setUnlockTimeError(null); // Don't show error for missing function
          } else {
            setUnlockTimeError(result.error || 'Failed to fetch unlock time');
            setUnlockTime(null);
          }
        }
      } catch (error) {
        console.error('Error fetching unlock time:', error);
        setUnlockTimeError(error instanceof Error ? error.message : 'Unknown error');
        setUnlockTime(null);
      } finally {
        setIsLoadingUnlockTime(false);
      }
    };

    fetchUnlockTime();
  }, [isConnected, address, walletClient, levelId]);

  // Fetch team reward data
  useEffect(() => {
    const fetchTeamReward = async () => {
      if (!isConnected || !address || !walletClient) {
        setTeamReward('0');
        return;
      }

      setIsLoadingTeamReward(true);
      setTeamRewardError(null);

      try {
        const provider = new BrowserProvider(walletClient);
        const result = await getTeamReward(provider, address, levelId, 0);

        if (result.success && result.data) {
          setTeamReward(result.data.teamReward);
          console.log(`Team reward for address ${address}:`, result.data.teamReward);
        } else {
          setTeamRewardError(result.error || 'Failed to fetch team reward');
          setTeamReward('0');
        }
      } catch (error) {
        console.error('Error fetching team reward:', error);
        setTeamRewardError(error instanceof Error ? error.message : 'Unknown error');
        setTeamReward('0');
      } finally {
        setIsLoadingTeamReward(false);
      }
    };

    fetchTeamReward();
  }, [isConnected, address, walletClient, levelId]);

  const topStats = useMemo(
    () => [
      {
        label: 'Vortex Zone Status',
        value: isLevelUnlocked(levelId) ? 'Unlocked' : 'Locked',
        variant: isLevelUnlocked(levelId) ? 'yellow' as const : 'red' as const
      },
      {
        label: 'Unlock Time',
        value: isLoadingUnlockTime ? 'Loading...' : unlockTime || 'Not available',
        variant: 'green' as const
      },
      {
        label: 'Team Reward',
        value: isLoadingTeamReward ? 'Loading...' : `${parseFloat(teamReward).toFixed(4)} ZYLO`,
        variant: 'yellow' as const
      },
    ],
    [levelId, isLevelUnlocked, isLoadingUnlockTime, unlockTime, isLoadingTeamReward, teamReward]
  );


  return (
    <section className="">
      <div className="container position-relative">
        <div className="level-ambient" />
        {/* Header area with nav arrows */}
        <div className="row align-items-center p-3">
          <div className="col-lg-12 mb-3 mb-lg-0">
            <div className="d-flex align-items-start justify-content-between">
              <div>
                <h1
                  className="text-yellow fw-bold display-6 mb-2"
                  style={{ textShadow: '2px 2px 4px rgba(254, 230, 0, 0.25)', letterSpacing: '1px' }}
                >
                  Vortex Zone {levelId} Details
                </h1>
                <p className="text-white mb-0 d-lg-block d-none">
                  Explore your Vortex Zone stats and members contributing to your rewards.
                </p>
                {isLoadingUnlock && (
                  <div className="mt-2">
                    <small className="text-yellow">Checking Vortex Zone unlock status...</small>
                  </div>
                )}
                {!isLoadingUnlock && (
                  <div className="mt-2">
                    {unlockError ? (
                      <small className="text-red">
                        Error checking level status: {unlockError}
                      </small>
                    ) : (
                      <small className={`${isLevelUnlocked(levelId) ? 'text-green' : 'text-red'}`}>
                        Vortex Zone {levelId} is {isLevelUnlocked(levelId) ? 'Unlocked' : 'Locked'}
                      </small>
                    )}
                  </div>
                )}
                {unlockTimeError && (
                  <div className="mt-2">
                    <small className="text-red">Unlock Time Error: {unlockTimeError}</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 boxes - styled like staking page */}
        <div className="row g-3 mb-5">
          {topStats.map((s, idx) => (
            <div className="col-12 col-md-6 col-lg-4" key={idx}>
              <div className={`level-stat ${s.variant}`}>
                <div className="inner">
                  <div className="value">{s.value}</div>
                  <div className="label">{s.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Rewards Table section */}
        <div className="mb-1 d-flex justify-content-between align-items-end flex-wrap gap-2">
          <div>
            <h2 className="fw-bold mb-0 text-yellow" style={{ fontSize: '1.25rem' }}>Team Members & Rewards</h2>
          </div>
        </div>

        {isLoadingTeamRewards && (
          <div className="text-center py-4">
            <small className="text-yellow">Loading team rewards...</small>
          </div>
        )}

        {teamRewardsError && (
          <div className="text-center py-4">
            <small className="text-red">Error: {teamRewardsError}</small>
          </div>
        )}

        {teamRewardError && (
          <div className="text-center py-2">
            <small className="text-red">Team Reward Error: {teamRewardError}</small>
          </div>
        )}

        <TeamRewardsTable
          teamRewards={teamRewards}
          onRewardSelect={(reward) => {
            console.log('Selected reward:', reward);
            // Handle reward selection if needed
          }}
          showActions={true}
          className="level-details-table"
          itemsPerPage={10}
        />
      </div>
    </section>
  );
};

export default LevelDetails;
