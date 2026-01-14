'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import Image from 'next/image';
import {
    getNetworkMonthWeekAndDay,
    getMonthlyPowerUpUser,
    getWeeklyPowerUpUser,
    getDailyPowerUpUser,
    getMonthlyPowerUpIncept,
    getWeeklyPowerUpIncept,
    getDailyPowerUpIncept
} from '../../blockchain/instances/ZyloPowerUp';
import './LeaderBoardTable.css';


interface LeaderBoardEntry {
    rank: number;
    address: string;
    totalStaked: string;
}

interface TimePeriod {
    label: string;
    value: string;
    image: string;
}

const LeaderBoardTable: React.FC = () => {
    const [activeTab, setActiveTab] = useState('staking');
    const [activePeriod, setActivePeriod] = useState('today');
    const [leaderboardData, setLeaderboardData] = useState<LeaderBoardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(50); // Show all records on one page


    const { isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();

    const timePeriods: TimePeriod[] = [
        { label: 'Today', value: 'today', image: '/day.jpg' },
        { label: 'This Week', value: 'week', image: '/week.jpg' },
        { label: 'This Month', value: 'month', image: '/month.jpg' }
    ];

    // Fetch real blockchain data
    const fetchLeaderboardData = useCallback(async () => {
        if (!isConnected || !walletClient) {
            console.log("Wallet not connected");
            return;
        }

        setIsLoading(true);
        try {
            let provider;
            try {
                provider = new BrowserProvider(walletClient);
            } catch (error) {
                console.error("Error creating provider:", error);
                setLeaderboardData([]);
                setIsLoading(false);
                return;
            }

            // Step 1: Get month, week, and day from networkMonthWeekAndDay
            console.log("Fetching networkMonthWeekAndDay...");
            const timeResult = await getNetworkMonthWeekAndDay(provider);

            if (!timeResult.success || !timeResult.month || !timeResult.week || !timeResult.day) {
                console.error("Failed to get network month, week, and day:", timeResult.error);
                setLeaderboardData([]);
                setIsLoading(false);
                return;
            }

            const { month, week, day } = timeResult;
            console.log("Network time values:", { month, week, day });

            const leaderboardEntries: LeaderBoardEntry[] = [];

            // Step 2: Loop through 10 time periods backwards based on activePeriod
            for (let i = 0; i < 10; i++) {
                let periodValue;
                let result;

                if (activePeriod === 'month') {
                    periodValue = month - i;
                    if (periodValue <= 0) break; // Don't go below 1

                    console.log(`Fetching monthly data for month:`, periodValue);
                    if (activeTab === 'staking') {
                        result = await getMonthlyPowerUpUser(provider, periodValue);
                    } else {
                        result = await getMonthlyPowerUpIncept(provider, periodValue);
                    }
                } else if (activePeriod === 'week') {
                    periodValue = week - i;
                    if (periodValue <= 0) break; // Don't go below 1

                    console.log(`Fetching weekly data for week:`, periodValue);
                    if (activeTab === 'staking') {
                        result = await getWeeklyPowerUpUser(provider, periodValue);
                    } else {
                        result = await getWeeklyPowerUpIncept(provider, periodValue);
                    }
                } else { // today
                    periodValue = day - i;
                    if (periodValue <= 0) break; // Don't go below 1

                    console.log(`Fetching daily data for day:`, periodValue);
                    if (activeTab === 'staking') {
                        result = await getDailyPowerUpUser(provider, periodValue);
                    } else {
                        result = await getDailyPowerUpIncept(provider, periodValue);
                    }
                }

                if (result && result.success && result.address && result.amount) {
                    const amount = parseFloat(result.amount) || 0.00; // Default to small amount if parsing fails

                    leaderboardEntries.push({
                        rank: periodValue, // Use the period value as rank/identifier
                        address: result.address,
                        totalStaked: amount.toFixed(4)
                    });

                    console.log(`Added entry for ${activePeriod} ${periodValue}:`, {
                        address: result.address,
                        amount: amount.toFixed(4)
                    });
                } else {
                    // Add empty entry if no data available for this period
                    leaderboardEntries.push({
                        rank: periodValue,
                        address: `No data available`,
                        totalStaked: '0.0000'
                    });
                    console.log(`No data available for ${activePeriod} ${periodValue}`);
                }
            }

            // Sort by rank (period value) to show in chronological order (newest first)
            leaderboardEntries.sort((a, b) => b.rank - a.rank);

            setLeaderboardData(leaderboardEntries);
            console.log("Leaderboard data updated with period entries:", leaderboardEntries);
        } catch (error) {
            console.error("Error fetching leaderboard data:", error);
            setLeaderboardData([]);
        } finally {
            setIsLoading(false);
        }
    }, [isConnected, walletClient, activeTab, activePeriod]);

    // Fetch data when period or tab changes
    useEffect(() => {
        fetchLeaderboardData();
    }, [activePeriod, activeTab, isConnected, fetchLeaderboardData]);

    // Pagination logic
    const totalPages = Math.ceil(leaderboardData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRecords = leaderboardData.slice(startIndex, endIndex);


    return (
        <section className="leaderboard-table-section py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="leaderboard-card">
                            {/* Category Tabs */}
                            <div className="category-tabs">
                                <div className="tab-buttons">
                                    <button
                                        className={`tab-button ${activeTab === 'staking' ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveTab('staking');
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <i className="fas fa-coins me-2"></i>
                                        Top Power Ups
                                    </button>
                                    <button
                                        className={`tab-button ${activeTab === 'team' ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveTab('team');
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <i className="fas fa-users me-2"></i>
                                        Top Team Builders
                                    </button>
                                </div>
                            </div>

                            {/* Time Period Selector */}
                            <div className="time-period-selector mb-4">
                                <div className="row g-3 justify-content-center">
                                    {timePeriods.map((period) => (
                                        <div key={period.value} className="col-12 col-md-4">
                                            <div
                                                className={`period-card ${activePeriod === period.value ? 'active' : ''}`}
                                                onClick={() => {
                                                    setActivePeriod(period.value);
                                                    setCurrentPage(1);
                                                }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="period-card-image">
                                                    <Image
                                                        src={period.image}
                                                        alt={period.label}
                                                        width={300}
                                                        height={200}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                    <div className="period-overlay">
                                                        <h4 className="period-label">{period.label}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3 className="card-title mb-0">
                                        {activePeriod.toUpperCase()}&apos;s - {activeTab === 'staking' ? 'Top Performers' : 'Top Team Builders'}
                                    </h3>
                                    {isConnected && (
                                        <button
                                            className="btn btn-outline-warning btn-sm"
                                            onClick={fetchLeaderboardData}
                                            disabled={isLoading}
                                        >
                                            <i className={`fas fa-refresh ${isLoading ? 'fa-spin' : ''} me-1`}></i>
                                            Refresh
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="card-body">
                                {!isConnected ? (
                                    <div className="text-center py-5">
                                        <i className="fas fa-wallet fa-3x text-muted mb-3"></i>
                                        <p className="text-white-50">Please connect your wallet to view Hall of Vortex Zone</p>
                                    </div>
                                ) : isLoading ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-warning" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="mt-3 text-white-50">Loading Hall of Vortex Zone...</p>
                                    </div>
                                ) : currentRecords.length === 0 ? (
                                    <div className="text-center py-5">
                                        <i className="fas fa-trophy fa-3x text-muted mb-3"></i>
                                        <p className="text-white-50">No leaderboard data available</p>
                                        {/* <p className="text-warning small">
                                            <i className="fas fa-info-circle me-1"></i>
                                            Leaderboard functions may not be implemented in this contract version
                                        </p> */}
                                        {/* <button
                                            className="btn btn-warning mt-3"
                                            onClick={fetchLeaderboardData}
                                            disabled={isLoading}
                                        >
                                            <i className="fas fa-refresh me-2"></i>
                                            Refresh Data
                                        </button> */}
                                    </div>
                                ) : (
                                    <>
                                        <div className="table-container">
                                            <table className="table leaderboard-table">
                                                <thead>
                                                    <tr>
                                                        <th>{activePeriod === 'month' ? 'MONTH' : activePeriod === 'week' ? 'WEEK' : 'DAY'}</th>
                                                        <th>ADDRESS</th>
                                                        <th>TOTAL Power Up</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentRecords.map((entry) => (
                                                        <tr key={entry.rank} className="leaderboard-row">
                                                            <td>
                                                                <span className="period-value">
                                                                    {entry.rank}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="address-value">
                                                                    {entry.address}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="amount-value">
                                                                    {entry.totalStaked} <span className="token-symbol">ZYLO</span>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Pagination */}
                                        {totalPages > 1 && (
                                            <div className="d-flex justify-content-center mt-4">
                                                <div className="pagination-controls">
                                                    <button
                                                        className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
                                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                        disabled={currentPage === 1}
                                                    >
                                                        Previous
                                                    </button>

                                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                        <button
                                                            key={page}
                                                            className={`page-link ${currentPage === page ? 'active' : ''}`}
                                                            onClick={() => setCurrentPage(page)}
                                                        >
                                                            {page}
                                                        </button>
                                                    ))}

                                                    <button
                                                        className={`page-link ${currentPage === totalPages ? 'disabled' : ''}`}
                                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                                        disabled={currentPage === totalPages}
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Records info */}
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            {/* <small className="text-muted">
                                                Showing {startIndex + 1}-{Math.min(endIndex, leaderboardData.length)} of {leaderboardData.length} entries
                                            </small>
                                            <small className="text-info">
                                                <i className="fas fa-info-circle me-1"></i>
                                                Historical {activePeriod === 'today' ? 'Daily' : activePeriod === 'week' ? 'Weekly' : 'Monthly'} Data
                                            </small> */}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeaderBoardTable;