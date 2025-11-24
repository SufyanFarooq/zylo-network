import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function NotFound() {
    return (
        <>
            <Header />
            <main className="min-vh-100" style={{ paddingTop: '100px', background: 'var(--dark-bg)' }}>
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h1 className="text-white display-1 mb-4">404</h1>
                            <h2 className="text-white mb-4">Page Not Found</h2>
                            <p className="text-white mb-4">
                                The page you&apos;re looking for doesn&apos;t exist.
                            </p>
                            <Link href="/" className="btn btn-primary btn-lg">
                                Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
