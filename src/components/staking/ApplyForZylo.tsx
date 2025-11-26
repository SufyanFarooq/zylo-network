'use client';

import React from 'react';
import Image from 'next/image';

const ApplyForZylo: React.FC = () => {
  const scrollToStaking = () => {
    const stakingSection = document.querySelector('.zillow-stake-section');
    if (stakingSection) {
      stakingSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes powerUpFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(2deg);
          }
          50% { 
            transform: translateY(-8px) rotate(0deg);
          }
          75% {
            transform: translateY(-12px) rotate(-2deg);
          }
        }
        
        @keyframes powerUpImageRotate {
          0%, 100% { 
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(5deg) scale(1.05);
          }
          50% { 
            transform: rotate(0deg) scale(1);
          }
          75% {
            transform: rotate(-5deg) scale(1.05);
          }
        }
        
        .power-up-image-container:hover {
          transform: translateY(-5px) scale(1.05) !important;
        }
        
        .power-up-image-container:hover .power-up-image {
          transform: rotate(10deg) scale(1.1) !important;
        }
      `}</style>
      <section className="py-5">
        <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card border-0" style={{
            background: 'linear-gradient(135deg, #FEE739 0%, #00d6a3 50%, #1a1a1a 100%)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: `
              0 25px 80px rgba(0, 214, 163, 0.4),
              0 15px 40px rgba(254, 231, 57, 0.3),
              0 5px 15px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
            border: '2px solid rgba(0, 214, 163, 0.3)',
            position: 'relative',
            backdropFilter: 'blur(10px)'
          }}>
            {/* Decorative Elements */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(0, 214, 163, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              zIndex: 1
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              left: '-30px',
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle, rgba(254, 231, 57, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              zIndex: 1
            }}></div>

            <div className="row g-0" style={{ position: 'relative', zIndex: 2 }}>
              {/* Left Side - Illustration */}
              <div className="col-lg-6 d-flex align-items-center justify-content-center p-3 p-lg-1">
                <div className="text-center">
                  <div 
                    className="position-relative mb-4 power-up-image-container"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '50%',
                      padding: '20px',
                      backdropFilter: 'blur(20px)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                      display: 'inline-block',
                      animation: 'powerUpFloat 5s ease-in-out infinite'
                    }}
                  >
                    <Image
                      src="/Unit/power-up.png"
                      alt="ZYLO Token Power Up"
                      width={200}
                      height={200}
                      className="power-up-image"
                      style={{
                        filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))',
                        transition: 'transform 0.3s ease',
                        animation: 'powerUpImageRotate 6s ease-in-out infinite'
                      }}
                    />
                  </div>
                  <p className="text-dark mb-0" style={{ fontSize: '0.9rem', opacity: '0.8', fontWeight: '600' }}>
                  Power Up Digital Ecosystem
                  </p>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="col-lg-6 d-flex align-items-center p-4 p-lg-5">
                <div className="text-dark">
                  <h2 className="fw-bold mb-4" style={{
                    fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
                    color: '#1a1a1a',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    letterSpacing: '-0.5px'
                  }}>
                    POWER UP ZYLO
                  </h2>
                  <p className="mb-4" style={{
                    fontSize: 'clamp(.95rem, 3.6vw, 1.1rem)',
                    lineHeight: '1.7',
                    opacity: '0.9',
                    color: '#2d2d2d',
                    fontWeight: '500',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}>
                    Transform your ZYLO into a force of growth. Activate, engage, and rise through energy-driven Levels and Zones, earning rewards as your digital power expands.
                  </p>
                  <button
                    className="btn btn-lg px-5 py-3 fw-bold"
                    onClick={scrollToStaking}
                    style={{
                      background: 'linear-gradient(135deg, #00d6a3 0%, #1a1a1a 100%)',
                      color: '#ffffff',
                      border: '2px solid #00d6a3',
                      borderRadius: '16px',
                      boxShadow: `
                        0 12px 30px rgba(0, 214, 163, 0.4),
                        0 6px 15px rgba(0, 0, 0, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1)
                      `,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      textTransform: 'uppercase',
                      letterSpacing: '1.2px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                      e.currentTarget.style.boxShadow = `
                        0 20px 40px rgba(0, 214, 163, 0.6),
                        0 10px 25px rgba(0, 0, 0, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2)
                      `;
                      e.currentTarget.style.background = 'linear-gradient(135deg, #FEE739 0%, #00d6a3 100%)';
                      e.currentTarget.style.color = '#1a1a1a';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = `
                        0 12px 30px rgba(0, 214, 163, 0.4),
                        0 6px 15px rgba(0, 0, 0, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1)
                      `;
                      e.currentTarget.style.background = 'linear-gradient(135deg, #00d6a3 0%, #1a1a1a 100%)';
                      e.currentTarget.style.color = '#ffffff';
                    }}>
                     POWER UP ZYLO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ApplyForZylo; 
