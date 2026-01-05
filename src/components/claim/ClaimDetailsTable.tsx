'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider, Contract, formatEther } from 'ethers';
import { getClaimXDetailsLength } from '@/blockchain/instances/ZyloPowerUp';
import { ZyloPowerUp_ADDRESS } from '@/blockchain/addresses/addresses.js';
import ZyloPowerUp_ABI from '@/blockchain/abis/ZyloPowerUp.json';
import './ClaimDetailsTable.css';

interface ClaimRecord {
    index: number;
    amount: string;
    timestamp: string;
    formattedTime: string;
}

const ClaimDetailsTable: React.FC = () => {
    const [claimRecords, setClaimRecords] = useState<ClaimRecord[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { address, isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();

    // Load ClaimX history when wallet connects
    useEffect(() => {
        const loadClaimXHistory = async () => {
            if (!isConnected || !address || !walletClient) {
                setClaimRecords([]);
                return;
            }

            setIsLoading(true);
            setError('');

            try {
                const provider = new BrowserProvider(walletClient);
                console.log('Loading ClaimX history for address:', address);

                // Step 1: Get ClaimX details length
                const lengthResult = await getClaimXDetailsLength(provider, address);

                if (!lengthResult.success) {
                    console.error('Failed to get ClaimX details length:', lengthResult.error);
                    setClaimRecords([]);
                    setIsLoading(false);
                    return;
                }

                const length = lengthResult.length || 0;
                console.log('ClaimX details length:', length);

                if (length === 0) {
                    setClaimRecords([]);
                    setIsLoading(false);
                    return;
                }

                // Step 2: Loop through length and get details
                const records: ClaimRecord[] = [];
                const contract = new Contract(ZyloPowerUp_ADDRESS, ZyloPowerUp_ABI, provider);

                for (let i = 0; i < length; i++) {
                    try {
                        console.log(`Fetching ClaimX details at index ${i}...`);

                        // Call contract function directly
                        const result = await contract.userClaimXDetails(address, i);
                        console.log(`Raw result for index ${i}:`, result);

                        // Extract values from result
                        let claimXAmount = BigInt(0);
                        let claimXTimestamp = BigInt(0);

                        if (result && result.ClaimXAmount !== undefined) {
                            claimXAmount = result.ClaimXAmount;
                        } else if (result && result[0] !== undefined) {
                            claimXAmount = result[0];
                        } else if (Array.isArray(result) && result.length > 0) {
                            claimXAmount = result[0];
                        }

                        if (result && result.ClaimXTimestamp !== undefined) {
                            claimXTimestamp = result.ClaimXTimestamp;
                        } else if (result && result[1] !== undefined) {
                            claimXTimestamp = result[1];
                        } else if (Array.isArray(result) && result.length > 1) {
                            claimXTimestamp = result[1];
                        }

                        // Format values
                        const amountFormatted = formatEther(claimXAmount);
                        const timestampStr = claimXTimestamp.toString();
                        const timestamp = parseInt(timestampStr);

                        if (timestamp > 0) {
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
                                index: i,
                                amount: amountFormatted,
                                timestamp: timestampStr,
                                formattedTime: formattedTime
                            });
                        }
                    } catch (err) {
                        console.error(`Error fetching ClaimX details at index ${i}:`, err);
                    }
                }

                // Reverse to show latest first
                records.reverse();
                console.log(`Loaded ${records.length} ClaimX records`);
                setClaimRecords(records);
                setCurrentPage(1);
            } catch (err: unknown) {
                console.error('Error loading ClaimX history:', err);
                setError(err instanceof Error ? err.message : 'Failed to load ClaimX history');
                setClaimRecords([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadClaimXHistory();
    }, [isConnected, address, walletClient]);

    // Listen for claim completed event to refresh
    useEffect(() => {
        const handleClaimCompleted = async () => {
            console.log('Claim completed event received, refreshing ClaimX history...');

            if (isConnected && address && walletClient) {
                setIsLoading(true);
                setError('');

                try {
                    const provider = new BrowserProvider(walletClient);
                    const lengthResult = await getClaimXDetailsLength(provider, address);

                    if (!lengthResult.success || !lengthResult.length) {
                        setIsLoading(false);
                        return;
                    }

                    const length = lengthResult.length || 0;
                    const records: ClaimRecord[] = [];
                    const contract = new Contract(ZyloPowerUp_ADDRESS, ZyloPowerUp_ABI, provider);

                    for (let i = 0; i < length; i++) {
                        try {
                            const result = await contract.userClaimXDetails(address, i);

                            let claimXAmount = BigInt(0);
                            let claimXTimestamp = BigInt(0);

                            if (result && result.ClaimXAmount !== undefined) {
                                claimXAmount = result.ClaimXAmount;
                            } else if (result && result[0] !== undefined) {
                                claimXAmount = result[0];
                            } else if (Array.isArray(result) && result.length > 0) {
                                claimXAmount = result[0];
                            }

                            if (result && result.ClaimXTimestamp !== undefined) {
                                claimXTimestamp = result.ClaimXTimestamp;
                            } else if (result && result[1] !== undefined) {
                                claimXTimestamp = result[1];
                            } else if (Array.isArray(result) && result.length > 1) {
                                claimXTimestamp = result[1];
                            }

                            const amountFormatted = formatEther(claimXAmount);
                            const timestampStr = claimXTimestamp.toString();
                            const timestamp = parseInt(timestampStr);

                            if (timestamp > 0) {
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
                                    index: i,
                                    amount: amountFormatted,
                                    timestamp: timestampStr,
                                    formattedTime: formattedTime
                                });
                            }
                        } catch (err) {
                            console.error(`Error fetching ClaimX details at index ${i}:`, err);
                        }
                    }

                    records.reverse();
                    setClaimRecords(records);
                    setCurrentPage(1);
                } catch (err) {
                    console.error('Error refreshing ClaimX history:', err);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        window.addEventListener('claimCompleted', handleClaimCompleted);

        return () => {
            window.removeEventListener('claimCompleted', handleClaimCompleted);
        };
    }, [isConnected, address, walletClient]);

    // Pagination logic
    const totalPages = Math.max(1, Math.ceil(claimRecords.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRecords = claimRecords.slice(startIndex, endIndex);

    return (
        <section className="claim-details-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="claim-details-card">
                            <div className="card-header">
                                <h3 className="card-title text-center w-100">
                                    Outgo History
                                </h3>
                            </div>

                            <div className="card-body">
                                {isLoading ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-warning" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="text-white-50 mt-3">Loading Outgo History...</p>
                                    </div>
                                ) : error ? (
                                    <div className="text-center py-5">
                                        <p className="text-danger">Error: {error}</p>
                                    </div>
                                ) : !isConnected ? (
                                    <div className="text-center py-5">
                                        <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                                        <p className="text-white-50">Please connect your wallet to view Outgo History</p>
                                    </div>
                                ) : claimRecords.length === 0 ? (
                                    <div className="text-center py-5">
                                        <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                                        <p className="text-white-50">No Outgo History found</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="table-container">
                                            <table className="table claim-table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Outgo Amount</th>
                                                        <th>Outgo Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentRecords.map((record, index) => (
                                                        <tr key={`claim-${record.index}-${index}`}>
                                                            <td>{startIndex + index + 1}</td>
                                                            <td>
                                                                <span className="text-yellow fw-bold">
                                                                    {parseFloat(record.amount).toFixed(4)} ZYLO
                                                                </span>
                                                            </td>
                                                            <td>{record.formattedTime}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Records info and Pagination */}
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <small className="text-muted">
                                                Showing {startIndex + 1}-{Math.min(endIndex, claimRecords.length)} of {claimRecords.length} records
                                            </small>

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

export default ClaimDetailsTable;

