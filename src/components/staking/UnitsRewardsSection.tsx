'use client';

import React from 'react';
import RewardSummaryCards from './RewardSummaryCards';
import PowerUpUnitCards from './PowerUpUnitCards';

interface UnitsRewardsSectionProps {
  selectedUnit: number | null;
  onBackToZones: () => void;
  claimedSelfReward: string;
  claimedTeamReward: string;
  currentSelfReward: string;
  currentTeamReward: string;
  isLoadingRewards: boolean;
}

const UnitsRewardsSection: React.FC<UnitsRewardsSectionProps> = ({
  selectedUnit,
  onBackToZones,
  claimedSelfReward,
  claimedTeamReward,
  currentSelfReward,
  currentTeamReward,
  isLoadingRewards,
}) => {
  return (
    <section className="ido-section position-relative pb-5" style={{ paddingTop: '60px' }}>
      {/* Ambient glows + dotted texture */}
      <div className="bg-ambient" aria-hidden="true" />

      {/* Back to Zones Button */}
      <div className="container-fluid mb-5" style={{ position: 'relative' }}>
        <div className="d-flex align-items-center">
          <button
            onClick={onBackToZones}
            style={{
              background: 'rgba(0, 214, 163, 0.1)',
              border: '2px solid rgba(0, 214, 163, 0.3)',
              color: '#00d6a3',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 214, 163, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(0, 214, 163, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 214, 163, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(0, 214, 163, 0.3)';
            }}
          >
            ← Back to Zones
          </button>
        </div>
      </div>

      <div className="container-fluid mb-5 pb-5">
        {/* Reward Cards Section */}
        <RewardSummaryCards
          claimedSelfReward={claimedSelfReward}
          claimedTeamReward={claimedTeamReward}
          currentSelfReward={currentSelfReward}
          currentTeamReward={currentTeamReward}
          isLoadingRewards={isLoadingRewards}
        />

        {/* Power Up Unit Cards Section - Show ONLY selected unit's power ups */}
        <div className="row mt-5">
          <div className="col-12">
            <PowerUpUnitCards
              onZoneCardClick={() => {}} // No action needed in Units section
              showZoneCards={false}
              selectedZoneUnit={selectedUnit} // Only show selected unit's cards
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnitsRewardsSection;

