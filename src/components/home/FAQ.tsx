'use client';

import React, { useState } from 'react';
import '../../app/home.css';


const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Zylo Vortex?",
      answer: "A digital world where your effort, strategy, and smart choices turn into real rewards."
    },
    {
      question: "How do I grow in Zylo Vortex?",
      answer: "Level up by activating unique Units and progressing through energy-driven Zones."
    },
    {
      question: "What are Units?",
      answer: "Special gamified assets (Spark Up → Zylo Universe) that evolve and generate rewards as you play."
    },
    {
      question: "How do I earn rewards?",
      answer: "Rewards are based on your activity, energy growth, and milestones, not luck or outside factors."
    },
    {
      question: "What are Mystery Boxes?",
      answer: "Gamified surprises unlocked when you hit specific Unit combinations or milestone goals."
    },
    {
      question: "How does the Leaderboard work?",
      answer: "It celebrates the most consistent and active players, with daily, weekly, and monthly recognition."
    },
    {
      question: "What is Zylo Universe?",
      answer: "An exclusive layer of the ecosystem giving active users special privileges and long-term benefits."
    },
    {
      question: "How is token value kept strong?",
      answer: "Through a dynamic auto-burn system tied to rewards, ensuring scarcity and sustainability."
    },
    {
      question: "Can I control my progress?",
      answer: "Absolutely — your strategy, timing, and engagement decide your growth and unlocked rewards."
    },
    {
      question: "Why is Zylo Vortex unique?",
      answer: "Because it's a skill-based, gamified, energy-driven blockchain ecosystem with unique Units, Zones, Mystery Boxes, and a Zylo Universe experience."
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
                  style={{ 
                    cursor: 'pointer',
                    background: 'rgba(3, 34, 51, 0.8)',
                    border: '1px solid rgba(0, 214, 163, 0.3)',
                    borderRadius: '12px',
                    padding: '1.25rem 1.5rem',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => toggleFAQ(index)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 214, 163, 0.5)';
                    e.currentTarget.style.background = 'rgba(3, 34, 51, 0.95)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 214, 163, 0.3)';
                    e.currentTarget.style.background = 'rgba(3, 34, 51, 0.8)';
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 
                      className="mb-0"
                      style={{
                        color: '#ffffff',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      {faq.question}
                    </h5>
                    <span 
                      className={`fs-4 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                      style={{
                        color: '#FEE739',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      ▼
                    </span>
                  </div>
                  {openIndex === index && (
                    <div 
                      className="mt-3 pt-3"
                      style={{
                        borderTop: '1px solid rgba(0, 214, 163, 0.2)',
                        paddingTop: '1rem'
                      }}
                    >
                      <p 
                        className="mb-0"
                        style={{
                          color: '#ffffff',
                          fontSize: '0.95rem',
                          lineHeight: '1.6',
                          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                          opacity: 0.9
                        }}
                      >
                        {faq.answer}
                      </p>
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