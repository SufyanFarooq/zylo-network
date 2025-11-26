'use client';

import React from 'react';
import '../../app/home.css';


const StakingSteps: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Choose Your Unit',
      description: 'Select from 5 powerful AI units — each with unique multipliers and reward output.',
      buttonText: 'View Units',
      buttonClass: 'btn-connect-chain',
      borderClass: 'border-green',
      onClick: () => {
        const unitsSection = document.querySelector('.levels-carousel-section');
        if (unitsSection) {
          unitsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },
    {
      number: 2,
      title: 'Power It Up',
      description: 'Activate your unit instantly using ZYLO tokens.',
      buttonText: 'Activate Now',
      buttonClass: 'btn-download-app',
      borderClass: 'border-yellow',
      onClick: () => {
        window.location.href = '/incept-now';
      }
    },
    {
      number: 3,
      title: 'Earn Automatically',
      description: 'Your unit generates rewards per second until its energy depletes.',
      buttonText: 'Start Earning',
      buttonClass: 'btn-connect-chain',
      borderClass: 'border-green',
      onClick: () => {
        window.location.href = '/power-up';
      }
    }
  ];

  return (
    <section className="py-5 network-stats" >
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="text-white fw-bold fs-1">How It Works</h2>
          <p className="text-white-50 mt-3" style={{ fontSize: '1.1rem' }}>Simple 3-Step Explanation</p>
        </div>

        <div className="row">
          {steps.map((step, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className={`stats-card ${step.borderClass} h-100`}>
                <div 
                  className="stats-icon-number"
                  style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 1.5rem',
                    borderRadius: '50%',
                    background: step.borderClass === 'border-yellow' 
                      ? 'linear-gradient(135deg, rgba(254, 231, 57, 0.3) 0%, rgba(254, 231, 57, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(0, 214, 163, 0.3) 0%, rgba(0, 214, 163, 0.1) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: step.borderClass === 'border-yellow'
                      ? '2px solid rgba(254, 231, 57, 0.4)'
                      : '2px solid rgba(0, 214, 163, 0.4)',
                    boxShadow: step.borderClass === 'border-yellow'
                      ? '0 8px 20px rgba(254, 231, 57, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)'
                      : '0 8px 20px rgba(0, 214, 163, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)',
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    color: '#ffffff',
                    textShadow: step.borderClass === 'border-yellow'
                      ? '0 2px 8px rgba(0, 0, 0, 0.5), 0 0 15px rgba(254, 231, 57, 0.5)'
                      : '0 2px 8px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 214, 163, 0.5)',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                    e.currentTarget.style.boxShadow = step.borderClass === 'border-yellow'
                      ? '0 12px 30px rgba(254, 231, 57, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3)'
                      : '0 12px 30px rgba(0, 214, 163, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    e.currentTarget.style.boxShadow = step.borderClass === 'border-yellow'
                      ? '0 8px 20px rgba(254, 231, 57, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)'
                      : '0 8px 20px rgba(0, 214, 163, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)';
                  }}
                >
                  {step.number}
                </div>
                <h4 
                  className="fw-bold mb-3"
                  style={{
                    color: '#ffffff',
                    fontSize: '1.5rem',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 12px rgba(255, 255, 255, 0.1)',
                    fontWeight: '700'
                  }}
                >
                  {step.title}
                </h4>
                <p 
                  className="mb-4"
                  style={{
                    color: '#ffffff',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)',
                    opacity: 0.95,
                    fontWeight: '400'
                  }}
                >
                  {step.description}
                </p>
                <button
                  className={`btn ${step.buttonClass} px-4 py-2 fw-bold mx-auto`}
                  onClick={step.onClick}
                >
                  {step.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StakingSteps; 