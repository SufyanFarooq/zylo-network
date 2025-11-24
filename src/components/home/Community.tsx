'use client';

import React from 'react';
import '../../app/home.css';

const Community: React.FC = () => {
  return (
    <section className="py-3 network-stats" >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div
              className="text-center p-3"
              style={{
                borderRadius: '60px',
                background: '#00FFA3',
                boxShadow: '0 20px 40px #00FFA3',
                border: 'none',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
              }}></div>
              <div className="position-relative">
                <p className="text-dark fw-bold fs-6 mb-2" style={{ letterSpacing: '2px' }}>COMMUNITY & ECOSYSTEM</p>
                <h2 className="text-dark fw-bold display-4 mb-2" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}>Join the PowerUnit Movement</h2>
                <p className="text-dark mb-3" style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
                  Be part of a fast-growing global movement evolving how users earn with AI.
                </p>
                <p className="text-dark mb-2" style={{ fontSize: '1rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
                  Join the world of: <strong>Power miners</strong>, <strong>Early adopters</strong>, <strong>Digital earners</strong>, <strong>Tech innovators</strong>
                </p>
                <p className="text-dark fw-bold mb-4" style={{ fontSize: '1.2rem' }}>
                  Welcome to the PowerUnit Era.
                </p>
                <button
                  className="btn btn-dark px-5 py-2 fw-bold fs-5"
                  style={{
                    borderRadius: '15px',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => {
                    window.open('https://t.me/zillowvortex', '_blank');
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                  }}>
                  Join Our Telegram Channel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community; 