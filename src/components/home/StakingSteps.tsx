'use client';

import React from 'react';
import '../../app/home.css';


const StakingSteps: React.FC = () => {
  const steps = [
    {
      icon: '1️⃣',
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
      icon: '2️⃣',
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
      icon: '3️⃣',
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
                <div className="stats-icon">{step.icon}</div>
                <h4 className="text-white fw-bold mb-3">{step.title}</h4>
                <p className="stats-label mb-4">{step.description}</p>
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