import { useState, useEffect, useMemo } from 'react';

export interface StakingLevel {
    id: number;
    level: string;
    selfHoldRequirement: string;
    directReferrals: string;
    directRewardPercent: string;
    status: 'active' | 'inactive' | 'locked';
}

export const useStakingLevels = () => {
    const [levels, setLevels] = useState<StakingLevel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

    // Default staking levels data
    const defaultLevels: StakingLevel[] = useMemo(() => [
        {
            id: 1,
            level: 'Vortex Zone 1',
            selfHoldRequirement: '$50',
            directReferrals: '1',
            directRewardPercent: '15%',
            status: 'active'
        },
        {
            id: 2,
            level: 'Vortex Zone 2',
            selfHoldRequirement: '$200',
            directReferrals: '3',
            directRewardPercent: '12%',
            status: 'active'
        },
        {
            id: 3,
            level: 'Vortex Zone 3',
            selfHoldRequirement: '$500',
            directReferrals: '5',
            directRewardPercent: '10%',
            status: 'active'
        },
        {
            id: 4,
            level: 'Vortex Zone 4',
            selfHoldRequirement: '$700',
            directReferrals: '7',
            directRewardPercent: '8%',
            status: 'active'
        },
        {
            id: 5,
            level: 'Vortex Zone 5',
            selfHoldRequirement: '$900',
            directReferrals: '10',
            directRewardPercent: '5%',
            status: 'active'
        },
        {
            id: 6,
            level: 'Vortex Zone 6',
            selfHoldRequirement: '$1,000',
            directReferrals: '13',
            directRewardPercent: '3%',
            status: 'active'
        },
        {
            id: 7,
            level: 'Vortex Zone 7',
            selfHoldRequirement: '$1,200',
            directReferrals: '15',
            directRewardPercent: '2%',
            status: 'active'
        },
        {
            id: 8,
            level: 'Vortex Zone 8',
            selfHoldRequirement: '$1,500',
            directReferrals: '17',
            directRewardPercent: '2%',
            status: 'active'
        },
        {
            id: 9,
            level: 'Vortex Zone 9',
            selfHoldRequirement: '$1,700',
            directReferrals: '20',
            directRewardPercent: '2%',
            status: 'active'
        },
        {
            id: 10,
            level: 'Vortex Zone 10',
            selfHoldRequirement: '$2,500',
            directReferrals: '30',
            directRewardPercent: '5%',
            status: 'active'
        }
    ], []);

    useEffect(() => {
        // Simulate loading data
        const loadLevels = async () => {
            setIsLoading(true);

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            setLevels(defaultLevels);
            setIsLoading(false);
        };

        loadLevels();
    }, [defaultLevels]);

    const selectLevel = (level: StakingLevel) => {
        if (level.status === 'active') {
            setSelectedLevel(level.id);
        }
    };

    const updateLevelStatus = (levelId: number, status: 'active' | 'inactive' | 'locked') => {
        setLevels(prevLevels =>
            prevLevels.map(level =>
                level.id === levelId ? { ...level, status } : level
            )
        );
    };

    const addLevel = (newLevel: Omit<StakingLevel, 'id'>) => {
        const id = Math.max(...levels.map(l => l.id), 0) + 1;
        setLevels(prevLevels => [...prevLevels, { ...newLevel, id }]);
    };

    const removeLevel = (levelId: number) => {
        setLevels(prevLevels => prevLevels.filter(level => level.id !== levelId));
    };

    return {
        levels,
        isLoading,
        selectedLevel,
        selectLevel,
        updateLevelStatus,
        addLevel,
        removeLevel,
        setSelectedLevel
    };
};
