'use client';

import React from 'react';
import Image from 'next/image';
import '../../app/home.css';

const SecureTransparent: React.FC = () => {
  return (
    <section className="py-5 position-relative" style={{ background: '#032233' }}>
      {/* Blue Lines Background */}
      <div className="position-absolute" style={{ 
        // top: 0, 
        left: "30%", 
        // right: 0,
        top: "-30%",
        zIndex: '0',
        // opacity: '0.6'
      }}>
        <Image 
          src="/assets/secure/blue lines bg design.svg" 
          alt="Blue Lines Background" 
          width={700} 
          height={500}
          style={{
            width: 'auto',
            height: 'auto',
          }}
        />
      </div>

      <div className="position-absolute" style={{ 
        // top: 0, 
        left: "0%", 
        // right: 0,
        bottom: "-30%",
        zIndex: '0',
        // opacity: '0.6'
      }}>
        <Image 
          src="/assets/secure/blue lines bg design.svg" 
          alt="Blue Lines Background" 
          width={700} 
          height={500}
          style={{
            width: 'auto',
            height: 'auto',
          }}
        />
      </div>

      <div className="container position-relative" style={{ zIndex: '1' }}>
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="position-relative">
              {/* Circle Background */}
              <div className="position-absolute" style={{ 
                left: '-50px', 
                top: '-92px', 
                zIndex: '0'
              }}>
                <Image 
                  src="/assets/secure/Circle bg.svg" 
                  alt="Circle Background" 
                  width={218} 
                  height={218}
                  style={{
                    width: 'auto',
                    height: 'auto',
                  }}
                />
              </div>
              
              {/* Text Content */}
              <div className="position-relative" style={{ zIndex: '1' }}>
                <h2 className="text-white fw-bold display-5 mb-4">
                  SECURE AND<br />
                  TRANSPARENT
                </h2>
                <p className="lead text-white mb-4">
                  Zillow vortex network is fully decentralized, meaning no single
                  entity has control over the network, ensuring security and trust audited by
                  the worlds largest audit company Hacken.
                  It prioritizes security and transparency, ensuring the safety of user assets
                  and network operations.
                </p>
                <div className="row">
                  <div className="col-6 mb-3">
                    <div className="d-flex align-items-center">
                      <span className="text-green me-2">✓</span>
                      <span className="text-white">Multi-layer Security</span>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="d-flex align-items-center">
                      <span className="text-green me-2">✓</span>
                      <span className="text-white">Smart Contract Audited</span>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="d-flex align-items-center">
                      <span className="text-green me-2">✓</span>
                      <span className="text-white">24/7 Monitoring</span>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="d-flex align-items-center">
                      <span className="text-green me-2">✓</span>
                      <span className="text-white">Insurance Protected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Security Image */}
          <div className="col-lg-6">
            <div className="position-relative text-center">
              <Image 
                src="/assets/secure/sequre and transparent image.svg" 
                alt="Security and Transparency" 
                width={500} 
                height={500}
                style={{ 
                  maxWidth: '100%', 
                  width: 'auto',
                  height: 'auto',
                  filter: 'drop-shadow(0 10px 30px rgba(0, 255, 163, 0.2))'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecureTransparent; 