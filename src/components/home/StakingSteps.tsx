'use client';

import React from 'react';
import '../../app/home.css';


const StakingSteps: React.FC = () => {
  const steps = [
    {
      icon: '👛',
      title: 'Create Wallet',
      description: 'Set up your secure digital wallet to store your tokens',
      buttonText: 'Go To Wallet',
      buttonClass: 'btn-connect-chain',
      borderClass: 'border-green'
    },
    {
      icon: '💰',
      title: 'Buy Token',
      description: 'Purchase Zillow Vortex tokens from supported exchanges',
      buttonText: 'Buy Now',
      buttonClass: 'btn-download-app',
      borderClass: 'border-yellow'
    },
    {
      icon: '✅',
      title: 'Start Power Up',
      description: 'Power Up your tokens and start earning rewards immediately',
      buttonText: 'Power Up Now',
      buttonClass: 'btn-connect-chain',
      borderClass: 'border-green'
    }
  ];

  return (
    <section className="py-5 network-stats" >
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="text-white fw-bold fs-1">START Power Up WITH 3 EASY STEPS</h2>
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
                  onClick={() => {
                    if (step.title === 'Create Wallet') {
                      // Open MetaMask
                      if (typeof window !== 'undefined' && (window as { ethereum?: unknown }).ethereum) {
                        ((window as { ethereum?: { request: (_params: { method: string }) => void } }).ethereum?.request({ method: 'eth_requestAccounts' }));
                      } else {
                        window.open('https://metamask.io/download/', '_blank');
                      }
                    } else if (step.title === 'Buy Token') {
                      // Buy Now - placeholder for now
                      alert('Buy functionality coming soon!');
                    } else if (step.title === 'Start Staking') {
                      // Go to staking page
                      window.location.href = '/power-up';
                    }
                  }}
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