'use client';

import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import '../home.css';
import LevelCards from '@/components/levels/LevelCards';

const LevelsPage: React.FC = () => {
  return (
    <>
      <Header />

      <main className="min-vh-100" style={{ paddingTop: '100px', background: 'var(--dark-bg)' }}>
        <div className="container py-5">
          {/* Only show the cards on the main Levels page. */}
          <LevelCards />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default LevelsPage; 
