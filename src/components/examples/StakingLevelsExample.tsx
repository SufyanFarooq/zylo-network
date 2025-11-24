'use client';

import React from 'react';
import StakingLevelsTable from '../common/StakingLevelsTable';
import { useStakingLevels } from '../../hooks/useStakingLevels';

const StakingLevelsExample: React.FC = () => {
    const {
        levels,
        isLoading: _isLoading,
        selectedLevel,
        selectLevel,
        updateLevelStatus
    } = useStakingLevels();

    // Transform levels to match StakingLevelsTable interface
    const transformedLevels = levels.map(level => ({
        id: level.id,
        level: level.level,
        requiredStake: level.selfHoldRequirement,
        reward: '0.0000', // Default value since this is not available in the hook
        stakeTime: undefined,
        status: level.status
    }));

    const handleLevelSelect = (level: { id: number; level: string; requiredStake: string; reward: string; stakeTime?: string; status: 'active' | 'inactive' | 'locked' }) => {
        console.log('Selected level:', level);
        // Find the original level and select it
        const originalLevel = levels.find(l => l.id === level.id);
        if (originalLevel) {
            selectLevel(originalLevel);
        }
    };

    const handleUnlockLevel = (levelId: number) => {
        updateLevelStatus(levelId, 'active');
    };

    return (
        <div className="staking-levels-example">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <StakingLevelsTable
                            levels={transformedLevels}
                            onLevelSelect={handleLevelSelect}
                            selectedLevel={selectedLevel || undefined}
                            showActions={true}
                            className="mb-4"
                        />
                    </div>
                </div>

                {/* Additional controls for demonstration */}
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="controls-panel">
                            <h4>Vortex Zone Controls</h4>
                            <div className="button-group">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleUnlockLevel(5)}
                                    disabled={levels.find(l => l.id === 5)?.status === 'active'}
                                >
                                    Unlock Diamond Vortex Zone
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleUnlockLevel(6)}
                                    disabled={levels.find(l => l.id === 6)?.status === 'active'}
                                >
                                    Unlock Master Level
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StakingLevelsExample;

