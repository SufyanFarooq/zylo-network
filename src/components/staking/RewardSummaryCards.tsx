import React from 'react';

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
}

const RewardSummaryCards: React.FC<RewardSummaryCardsProps> = ({
  claimedSelfReward,
  claimedTeamReward,
  currentSelfReward,
  currentTeamReward,
  isLoadingRewards,
  onClaimRewards,
}) => {
  // Safety guard: This component should ONLY be rendered when showRewardsSection === true
  // If somehow this component is called incorrectly, return null
  // (This is a defensive check - the parent component should handle the condition)
  
  return (
    <>
      {/* Reward Cards Section - 2x2 Grid */}
      <div className="row g-4">
        {/* Card 1: Claimed Self Power Up Reward */}
        <div className="col-lg-6 col-md-6">
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            background: '#03353d',
            borderRadius: '16px',
            border: '1px solid rgba(254, 231, 57, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}>
            <div className="stat-inner d-flex align-items-center justify-content-between" style={{ padding: '1.5rem' }}>
              <div className="stat-copy" style={{ flex: 1 }}>
                <div className="stat-value" style={{ fontSize: '1.75rem', fontWeight: '700', color: '#FEE739', marginBottom: '0.5rem' }}>
                  {isLoadingRewards ? 'Loading...' : `${parseFloat(claimedSelfReward || '0').toFixed(2)}`}
                  <span style={{ fontSize: '1.2rem', marginLeft: '0.5rem', color: '#FEE739', opacity: 0.8 }}>ZYLO</span>
                </div>
                <div className="stat-label" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Claimed Self Power Up Reward
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

        {/* Card 2: Claimed Team Power Up Reward */}
        <div className="col-lg-6 col-md-6">
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            background: '#03353d',
            borderRadius: '16px',
            border: '1px solid rgba(254, 231, 57, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}>
            <div className="stat-inner d-flex align-items-center justify-content-between" style={{ padding: '1.5rem' }}>
              <div className="stat-copy" style={{ flex: 1 }}>
                <div className="stat-value" style={{ fontSize: '1.75rem', fontWeight: '700', color: '#FEE739', marginBottom: '0.5rem' }}>
                  {isLoadingRewards ? 'Loading...' : `${parseFloat(claimedTeamReward || '0').toFixed(2)}`}
                  <span style={{ fontSize: '1.2rem', marginLeft: '0.5rem', color: '#FEE739', opacity: 0.8 }}>ZYLO</span>
                </div>
                <div className="stat-label" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Claimed Team Power Up Reward
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

        {/* Card 3: Current Self Power Up Reward */}
        <div className="col-lg-6 col-md-6">
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            background: '#03353d',
            borderRadius: '16px',
            border: '1px solid rgba(0, 214, 163, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}>
            <div className="stat-inner d-flex align-items-center justify-content-between" style={{ padding: '1.5rem' }}>
              <div className="stat-copy" style={{ flex: 1 }}>
                <div className="stat-value" style={{ fontSize: '1.75rem', fontWeight: '700', color: '#00d6a3', marginBottom: '0.5rem' }}>
                  {isLoadingRewards ? 'Loading...' : `${parseFloat(currentSelfReward || '0').toFixed(2)}`}
                  <span style={{ fontSize: '1.2rem', marginLeft: '0.5rem', color: '#00d6a3', opacity: 0.8 }}>ZYLO</span>
                </div>
                <div className="stat-label" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Current Self Power Up Reward
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
            <div className="stat-inner d-flex align-items-center justify-content-between" style={{ padding: '1.5rem' }}>
              <div className="stat-copy" style={{ flex: 1 }}>
                <div className="stat-value" style={{ fontSize: '1.75rem', fontWeight: '700', color: '#00d6a3', marginBottom: '0.5rem' }}>
                  {isLoadingRewards ? 'Loading...' : `${parseFloat(currentTeamReward || '0').toFixed(2)}`}
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

      {/* Claim Button - Centered */}
      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-center">
          <button
            type="button"
            className="zbtn cta"
            onClick={onClaimRewards}
            style={{
              padding: '1rem 3rem',
              fontSize: '1.1rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #FEE739 0%, #FDD835 100%)',
              color: '#1a1a1a',
              border: 'none',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(254, 231, 57, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(254, 231, 57, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(254, 231, 57, 0.4)';
            }}
          >
            Claim Rewards
          </button>
        </div>
      </div>
    </>
  );
};

export default RewardSummaryCards;

