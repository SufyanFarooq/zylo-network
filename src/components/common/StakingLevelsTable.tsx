'use client';

import React, { useState, useMemo } from 'react';
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
    levels: StakingLevel[];
    onLevelSelect?: (_level: StakingLevel) => void;
    selectedLevel?: number;
    showActions?: boolean;
    className?: string;
    itemsPerPage?: number;
    isLoading?: boolean;
}

const StakingLevelsTable: React.FC<StakingLevelsTableProps> = ({
    levels,
    onLevelSelect,
    selectedLevel,
    showActions: _showActions = true,
    className = '',
    itemsPerPage = 5,
    isLoading = false
}) => {
    const [currentPage, setCurrentPage] = useState(1);

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

    // Reset to first page when levels change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [levels]);

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const goToPreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const getStatusBadge = (status: string) => {
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

    const handleLevelClick = (level: StakingLevel) => {
        if (onLevelSelect && level.status === 'active') {
            onLevelSelect(level);
        }
    };

    // Format timestamp to readable UTC date
    const formatTimestamp = (timestamp: string) => {
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

    return (
        <div className={`staking-levels-table ${className}`}>
            <div className="table-container">
                <div className="table-header">
                    <h3 className="table-title">Power Up DETAILS</h3>
                </div>

                <div className="table-wrapper">
                    <table className="levels-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Power Up Amount</th>
                                <th>Power Up Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="loading-cell">
                                        <div className="loading-spinner">
                                            <div className="spinner"></div>
                                            <span>Loading Power Up...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : currentLevels.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="empty-cell">
                                        <div className="empty-state">
                                            <span>No Power Up found. Connect your wallet to view your Power Up history.</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentLevels.map((level) => (
                                    <tr
                                        key={level.id}
                                        className={`table-row ${selectedLevel === level.id ? 'selected' : ''} ${level.status === 'active' ? 'clickable' : 'disabled'}`}
                                        onClick={() => handleLevelClick(level)}
                                    >
                                        <td className="level-cell">
                                            <div className="level-info">
                                                <span className="level-number">{level.level}</span>
                                            </div>
                                        </td>
                                        <td className="stake-cell">
                                            <span className="stake-amount">{level.requiredStake} <span style={{ color: '#FEE739' }}>ZYLO</span></span>
                                        </td>
                                        {/* <td className="reward-cell">
                                            <span className="reward-amount">{level.reward} <span style={{ color: '#FEE739' }}>ZYLO</span></span>
                                        </td> */}
                                        <td className="stake-time-cell">
                                            <span className="stake-time-text">
                                                {level.stakeTime ? formatTimestamp(level.stakeTime) : 'N/A'}
                                            </span>
                                        </td>
                                        <td className="status-cell">
                                            {getStatusBadge(level.status)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {reversedLevels.length > 0 && (
                    <div className="pagination-container">
                        <div className="pagination-info">
                            Showing {startIndex + 1}-{Math.min(endIndex, reversedLevels.length)} of {reversedLevels.length} Power Up
                        </div>
                        <div className="pagination-controls">
                            <button
                                className="pagination-btn"
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>

                            <div className="pagination-numbers">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                                        onClick={() => goToPage(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                className="pagination-btn"
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StakingLevelsTable;