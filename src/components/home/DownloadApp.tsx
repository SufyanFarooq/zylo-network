'use client';

import React from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import '../../app/home.css';
import Image from 'next/image';

const DownloadApp: React.FC = () => {
  return (
    <section className="py-5 network-stats download-app">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content - Smartphone Mockups */}
          <div className="col-lg-6 mb-5 mb-lg-0">
            <Image
              src="/assets/mobile.svg"
              alt="image"
              width={680}
              height={480}
            // style={{ filter: 'brightness(0)' }}
            />
            {/* <div className="position-relative">
          
              <div 
                className="position-relative"
                style={{
                  width: '200px',
                  height: '350px',
                  backgroundColor: '#333',
                  borderRadius: '25px',
                  border: '3px solid var(--primary-green)',
                  transform: 'rotate(-10deg)',
                  boxShadow: '0 0 30px rgba(0, 255, 136, 0.3)'
                }}
              >
                <div className="position-absolute" style={{ top: '20px', left: '50%', transform: 'translateX(-50%)' }}>
                  <div className="text-center">
                    <span className="text-green fw-bold fs-4">Z</span>
                    <p className="text-white small mb-0">Zillow Vortex</p>
                  </div>
                </div>
              </div>

           
              <div 
                className="position-absolute"
                style={{
                  width: '200px',
                  height: '350px',
                  backgroundColor: '#333',
                  borderRadius: '25px',
                  border: '3px solid var(--primary-yellow)',
                  transform: 'rotate(10deg) translate(100px, -50px)',
                  boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
                }}
              >
                <div className="position-absolute" style={{ top: '20px', left: '50%', transform: 'translateX(-50%)' }}>
                  <div className="text-center">
                    <span className="text-yellow fw-bold fs-4">Z</span>
                    <p className="text-white small mb-0">Zillow Vortex</p>
                  </div>
                </div>
              </div>

            
              <div className="position-absolute" style={{ top: '50px', left: '150px', zIndex: '-1' }}>
                <div 
                  style={{
                    width: '100px',
                    height: '4px',
                    backgroundColor: 'var(--primary-green)',
                    borderRadius: '2px',
                    transform: 'rotate(45deg)',
                    opacity: '0.6'
                  }}
                ></div>
              </div>
              <div className="position-absolute" style={{ top: '100px', left: '200px', zIndex: '-1' }}>
                <div 
                  style={{
                    width: '80px',
                    height: '4px',
                    backgroundColor: 'var(--primary-yellow)',
                    borderRadius: '2px',
                    transform: 'rotate(-30deg)',
                    opacity: '0.6'
                  }}
                ></div>
              </div>
            </div> */}
          </div>

          {/* Right Content */}
          <div className="col-lg-6">
            <h2 className="text-white fw-bold display-5 mb-4">Download The App</h2>
            <p className="hero-description mb-4">
              Get the Zillow Vortex mobile app for the best Power Up experience on the go.
              Available on both iOS and Android platforms.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <button
                className="btn btn-download-app d-flex align-items-center"
                onClick={() => {
                  // App Store link - replace with actual app store URL when available
                  window.open('https://apps.apple.com/', '_blank');
                }}
              >
                <FaApple className="me-2" style={{ fontSize: '1.2rem' }} />
                App Store
              </button>
              <button
                className="btn btn-connect-chain d-flex align-items-center"
                onClick={() => {
                  // Google Play Store link - replace with actual play store URL when available
                  window.open('https://play.google.com/store', '_blank');
                }}
              >
                <FaGooglePlay className="me-2" style={{ fontSize: '1.2rem' }} />
                Google Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp; 