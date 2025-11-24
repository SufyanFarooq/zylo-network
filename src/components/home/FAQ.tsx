'use client';

import React, { useState } from 'react';
import '../../app/home.css';


const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How to get started?",
      answer: "Getting started is easy! Simply create a wallet, buy Zillow Vortex tokens, and start Power Up to earn rewards immediately."
    },
    {
      question: "What is Power Up?",
      answer: "Power Up is the process of locking up your tokens to help secure the network and earn rewards in return. It's like earning interest on your crypto holdings."
    },
    {
      question: "How much can I earn?",
      answer: "Earnings depend on the amount Power Up and current APY rates. Our platform offers competitive returns ranging from 8-15% annually."
    },
    {
      question: "Is it safe to Power Up?",
      answer: "Yes! Our platform uses audited smart contracts and implements multiple security layers to ensure your funds are always protected."
    },
    {
      question: "Can I unstake anytime?",
      answer: "Yes, you can unstake your tokens at any time, though there may be a short cooldown period depending on the Power Up pool."
    },
    {
      question: "What wallets are supported?",
      answer: "We support all major wallets including MetaMask, WalletConnect, Trust Wallet, and many others."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-5 network-stats">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="text-white fw-bold fs-1">OUR MOST FREQUENTLY ASKED QUESTIONS</h2>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-3">
                <div 
                  className="stats-card border-secondary"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-white mb-0">{faq.question}</h5>
                    <span className={`text-yellow fs-4 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </div>
                  {openIndex === index && (
                    <div className="mt-3 pt-3 border-top border-secondary">
                      <p className="stats-label mb-0">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 