'use client';

import React from 'react';
import Image from 'next/image';

const ClaimHero: React.FC = () => {
    return (
        <section className="py-5">
            <div className="row align-items-center">
                <div className="position-absolute mobile_view" style={{
                    top: 0,
                    left: "0%",
                    zIndex: '0',
                }}>
                    <Image
                        src="/assets/secure/blue lines bg design.svg"
                        alt="Blue Lines Background"
                        width={700}
                        height={500}
                        style={{
                            // objectFit: 'cover'
                        }}
                    />
                </div>
                {/* Left Side - Text Content */}
                <div className="col-lg-6 mb-4">
                    <div className="text-start">
                        <h1 className="text-yellow fw-bold display-3 mb-4" style={{
                            textShadow: '2px 2px 4px rgba(254, 230, 0, 0.3)',
                            letterSpacing: '2px'
                        }}>
                            ClaimX REWARDS
                        </h1>
                        <p className="text-white fs-5" style={{
                            lineHeight: '1.8',
                            maxWidth: '500px'
                        }}>
                            ClaimX your earned rewards from milestones, Power Up, and team activities.
                            Your rewards are automatically calculated and ready to be claimed.
                            No restrictions, ClaimX anytime with just a small transaction fee.
                        </p>
                    </div>
                </div>

                {/* Right Side - 3D Character and Coins */}
                <div className="col-lg-6 mb-4">
                    <Image
                        src="/assets/staking/babygorila.png"
                        alt="Blue Lines Background"
                        className='img-fluid'
                        width={500}
                        height={500}
                        style={{
                            // objectFit: 'cover'
                        }}
                    />
                </div>
            </div>

            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore styled-jsx */}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .character-container {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
        </section>
    );
};

export default ClaimHero;
