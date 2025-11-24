'use client';

import React, { useState, useMemo } from 'react';
import './StakingLevelsTable.css';

interface TeamReward {
    address: string;
    totalSelfDepositedAmount: string;
    teamReward: string;
}

interface TeamRewardsTableProps {
    teamRewards: TeamReward[];
    onRewardSelect?: (_reward: TeamReward) => void;
    selectedReward?: string;
    showActions?: boolean;
    className?: string;
    itemsPerPage?: number;
}

const TeamRewardsTable: React.FC<TeamRewardsTableProps> = ({
    teamRewards,
    onRewardSelect,
    selectedReward,
    showActions: _showActions = true,
    className = '',
    itemsPerPage = 5
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Reverse the teamRewards array to show latest first
    const reversedRewards = useMemo(() => {
        return [...teamRewards].reverse();
    }, [teamRewards]);

    // Calculate pagination
    const totalPages = Math.ceil(reversedRewards.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRewards = reversedRewards.slice(startIndex, endIndex);

    // Reset to first page when teamRewards change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [teamRewards]);

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const goToPreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };


    const handleRewardClick = (reward: TeamReward) => {
        if (onRewardSelect) {
            onRewardSelect(reward);
        }
    };

    // const formatAddress = (address: string) => {
    //     if (address.length > 10) {
    //         return `${address.slice(0, 6)}...${address.slice(-4)}`;
    //     }
    //     return address;
    // };

    const formatAmount = (amount: string) => {
        const num = parseFloat(amount);
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(2)}M`;
        } else if (num >= 1000) {
            return `${(num / 1000).toFixed(2)}K`;
        }
        return num.toFixed(2);
    };

    return (
        <div className={`staking-levels-table ${className}`}>
            <div className="table-container">
                <div className="table-header">
                    <h3 className="table-title">TEAM REWARDS</h3>
                </div>

                <div className="table-wrapper">
                    <table className="levels-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Address</th>
                                <th>Power Up</th>
                                {/* <th>Reward</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {currentRewards.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: 'rgba(255, 255, 255, 0.7)' }}>
                                        No team members found for this Vortex Zone.
                                    </td>
                                </tr>
                            ) : (
                                currentRewards.map((reward, index) => (
                                    <tr
                                        key={`${reward.address}-${index}`}
                                        className={`table-row ${selectedReward === reward.address ? 'selected' : ''} clickable`}
                                        onClick={() => handleRewardClick(reward)}
                                    >
                                        <td className="level-cell">
                                            <div className="level-info">
                                                <span className="level-number">{startIndex + index + 1}</span>
                                            </div>
                                        </td>
                                        <td className="level-cell">
                                            <div className="level-info">
                                                <span className="level-number">{reward.address}</span>
                                            </div>
                                        </td>
                                        <td className="stake-cell">
                                            <span className="stake-amount">{formatAmount(reward.totalSelfDepositedAmount)} <span style={{ color: '#FEE739' }}>ZYLO</span></span>
                                        </td>
                                        {/* <td className="reward-cell">
                                            <span className="reward-amount">{formatAmount(reward.teamReward)} ZYLO</span>
                                        </td> */}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {reversedRewards.length > 0 && (
                    <div className="pagination-container">
                        <div className="pagination-info">
                            Showing {startIndex + 1}-{Math.min(endIndex, reversedRewards.length)} of {reversedRewards.length} rewards
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

export default TeamRewardsTable;
