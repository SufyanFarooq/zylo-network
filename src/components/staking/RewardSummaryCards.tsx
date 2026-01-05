import React, { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { claimSelfPowerUnit, claimTeamPowerUnit, getTotalSelfClaimInUnit, getCurrentPowerUpReward, getTotalTeamClaimInUnit, getCurrentReferralPowerUp } from '@/blockchain/instances/ZyloPowerUp';

/* Coin icon */
const CoinSVG = () => (
  <svg className="coin-svg" viewBox="0 0 128 128" aria-hidden="true">
    <defs>
      {/* face + rim */}
      <linearGradient id="coinFace" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFF176" />
        <stop offset="55%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#FEE600" />
      </linearGradient>
      <linearGradient id="coinRim" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFE97A" />
        <stop offset="100%" stopColor="#FDBA12" />
      </linearGradient>

      {/* soft inner bevel on the Z */}
      <filter id="zShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1.4" stdDeviation="1.2" floodColor="rgba(0,0,0,.25)" />
      </filter>

      {/* soft rim highlight */}
      <radialGradient id="rimGlow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="rgba(255,255,255,.35)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
    </defs>

    {/* rim + face */}
    <circle cx="64" cy="64" r="56" fill="url(#coinRim)" />
    <circle cx="64" cy="64" r="48" fill="url(#coinFace)" />

    {/* subtle rim highlight */}
    <circle cx="56" cy="52" r="40" fill="url(#rimGlow)" opacity=".35" />

    {/* ==== "Z" glyph ==== */}
    <g filter="url(#zShadow)" transform="translate(34 40)">
      {/* top bar */}
      <rect x="0" y="0" width="60" height="12" rx="6" fill="#FFF59D" />
      {/* diagonal bar (top-right to bottom-left) */}
      <rect x="10" y="18" width="48" height="12" rx="6"
        transform="rotate(-28 34 24)" fill="#F6C400" />
      {/* bottom bar */}
      <rect x="0" y="40" width="60" height="12" rx="6" fill="#FFF59D" />
      {/* small inner sheen on the diagonal */}
      <rect x="10" y="18" width="48" height="6" rx="3"
        transform="rotate(-28 34 24)" fill="rgba(255,255,255,.35)" />
    </g>
  </svg>
);

interface RewardSummaryCardsProps {
  claimedSelfReward: string;
  claimedTeamReward: string;
  currentSelfReward: string;
  currentTeamReward: string;
  isLoadingRewards: boolean;
  onClaimRewards?: () => void;
  selectedUnit?: number | null;
  powerUpCards?: Array<{ index: number, [key: string]: unknown }>; // Array of power up cards with their indices
}

const RewardSummaryCards: React.FC<RewardSummaryCardsProps> = ({
  claimedSelfReward: _claimedSelfReward,
  claimedTeamReward: _claimedTeamReward,
  currentSelfReward,
  currentTeamReward: _currentTeamReward,
  isLoadingRewards,
  onClaimRewards,
  selectedUnit = null,
  powerUpCards = [],
}) => {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [claimingIndex, setClaimingIndex] = useState<number | null>(null);
  const [claimMessage, setClaimMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isClaimingTeamReward, setIsClaimingTeamReward] = useState<boolean>(false);
  const [totalSelfClaimValue, setTotalSelfClaimValue] = useState<string>('0.00');
  const [isLoadingTotalSelfClaim, setIsLoadingTotalSelfClaim] = useState<boolean>(false);
  const [currentPowerUpRewardValue, setCurrentPowerUpRewardValue] = useState<string>('0.00');
  const [isLoadingCurrentPowerUpReward, setIsLoadingCurrentPowerUpReward] = useState<boolean>(false);
  const [totalTeamClaimValue, setTotalTeamClaimValue] = useState<string>('0.00');
  const [isLoadingTotalTeamClaim, setIsLoadingTotalTeamClaim] = useState<boolean>(false);
  const [currentReferralPowerUpValue, setCurrentReferralPowerUpValue] = useState<string>('0.00');
  const [isLoadingCurrentReferralPowerUp, setIsLoadingCurrentReferralPowerUp] = useState<boolean>(false);

  // Unit mapping: Spark=0, Flicker Roar=1, AI Override=3, Zylo Apex=4, Zylo Universe=5
  const getUnitIndex = (unit: number | null): number => {
    if (unit === null) return 0;
    // Map unit indices: 0→0, 1→1, 2→3, 3→4, 4→5
    if (unit === 0) return 0; // Spark
    if (unit === 1) return 1; // Flicker Roar
    if (unit === 2) return 3; // AI Override
    if (unit === 3) return 4; // Zylo Apex
    if (unit === 4) return 5; // Zylo Universe
    return unit;
  };

  // Fetch total self claim in unit
  useEffect(() => {
    const fetchTotalSelfClaim = async () => {
      if (!address || !walletClient || selectedUnit === null) {
        setTotalSelfClaimValue('0.00');
        setIsLoadingTotalSelfClaim(false);
        return;
      }

      try {
        setIsLoadingTotalSelfClaim(true);
        const provider = new BrowserProvider(walletClient);
        const unitIndex = getUnitIndex(selectedUnit);

        console.log('Fetching total self claim:', { address, unitIndex, selectedUnit });
        const result = await getTotalSelfClaimInUnit(provider, address, unitIndex);

        console.log('Total self claim result:', result);
        if (result.success && result.data) {
          setTotalSelfClaimValue(result.data || '0.00');
        } else {
          console.error('Failed to fetch total self claim:', result.error);
          setTotalSelfClaimValue('0.00');
        }
      } catch (error) {
        console.error('Error fetching total self claim:', error);
        setTotalSelfClaimValue('0.00');
      } finally {
        setIsLoadingTotalSelfClaim(false);
      }
    };

    fetchTotalSelfClaim();
  }, [address, walletClient, selectedUnit]);

  // Fetch current power up reward
  useEffect(() => {
    const fetchCurrentPowerUpReward = async () => {
      if (!address || !walletClient || selectedUnit === null) {
        setCurrentPowerUpRewardValue('0.00');
        setIsLoadingCurrentPowerUpReward(false);
        return;
      }

      try {
        setIsLoadingCurrentPowerUpReward(true);
        const provider = new BrowserProvider(walletClient);
        const unitIndex = getUnitIndex(selectedUnit);

        console.log('Fetching current power up reward:', { address, unitIndex, selectedUnit });
        const result = await getCurrentPowerUpReward(provider, address, unitIndex);

        console.log('Current power up reward result:', result);
        if (result.success && result.data) {
          setCurrentPowerUpRewardValue(result.data || '0.00');
        } else {
          console.error('Failed to fetch current power up reward:', result.error);
          setCurrentPowerUpRewardValue('0.00');
        }
      } catch (error) {
        console.error('Error fetching current power up reward:', error);
        setCurrentPowerUpRewardValue('0.00');
      } finally {
        setIsLoadingCurrentPowerUpReward(false);
      }
    };

    fetchCurrentPowerUpReward();
  }, [address, walletClient, selectedUnit]);

  // Fetch total team claim in unit
  useEffect(() => {
    const fetchTotalTeamClaim = async () => {
      if (!address || !walletClient || selectedUnit === null) {
        setTotalTeamClaimValue('0.00');
        setIsLoadingTotalTeamClaim(false);
        return;
      }

      try {
        setIsLoadingTotalTeamClaim(true);
        const provider = new BrowserProvider(walletClient);
        const unitIndex = getUnitIndex(selectedUnit);

        console.log('Fetching total team claim:', { address, unitIndex, selectedUnit });
        const result = await getTotalTeamClaimInUnit(provider, address, unitIndex);

        console.log('Total team claim result:', result);
        if (result.success && result.data) {
          setTotalTeamClaimValue(result.data || '0.00');
        } else {
          console.error('Failed to fetch total team claim:', result.error);
          setTotalTeamClaimValue('0.00');
        }
      } catch (error) {
        console.error('Error fetching total team claim:', error);
        setTotalTeamClaimValue('0.00');
      } finally {
        setIsLoadingTotalTeamClaim(false);
      }
    };

    fetchTotalTeamClaim();
  }, [address, walletClient, selectedUnit]);

  // Fetch current referral power up
  useEffect(() => {
    const fetchCurrentReferralPowerUp = async () => {
      if (!address || !walletClient || selectedUnit === null) {
        setCurrentReferralPowerUpValue('0.00');
        setIsLoadingCurrentReferralPowerUp(false);
        return;
      }

      try {
        setIsLoadingCurrentReferralPowerUp(true);
        const provider = new BrowserProvider(walletClient);
        const unitIndex = getUnitIndex(selectedUnit);

        console.log('Fetching current referral power up:', { address, unitIndex, selectedUnit });
        const result = await getCurrentReferralPowerUp(provider, address, unitIndex);

        console.log('Current referral power up result:', result);
        if (result.success && result.data) {
          setCurrentReferralPowerUpValue(result.data || '0.00');
        } else {
          console.error('Failed to fetch current referral power up:', result.error);
          setCurrentReferralPowerUpValue('0.00');
        }
      } catch (error) {
        console.error('Error fetching current referral power up:', error);
        setCurrentReferralPowerUpValue('0.00');
      } finally {
        setIsLoadingCurrentReferralPowerUp(false);
      }
    };

    fetchCurrentReferralPowerUp();
  }, [address, walletClient, selectedUnit]);

  // Handle claim team power unit
  const handleClaimTeamPowerUnit = async () => {
    if (!isConnected || !address || !walletClient || selectedUnit === null) {
      setClaimMessage({ type: 'error', text: 'Please connect your wallet' });
      setTimeout(() => setClaimMessage(null), 3000);
      return;
    }

    setIsClaimingTeamReward(true);
    setClaimMessage(null);

    let shouldShowErrorTimeout = false;

    try {
      const unitIndex = getUnitIndex(selectedUnit);
      const result = await claimTeamPowerUnit(walletClient, address, unitIndex);

      if (result.success) {
        setClaimMessage({ type: 'success', text: 'Team rewards claimed successfully!' });
        // Call parent's refresh function if available
        if (onClaimRewards) {
          setTimeout(() => {
            onClaimRewards();
          }, 1000);
        }
      } else {
        // Check if error is due to user rejection - handle silently
        const errorMessage = result.error || '';
        const isUserRejection =
          errorMessage.toLowerCase().includes('rejected') ||
          errorMessage.toLowerCase().includes('denied') ||
          errorMessage.toLowerCase().includes('user rejected') ||
          errorMessage.toLowerCase().includes('user denied');

        if (isUserRejection) {
          // Silently handle user rejection - don't show error message
          setClaimMessage(null);
        } else {
          setClaimMessage({ type: 'error', text: errorMessage || 'Failed to claim team rewards' });
          shouldShowErrorTimeout = true;
        }
      }
    } catch (error: unknown) {
      // Check if error is due to user rejection
      const errorObj = error as { message?: string; code?: string | number; info?: { error?: { code?: number } } };
      const errorMessage = errorObj?.message || '';
      const errorCode = errorObj?.code || '';
      const errorInfo = errorObj?.info || {};

      const isUserRejection =
        errorMessage.toLowerCase().includes('user rejected') ||
        errorMessage.toLowerCase().includes('user denied') ||
        errorMessage.toLowerCase().includes('rejected') ||
        errorCode === 'ACTION_REJECTED' ||
        errorCode === 4001 ||
        (errorInfo.error && errorInfo.error.code === 4001);

      if (isUserRejection) {
        // Silently handle user rejection - don't show error message
        setClaimMessage(null);
      } else {
        setClaimMessage({ type: 'error', text: errorMessage || 'Unknown error occurred' });
        shouldShowErrorTimeout = true;
      }
    } finally {
      setIsClaimingTeamReward(false);
      // Only set timeout for error messages, not for silent rejections
      if (shouldShowErrorTimeout) {
        setTimeout(() => setClaimMessage(null), 5000);
      }
    }
  };

  const handleClaimPowerUp = async (cardIndex: number) => {
    if (!isConnected || !address || !walletClient || selectedUnit === null) {
      setClaimMessage({ type: 'error', text: 'Please connect your wallet' });
      setTimeout(() => setClaimMessage(null), 3000);
      return;
    }

    setClaimingIndex(cardIndex);
    setClaimMessage(null);

    let shouldShowErrorTimeout = false;

    try {
      const unitIndex = getUnitIndex(selectedUnit);
      const result = await claimSelfPowerUnit(walletClient, address, unitIndex, cardIndex);

      if (result.success) {
        setClaimMessage({ type: 'success', text: 'Rewards claimed successfully!' });
        // Call parent's refresh function if available
        if (onClaimRewards) {
          setTimeout(() => {
            onClaimRewards();
          }, 1000);
        }
      } else {
        // Check if error is due to user rejection - handle silently
        const errorMessage = result.error || '';
        const isUserRejection =
          errorMessage.toLowerCase().includes('rejected') ||
          errorMessage.toLowerCase().includes('denied') ||
          errorMessage.toLowerCase().includes('user rejected') ||
          errorMessage.toLowerCase().includes('user denied');

        if (isUserRejection) {
          // Silently handle user rejection - don't show error message
          setClaimMessage(null);
        } else {
          setClaimMessage({ type: 'error', text: errorMessage || 'Failed to claim rewards' });
          shouldShowErrorTimeout = true;
        }
      }
    } catch (error: unknown) {
      // Check if error is due to user rejection
      const errorObj = error as { message?: string; code?: string | number; info?: { error?: { code?: number } } };
      const errorMessage = errorObj?.message || '';
      const errorCode = errorObj?.code || '';
      const errorInfo = errorObj?.info || {};

      const isUserRejection =
        errorMessage.toLowerCase().includes('user rejected') ||
        errorMessage.toLowerCase().includes('user denied') ||
        errorMessage.toLowerCase().includes('rejected') ||
        errorCode === 'ACTION_REJECTED' ||
        errorCode === 4001 ||
        (errorInfo.error && errorInfo.error.code === 4001);

      if (isUserRejection) {
        // Silently handle user rejection - don't show error message
        setClaimMessage(null);
      } else {
        setClaimMessage({ type: 'error', text: errorMessage || 'Unknown error occurred' });
        shouldShowErrorTimeout = true;
      }
    } finally {
      setClaimingIndex(null);
      // Only set timeout for error messages, not for silent rejections
      if (shouldShowErrorTimeout) {
        setTimeout(() => setClaimMessage(null), 5000);
      }
    }
  };

  // Safety guard: This component should ONLY be rendered when showRewardsSection === true
  // If somehow this component is called incorrectly, return null
  // (This is a defensive check - the parent component should handle the condition)

  // If powerUpCards are provided and unit is selected, show individual power up cards
  // Otherwise show the aggregate reward cards
  const showIndividualCards = selectedUnit !== null && powerUpCards.length > 0;

  return (
    <>
      {claimMessage && (
        <div className={`alert alert-${claimMessage.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`} role="alert" style={{ marginBottom: '1rem' }}>
          {claimMessage.text}
          <button type="button" className="btn-close" onClick={() => setClaimMessage(null)} aria-label="Close"></button>
        </div>
      )}

      {showIndividualCards ? (
        /* Individual Power Up Cards - One per power up in the selected unit */
        <div className="row g-4">
          {powerUpCards.map((card, idx) => (
            <div key={idx} className="col-lg-6 col-md-6">
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                background: '#03353d',
                borderRadius: '16px',
                border: '1px solid rgba(0, 214, 163, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}>
                <div className="stat-inner d-flex flex-column" style={{ padding: '1.5rem' }}>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="stat-copy" style={{ flex: 1 }}>
                      <div className="stat-value" style={{ fontSize: '1.5rem', fontWeight: '700', color: '#00d6a3', marginBottom: '0.5rem' }}>
                        {isLoadingRewards ? 'Loading...' : `${parseFloat(currentSelfReward || '0').toFixed(2)}`}
                        <span style={{ fontSize: '1rem', marginLeft: '0.5rem', color: '#00d6a3', opacity: 0.8 }}>ZYLO</span>
                      </div>
                      <div className="stat-label" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Power Up #{card.index + 1}
                      </div>
                    </div>
                    <div className="stat-icon">
                      <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'rgba(0, 214, 163, 0.15)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <CoinSVG />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn w-100"
                    onClick={() => handleClaimPowerUp(card.index)}
                    disabled={claimingIndex === card.index || !isConnected}
                    style={{
                      background: claimingIndex === card.index ? 'rgba(0, 214, 163, 0.3)' : 'linear-gradient(135deg, #00d6a3 0%, #00b894 100%)',
                      color: '#000',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '0.75rem',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      cursor: claimingIndex === card.index ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      opacity: claimingIndex === card.index ? 0.6 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (claimingIndex !== card.index) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 214, 163, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {claimingIndex === card.index ? 'Claiming...' : 'Claim'}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Zylo Universe Card (Unit 5) - Always show as 5th card */}
          {selectedUnit === 4 && (
            <div className="col-lg-6 col-md-6">
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                background: '#03353d',
                borderRadius: '16px',
                border: '1px solid rgba(254, 231, 57, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}>
                <div className="stat-inner d-flex flex-column" style={{ padding: '1.5rem' }}>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="stat-copy" style={{ flex: 1 }}>
                      <div className="stat-value" style={{ fontSize: '1.5rem', fontWeight: '700', color: '#FEE739', marginBottom: '0.5rem' }}>
                        {isLoadingRewards ? 'Loading...' : `${parseFloat(currentSelfReward || '0').toFixed(2)}`}
                        <span style={{ fontSize: '1rem', marginLeft: '0.5rem', color: '#FEE739', opacity: 0.8 }}>ZYLO</span>
                      </div>
                      <div className="stat-label" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Zylo Universe
                      </div>
                    </div>
                    <div className="stat-icon">
                      <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'rgba(254, 231, 57, 0.15)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <CoinSVG />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn w-100"
                    onClick={() => handleClaimPowerUp(powerUpCards.length)}
                    disabled={claimingIndex === powerUpCards.length || !isConnected}
                    style={{
                      background: claimingIndex === powerUpCards.length ? 'rgba(254, 231, 57, 0.3)' : 'linear-gradient(135deg, #FEE739 0%, #FDD835 100%)',
                      color: '#000',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '0.75rem',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      cursor: claimingIndex === powerUpCards.length ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      opacity: claimingIndex === powerUpCards.length ? 0.6 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (claimingIndex !== powerUpCards.length) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(254, 231, 57, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {claimingIndex === powerUpCards.length ? 'Claiming...' : 'Claim'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Original Aggregate Reward Cards - 2x2 Grid */
        <div className="row g-4">
          {/* Card 1: Total Self Power Up Reward */}
          <div className="col-lg-6 col-md-6">
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              background: '#03353d',
              borderRadius: '16px',
              border: '1px solid rgba(254, 231, 57, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}>
              <div className="stat-inner d-flex flex-column" style={{ padding: '1.5rem' }}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="stat-copy" style={{ flex: 1 }}>
                    <div className="stat-value" style={{ fontSize: '1.75rem', fontWeight: '700', color: '#FEE739', marginBottom: '0.5rem' }}>
                      {isLoadingTotalSelfClaim ? 'Loading...' : `${parseFloat(totalSelfClaimValue || '0').toFixed(2)}`}
                      <span style={{ fontSize: '1.2rem', marginLeft: '0.5rem', color: '#FEE739', opacity: 0.8 }}>ZYLO</span>
                    </div>
                    <div className="stat-label" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Total Self Power Up Reward
                    </div>
                  </div>
                  <div className="stat-icon" style={{ marginLeft: '1rem' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: 'rgba(254, 231, 57, 0.15)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <CoinSVG />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Current Power Up Reward */}
          <div className="col-lg-6 col-md-6">
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              background: '#03353d',
              borderRadius: '16px',
              border: '1px solid rgba(254, 231, 57, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}>
              <div className="stat-inner d-flex flex-column" style={{ padding: '1.5rem' }}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="stat-copy" style={{ flex: 1 }}>
                    <div className="stat-value" style={{ fontSize: '1.75rem', fontWeight: '700', color: '#FEE739', marginBottom: '0.5rem' }}>
                      {isLoadingCurrentPowerUpReward ? 'Loading...' : `${parseFloat(currentPowerUpRewardValue || '0').toFixed(2)}`}
                      <span style={{ fontSize: '1.2rem', marginLeft: '0.5rem', color: '#FEE739', opacity: 0.8 }}>ZYLO</span>
                    </div>
                    <div className="stat-label" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Current Self Power Up Reward
                    </div>
                  </div>
                  <div className="stat-icon" style={{ marginLeft: '1rem' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: 'rgba(254, 231, 57, 0.15)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <CoinSVG />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Total Team Power Up Reward */}
          <div className="col-lg-6 col-md-6">
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              background: '#03353d',
              borderRadius: '16px',
              border: '1px solid rgba(0, 214, 163, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}>
              <div className="stat-inner d-flex flex-column" style={{ padding: '1.5rem' }}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="stat-copy" style={{ flex: 1 }}>
                    <div className="stat-value" style={{ fontSize: '1.75rem', fontWeight: '700', color: '#00d6a3', marginBottom: '0.5rem' }}>
                      {isLoadingTotalTeamClaim ? 'Loading...' : `${parseFloat(totalTeamClaimValue || '0').toFixed(2)}`}
                      <span style={{ fontSize: '1.2rem', marginLeft: '0.5rem', color: '#00d6a3', opacity: 0.8 }}>ZYLO</span>
                    </div>
                    <div className="stat-label" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Total Team Power Up Reward
                    </div>
                  </div>
                  <div className="stat-icon" style={{ marginLeft: '1rem' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: 'rgba(0, 214, 163, 0.15)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <CoinSVG />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Current Team Power Up Reward */}
          <div className="col-lg-6 col-md-6">
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              background: '#03353d',
              borderRadius: '16px',
              border: '1px solid rgba(0, 214, 163, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}>
              <div className="stat-inner d-flex flex-column" style={{ padding: '1.5rem' }}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="stat-copy" style={{ flex: 1 }}>
                    <div className="stat-value" style={{ fontSize: '1.75rem', fontWeight: '700', color: '#00d6a3', marginBottom: '0.5rem' }}>
                      {isLoadingCurrentReferralPowerUp ? 'Loading...' : `${parseFloat(currentReferralPowerUpValue || '0').toFixed(2)}`}
                      <span style={{ fontSize: '1.2rem', marginLeft: '0.5rem', color: '#00d6a3', opacity: 0.8 }}>ZYLO</span>
                    </div>
                    <div className="stat-label" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Current Team Power Up Reward
                    </div>
                  </div>
                  <div className="stat-icon" style={{ marginLeft: '1rem' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: 'rgba(0, 214, 163, 0.15)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <CoinSVG />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Zylo Universe - Show when unit is selected */}
          {/* {selectedUnit !== null && (
            <div className="col-lg-6 col-md-6">
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                background: '#03353d',
                borderRadius: '16px',
                border: '1px solid rgba(254, 231, 57, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}>
                <div className="stat-inner d-flex flex-column" style={{ padding: '1.5rem' }}>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="stat-copy" style={{ flex: 1 }}>
                      <div className="stat-value" style={{ fontSize: '1.75rem', fontWeight: '700', color: '#FEE739', marginBottom: '0.5rem' }}>
                        {isLoadingRewards ? 'Loading...' : `${parseFloat(currentSelfReward || '0').toFixed(2)}`}
                        <span style={{ fontSize: '1.2rem', marginLeft: '0.5rem', color: '#FEE739', opacity: 0.8 }}>ZYLO</span>
                      </div>
                      <div className="stat-label" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Zylo Universe
                      </div>
                    </div>
                    <div className="stat-icon" style={{ marginLeft: '1rem' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        background: 'rgba(254, 231, 57, 0.15)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <CoinSVG />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn w-100"
                    onClick={() => handleClaimPowerUp(powerUpCards.length > 0 ? powerUpCards.length : 4)}
                    disabled={claimingIndex === (powerUpCards.length > 0 ? powerUpCards.length : 4) || !isConnected}
                    style={{
                      background: claimingIndex === (powerUpCards.length > 0 ? powerUpCards.length : 4) ? 'rgba(254, 231, 57, 0.3)' : 'linear-gradient(135deg, #FEE739 0%, #FDD835 100%)',
                      color: '#000',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '0.75rem',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      cursor: claimingIndex === (powerUpCards.length > 0 ? powerUpCards.length : 4) ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      opacity: claimingIndex === (powerUpCards.length > 0 ? powerUpCards.length : 4) ? 0.6 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (claimingIndex !== (powerUpCards.length > 0 ? powerUpCards.length : 4)) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(254, 231, 57, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {claimingIndex === (powerUpCards.length > 0 ? powerUpCards.length : 4) ? 'Claiming...' : 'Claim'}
                  </button>
                </div>
              </div>
            </div>
          )} */}
        </div>
      )}

      {/* Claim Button - Centered */}
      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-center">
          <button
            type="button"
            className="zbtn cta"
            onClick={handleClaimTeamPowerUnit}
            disabled={isClaimingTeamReward || !isConnected || selectedUnit === null}
            style={{
              padding: '1rem 3rem',
              fontSize: '1.1rem',
              fontWeight: '700',
              background: isClaimingTeamReward ? 'rgba(254, 231, 57, 0.5)' : 'linear-gradient(135deg, #FEE739 0%, #FDD835 100%)',
              color: '#1a1a1a',
              border: 'none',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(254, 231, 57, 0.4)',
              cursor: isClaimingTeamReward || !isConnected || selectedUnit === null ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: isClaimingTeamReward || !isConnected || selectedUnit === null ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isClaimingTeamReward && isConnected && selectedUnit !== null) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(254, 231, 57, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(254, 231, 57, 0.4)';
            }}
          >
            {isClaimingTeamReward ? 'Claiming...' : 'Claim Team Rewards'}
          </button>
        </div>
      </div>
    </>
  );
};

export default RewardSummaryCards;

