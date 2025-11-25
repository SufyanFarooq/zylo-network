'use client';

import React from 'react';
import ZillowStake from './ZillowStake';

interface PowerUpStakingSectionProps {
  selectedUnit: number | null;
  onBackToZones: () => void;
}

const PowerUpStakingSection: React.FC<PowerUpStakingSectionProps> = ({
  selectedUnit,
  onBackToZones,
}) => {
  return (
    <ZillowStake 
      onShowZoneCardsChange={(show) => {
        if (show) {
          onBackToZones();
        }
      }}
      showRewardsSection={false}
      externalShowZoneCards={false}
      initialSelectedUnit={selectedUnit} // Pass selected unit to show its power ups
    />
  );
};

export default PowerUpStakingSection;

