'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import WithdrawHero from '@/components/withdraw/WithdrawHero';
import WithdrawalRequestModal from '@/components/withdraw/WithdrawalRequestModal';
import WithdrawAction from '@/components/withdraw/WithdrawAction';
import WithdrawStaticsCards from '@/components/withdraw/WithdrawStaticsCards';
import WithdrawDetailsTable from '@/components/withdraw/WithdrawDetailsTable';
import '../home.css';

const WithdrawPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCloseModal = () => setIsModalOpen(false);
  const handleConfirmWithdrawal = () => {
    // Handle withdrawal confirmation logic here
    console.log('Withdrawal confirmed!');
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />

      <main className="min-vh-100" style={{ paddingTop: '100px', background: 'var(--dark-bg)' }} suppressHydrationWarning>
        <div className="container py-5">
          {/* Withdraw Hero Section */}
          <WithdrawHero />

          {/* Account Statistics Section */}
          {/* <AccountStatistics /> */}

          {/* Staking Overview Cards Section */}
          {!isClient ? (
            <div className="text-center py-5">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <WithdrawStaticsCards isLoading={false} />
          )}

          {/* Withdraw Action Section */}
          <WithdrawAction />

          {/* Level Team Details Table Section */}
          <div className="row mt-5">
            <div className="col-12">
              <WithdrawDetailsTable />
            </div>
          </div>

          {/* Additional withdraw components will be added here */}
        </div>
      </main>

      {/* Withdrawal Request Modal */}
      <WithdrawalRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmWithdrawal}
      />

      <Footer />
    </>
  );
};

export default WithdrawPage; 
