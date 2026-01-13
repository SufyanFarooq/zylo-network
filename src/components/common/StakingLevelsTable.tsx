'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider, Contract } from 'ethers';
import { ZyloPowerUp_ADDRESS } from '@/blockchain/addresses/addresses';
import ZyloPowerUp_ABI from '@/blockchain/abis/ZyloPowerUp.json';
import './StakingLevelsTable.css';

interface StakingLevel {
    id: number;
    level: string;
    requiredStake: string;
    reward: string;
    stakeTime?: string;
    status: 'active' | 'inactive' | 'locked';
}

interface StakingLevelsTableProps {
    selectedUnit?: number; // The unit to show power up history for
    onLevelSelect?: (_level: StakingLevel) => void;
    selectedLevel?: number;
    showActions?: boolean;
    className?: string;
    itemsPerPage?: number;
}

const StakingLevelsTable: React.FC<StakingLevelsTableProps> = ({
    selectedUnit = 0, // Default to unit 0 if not specified
    onLevelSelect,
    selectedLevel: _selectedLevel,
    showActions: _showActions = true,
    className: _className = '',
    itemsPerPage = 5
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [levels, setLevels] = useState<StakingLevel[]>([]);
    const [_isLoading, setIsLoading] = useState(false);
    const [_error, setError] = useState<string | null>(null);

    // Wagmi hooks
    const { address, isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();

    // Fetch power up history from blockchain
    const fetchPowerUpHistory = useCallback(async () => {
        if (!isConnected || !address || !walletClient) {
            console.log('Wallet not connected');
            setLevels([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const provider = new BrowserProvider(walletClient);
            const contract = new Contract(ZyloPowerUp_ADDRESS, ZyloPowerUp_ABI, provider);

            // Get the length of power up history for this unit
            const length = await contract.getPowerUpHistoryLength(address, selectedUnit);
            const powerUpLength = Number(length);

            console.log(`Found ${powerUpLength} power ups for unit ${selectedUnit}`);

            const powerUpData: StakingLevel[] = [];

            // Loop through each power up and get details
            for (let i = 0; i < powerUpLength; i++) {
                try {
                    const details = await contract.userPowerUpHistory(address, selectedUnit, i);

                    // userPowerUpHistory returns a tuple/array: [amount, time]
                    const [amount, time] = details;

                    // Convert blockchain data to our format
                    const level: StakingLevel = {
                        id: i,
                        level: (i + 1).toString(),
                        requiredStake: amount.toString(), // Amount is already converted from wei in userPowerUpHistory
                        reward: '0', // Power up history shows transaction amounts
                        stakeTime: time.toString(),
                        status: 'active' // Power up history shows completed transactions
                    };

                    powerUpData.push(level);
                } catch (detailError) {
                    console.error(`Error fetching power up history for index ${i}:`, detailError);
                }
            }

            setLevels(powerUpData);
            console.log('Fetched power up data:', powerUpData);

        } catch (error) {
            console.error('Error fetching power up history:', error);
            setError('Failed to load power up history');
            setLevels([]);
        } finally {
            setIsLoading(false);
        }
    }, [isConnected, address, walletClient, selectedUnit]);

    // Fetch data when component mounts or dependencies change
    useEffect(() => {
        fetchPowerUpHistory();
    }, [isConnected, address, walletClient, selectedUnit, fetchPowerUpHistory]);

    // Reset to first page when levels change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [levels]);

    // Reverse the levels array to show latest first
    const reversedLevels = useMemo(() => {
        return [...levels].reverse();
    }, [levels]);

    // Calculate pagination
    const totalPages = Math.ceil(reversedLevels.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentLevels = reversedLevels.slice(startIndex, endIndex);

    // Debug logging
    console.log('Pagination Debug:', {
        totalLevels: levels.length,
        reversedLevels: reversedLevels.length,
        itemsPerPage,
        totalPages,
        currentPage,
        startIndex,
        endIndex,
        currentLevels: currentLevels.length
    });

    const _goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const _goToPreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const _goToNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const _getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <span className="status-badge status-active">Active</span>;
            case 'inactive':
                return <span className="status-badge status-inactive">Inactive</span>;
            case 'locked':
                return <span className="status-badge status-locked">Locked</span>;
            default:
                return <span className="status-badge status-inactive">Inactive</span>;
        }
    };

    const _handleLevelClick = (level: StakingLevel) => {
        if (onLevelSelect && level.status === 'active') {
            onLevelSelect(level);
        }
    };

    // Format timestamp to readable UTC date
    const _formatTimestamp = (timestamp: string) => {
        try {
            console.log(`=== TIMESTAMP DEBUG ===`);
            console.log(`Raw timestamp from blockchain: "${timestamp}"`);
            console.log(`Type: ${typeof timestamp}`);
            console.log(`Length: ${timestamp.length}`);

            // Handle different timestamp formats
            let date;

            // Check if it's already a formatted date string
            if (timestamp.includes('/') || timestamp.includes('-') || timestamp.includes('T')) {
                console.log(`Detected date string format, parsing directly`);
                date = new Date(timestamp);
                console.log(`Parsed as date string: ${date}`);
            } else {
                // Try parsing as number
                const timestampNum = parseInt(timestamp);
                console.log(`Parsed as number: ${timestampNum}`);

                if (isNaN(timestampNum)) {
                    console.error(`Cannot parse as number: ${timestamp}`);
                    return `Invalid Format (${timestamp})`;
                }

                if (timestampNum === 0) {
                    return 'Not Set';
                }

                // Try different timestamp formats based on value
                if (timestampNum < 100) {
                    // Very small number - might be days since epoch
                    console.log(`Very small number (${timestampNum}), trying days since epoch`);
                    date = new Date(timestampNum * 24 * 60 * 60 * 1000);
                } else if (timestampNum < 1000000) {
                    // Medium number - might be hours since epoch
                    console.log(`Medium number (${timestampNum}), trying hours since epoch`);
                    date = new Date(timestampNum * 60 * 60 * 1000);
                } else if (timestampNum < 10000000000) {
                    // Large number - likely seconds since epoch
                    console.log(`Large number (${timestampNum}), using seconds since epoch`);
                    date = new Date(timestampNum * 1000);
                } else {
                    // Very large number - likely milliseconds since epoch
                    console.log(`Very large number (${timestampNum}), using milliseconds since epoch`);
                    date = new Date(timestampNum);
                }
            }

            // Validate the date
            if (isNaN(date.getTime())) {
                console.error(`Invalid date created: ${date}`);
                return `Invalid Date (${timestamp})`;
            }

            const year = date.getFullYear();
            console.log(`Created date: ${date}, Year: ${year}`);

            // Check if date is reasonable
            if (year < 2020 || year > 2030) {
                console.warn(`Date seems unreasonable (${year}), trying alternative parsing`);

                // Try parsing the original timestamp as a date string
                const altDate = new Date(timestamp);
                if (!isNaN(altDate.getTime()) && altDate.getFullYear() >= 2020 && altDate.getFullYear() <= 2030) {
                    console.log(`Alternative parsing successful: ${altDate}`);
                    date = altDate;
                }
            }

            const formatted = date.toLocaleString('en-US', {
                timeZone: 'UTC',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }) + ' UTC';

            console.log(`Final result: ${formatted}`);
            console.log(`=== END DEBUG ===`);
            return formatted;
        } catch (error) {
            console.error(`Error formatting timestamp ${timestamp}:`, error);
            return `Error (${timestamp})`;
        }
    };

    return null; // Table display removed as requested
};

export default StakingLevelsTable;