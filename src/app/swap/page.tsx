'use client';

import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SwapComponent from '@/components/swap/SwapComponent';
import '../globals.css';

const SwapPage: React.FC = () => {
  return (
    <>
      <Header />

      <main className="min-vh-100" style={{ paddingTop: '100px', background: 'var(--dark-bg)' }}>
        <div className="container py-5">
          <SwapComponent />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default SwapPage;


