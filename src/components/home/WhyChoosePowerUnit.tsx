'use client';

import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import '../../app/home.css';

// Import CSS files for slick carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Lazy load react-slick component
const Slider = dynamic(() => import('react-slick'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '300px' }} />
});

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: 'block', right: '-50px', zIndex: 10 }}
    onClick={onClick}
  >
    <button
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'rgba(0, 204, 112, 0.1)',
                      border: '2px solid #00CC70',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18L15 12L9 6" stroke="#00CC70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  </div>
);

const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: 'block', left: '-50px', zIndex: 10 }}
    onClick={onClick}
  >
    <button
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'rgba(0, 204, 112, 0.1)',
                      border: '2px solid #00CC70',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="#00CC70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  </div>
);

const WhyChoosePowerUnit: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const features = useMemo(() => [
    {
      icon: '🤖',
      title: 'AI-Powered Reward Engines',
      description: 'Advanced artificial intelligence drives consistent reward generation'
    },
    {
      icon: '📊',
      title: 'Transparent Multipliers',
      description: 'Clear, visible reward rates with no hidden fees or surprises'
    },
    {
      icon: '⚡',
      title: 'Real-time Reward Generation',
      description: 'Watch your earnings grow in real-time as your unit works'
    },
    {
      icon: '🎯',
      title: 'Zero Complexity',
      description: 'Simple activation process - no technical knowledge required'
    },
    {
      icon: '🚀',
      title: 'Instant Activation',
      description: 'Start earning immediately after powering up your unit'
    },
    {
      icon: '💰',
      title: 'Non-stop Earning Flow',
      description: 'Continuous rewards until your unit energy depletes'
    },
    {
      icon: '🌍',
      title: 'Built for Global Scalability',
      description: 'Designed to handle millions of users worldwide'
    }
  ], []);

  const settings = useMemo(() => ({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  }), []);

  return (
    <section className="py-5 network-stats" style={{ background: '#032233' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="text-white fw-bold fs-1 mb-3">Why Choose PowerUnit?</h2>
          <p className="text-white-50" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
            PowerUnit isn&apos;t a product — it&apos;s an entire reward universe.
          </p>
        </div>

        <div className="why-choose-carousel" style={{ padding: '0 50px', position: 'relative' }}>
          {isMounted ? (
            <Slider {...settings} className="why-choose-slider">
              {features.map((feature, index) => (
                <div key={index} style={{ padding: '0 12px' }}>
                  <div
                    className="why-choose-card"
                    style={{
                      background: 'linear-gradient(145deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
                      borderRadius: '24px',
                      padding: '2.5rem',
                      border: '2px solid rgba(0, 214, 163, 0.3)',
                      transition: 'all 0.3s ease',
                      minHeight: '320px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      fontSize: '4rem',
                      marginBottom: '1.5rem',
                      filter: 'drop-shadow(0 0 10px rgba(0, 214, 163, 0.5))',
                    }}>
                      {feature.icon}
                    </div>

                    {/* Title */}
                    <h4 style={{
                      color: '#00d6a3',
                      fontSize: '1.4rem',
                      fontWeight: '700',
                      marginBottom: '1rem',
                      textShadow: '0 2px 8px rgba(0, 214, 163, 0.4)',
                      letterSpacing: '0.5px',
                    }}>
                      {feature.title}
                    </h4>

                    {/* Description */}
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontSize: '1rem',
                      lineHeight: '1.6',
                      margin: 0,
                    }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore styled-jsx */}
      <style jsx>{`
        .why-choose-carousel {
          position: relative;
        }

        .why-choose-slider .slick-slide {
          padding: 0 12px;
        }

        .why-choose-slider .slick-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }

        .why-choose-slider .slick-arrow::before {
          display: none !important;
        }

        .why-choose-slider .slick-prev:not(.custom-slick-prev),
        .why-choose-slider .slick-next:not(.custom-slick-next) {
          display: none !important;
        }

        .why-choose-slider .slick-dots {
          bottom: -40px;
        }

        .why-choose-slider .slick-dots li button::before {
          color: #00d6a3;
          font-size: 12px;
        }

        .why-choose-slider .slick-dots li.slick-active button::before {
          color: #00d6a3;
        }

        .why-choose-card {
          transition: all 0.3s ease;
        }

        .why-choose-card:hover {
          border-color: rgba(0, 214, 163, 0.6) !important;
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(0, 214, 163, 0.3), 0 0 20px rgba(0, 214, 163, 0.2) !important;
        }

        .why-choose-slider button:hover {
          background: rgba(0, 204, 112, 0.2) !important;
          border-color: #00CC70 !important;
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .why-choose-carousel {
            padding: 0 20px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChoosePowerUnit;

