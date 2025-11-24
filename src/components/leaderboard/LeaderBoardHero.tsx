'use client';

import React from 'react';

const LeaderBoardHero: React.FC = () => {
    return (
        <section className="leaderboard-hero-section" style={{
            background: '#032233',
            paddingTop: '180px',
            paddingBottom: '4rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background gradient overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 0%, rgba(254, 231, 57, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 text-center">
                        <div className="hero-content">
                            <h1 className="fw-bold display-4 mb-4" style={{
                                background: 'linear-gradient(135deg, #FEE739 0%, #FFD700 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                textShadow: '0 4px 20px rgba(254, 231, 57, 0.3)',
                                letterSpacing: '2px',
                                fontSize: '3.5rem',
                                fontWeight: '800'
                            }}>
                                Hall of Vortex Zone
                            </h1>
                            <p className="fs-5 mb-0" style={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontWeight: '500',
                                letterSpacing: '0.5px'
                            }}>
                                Top performers in the Zylo Vortex ecosystem
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeaderBoardHero;
