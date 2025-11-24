'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application error:', error);
    }, [error]);

    return (
        <>
            <Header />
            <main className="min-vh-100" style={{ paddingTop: '100px', background: 'var(--dark-bg)' }}>
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h1 className="text-white display-1 mb-4">Error</h1>
                            <h2 className="text-white mb-4">Something went wrong!</h2>
                            <p className="text-white mb-4">
                                An unexpected error occurred. Please try again.
                            </p>
                            <div className="d-flex gap-3 justify-content-center">
                                <button
                                    onClick={reset}
                                    className="btn btn-primary btn-lg"
                                >
                                    Try Again
                                </button>
                                <Link href="/" className="btn btn-outline-primary btn-lg">
                                    Go Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

