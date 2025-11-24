'use client';

import React, { useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { withdraw } from '@/blockchain/instances/ZyloPowerUp';
import './WithdrawHero.css';

const WithdrawAction: React.FC = () => {
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawMessage, setWithdrawMessage] = useState('');

  // Wagmi hooks
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const handleWithdraw = async () => {
    if (!isConnected || !address || !walletClient) {
      setWithdrawMessage('Please connect your wallet first');
      return;
    }

    setIsWithdrawing(true);
    setWithdrawMessage('');

    try {
      // Convert wallet client to ethers provider
      const provider = new BrowserProvider(walletClient);
      const signer = await provider.getSigner();

      console.log('Calling withdraw function from ZyloPowerUp...');
      setWithdrawMessage('Processing withdraw...');

      const result = await withdraw(signer);

      if (result.success) {
        console.log('Withdraw transaction sent successfully');
        setWithdrawMessage('Withdraw successful!');

        // Dispatch custom event to refresh all withdraw page components
        console.log('🔄 Dispatching withdrawCompleted event to refresh all components...');
        window.dispatchEvent(new CustomEvent('withdrawCompleted', {
          detail: {
            timestamp: Date.now(),
            userAddress: address
          }
        }));

        // Clear success message after 3 seconds
        setTimeout(() => {
          setWithdrawMessage('');
        }, 3000);
      } else {
        console.error('Withdraw failed:', result.error);

        // Handle user rejection gracefully
        const errorMessage = result.error || 'Unknown error';
        if (errorMessage.includes('cancelled by user')) {
          setWithdrawMessage('Transaction cancelled');
        } else if (errorMessage.includes('No funds available to withdraw')) {
          setWithdrawMessage('No funds available to withdraw. Please check your rewards first.');
        } else if (errorMessage.includes('No funds available to withdraw or contract conditions not met')) {
          setWithdrawMessage('No funds available to withdraw. Please check your rewards first.');
        } else if (errorMessage.includes('Withdraw failed: No funds available to withdraw. Please check your rewards first.')) {
          setWithdrawMessage('No funds available to withdraw. Please check your rewards first.');
        } else if (errorMessage.includes('Network connectivity issue')) {
          setWithdrawMessage('Network issue. Please check your connection and try again.');
        } else if (errorMessage.includes('Contract not deployed')) {
          setWithdrawMessage('Withdraw function not available. Please try again later.');
        } else {
          setWithdrawMessage(`Withdraw failed: ${errorMessage}`);
        }

        // Clear error message after 5 seconds
        setTimeout(() => {
          setWithdrawMessage('');
        }, 5000);
      }

    } catch (error: unknown) {
      console.error('Error during withdraw:', error);
      const err = error as { message?: string };
      setWithdrawMessage(`Withdraw failed: ${err.message || 'Unknown error'}`);
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <section className="py-5 position-relative">
      <div className="container-fluid px-0">
        <div className="withdraw-panel mx-auto">
          {/* ambient glows & dotted texture */}
          <div className="withdraw-ambient" aria-hidden="true" />

          <div className="p-4 p-md-5 text-center position-relative">
            <h2 className="withdraw-title mb-4">Quick Outgo Your Rewards</h2>

            {/* CTA */}
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="z-cta"
                onClick={handleWithdraw}
                disabled={isWithdrawing || !isConnected}
              >
                {isWithdrawing ? (
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <svg
                    className="cta-icon"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 12h12M12 6l6 6-6 6"
                      stroke="#0A171F"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
              </button>
            </div>

            {/* Message display */}
            {withdrawMessage && (
              <div className="mt-3">
                <div className={`alert ${withdrawMessage.includes('successful') ? 'alert-success' : withdrawMessage.includes('failed') ? 'alert-danger' : 'alert-info'}`}>
                  {withdrawMessage}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WithdrawAction;
