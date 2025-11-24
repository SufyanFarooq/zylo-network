import { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { inviterLevelUnLock, getAllLevelsUnlockStatus } from '../blockchain/instances/ZyloPowerUp';

export interface LevelUnlockStatus {
    level: number;
    isUnlocked: boolean;
    status: 'unlocked' | 'locked' | 'error';
    error?: string;
}

export const useLevelUnlockStatus = (levelId?: number) => {
    const [unlockStatus, setUnlockStatus] = useState<LevelUnlockStatus[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { address, isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();

    useEffect(() => {
        const fetchUnlockStatus = async () => {
            if (!isConnected || !address || !walletClient) {
                setUnlockStatus([]);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const provider = new BrowserProvider(walletClient);

                if (levelId) {
                    // Check specific level
                    console.log(`Checking unlock status for level ${levelId} for address: ${address}`);
                    const result = await inviterLevelUnLock(provider, address, levelId);
                    console.log(`Level ${levelId} result:`, result);

                    if (result.success && result.data) {
                        setUnlockStatus([result.data as LevelUnlockStatus]);
                    } else {
                        setError(result.error || null);
                        setUnlockStatus([{
                            level: levelId,
                            isUnlocked: false,
                            status: 'error',
                            error: result.error
                        }]);
                    }
                } else {
                    // Check all levels
                    console.log(`Checking unlock status for all levels for address: ${address}`);
                    const result = await getAllLevelsUnlockStatus(provider, address);
                    console.log(`All levels result:`, result);

                    if (result.success && result.data) {
                        setUnlockStatus(result.data as LevelUnlockStatus[]);
                    } else {
                        setError(result.error || null);
                        setUnlockStatus([]);
                    }
                }
            } catch (err) {
                console.error('Error fetching unlock status:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
                setUnlockStatus([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUnlockStatus();
    }, [isConnected, address, walletClient, levelId]);

    const getLevelStatus = (level: number): LevelUnlockStatus | undefined => {
        return unlockStatus.find(status => status.level === level);
    };

    const isLevelUnlocked = (level: number): boolean => {
        const status = getLevelStatus(level);
        return status?.isUnlocked || false;
    };

    const getUnlockedLevels = (): number[] => {
        return unlockStatus
            .filter(status => status.isUnlocked)
            .map(status => status.level);
    };

    const getLockedLevels = (): number[] => {
        return unlockStatus
            .filter(status => !status.isUnlocked && status.status !== 'error')
            .map(status => status.level);
    };

    return {
        unlockStatus,
        isLoading,
        error,
        getLevelStatus,
        isLevelUnlocked,
        getUnlockedLevels,
        getLockedLevels
    };
};
