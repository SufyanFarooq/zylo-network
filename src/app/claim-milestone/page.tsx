'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { EliteAmount, claimLockedReward, getUserLockedDetailsLength, userLockedHistory } from '@/blockchain/instances/ZyloPowerUpM';
import { getUnitName } from '@/components/staking/utils/unitCategoryMapping';
import './claimMilestone.css';

// Locked History Table Component
const LockedHistoryTable = ({ address, unitNumber, walletClient }: {
    address: string | undefined;
    unitNumber: number;
    walletClient: any;
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [tableData, setTableData] = useState<Array<{ amount: string; time: string; formattedTime: string }>>([]);
    const [isLoadingTable, setIsLoadingTable] = useState(false);
    const itemsPerPage = 10;

    // Fetch total records count
    useEffect(() => {
        const fetchTotalRecords = async () => {
            if (!address || !walletClient) return;

            try {
                const provider = new BrowserProvider(walletClient);
                const lengthResult = await getUserLockedDetailsLength(provider, address, unitNumber);
                if (lengthResult.success) {
                    setTotalRecords(lengthResult.length || 0);
                }
            } catch (error) {
                console.error('Error fetching total records:', error);
                setTotalRecords(0);
            }
        };

        fetchTotalRecords();
    }, [address, unitNumber, walletClient]);

    // Fetch data for current page
    useEffect(() => {
        const fetchPageData = async () => {
            if (!address || !walletClient || totalRecords === 0) {
                setTableData([]);
                return;
            }

            setIsLoadingTable(true);
            try {
                const provider = new BrowserProvider(walletClient);
                const records: Array<{ amount: string; time: string; formattedTime: string }> = [];

                // Calculate start and end indices for current page
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = Math.min(startIndex + itemsPerPage, totalRecords);

                // Fetch records for current page (in reverse order to show latest first)
                for (let i = startIndex; i < endIndex; i++) {
                    try {
                        const historyResult = await userLockedHistory(provider, address, unitNumber, i);
                        if (historyResult.success && historyResult.amount && historyResult.time) {
                            const timestamp = parseInt(historyResult.time);
                            const date = new Date(timestamp * 1000);
                            const formattedTime = date.toLocaleString('en-US', {
                                timeZone: 'UTC',
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false
                            }) + ' UTC';

                            records.push({
                                amount: historyResult.amount,
                                time: historyResult.time,
                                formattedTime: formattedTime
                            });
                        }
                    } catch (err) {
                        console.error(`Error fetching locked history at index ${i}:`, err);
                    }
                }

                // Reverse to show latest first
                records.reverse();
                setTableData(records);
            } catch (error) {
                console.error('Error fetching page data:', error);
                setTableData([]);
            } finally {
                setIsLoadingTable(false);
            }
        };

        fetchPageData();
    }, [address, unitNumber, walletClient, currentPage, totalRecords]);

    const totalPages = Math.ceil(totalRecords / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (totalRecords === 0) {
        return (
            <div className="history-table-card">
                <h5 className="text-yellow mb-3">Locked History</h5>
                <div className="text-center text-white-50 py-4">
                    No locked history found for this unit.
                </div>
            </div>
        );
    }

    return (
        <div className="history-table-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="text-yellow mb-0">Locked History</h5>
                <small className="text-white-50">Total Records: {totalRecords}</small>
            </div>

            <div className="table-responsive">
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th className="text-yellow">#</th>
                            <th className="text-yellow">Amount (ZYLO)</th>
                            <th className="text-yellow">Time (UTC)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoadingTable ? (
                            <tr>
                                <td colSpan={3} className="text-center py-4">
                                    <div className="spinner-border spinner-border-sm text-warning" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <span className="ms-2 text-white-50">Loading history...</span>
                                </td>
                            </tr>
                        ) : tableData.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="text-center text-white-50 py-4">
                                    No data available for this page.
                                </td>
                            </tr>
                        ) : (
                            tableData.map((record, index) => {
                                const recordNumber = ((currentPage - 1) * itemsPerPage) + (tableData.length - index);
                                return (
                                    <tr key={index}>
                                        <td className="text-white">{recordNumber}</td>
                                        <td className="text-white">{parseFloat(record.amount).toFixed(4)}</td>
                                        <td className="text-white">{record.formattedTime}</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3">
                    <nav>
                        <ul className="pagination pagination-sm">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    style={{
                                        backgroundColor: 'rgba(254, 231, 57, 0.1)',
                                        borderColor: 'rgba(254, 231, 57, 0.3)',
                                        color: '#FEE739'
                                    }}
                                >
                                    Previous
                                </button>
                            </li>

                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNumber;
                                if (totalPages <= 5) {
                                    pageNumber = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNumber = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNumber = totalPages - 4 + i;
                                } else {
                                    pageNumber = currentPage - 2 + i;
                                }

                                return (
                                    <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(pageNumber)}
                                            style={{
                                                backgroundColor: currentPage === pageNumber ? '#FEE739' : 'rgba(254, 231, 57, 0.1)',
                                                borderColor: 'rgba(254, 231, 57, 0.3)',
                                                color: currentPage === pageNumber ? '#000' : '#FEE739'
                                            }}
                                        >
                                            {pageNumber}
                                        </button>
                                    </li>
                                );
                            })}

                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    style={{
                                        backgroundColor: 'rgba(254, 231, 57, 0.1)',
                                        borderColor: 'rgba(254, 231, 57, 0.3)',
                                        color: '#FEE739'
                                    }}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}

            {/* Page Info */}
            <div className="text-center mt-2">
                <small className="text-white-50">
                    Page {currentPage} of {totalPages} ({totalRecords} total records)
                </small>
            </div>
        </div>
    );
};

const ClaimMilestonePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const achievementId = searchParams.get('achievement');

    const { address, isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();

    // State for selected unit
    const [selectedUnit, setSelectedUnit] = useState<number | null>(0); // Default to Spark Up (unit 0)

    // State for elite amount
    const [eliteAmount, setEliteAmount] = useState<string>('0');
    const [isLoadingAmount, setIsLoadingAmount] = useState(false);

    // State for claiming
    const [isClaiming, setIsClaiming] = useState(false);

    // State for locked history
    const [lockedHistory, setLockedHistory] = useState<Array<{ amount: string; time: string; formattedTime: string }>>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);

    // Pagination for locked history
    const [currentHistoryPage, setCurrentHistoryPage] = useState(1);
    const historyItemsPerPage = 5;

    // Achievement data based on ID
    const achievementData = {
        8: {
            name: 'Crypto Elite',
            description: 'Elite reward + exclusive Universe badge.'
        },
        9: {
            name: 'Meta Champion',
            description: '3.5x reward multiplier + rare Meta asset.'
        },
        10: {
            name: 'Zylo Legend',
            description: 'Legendary crate + shareholder privilege + exclusive NFT/asset.'
        }
    };

    const validAchievementIds = ['8', '9', '10'] as const;
    const isValidId = achievementId && validAchievementIds.includes(achievementId as any);
    const currentAchievement = isValidId ? achievementData[achievementId as '8' | '9' | '10'] : null;

    // Units array (0-5)
    const units = Array.from({ length: 6 }, (_, i) => i);

    // Fetch elite amount when unit is selected
    useEffect(() => {
        const fetchEliteAmount = async () => {
            if (!isConnected || !address || !walletClient || selectedUnit === null) {
                setEliteAmount('0');
                return;
            }

            setIsLoadingAmount(true);
            try {
                const provider = new BrowserProvider(walletClient);
                const result = await EliteAmount(provider, address, selectedUnit);

                if (result.success) {
                    setEliteAmount(result.amount || '0');
                } else {
                    console.error('Failed to fetch elite amount:', result.error);
                    setEliteAmount('0');
                }
            } catch (error) {
                console.error('Error fetching elite amount:', error);
                setEliteAmount('0');
            } finally {
                setIsLoadingAmount(false);
            }
        };

        fetchEliteAmount();
    }, [isConnected, address, walletClient, selectedUnit]);

    // Fetch locked history when unit is selected
    useEffect(() => {
        const fetchLockedHistory = async () => {
            if (!isConnected || !address || !walletClient || selectedUnit === null) {
                setLockedHistory([]);
                return;
            }

            setIsLoadingHistory(true);
            try {
                const provider = new BrowserProvider(walletClient);

                // Get the length of locked history for this unit
                const lengthResult = await getUserLockedDetailsLength(provider, address, selectedUnit);
                if (!lengthResult.success || !lengthResult.length) {
                    setLockedHistory([]);
                    setIsLoadingHistory(false);
                    return;
                }

                const length = lengthResult.length;
                const records: Array<{ amount: string; time: string; formattedTime: string }> = [];

                // Loop through each history record
                for (let i = 0; i < length; i++) {
                    try {
                        const historyResult = await userLockedHistory(provider, address, selectedUnit, i);
                        if (historyResult.success && historyResult.amount && historyResult.time) {
                            const timestamp = parseInt(historyResult.time);
                            const date = new Date(timestamp * 1000);
                            const formattedTime = date.toLocaleString('en-US', {
                                timeZone: 'UTC',
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false
                            }) + ' UTC';

                            records.push({
                                amount: historyResult.amount,
                                time: historyResult.time,
                                formattedTime: formattedTime
                            });
                        }
                    } catch (err) {
                        console.error(`Error fetching locked history at index ${i}:`, err);
                    }
                }

                // Reverse to show latest first
                records.reverse();
                setLockedHistory(records);
                setCurrentHistoryPage(1); // Reset to first page when data changes
            } catch (error) {
                console.error('Error fetching locked history:', error);
                setLockedHistory([]);
            } finally {
                setIsLoadingHistory(false);
            }
        };

        fetchLockedHistory();
    }, [isConnected, address, walletClient, selectedUnit]);

    // Handle claim locked reward
    const handleClaimReward = async () => {
        if (!isConnected || !address || !walletClient || selectedUnit === null) {
            return;
        }

        setIsClaiming(true);
        try {
            const result = await claimLockedReward(walletClient, address, selectedUnit);

            if (result.success) {
                // Refresh the elite amount after claiming
                const provider = new BrowserProvider(walletClient);
                const newResult = await EliteAmount(provider, address, selectedUnit);
                if (newResult.success) {
                    setEliteAmount(newResult.amount || '0');
                }

                // Show success message (you can integrate with toast system)
                alert('Claim successful!');
            } else {
                alert(`Claim failed: ${result.error}`);
            }
        } catch (error) {
            console.error('Error claiming reward:', error);
            alert('Claim failed due to an error');
        } finally {
            setIsClaiming(false);
        }
    };

    if (!currentAchievement) {
        return (
            <div className="min-h-screen achievement-page-bg">
                <Header />
                <main className="container py-5">
                    <div className="text-center">
                        <h2 className="text-white">Invalid Achievement</h2>
                        <button
                            onClick={() => router.back()}
                            className="btn btn-warning mt-3"
                        >
                            Go Back
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen achievement-page-bg">
            <Header />

            {/* Back Navigation Button */}
            <div className="d-flex justify-content-start mb-4" style={{ padding: '1rem 2rem' }}>
                <button
                    onClick={() => router.back()}
                    className="btn btn-outline-warning d-flex align-items-center gap-2"
                    style={{
                        background: 'linear-gradient(145deg, rgba(254, 231, 57, 0.15) 0%, rgba(254, 231, 57, 0.08) 100%)',
                        border: '2px solid rgba(254, 231, 57, 0.5)',
                        color: '#FEE739',
                        borderRadius: '12px',
                        padding: '0.75rem 1.25rem',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        backdropFilter: 'blur(5px)',
                        boxShadow: '0 2px 8px rgba(254, 231, 57, 0.1)',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(145deg, rgba(254, 231, 57, 0.25) 0%, rgba(254, 231, 57, 0.15) 100%)';
                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(254, 231, 57, 0.3)';
                        e.currentTarget.style.borderColor = '#FEE739';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(145deg, rgba(254, 231, 57, 0.15) 0%, rgba(254, 231, 57, 0.08) 100%)';
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(254, 231, 57, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(254, 231, 57, 0.5)';
                    }}
                >
                    <span style={{ fontSize: '1rem', marginRight: '0.5rem', fontWeight: 'bold' }}>←</span>
                    <span>Back</span>
                </button>
            </div>
            {/* Back Button */}
            <div className="row justify-content-center mt-4">
                <div className="col-12 col-md-6 text-center">
                    <button
                        onClick={() => router.back()}
                        className="back-button"
                    >
                        ← Back to Achievements
                    </button>
                </div>
            </div>

            <main className="container py-5">
                {/* Page Header */}
                <div className="row justify-content-center mb-5">
                    <div className="col-12 text-center">
                        <h1 className="display-4 fw-bold text-white mb-2" style={{
                            background: 'linear-gradient(135deg, #FEE739 0%, #FFD700 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 4px 20px rgba(254, 231, 57, 0.3)',
                            letterSpacing: '2px',
                            paddingTop: '20px'
                        }}>
                            Vortex Milestone Rewards
                        </h1>
                        <p className="lead text-light">
                            Claim your {currentAchievement.name} milestone rewards
                        </p>
                    </div>
                </div>

                {/* Unit Selection */}
                <div className="row justify-content-center mb-4">
                    <div className="col-12 col-md-10">
                        <div className="unit-selection-card">
                            <h4 className="text-yellow mb-3 text-center">Select Unit</h4>
                            <div className="unit-buttons-grid">
                                {units.map((unitIndex) => (
                                    <button
                                        key={unitIndex}
                                        onClick={() => setSelectedUnit(unitIndex)}
                                        className={`unit-button ${selectedUnit === unitIndex ? 'active' : ''}`}
                                    >
                                        <span className="unit-name">{getUnitName(unitIndex)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Current Claim Value Card */}
                {selectedUnit !== null && (
                    <div className="row justify-content-center mb-4">
                        <div className="col-12 col-md-6">
                            <div className="claim-value-card">
                                <div className="card-header">
                                    <h5 className="text-yellow mb-0">Current Claim Milestone</h5>
                                    <small className="text-white-50">{getUnitName(selectedUnit)}</small>
                                </div>
                                <div className="card-body">
                                    <div className="value-display">
                                        {isLoadingAmount ? (
                                            <div className="spinner-border spinner-border-sm text-warning" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="value-amount">{parseFloat(eliteAmount).toFixed(4)}</span>
                                                <span className="value-currency">ZYLO</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button
                                        onClick={handleClaimReward}
                                        disabled={isClaiming || parseFloat(eliteAmount) === 0}
                                        className="btn btn-warning btn-lg w-100 claim-button"
                                    >
                                        {isClaiming ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                Claiming...
                                            </>
                                        ) : (
                                            "Claim Milestone"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Locked History Table with Pagination */}
                {selectedUnit !== null && (
                    <div className="row justify-content-center mb-5">
                        <div className="col-12 col-md-10">
                            <LockedHistoryTable
                                address={address}
                                unitNumber={selectedUnit}
                                walletClient={walletClient}
                            />
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ClaimMilestonePage;
