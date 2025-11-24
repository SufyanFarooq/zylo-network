'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ReferralPageProps {
    params: Promise<{
        referralAddress: string;
    }>;
}

const ReferralPage: React.FC<ReferralPageProps> = ({ params }) => {
    const router = useRouter();
    const [, setReferralAddress] = useState<string>('');

    useEffect(() => {
        const loadParams = async () => {
            const resolvedParams = await params;
            setReferralAddress(resolvedParams.referralAddress);
            console.log('Referral page - referralAddress:', resolvedParams.referralAddress);
            console.log('Full params:', resolvedParams);

            // Redirect to main register page with referral address as query parameter
            if (resolvedParams.referralAddress) {
                console.log('Redirecting to:', `/register?ref=${resolvedParams.referralAddress}`);
                // Use replace instead of push to avoid back button issues
                router.replace(`/register?ref=${resolvedParams.referralAddress}`);
            } else {
                console.log('No referral address, redirecting to /register');
                router.replace('/register');
            }
        };

        loadParams();
    }, [params, router]);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-white">Redirecting...</p>
            </div>
        </div>
    );
};

export default ReferralPage;
