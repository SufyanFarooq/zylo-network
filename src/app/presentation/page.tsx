'use client';

import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import '../globals.css';

const PresentationPage: React.FC = () => {
  return (
    <>
      <Header />
      
      <main className="min-vh-100" style={{ paddingTop: '100px', background: '#032233' }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h1 className="text-white fw-bold display-4 mb-4">Presentation</h1>
                <p className="text-white fs-5">Coming Soon...</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PresentationPage;