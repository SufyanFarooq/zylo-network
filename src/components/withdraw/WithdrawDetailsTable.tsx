'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { getClaimXDetailsLength } from '@/blockchain/instances/ZyloPowerUp';
import { Contract, formatEther } from 'ethers';
import { ZyloPowerUp_ADDRESS } from '@/blockchain/addresses/addresses.js';
import ZyloPowerUp_ABI from '@/blockchain/abis/ZyloPowerUp.json';
import './WithdrawDetailsTable.css';

interface WithdrawRecord {
    index: number;
    amount: string;
    timestamp: string;
    formattedTime: string;
    rawData: unknown;
}

interface WithdrawDetailsTableProps {
    className?: string;
}

const WithdrawDetailsTable: React.FC<WithdrawDetailsTableProps> = ({ className = '' }) => {
    const [withdrawRecords, setWithdrawRecords] = useState<WithdrawRecord[]>([]);
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
                setWithdrawRecords([]);
                return;
            }

            setIsLoading(true);
            setError('');

            try {
                // Convert wallet client to ethers provider
                const provider = new BrowserProvider(walletClient);

                console.log('Loading ClaimX history for address:', address);

                // Step 1: Get ClaimX details length
                const lengthResult = await getClaimXDetailsLength(provider, address);

                if (!lengthResult.success) {
                    console.error('Failed to get ClaimX details length:', lengthResult.error);
                    setWithdrawRecords([]);
                    setIsLoading(false);
                    return;
                }

                const length = lengthResult.length || 0;
                console.log('ClaimX details length:', length);

                if (length === 0) {
                    setWithdrawRecords([]);
                    setIsLoading(false);
                    return;
                }

                // Step 2: Loop through length and get details
                const records: WithdrawRecord[] = [];
                const contract = new Contract(ZyloPowerUp_ADDRESS, ZyloPowerUp_ABI, provider);

                for (let i = 0; i < length; i++) {
                    try {
                        console.log(`Fetching ClaimX details at index ${i}...`);

                        // Call contract function directly
                        const result = await contract.userClaimXDetails(address, i);
                        console.log(`Raw result for index ${i}:`, result);
                        console.log(`Result type:`, typeof result);
                        console.log(`Result is array:`, Array.isArray(result));

                        // Extract values from result
                        let claimXAmount = BigInt(0);
                        let claimXTimestamp = BigInt(0);

                        // Try different ways to extract the values
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

                        console.log(`Extracted values for index ${i}:`, { claimXAmount, claimXTimestamp });

                        // Format values
                        const amountFormatted = formatEther(claimXAmount);
                        const timestampStr = claimXTimestamp.toString();
                        const timestamp = parseInt(timestampStr);

                        console.log(`Formatted values for index ${i}:`, { amount: amountFormatted, timestamp });

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

                            const record = {
                                index: i,
                                amount: amountFormatted,
                                timestamp: timestampStr,
                                formattedTime: formattedTime,
                                rawData: result
                            };
                            console.log(`Adding record for index ${i}:`, record);
                            records.push(record);
                        } else {
                            console.warn(`Invalid timestamp for index ${i}:`, timestamp);
                        }
                    } catch (err) {
                        console.error(`Error fetching ClaimX details at index ${i}:`, err);
                    }
                }

                // Reverse to show latest first
                records.reverse();
                console.log(`Loaded ${records.length} ClaimX records:`, records);
                console.log('Setting withdrawRecords state with:', records);
                setWithdrawRecords(records);
                setCurrentPage(1); // Reset to first page
            } catch (err: unknown) {
                console.error('Error loading ClaimX history:', err);
                if (err instanceof Error && err.message && err.message.includes('Provider is required')) {
                    setError('Please connect your wallet to view Quick Outgo history');
                } else {
                    console.warn('Non-critical error loading ClaimX history, showing empty state');
                    setWithdrawRecords([]);
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadClaimXHistory();
    }, [isConnected, address, walletClient]);

    // Listen for claim completed event to refresh ClaimX history
    useEffect(() => {
        const handleClaimCompleted = async () => {
            console.log('Claim completed event received, refreshing ClaimX history...');

            if (isConnected && address && walletClient) {
                setIsLoading(true);
                setError('');

                try {
                    const provider = new BrowserProvider(walletClient);
                    console.log('Loading ClaimX history for address:', address);

                    // Step 1: Get ClaimX details length
                    const lengthResult = await getClaimXDetailsLength(provider, address);

                    if (!lengthResult.success) {
                        console.error('Failed to get ClaimX details length:', lengthResult.error);
                        setIsLoading(false);
                        return;
                    }

                    const length = lengthResult.length || 0;

                    if (length === 0) {
                        setWithdrawRecords([]);
                        setIsLoading(false);
                        return;
                    }

                    // Step 2: Loop through length and get details
                    const records: WithdrawRecord[] = [];

                    const contract = new Contract(ZyloPowerUp_ADDRESS, ZyloPowerUp_ABI, provider);

                    for (let i = 0; i < length; i++) {
                        try {
                            // Call contract function directly
                            const result = await contract.userClaimXDetails(address, i);

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
                                    formattedTime: formattedTime,
                                    rawData: result
                                });
                            }
                        } catch (err) {
                            console.error(`Error fetching ClaimX details at index ${i}:`, err);
                        }
                    }

                    // Reverse to show latest first
                    records.reverse();
                    console.log(`Loaded ${records.length} ClaimX records after claim completion`);
                    setWithdrawRecords(records);
                    setCurrentPage(1);
                } catch (err: unknown) {
                    console.error('Error refreshing ClaimX history after claim completion:', err);
                    console.warn('Non-critical error during refresh, continuing with current data');
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

    // Format timestamp to readable date in UTC
    const formatTimestamp = (timestamp: string, formattedTime?: string) => {
        if (formattedTime) {
            return formattedTime;
        }
        try {
            const date = new Date(parseInt(timestamp) * 1000);
            return date.toLocaleString('en-US', {
                timeZone: 'UTC',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }) + ' UTC';
        } catch {
            return 'Invalid Date';
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
    const totalPages = Math.ceil(withdrawRecords.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRecords = withdrawRecords.slice(startIndex, endIndex);

    // Debug logging
    console.log('WithdrawDetailsTable render:', {
        isLoading,
        error,
        recordsLength: withdrawRecords.length,
        currentRecordsLength: currentRecords.length,
        totalPages,
        currentPage
    });

    return (
        <div className={`level-team-details-table ${className}`}>
            {/* Section Title */}
            <div className="text-center mb-4">
                <h2 className="text-yellow fw-bold display-5" style={{
                    textShadow: '2px 2px 4px rgba(254, 230, 0, 0.3)',
                    letterSpacing: '2px'
                }}>
                    QUICK OUTGO HISTORY
                </h2>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="text-center py-4">
                    <div className="spinner-border text-yellow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-yellow mt-2">Loading Quick Outgo history...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="alert alert-danger">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* Table - Always show when not loading or when we have records */}
            {(!isLoading || withdrawRecords.length > 0) && (
                <div className="table-container">

                    {withdrawRecords.length === 0 && !isLoading ? (
                        <div className="text-center py-4">
                            <p className="text-muted">No Quick Outgo history found</p>
                            <small className="text-muted d-block mt-2">
                                {error ? error : "This could mean you haven't made any withdrawals yet, or the contract data is not available."}
                            </small>
                        </div>
                    ) : (
                        <>
                            <div className="table-responsive">
                                <table className="table table-dark table-hover">
                                    <thead>
                                        <tr>
                                            <th className="text-yellow">#</th>
                                            <th className="text-yellow">Quick Outgo Amount</th>
                                            <th className="text-yellow">Quick Outgo Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentRecords.map((record, index) => (
                                            <tr key={`withdraw-${record.index}-${index}`}>
                                                <td className="text-white">{startIndex + index + 1}</td>
                                                <td className="text-white">
                                                    <span className="stake-amount">
                                                        {formatAmount(record.amount)}
                                                        <span className="text-yellow ms-1">ZYLO</span>
                                                    </span>
                                                </td>
                                                <td className="text-white">
                                                    <span className="stake-amount">
                                                        {formatTimestamp(record.timestamp, record.formattedTime)}
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

                            {/* Record Count - Below table */}
                            <div className="text-center mt-3">
                                <small className="text-muted">
                                    Showing {startIndex + 1}-{Math.min(endIndex, withdrawRecords.length)} of {withdrawRecords.length} records
                                </small>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Wallet Connection Message */}
            {!isConnected && (
                <div className="text-center py-4">
                    <p className="text-muted">Please connect your wallet to view Quick Outgo history</p>
                </div>
            )}
        </div>
    );
};

export default WithdrawDetailsTable;