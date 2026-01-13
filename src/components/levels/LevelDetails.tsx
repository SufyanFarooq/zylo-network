'use client';

import React, { useState, useEffect } from 'react';
import InceptNodeDetailsTable from '@/components/levels/InceptNodeDetailsTable';
// import { useRouter } from 'next/navigation';
import { useLevelUnlockStatus } from '@/hooks/useLevelUnlockStatus';
import { getTeamReward } from '@/blockchain/instances/ZyloPowerUp';
import { getInviterLevelUnLockTime } from '@/blockchain/instances/ZyloPowerUp';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import './level.css';

type LevelDetailsProps = {
  id?: number;
  onBack?: () => void;
};


const MAX_LEVEL = 10;

const LevelDetails: React.FC<LevelDetailsProps> = ({ id, onBack }) => {
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


  // Unlock time state
  const [_unlockTime, setUnlockTime] = useState<string | null>(null);
  const [_isLoadingUnlockTime, setIsLoadingUnlockTime] = useState(false);
  const [unlockTimeError, setUnlockTimeError] = useState<string | null>(null);

  // Team reward state
  const [_teamReward, setTeamReward] = useState<string>('0');
  const [_isLoadingTeamReward, setIsLoadingTeamReward] = useState(false);
  const [_teamRewardError, setTeamRewardError] = useState<string | null>(null);

  // Incept node details state (unused - kept for potential future use)
  const [_showInceptNodeDetails, _setShowInceptNodeDetails] = useState<boolean>(false);

  // Debug logging
  console.log(`LevelDetails - Level ${levelId}:`, {
    unlockStatus,
    isLoadingUnlock,
    isUnlocked: isLevelUnlocked(levelId),
    unlockError
  });


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



  return (
    <>
      {/* Back Navigation Button */}
      <div className="d-flex justify-content-start mb-4" style={{ padding: '1rem 2rem' }}>
        <button
          onClick={onBack || (() => window.history.back())}
          className="btn btn-outline-warning d-flex align-items-center gap-2"
          style={{
            background: 'linear-gradient(145deg, rgba(254, 231, 57, 0.15) 0%, rgba(254, 231, 57, 0.08) 100%)',
            border: '2px solid rgba(254, 231, 57, 0.5)',
            color: '#FEE739',
            borderRadius: '12px',
            padding: '0.75rem 1.25rem',
            fontWeight: '700',
            fontSize: '0.95rem',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 2px 8px rgba(254, 231, 57, 0.1)',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(145deg, rgba(254, 231, 57, 0.25) 0%, rgba(254, 231, 57, 0.15) 100%)';
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(254, 231, 57, 0.3)';
            e.currentTarget.style.borderColor = '#FEE739';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(145deg, rgba(254, 231, 57, 0.15) 0%, rgba(254, 231, 57, 0.08) 100%)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(254, 231, 57, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(254, 231, 57, 0.5)';
          }}
        >
          <span style={{ fontSize: '1rem', marginRight: '0.5rem', fontWeight: 'bold' }}>←</span>
          <span>Back</span>
        </button>
      </div>

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

          {/* Incept Node Details Table - Always Visible */}
          <div style={{ width: '100%', marginTop: '2rem', marginBottom: '2rem' }} key={`incept-table-${levelId}`}>
            <InceptNodeDetailsTable
              key={`incept-table-component-${levelId}`}
              levelIndex={levelId - 1}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LevelDetails;
