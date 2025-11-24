'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import '../../app/home.css';

// Import CSS files normally (Next.js handles optimization)
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Type for Slider ref methods
interface SliderRef {
  slickPrev: () => void;
  slickNext: () => void;
}

// Lazy load react-slick component
const Slider = dynamic(() => import('react-slick'), { 
  ssr: false,
  loading: () => <div style={{ minHeight: '400px' }} />
});

const LevelsCarousel: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const sliderRef = React.useRef<SliderRef | null>(null);
    
    // Callback for innerRef - react-slick uses this to pass the slider instance
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setSliderRef = (slider: any) => {
        sliderRef.current = slider as SliderRef | null;
    };
    const zones = useMemo(() => [
        { 
            zone: 1, 
            zoneName: 'Spark Lift', 
            personalRequirement: '1 active unit', 
            teamRequirement: '3 Spark referrals', 
            rewardShare: '15%', 
            essence: 'The first spark that lights your Zylo fire.',
            color: 'yellow' 
        },
        { 
            zone: 2, 
            zoneName: 'Flicker Growth', 
            personalRequirement: '2 units (1 Spark + 1 Flicker)', 
            teamRequirement: '3 Spark + 3 Flicker', 
            rewardShare: '12%', 
            essence: 'You didn\'t just earn — you duplicated success.',
            color: 'green' 
        },
        { 
            zone: 3, 
            zoneName: 'AI Momentum', 
            personalRequirement: '3 units', 
            teamRequirement: '4 Spark + 3 Flicker + 2 AI', 
            rewardShare: '10%', 
            essence: 'Action-takers only — vision applied, results proven.',
            color: 'yellow' 
        },
        { 
            zone: 4, 
            zoneName: 'Apex Expansion', 
            personalRequirement: '4 units', 
            teamRequirement: '5 Spark + 4 Flicker + 3 AI + 2 Apex', 
            rewardShare: '8%', 
            essence: 'Leadership isn\'t a title — it\'s performance.',
            color: 'green' 
        },
        { 
            zone: 5, 
            zoneName: 'Universe Gate', 
            personalRequirement: '5 units', 
            teamRequirement: '6 Spark + 5 Flicker + 4 AI + 3 Apex + 1 Universe', 
            rewardShare: '7%', 
            essence: 'Not just earning — you\'re building a legacy.',
            color: 'yellow' 
        },
        { 
            zone: 6, 
            zoneName: 'Elite Circle', 
            personalRequirement: '6 units', 
            teamRequirement: '20 active units', 
            rewardShare: '5%', 
            essence: 'Your circle now produces leaders — not followers.',
            color: 'green' 
        },
        { 
            zone: 7, 
            zoneName: 'Prime Network', 
            personalRequirement: '7 units', 
            teamRequirement: '30 active units', 
            rewardShare: '4%', 
            essence: 'Scale achieved — your network is a force.',
            color: 'yellow' 
        },
        { 
            zone: 8, 
            zoneName: 'Master Tier', 
            personalRequirement: '8 units', 
            teamRequirement: '40 active units + 5 Apex', 
            rewardShare: '3%', 
            essence: 'You are architecting growth — not chasing it.',
            color: 'green' 
        },
        { 
            zone: 9, 
            zoneName: 'Crown League', 
            personalRequirement: '9 units', 
            teamRequirement: '60 active units + 8 Universe', 
            rewardShare: '2.5%', 
            essence: 'Champions only — results speak.',
            color: 'yellow' 
        },
        { 
            zone: 10, 
            zoneName: 'Infinity Champion', 
            personalRequirement: '10 units', 
            teamRequirement: '100 active units + milestone audit', 
            rewardShare: '2%', 
            essence: 'Income becomes impact — name becomes power.',
            color: 'green' 
        },
    ], []);

    // Custom Next Arrow Component
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _NextArrow = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} custom-slick-arrow custom-slick-next`}
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
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 204, 112, 0.2)';
                        e.currentTarget.style.borderColor = '#00CC70';
                        e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 204, 112, 0.1)';
                        e.currentTarget.style.borderColor = '#00CC70';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="#00CC70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        );
    };

    // Custom Previous Arrow Component
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _PrevArrow = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} custom-slick-arrow custom-slick-prev`}
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
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 204, 112, 0.2)';
                        e.currentTarget.style.borderColor = '#00CC70';
                        e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 204, 112, 0.1)';
                        e.currentTarget.style.borderColor = '#00CC70';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="#00CC70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        );
    };

    const settings = useMemo(() => ({
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        pauseOnHover: false,
        initialSlide: 0,
        // nextArrow: <NextArrow />,
        // prevArrow: <PrevArrow />,
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
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    }), []);

    return (
        <section className="py-5 levels-carousel-section" style={{
            background: '#032233',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Image */}
            <div
                className="position-absolute w-100 h-100"
                style={{
                    top: 0,
                    left: 50,
                    right: 0,
                    bottom: 0,
                    zIndex: 0,
                    opacity: 0.6,
                    backgroundImage: 'url(/assets/frame.svg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />
            <div className="container pt-5 pb-5 position-relative" style={{ zIndex: 1 }}>
                <div className="text-center mb-5">
                    <h2
                        className="fw-bold fs-1 mb-3"
                        style={{
                            color: '#ffffff',
                            fontSize: '3rem',
                            fontWeight: '900',
                            textShadow: '0 3px 6px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 255, 255, 0.3)',
                            letterSpacing: '2px'
                        }}
                    >
                        Power Up Vortex Zone
                    </h2>
                </div>

                <div className="levels-carousel-wrapper position-relative" style={{ padding: '0 60px' }}>
                    {isMounted ? (
                        // @ts-expect-error - innerRef is valid for react-slick but not in types for dynamic import
                        <Slider innerRef={setSliderRef} {...settings} className="levels-slider">
                            {zones.map((zone, index) => (
                            <div key={index} className="level-slide px-2">
                                <div
                                    className={`level-card ${zone.color}-level`}
                                    style={{
                                        background: 'linear-gradient(145deg, #0a0a1a 0%, #0f0f23 50%, #1a1a2e 100%)',
                                        borderRadius: '24px',
                                        padding: '0',
                                        textAlign: 'center',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                                        border: `2px solid ${zone.color === 'yellow' ? 'rgba(212, 175, 55, 0.3)' : 'rgba(0, 204, 112, 0.3)'}`,
                                        cursor: 'pointer',
                                        height: '520px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0, 0, 0, 0.7), 0 0 20px ${zone.color === 'yellow' ? 'rgba(212, 175, 55, 0.3)' : 'rgba(0, 204, 112, 0.3)'}`;
                                        e.currentTarget.style.borderColor = zone.color === 'yellow' ? 'rgba(212, 175, 55, 0.6)' : 'rgba(0, 204, 112, 0.6)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.borderColor = zone.color === 'yellow' ? 'rgba(212, 175, 55, 0.3)' : 'rgba(0, 204, 112, 0.3)';
                                    }}
                                    onClick={() => {
                                        window.location.href = '/vortex-zone';
                                    }}
                                >
                                    {/* Top Section - Image Area */}
                                    <div style={{
                                        height: '280px',
                                        background: zone.color === 'yellow'
                                            ? 'linear-gradient(135deg, #1a1a0a 0%, #2d2d1a 100%)'
                                            : 'linear-gradient(135deg, #0a1a0f 0%, #1a2d1f 100%)',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '22px 22px 0 0',
                                        overflow: 'hidden',
                                        borderBottom: `2px solid ${zone.color === 'yellow' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(0, 204, 112, 0.2)'}`
                                    }}>
                                        {/* Zone Image - Full Top Half */}
                                        <Image
                                            src={`/assets/home/images/Zone-${zone.zone}.jpg`}
                                            alt={`Zone ${zone.zone}`}
                                            width={400}
                                            height={280}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                zIndex: 1,
                                                filter: 'brightness(0.95) contrast(1.1)'
                                            }}
                                            onError={(e) => {
                                                // Simple fallback - just hide the image
                                                const img = e.currentTarget as HTMLImageElement;
                                                img.style.display = 'none';
                                            }}
                                        />

                                        {/* Zone Badge - Top Left */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '16px',
                                            left: '16px',
                                            background: 'rgba(0, 0, 0, 0.7)',
                                            backdropFilter: 'blur(10px)',
                                            color: '#ffffff',
                                            padding: '8px 14px',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                                            zIndex: 2
                                        }}>
                                            Zone {zone.zone}
                                        </div>

                                        {/* Reward Share Badge - Bottom Right */}
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '16px',
                                            right: '16px',
                                            background: 'rgba(0, 0, 0, 0.7)',
                                            backdropFilter: 'blur(10px)',
                                            color: '#ffffff',
                                            padding: '10px 16px',
                                            borderRadius: '12px',
                                            fontSize: '0.85rem',
                                            fontWeight: '800',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                                            zIndex: 2
                                        }}>
                                            {zone.rewardShare} <span style={{ color: zone.color === 'yellow' ? '#D4AF37' : '#00CC70', fontWeight: '700' }}>Reward</span>
                                        </div>
                                    </div>

                                    {/* Bottom Section - Data Area */}
                                    <div style={{
                                        background: 'linear-gradient(145deg, #0f0f1a 0%, #1a1a2e 100%)',
                                        padding: '1.75rem',
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        borderRadius: '0 0 22px 22px',
                                        minHeight: '240px'
                                    }}>
                                        {/* Title and Quote */}
                                        <div style={{ marginBottom: '1.25rem' }}>
                                            <h3 style={{
                                                fontSize: '1.5rem',
                                                fontWeight: '800',
                                                color: zone.color === 'yellow' ? '#D4AF37' : '#00CC70',
                                                margin: '0 0 0.75rem 0',
                                                textShadow: `0 2px 8px rgba(0, 0, 0, 0.8), 0 0 12px ${zone.color === 'yellow' ? 'rgba(212, 175, 55, 0.4)' : 'rgba(0, 204, 112, 0.4)'}`,
                                                letterSpacing: '0.5px'
                                            }}>
                                                {zone.zoneName}
                                            </h3>
                                            <div style={{
                                                fontSize: '0.85rem',
                                                color: 'rgba(255, 255, 255, 0.75)',
                                                fontStyle: 'italic',
                                                lineHeight: '1.5',
                                                textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
                                                padding: '0.5rem 0'
                                            }}>
                                                &ldquo;{zone.essence}&rdquo;
                                            </div>
                                        </div>

                                        {/* Requirements Grid */}
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.9rem'
                                        }}>
                                            {/* Personal Requirement */}
                                            <div style={{
                                                background: zone.color === 'yellow' 
                                                    ? 'rgba(212, 175, 55, 0.1)' 
                                                    : 'rgba(0, 204, 112, 0.1)',
                                                padding: '1rem',
                                                borderRadius: '12px',
                                                border: `1px solid ${zone.color === 'yellow' ? 'rgba(212, 175, 55, 0.3)' : 'rgba(0, 204, 112, 0.3)'}`,
                                                backdropFilter: 'blur(5px)'
                                            }}>
                                                <div style={{
                                                    fontSize: '0.7rem',
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                    fontWeight: '600',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.8px',
                                                    marginBottom: '0.5rem',
                                                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                                                }}>
                                                    Personal Requirement
                                                </div>
                                                <div style={{
                                                    fontSize: '0.95rem',
                                                    fontWeight: '700',
                                                    color: zone.color === 'yellow' ? '#D4AF37' : '#00CC70',
                                                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
                                                    lineHeight: '1.4'
                                                }}>
                                                    {zone.personalRequirement}
                                                </div>
                                            </div>

                                            {/* Team Requirement */}
                                            <div style={{
                                                background: zone.color === 'yellow' 
                                                    ? 'rgba(212, 175, 55, 0.1)' 
                                                    : 'rgba(0, 204, 112, 0.1)',
                                                padding: '1rem',
                                                borderRadius: '12px',
                                                border: `1px solid ${zone.color === 'yellow' ? 'rgba(212, 175, 55, 0.3)' : 'rgba(0, 204, 112, 0.3)'}`,
                                                backdropFilter: 'blur(5px)'
                                            }}>
                                                <div style={{
                                                    fontSize: '0.7rem',
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                    fontWeight: '600',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.8px',
                                                    marginBottom: '0.5rem',
                                                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                                                }}>
                                                    Team Requirement
                                                </div>
                                                <div style={{
                                                    fontSize: '0.95rem',
                                                    fontWeight: '700',
                                                    color: zone.color === 'yellow' ? '#D4AF37' : '#00CC70',
                                                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
                                                    lineHeight: '1.4'
                                                }}>
                                                    {zone.teamRequirement}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </Slider>
                    ) : (
                        <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        .levels-carousel-section {
          position: relative;
          overflow: hidden;
        }
        
                 .levels-carousel-wrapper {
           padding: 0 40px;
         }
        
                 .nav-arrow {
           outline: none;
           border: none;
         }
         
         .nav-arrow:focus {
           outline: none;
         }
        
        .levels-slider {
          margin: 0 -10px;
        }
        
        /* Hide ALL default slick arrows completely */
        .levels-slider .slick-prev:not(.custom-slick-prev),
        .levels-slider .slick-next:not(.custom-slick-next),
        .levels-slider button.slick-prev:not(.custom-slick-prev),
        .levels-slider button.slick-next:not(.custom-slick-next) {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        
        /* Hide default slick arrow before/after pseudo-elements */
        .levels-slider .slick-prev:not(.custom-slick-prev)::before,
        .levels-slider .slick-next:not(.custom-slick-next)::before {
          display: none !important;
          content: '' !important;
          opacity: 0 !important;
        }
        
        /* Show only custom arrows */
        .levels-slider .custom-slick-arrow,
        .levels-slider .custom-slick-prev,
        .levels-slider .custom-slick-next {
          display: block !important;
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
        }
        
        .level-slide {
          outline: none;
        }
        
        .level-card {
          position: relative;
          overflow: hidden;
        }
        
        .yellow-level {
          background: rgba(212, 175, 55, 0.08) !important;
        }
        
        .green-level {
          background: rgba(0, 204, 112, 0.08) !important;
        }
        
                 @media (max-width: 768px) {
           .levels-carousel-wrapper {
             padding: 0 20px;
           }
          
                     .nav-arrow {
             width: 40px !important;
             height: 40px !important;
           }
           
           .nav-arrow svg {
             width: 16px !important;
             height: 16px !important;
           }
        }
      `}</style>
        </section>
    );
};

export default LevelsCarousel; 