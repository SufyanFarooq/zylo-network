'use client';

import React from 'react';
import Image from 'next/image';
import '../../app/home.css';

const SecureTransparent: React.FC = () => {
  return (
    <section className="py-5 position-relative" style={{ background: '#032233' }}>
        {/* Blue Lines Background */}
        <div className="position-absolute" style={{ 
          left: "30%", 
          top: "-30%",
          zIndex: '0',
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
          left: "0%", 
          bottom: "-30%",
          zIndex: '0',
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

        <div className="container position-relative mb-5" style={{ zIndex: '1' }}>
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h2 className="text-white fw-bold display-5 mb-4">
                Safe. Smart. Secure.
              </h2>
              <p className="lead text-white mb-4">
                Your assets are protected with next-generation encryption, live performance monitoring, and automated power tracking.
              </p>
              <div className="row">
                <div className="col-12 mb-3">
                  <div className="d-flex align-items-center">
                    <span className="text-green me-2">✓</span>
                    <span className="text-white">Next-generation encryption</span>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="d-flex align-items-center">
                    <span className="text-green me-2">✓</span>
                    <span className="text-white">Live performance monitoring</span>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="d-flex align-items-center">
                    <span className="text-green me-2">✓</span>
                    <span className="text-white">Automated power tracking</span>
                  </div>
                </div>
              </div>
              <p className="text-yellow fw-bold mt-4 mb-0" style={{ fontSize: '1.1rem' }}>
                You control the unit.<br />
                The unit controls the power.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="position-relative text-center">
                <Image 
                  src="/assets/secure/sequre and transparent image.svg" 
                  alt="Security and Transparency" 
                  width={700} 
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

        {/* What Is PowerUnit Section */}
        <div className="container position-relative" style={{ zIndex: '1' }}>
          <div className="row align-items-center">
            {/* Left Content - Image */}
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="position-relative text-center">
                <Image
                  src="/assets/secure/incept-now.png"
                  alt="PowerUnit"
                  width={700}
                  height={500}
                  style={{
                    maxWidth: '100%',
                    // width: 'auto',
                    // height: 'auto',
                    filter: 'drop-shadow(0 10px 30px rgba(0, 255, 163, 0.2))'
                  }}
                  priority
                />
              </div>
            </div>

            {/* Right Content - Text */}
            <div className="col-lg-6">
              <div className="position-relative what-is-powerunit" style={{ zIndex: '1' }}>
                <h2 className="text-white fw-bold display-5 mb-4">
                  What Is PowerUnit?
                </h2>
                <p className="lead text-white mb-4">
                  PowerUnit is a next-generation AI reward ecosystem designed to deliver consistent, automated, and dynamic earning power through our advanced digital units.
                </p>
                <p className="text-white mb-4">
                  Each unit is powered by:
                </p>
                <div className="row">
                  <div className="col-12 mb-3">
                    <div className="d-flex align-items-center">
                      <span className="text-green me-2">⚡</span>
                      <span className="text-white">Intelligent AI reward cycles</span>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="d-flex align-items-center">
                      <span className="text-green me-2">⚡</span>
                      <span className="text-white">Auto-depleting energy system</span>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="d-flex align-items-center">
                      <span className="text-green me-2">⚡</span>
                      <span className="text-white">Scalable multipliers</span>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="d-flex align-items-center">
                      <span className="text-green me-2">⚡</span>
                      <span className="text-white">Smart performance calculation</span>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="d-flex align-items-center">
                      <span className="text-green me-2">⚡</span>
                      <span className="text-white">Purely transparent token mechanics</span>
                    </div>
                  </div>
                </div>
                <p className="text-yellow fw-bold mt-4 mb-0" style={{ fontSize: '1.1rem' }}>
                  Your tokens don&apos;t just sit — they work for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default SecureTransparent;
