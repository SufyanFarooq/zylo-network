'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { getTotalTeamClaimSum, outGo } from '@/blockchain/instances/ZyloPowerUp';

const ClaimAction: React.FC = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [isClaiming, setIsClaiming] = useState(false);
    const [claimMessage, setClaimMessage] = useState('');
    const [claimAmount, setClaimAmount] = useState('0.00');
    const [isLoadingClaimData, setIsLoadingClaimData] = useState(false);

    const { address, isConnected: wagmiConnected } = useAccount();
    const { data: walletClient } = useWalletClient();

    useEffect(() => {
        setIsConnected(wagmiConnected);
    }, [wagmiConnected]);

    // Fetch total team claim sum (totalSelf + totalTeam)
    useEffect(() => {
        const fetchTotalTeamClaimSum = async () => {
            if (!isConnected || !address || !walletClient) {
                setClaimAmount('0.00');
                setIsLoadingClaimData(false);
                return;
            }

            setIsLoadingClaimData(true);
            try {
                const provider = new BrowserProvider(walletClient);
                const result = await getTotalTeamClaimSum(provider, address);

                if (result.success && result.sum) {
                    setClaimAmount(result.sum);
                    console.log('Total team claim sum loaded:', result.sum, 'totalSelf:', result.totalSelf, 'totalTeam:', result.totalTeam);
                } else {
                    setClaimAmount('0.00');
                    console.error('Failed to fetch total team claim sum:', result.error);
                }
            } catch (error) {
                console.error('Error fetching total team claim sum:', error);
                setClaimAmount('0.00');
            } finally {
                setIsLoadingClaimData(false);
            }
        };

        fetchTotalTeamClaimSum();
    }, [isConnected, address, walletClient]);

    const handleClaimRewards = async () => {
        if (!isConnected || !address || !walletClient) {
            setClaimMessage('Please connect your wallet first');
            return;
        }

        setIsClaiming(true);
        setClaimMessage('');

        let shouldShowErrorTimeout = false;

        try {
            // Call the outGo function
            console.log('Calling outGo function');
            const result = await outGo(walletClient, address);

            if (result.success) {
                setClaimMessage('Rewards ClaimX Successfully!');
                console.log('OutGo successful');

                // Wait a bit for blockchain to update, then refresh
                setTimeout(async () => {
                    try {
                        // Refresh claim data after successful withdrawal
                        const provider = new BrowserProvider(walletClient);
                        const updatedData = await getTotalTeamClaimSum(provider, address);
                        if (updatedData.success && updatedData.sum) {
                            setClaimAmount(updatedData.sum);
                        }
                    } catch (error) {
                        console.error('Error refreshing claim amount:', error);
                    }
                }, 2000); // Wait 2 seconds for blockchain to update

                // Dispatch event to refresh all claim components (with delay for blockchain update)
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('claimCompleted'));
                    console.log('OutGo completed event dispatched - refreshing all claim data...');
                }, 2000);
            } else {
                // Check if error is due to user rejection - handle silently
                const errorMessage = result.error || '';
                const isUserRejection =
                    errorMessage.toLowerCase().includes('rejected') ||
                    errorMessage.toLowerCase().includes('denied') ||
                    errorMessage.toLowerCase().includes('user rejected') ||
                    errorMessage.toLowerCase().includes('user denied');

                if (isUserRejection) {
                    // Silently handle user rejection - don't show error message
                    setClaimMessage('');
                } else {
                    setClaimMessage(result.error || 'Failed to ClaimX rewards');
                    shouldShowErrorTimeout = true;
                }
            }

            // Only set timeout for error messages, not for silent rejections
            if (shouldShowErrorTimeout) {
                setTimeout(() => {
                    setClaimMessage('');
                }, 5000);
            }
        } catch (error: unknown) {
            // Check if error is due to user rejection
            const errorObj = error as { message?: string; code?: string | number; info?: { error?: { code?: number } } };
            const errorMessage = errorObj?.message || '';
            const errorCode = errorObj?.code || '';
            const errorInfo = errorObj?.info || {};

            const isUserRejection =
                errorMessage.toLowerCase().includes('user rejected') ||
                errorMessage.toLowerCase().includes('user denied') ||
                errorMessage.toLowerCase().includes('rejected') ||
                errorCode === 'ACTION_REJECTED' ||
                errorCode === 4001 ||
                (errorInfo.error && errorInfo.error.code === 4001);

            if (isUserRejection) {
                // Silently handle user rejection - don't show error message
                setClaimMessage('');
            } else {
                setClaimMessage(errorMessage || 'Error ClaimX rewards. Please try again.');
                shouldShowErrorTimeout = true;
                setTimeout(() => {
                    setClaimMessage('');
                }, 5000);
            }
        } finally {
            setIsClaiming(false);
        }
    };

    return (
        <section className="claim-action-section py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="claim-action-card">
                            <div className="text-center mb-4">
                                <h3 className="text-yellow fw-bold mb-3">ClaimX Your Rewards</h3>
                                <p className="text-white-50">
                                    Your earned rewards from Power Up and Milestone Progress are fully synced and ready for ClaimX.
                                </p>
                            </div>

                            <div className="claim-amount-display mb-4">
                                <div className="amount-label">Available for ClaimX</div>
                                <div className="amount-value">
                                    {isLoadingClaimData ? (
                                        <div className="spinner-border spinner-border-sm text-warning" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    ) : (
                                        `${parseFloat(claimAmount).toFixed(5)} ZYLO`
                                    )}
                                </div>
                            </div>

                            <div className="claim-actions">
                                {!isConnected ? (
                                    <div className="text-center">
                                        <p className="text-warning mb-3">Please connect your wallet to claimX rewards</p>
                                        <button className="btn btn-outline-warning" disabled>
                                            <i className="fas fa-wallet me-2"></i>
                                            Connect Wallet First
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <button
                                            className="btn btn-warning btn-lg px-5 py-3"
                                            onClick={handleClaimRewards}
                                            disabled={isClaiming || parseFloat(claimAmount) <= 0}
                                        >
                                            {isClaiming ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    ClaimX...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-gift me-2"></i>
                                                    Outgo Reward
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}

                                {claimMessage && (
                                    <div className={`alert mt-3 ${claimMessage.includes('successfully') ? 'alert-success' : 'alert-warning'}`}>
                                        {claimMessage}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore styled-jsx */}
            <style jsx>{`
        .claim-action-card {
          background: linear-gradient(135deg, rgba(254, 230, 0, 0.1) 0%, rgba(254, 230, 0, 0.05) 100%);
          border: 1px solid rgba(254, 230, 0, 0.2);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(254, 230, 0, 0.1);
        }

        .claim-amount-display {
          text-align: center;
          padding: 1.5rem;
          background: rgba(254, 230, 0, 0.1);
          border-radius: 15px;
          border: 1px solid rgba(254, 230, 0, 0.2);
        }

        .amount-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }

        .amount-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary-yellow);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .claim-actions .btn {
          border-radius: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }

        .claim-actions .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(254, 230, 0, 0.3);
        }

        .claim-info {
          border-top: 1px solid rgba(254, 230, 0, 0.2);
          padding-top: 1.5rem;
        }

        .info-item {
          padding: 0.5rem;
        }

        .info-value {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--primary-yellow);
          margin-bottom: 0.25rem;
        }

        .info-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .claim-action-card {
            padding: 1.5rem;
          }
          
          .amount-value {
            font-size: 2rem;
          }
          
          .claim-actions .btn {
            width: 100%;
            padding: 0.75rem 1.5rem;
          }
        }
      `}</style>
        </section>
    );
};

export default ClaimAction;
