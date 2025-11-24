'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Hero from './Hero';
import NetworkStats from './NetworkStats';
import '../../app/home.css';

// Lazy load components below the fold for better performance
const SecureTransparent = dynamic(() => import('./SecureTransparent'), {
  loading: () => <div style={{ minHeight: '200px' }} />,
});

const LevelsCarousel = dynamic(() => import('./LevelsCarousel'), {
  loading: () => <div style={{ minHeight: '400px' }} />,
});

const StakingSteps = dynamic(() => import('./StakingSteps'), {
  loading: () => <div style={{ minHeight: '300px' }} />,
});

const DownloadApp = dynamic(() => import('./DownloadApp'), {
  loading: () => <div style={{ minHeight: '200px' }} />,
});

const FAQ = dynamic(() => import('./FAQ'), {
  loading: () => <div style={{ minHeight: '300px' }} />,
});

const Community = dynamic(() => import('./Community'), {
  loading: () => <div style={{ minHeight: '200px' }} />,
});

const Home: React.FC = () => {
    return (
        <div className="home-wrapper">
            {/* Content Sections */}
            <div className="position-relative" style={{background: "#032233"}}>
                <Hero />
                <NetworkStats />
            </div>

            {/* Other sections without background - Lazy loaded */}
            <Suspense fallback={<div style={{ minHeight: '200px' }} />}>
                <SecureTransparent />
            </Suspense>
            <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
                <LevelsCarousel />
            </Suspense>
            <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
                <StakingSteps />
            </Suspense>
            <Suspense fallback={<div style={{ minHeight: '200px' }} />}>
                <DownloadApp />
            </Suspense>
            <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
                <FAQ />
            </Suspense>
            <Suspense fallback={<div style={{ minHeight: '200px' }} />}>
                <Community />
            </Suspense>
        </div>
    );
};

export default Home; 
