'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { getUserRewards } from '@/blockchain/instances/ZyloPowerUp';
import Image from 'next/image';
import './achievement.css';

const AchievementPage = () => {
    const { address, isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();

    // State for user rewards data
    const [userRewards, setUserRewards] = useState<Array<{
        level: number;
        firstIndexValue: boolean | string | number;
        isTrue: boolean;
        error?: string;
    }>>([]);
    const [isLoading, setIsLoading] = useState(false);

    const achievementData = [
        {
            level: 1,
            name: 'Starter Node',
            mysteryBoxName: 'Starter Node',
            unitRequirementSelf: '1 AI Overrider + 1 Zylo Apex',
            zoneAssetRequirement: 'Minimum 20 active Flicker Roar units in the user\'s zone',
            rewardDescription: 'Starter reward crate + minor power-up. Unlocks first extra reward layer.',
            image: '/assets/achivemntImages/achievment-7.jpg'
        },
        {
            level: 2,
            name: 'Crypto Rider',
            mysteryBoxName: 'Crypto Rider',
            unitRequirementSelf: '1 AI Overrider + 2 Zylo Apex',
            zoneAssetRequirement: 'Minimum 25 Flicker Roar units + 5 Spark Up units in the zone',
            rewardDescription: '2x reward boost + random rare asset.',
            image: '/assets/achivemntImages/achievment-8.jpg'
        },
        {
            level: 3,
            name: 'Energy Miner',
            mysteryBoxName: 'Energy Miner',
            unitRequirementSelf: '2 AI Overrider + 2 Zylo Apex',
            zoneAssetRequirement: 'Minimum 30 combined AI & Flicker units in zone',
            rewardDescription: '2.5x reward multiplier + mystery AI asset.',
            image: '/assets/achivemntImages/achievment-6.jpg'
        },
        {
            level: 4,
            name: 'AI Seeker',
            mysteryBoxName: 'AI Seeker',
            unitRequirementSelf: '2 Zylo Apex + 1 AI Overrider',
            zoneAssetRequirement: 'Minimum 35 Apex & AI units in zone',
            rewardDescription: '3x reward multiplier + power-up consumable.',
            image: '/assets/achivemntImages/achievment-5.jpg'
        },
        {
            level: 5,
            name: 'Vortex Pilot',
            mysteryBoxName: 'Vortex Pilot',
            unitRequirementSelf: '2 Zylo Apex + 2 AI Overrider',
            zoneAssetRequirement: 'Minimum 40 total active units including Flicker & Apex',
            rewardDescription: 'Vortex pilot token + mystery cosmic asset.',
            image: '/assets/achivemntImages/achievment-9.jpg'
        },
        {
            level: 6,
            name: 'Chain Commander',
            mysteryBoxName: 'Chain Commander',
            unitRequirementSelf: '3 Zylo Apex + 2 AI Overrider',
            zoneAssetRequirement: 'Minimum 45 active units across Zone 6',
            rewardDescription: 'Team reward bonus + rare asset drop.',
            image: '/assets/achivemntImages/achievment-4.jpg'
        },
        {
            level: 7,
            name: 'Neural Master',
            mysteryBoxName: 'Neural Master',
            unitRequirementSelf: '3 Zylo Apex + 3 AI Overrider',
            zoneAssetRequirement: 'Minimum 50 active units including Apex & AI',
            rewardDescription: '3x power-up booster + Neural chip.',
            image: '/assets/achivemntImages/achievment-2.jpg'
        },
        {
            level: 8,
            name: 'Crypto Elite',
            mysteryBoxName: 'Crypto Elite',
            unitRequirementSelf: '3 Zylo Apex + 2 Zylo Universe',
            zoneAssetRequirement: 'Minimum 55 active units including Universe + Apex',
            rewardDescription: 'Elite reward + exclusive Universe badge.',
            image: '/assets/achivemntImages/achievment-1.jpg'
        },
        {
            level: 9,
            name: 'Meta Champion',
            mysteryBoxName: 'Meta Champion',
            unitRequirementSelf: '2 Zylo Universe + 3 Zylo Apex',
            zoneAssetRequirement: 'Minimum 60 Universe & Apex units active in zone',
            rewardDescription: '3.5x reward multiplier + rare Meta asset.',
            image: '/assets/achivemntImages/achievment-13.jpg'
        },
        {
            level: 10,
            name: 'Zylo Legend',
            mysteryBoxName: 'Zylo Legend',
            unitRequirementSelf: 'All previous milestone units active',
            zoneAssetRequirement: 'Minimum all zone units active + milestone compliance',
            rewardDescription: 'Legendary crate + shareholder privilege + exclusive NFT/asset.',
            image: '/assets/achivemntImages/achievment-3.jpg'
        },
    ];


    // Fetch user rewards data
    const fetchUserRewards = useCallback(async () => {
        if (!isConnected || !address || !walletClient) {
            setUserRewards([]);
            return;
        }

        setIsLoading(true);

        try {
            const provider = new BrowserProvider(walletClient);
            const result = await getUserRewards(provider, address);

            if (result.success) {
                if (result.data && result.data.length > 0) {
                    console.log('User rewards data:', result.data);
                    setUserRewards(result.data);
                } else {
                    // Function not implemented or no data - show all as locked
                    setUserRewards([]);
                }
            } else {
                const errorMessage = 'error' in result ? result.error : 'Unknown error';
                
                // Check if this is the expected "not yet implemented" error
                if (errorMessage && errorMessage.includes('not yet implemented')) {
                    // This is expected behavior - function is not implemented yet
                    // Silently handle it and show all achievements as locked
                    console.log('getUserRewards function not yet implemented - showing all achievements as locked');
                    setUserRewards([]);
                } else {
                    // This is an actual error - log it
                    console.error('Error fetching user rewards:', errorMessage);
                    setUserRewards([]);
                }
            }
        } catch (error) {
            // Check if this is the expected "not yet implemented" error
            const errorMessage = error instanceof Error ? error.message : String(error);
            if (errorMessage.includes('not yet implemented')) {
                console.log('getUserRewards function not yet implemented - showing all achievements as locked');
                setUserRewards([]);
            } else {
                console.error('Error fetching user rewards:', error);
                setUserRewards([]);
            }
        } finally {
            setIsLoading(false);
        }
    }, [isConnected, address, walletClient]);

    useEffect(() => {
        fetchUserRewards();
    }, [fetchUserRewards]);

    // Check if achievement is unlocked based on user rewards
    const isAchievementUnlocked = (achievementLevel: number) => {
        // If no user rewards data is available, show all as locked
        if (userRewards.length === 0) {
            return false;
        }

        // Find the user reward data for this level (level 0 = achievement 1, level 1 = achievement 2, etc.)
        const rewardIndex = achievementLevel - 1; // Convert achievement level to array index
        const rewardData = userRewards.find(reward => reward.level === rewardIndex);

        if (rewardData) {
            // Check if there was an error (function not implemented)
            if (rewardData.error && rewardData.error.includes("not implemented")) {
                console.warn(`userRewards function not implemented for level ${rewardIndex}`);
                return false;
            }
            return rewardData.isTrue;
        }
        return false;
    };

    return (
        <div className="min-h-screen achievement-page-bg">
            <Header />

            <main className="container py-5">
                {/* Page Header */}
                <div className="row justify-content-center mb-5">
                    <div className="col-12 text-center">
                        <h1 className="display-4 fw-bold text-white mb-3" style={{
                            background: 'linear-gradient(135deg, #FEE739 0%, #FFD700 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textShadow: '0 4px 20px rgba(254, 231, 57, 0.3)',
                            letterSpacing: '2px',
                            paddingTop: '80px'
                        }}>
                            Vortex Milestone Rewards
                        </h1>
                        <p className="lead text-light">
                            Unlock your potential with our comprehensive milestone system
                        </p>
                    </div>
                </div>


                {/* Cards Content */}
                <div className="row justify-content-center g-4">
                    {achievementData.map((achievement) => (
                        <div key={achievement.level} className="col-12 col-md-6 col-lg-4">
                            <div className="achievement-level-card">
                                {/* Image Section */}
                                <div className="card-image-section">
                                    <Image
                                        src={achievement.image}
                                        alt={`Achievement Level ${achievement.level}`}
                                        className="card-image"
                                        width={300}
                                        height={200}
                                    />
                                    <div className="level-badge">
                                        Milestone {achievement.level}
                                    </div>
                                </div>

                                {/* Info Section */}
                                <div className="card-info-section">
                                    <h3 className="card-title">
                                        {isLoading ? (
                                            <div className="spinner-border spinner-border-sm text-warning" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : (
                                            achievement.mysteryBoxName || achievement.name
                                        )}
                                    </h3>
                                    <p className="card-subtitle">
                                        {isLoading ? (
                                            'Loading...'
                                        ) : isAchievementUnlocked(achievement.level) ? (
                                            <span style={{ color: '#00d6a3' }}>✓ Unlocked</span>
                                        ) : (
                                            <span className="not-achieved-badge">
                                                <i className="fas fa-lock me-1"></i>
                                                Locked
                                            </span>
                                        )}
                                    </p>

                                    {/* Compact Details */}
                                    <div style={{ marginTop: '1rem' }}>
                                        {/* Unit Requirement */}
                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <div style={{
                                                fontSize: '0.7rem',
                                                color: 'rgba(255, 255, 255, 0.6)',
                                                marginBottom: '0.25rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                fontWeight: '600'
                                            }}>
                                                Self Units
                                            </div>
                                            <div style={{
                                                fontSize: '0.8rem',
                                                color: '#FEE739',
                                                fontWeight: '600',
                                                lineHeight: '1.3'
                                            }}>
                                                {achievement.unitRequirementSelf}
                                            </div>
                                        </div>

                                        {/* Zone Requirement */}
                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <div style={{
                                                fontSize: '0.7rem',
                                                color: 'rgba(255, 255, 255, 0.6)',
                                                marginBottom: '0.25rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                fontWeight: '600'
                                            }}>
                                                Zone Requirement
                                            </div>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                color: '#ffffff',
                                                fontWeight: '500',
                                                lineHeight: '1.3'
                                            }}>
                                                {achievement.zoneAssetRequirement}
                                            </div>
                                        </div>

                                        {/* Reward */}
                                        <div style={{
                                            marginTop: '0.5rem',
                                            padding: '0.75rem',
                                            background: 'rgba(0, 214, 163, 0.1)',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(0, 214, 163, 0.3)'
                                        }}>
                                            <div style={{
                                                fontSize: '0.7rem',
                                                color: '#00d6a3',
                                                marginBottom: '0.25rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                fontWeight: '700'
                                            }}>
                                                Reward
                                            </div>
                                            <div style={{
                                                fontSize: '0.8rem',
                                                color: '#00d6a3',
                                                fontWeight: '600',
                                                lineHeight: '1.3'
                                            }}>
                                                {achievement.rewardDescription}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AchievementPage;
