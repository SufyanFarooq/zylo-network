'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { getUserWithdrawInfo } from '@/blockchain/instances/ZyloPowerUp';
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

    // Load withdraw history when wallet connects
    useEffect(() => {
        const loadWithdrawHistory = async () => {
            if (!isConnected || !address || !walletClient) {
                setWithdrawRecords([]);
                return;
            }

            setIsLoading(true);
            setError('');

            try {
                // Convert wallet client to ethers provider
                const provider = new BrowserProvider(walletClient);

                console.log('Loading withdraw history for address:', address);

                // Get withdraw info using the new function
                const result = await getUserWithdrawInfo(provider, address);

                if (result && result.success && result.data && result.data.withdrawInfo) {
                    console.log(`Loaded ${result.data.withdrawInfo.length} withdraw records`);
                    setWithdrawRecords(result.data.withdrawInfo);
                    setCurrentPage(1); // Reset to first page
                } else if (result && result.success && result.data && result.data.fallback) {
                    console.log('Withdraw info functions not available in contract:', result.data.message);
                    setWithdrawRecords([]);
                    // Don't show error for fallback case, just show empty state
                } else {
                    console.warn('No withdraw data found:', result?.error || 'No withdraw info available');
                    setWithdrawRecords([]);
                    // Don't show error for no data case, just show empty state
                }
            } catch (err: unknown) {
                console.error('Error loading withdraw history:', err);
                // Only set error for critical errors, not contract call failures
                if (err instanceof Error && err.message && err.message.includes('Provider is required')) {
                    setError('Please connect your wallet to view withdraw history');
                } else {
                    console.warn('Non-critical error loading withdraw history, showing empty state');
                    setWithdrawRecords([]);
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadWithdrawHistory();
    }, [isConnected, address, walletClient]);

    // Listen for withdraw completed event to refresh withdraw history
    useEffect(() => {
        const handleWithdrawCompleted = async () => {
            console.log('🔄 Withdraw completed event received, refreshing withdraw history...');

            if (isConnected && address && walletClient) {
                setIsLoading(true);
                setError('');

                try {
                    const provider = new BrowserProvider(walletClient);
                    console.log('Loading withdraw history for address:', address);

                    // Get withdraw info using the new function
                    const result = await getUserWithdrawInfo(provider, address);

                    if (result && result.success && result.data && result.data.withdrawInfo) {
                        console.log(`Loaded ${result.data.withdrawInfo.length} withdraw records after withdraw completion`);
                        setWithdrawRecords(result.data.withdrawInfo);
                        setCurrentPage(1); // Reset to first page
                    } else if (result && result.success && result.data && result.data.fallback) {
                        console.log('Withdraw info functions not available in contract:', result.data.message);
                        setWithdrawRecords([]);
                        // Don't show error for fallback case
                    } else {
                        console.warn('No withdraw data found after withdraw completion:', result?.error || 'No withdraw info available');
                        setWithdrawRecords([]);
                        // Don't show error for no data case
                    }
                } catch (err: unknown) {
                    console.error('Error refreshing withdraw history after withdraw completion:', err);
                    // Don't show error for refresh failures, just log it
                    console.warn('Non-critical error during refresh, continuing with current data');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        window.addEventListener('withdrawCompleted', handleWithdrawCompleted);

        return () => {
            window.removeEventListener('withdrawCompleted', handleWithdrawCompleted);
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

            {/* Table */}
            {!isLoading && !error && (
                <div className="table-container">

                    {withdrawRecords.length === 0 ? (
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