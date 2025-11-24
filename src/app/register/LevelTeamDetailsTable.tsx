'use client';

import React, { useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { getLevelTeamDetails } from '@/blockchain/instances/ZyloPowerUp';
import './LevelTeamDetailsTable.css';

interface TeamMember {
    address: string;
    timestamp: string;
    totalSelfDepositedAmount: string;
    registerTM?: string;
    depositTM?: string;
}

interface LevelTeamDetailsTableProps {
    className?: string;
}

const LevelTeamDetailsTable: React.FC<LevelTeamDetailsTableProps> = ({ className = '' }) => {
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { address, isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();

    // Level buttons 1-10
    const levels = Array.from({ length: 10 }, (_, i) => i + 1);

    // Handle level selection
    const handleLevelClick = async (level: number) => {
        if (!isConnected || !address || !walletClient) {
            setError('Please connect your wallet first');
            return;
        }

        setSelectedLevel(level);
        setIsLoading(true);
        setError('');

        try {
            // Convert wallet client to ethers provider
            const provider = new BrowserProvider(walletClient);

            // Call getLevelTeamDetails function
            const result = await getLevelTeamDetails(provider, address, level);

            if (result.success && result.data) {
                setTeamMembers(result.data.teamRewards || []);
                setCurrentPage(1); // Reset to first page
            } else {
                setError(result.error || 'Failed to load team details');
                setTeamMembers([]);
            }
        } catch (err: unknown) {
            console.error('Error loading team details:', err);
            const error = err as { message?: string };
            setError(error.message || 'An error occurred while loading team details');
            setTeamMembers([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Format timestamp to readable UTC date
    const formatTimestamp = (timestamp: string) => {
        try {
            if (!timestamp || timestamp === '0' || timestamp === '') {
                return 'N/A';
            }

            let timestampNum: number;

            // Handle BigInt or string
            if (typeof timestamp === 'string') {
                timestampNum = parseInt(timestamp, 10);
            } else {
                timestampNum = Number(timestamp);
            }

            if (isNaN(timestampNum) || timestampNum === 0) {
                return 'N/A';
            }

            console.log(`Formatting timestamp: ${timestamp} (${timestampNum})`);

            // Check if timestamp is in seconds (Unix timestamp) or milliseconds
            let date: Date;
            if (timestampNum < 10000000000) {
                // If timestamp is less than 10 billion, it's likely in seconds
                date = new Date(timestampNum * 1000);
                console.log(`Using seconds format: ${timestampNum} * 1000 = ${timestampNum * 1000}`);
            } else {
                // If timestamp is larger, it might already be in milliseconds
                date = new Date(timestampNum);
                console.log(`Using milliseconds format: ${timestampNum}`);
            }

            // Validate date
            if (isNaN(date.getTime())) {
                console.error(`Invalid date from timestamp: ${timestampNum}`);
                return 'Invalid Date';
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

            console.log(`Formatted result: ${formatted}`);
            return formatted;
        } catch (error) {
            console.error(`Error formatting timestamp ${timestamp}:`, error);
            return `Invalid Date`;
        }
    };

    // Format amount with proper number formatting
    const formatAmount = (amount: string) => {
        const num = parseFloat(amount);
        if (num >= 1000000) {
            return (num / 1000000).toFixed(2) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(2) + 'K';
        }
        return num.toFixed(2);
    };

    // Pagination logic
    const totalPages = Math.ceil(teamMembers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMembers = teamMembers.slice(startIndex, endIndex);

    return (
        <div className={`level-team-details-table ${className}`}>
            {/* Level Selection Buttons */}
            <div className="level-buttons-container mb-4">
                <h5 className="text-yellow fw-bold mb-3">Select Level to View Team Details</h5>
                <div className="level-buttons">
                    {levels.map((level) => (
                        <button
                            key={level}
                            className={`level-button ${selectedLevel === level ? 'active' : ''}`}
                            onClick={() => handleLevelClick(level)}
                            disabled={isLoading}
                        >
                            Vortex Zone {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="text-center py-4">
                    <div className="spinner-border text-yellow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-yellow mt-2">Loading team details for Vortex Zone {selectedLevel}...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="alert alert-danger">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* Table */}
            {!isLoading && !error && selectedLevel && (
                <div className="table-container">
                    <div className="table-header mb-3">
                        <h6 className="text-yellow fw-bold mb-0">
                            Team Members for Vortex Zone {selectedLevel}
                        </h6>
                        <small className="text-white">
                            Showing {startIndex + 1}-{Math.min(endIndex, teamMembers.length)} of {teamMembers.length} members
                        </small>
                    </div>

                    {teamMembers.length === 0 ? (
                        <div className="text-center py-4">
                            <p className="text-yellow">No team members found for Vortex Zone {selectedLevel}</p>
                        </div>
                    ) : (
                        <>
                            <div className="table-responsive">
                                <table className="table table-dark table-hover">
                                    <thead>
                                        <tr>
                                            <th className="text-yellow">#</th>
                                            <th className="text-yellow">Address</th>
                                            <th className="text-yellow">Power Up Amount</th>
                                            <th className="text-yellow">Register Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentMembers.map((member, index) => (
                                            <tr key={`${member.address}-${index}`}>
                                                <td className="text-white">{startIndex + index + 1}</td>
                                                <td className="text-white">
                                                    <span className="address-text">
                                                        {member.address.slice(0, 6)}...{member.address.slice(-4)}
                                                    </span>
                                                </td>
                                                <td className="text-white">
                                                    <span className="stake-amount">
                                                        {formatAmount(member.totalSelfDepositedAmount)}
                                                        <span className="text-yellow ms-1">ZYLO</span>
                                                    </span>
                                                </td>
                                                <td className="text-white">
                                                    <span className="time-text">
                                                        {member.registerTM ? formatTimestamp(member.registerTM) : 'N/A'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination - Always show */}
                            <div className="pagination-container mt-3">
                                <nav aria-label="Team members pagination">
                                    <ul className="pagination pagination-sm justify-content-center">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => setCurrentPage(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            >
                                                Previous
                                            </button>
                                        </li>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={() => setCurrentPage(page)}
                                                >
                                                    {page}
                                                </button>
                                            </li>
                                        ))}

                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            >
                                                Next
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Wallet Connection Message */}
            {!isConnected && (
                <div className="text-center py-4">
                    <p className="text-muted">Please connect your wallet to view team details</p>
                </div>
            )}
        </div>
    );
};

export default LevelTeamDetailsTable;
