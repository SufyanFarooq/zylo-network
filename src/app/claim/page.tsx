'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ClaimHero from '@/components/claim/ClaimHero';
import ClaimStaticsCards from '@/components/claim/ClaimStaticsCards';
import ClaimAction from '@/components/claim/ClaimAction';
import ClaimDetailsTable from '@/components/claim/ClaimDetailsTable';
import '../home.css';

const ClaimPage: React.FC = () => {
    const [isClient, setIsClient] = useState(false);

    // Ensure client-side rendering to prevent hydration issues
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            <Header />

            <main className="min-vh-100" style={{ paddingTop: '100px', background: 'var(--dark-bg)' }} suppressHydrationWarning>
                <div className="container py-5">
                    {/* Claim Hero Section */}
                    <ClaimHero />

                    {/* Claim Overview Cards Section */}
                    {!isClient ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-warning" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <ClaimStaticsCards isLoading={false} />
                    )}

                    {/* Claim Action Section */}
                    <ClaimAction />

                    {/* Claim Details Table Section */}
                    <div className="row mt-5">
                        <div className="col-12">
                            <ClaimDetailsTable />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default ClaimPage;


