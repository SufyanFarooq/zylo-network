"use client";

import React from "react";
import Image from "next/image";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './level.css'

type Level = {
    id: number;                 // 1..10
    name: string;
    selfHold: string;
    directReward: string;
    directReferrals: string;
    progress?: number;          // 0–100 for the user
    cta?: string;
    // Zone details
    zoneName?: string;
    purpose?: string;
    personalRequirement?: string;
    teamRequirement?: string;
    quote?: string;
};

// You can pass your own list + current level in props.
// If you don't, these defaults will render.directReferrals
const DEFAULT_LEVELS: Level[] = [
    {
        id: 1,
        name: "Novice",
        selfHold: "50 ZYLO",
        directReferrals: "1",
        directReward: "15%",
        progress: 40,
        zoneName: "Spark Lift",
        purpose: "Entry ignition & trust building",
        personalRequirement: "1 active unit",
        teamRequirement: "3 Spark referrals",
        quote: "The first spark that lights your Zylo fire."
    },
    {
        id: 2,
        name: "Scout",
        selfHold: "200 ZYLO",
        directReferrals: "3",
        directReward: "12%",
        progress: 15,
        zoneName: "Flicker Growth",
        purpose: "Foundation + duplication",
        personalRequirement: "2 units Spark up",
        teamRequirement: "3 Spark + 3 Flicker",
        quote: "You didn't just earn — you duplicated success."
    },
    {
        id: 3,
        name: "Seeker",
        selfHold: "500 ZYLO",
        directReferrals: "5",
        directReward: "10%",
        progress: 65,
        zoneName: "AI Momentum",
        purpose: "Skill + strategy validation",
        personalRequirement: "3 units",
        teamRequirement: "4 Spark + 3 Flicker + 2 AI",
        quote: "Action-takers only — vision applied, results proven."
    },
    {
        id: 4,
        name: "Ranger",
        selfHold: "700 ZYLO",
        directReferrals: "7",
        directReward: "8%",
        progress: 30,
        zoneName: "Apex Expansion",
        purpose: "Leadership proof stage",
        personalRequirement: "4 units",
        teamRequirement: "5 Spark + 4 Flicker + 3 AI + 2 Apex",
        quote: "Leadership isn't a title — it's performance."
    },
    {
        id: 5,
        name: "Guardian",
        selfHold: "900 ZYLO",
        directReferrals: "10",
        directReward: "5%",
        progress: 10,
        zoneName: "Universe Gate",
        purpose: "Elite entry stage",
        personalRequirement: "5 units",
        teamRequirement: "6 Spark + 5 Flicker + 4 AI + 3 Apex",
        quote: "Not just earning — you're building a legacy."
    },
    {
        id: 6,
        name: "Warden",
        selfHold: "1,000 ZYLO",
        directReferrals: "13",
        directReward: "3%",
        progress: 0,
        zoneName: "Elite Circle",
        purpose: "Leader-producing stage",
        personalRequirement: "6 units",
        teamRequirement: "20 active units",
        quote: "Your circle now produces leaders — not followers."
    },
    {
        id: 7,
        name: "Champion",
        selfHold: "1,200 ZYLO",
        directReferrals: "15",
        directReward: "2%",
        progress: 0,
        zoneName: "Prime Network",
        purpose: "Large-scale duplication",
        personalRequirement: "7 units",
        teamRequirement: "30 active units",
        quote: "Scale achieved — your network is a force."
    },
    {
        id: 8,
        name: "Overseer",
        selfHold: "1,500 ZYLO",
        directReferrals: "17",
        directReward: "2%",
        progress: 0,
        zoneName: "Master Tier",
        purpose: "System architect level",
        personalRequirement: "8 units",
        teamRequirement: "40 active units + 5 Apex",
        quote: "You are architecting growth — not chasing it."
    },
    {
        id: 9,
        name: "Mythic",
        selfHold: "1,700 ZYLO",
        directReferrals: "20",
        directReward: "2%",
        progress: 0,
        zoneName: "Crown League",
        purpose: "Champion tier",
        personalRequirement: "9 units",
        teamRequirement: "60 active units",
        quote: "Champions only — results speak."
    },
    {
        id: 10,
        name: "Vortex Elite",
        selfHold: "2,500 ZYLO",
        directReferrals: "30",
        directReward: "5%",
        progress: 0,
        zoneName: "Infinity Champion",
        purpose: "Global elite",
        personalRequirement: "10 units",
        teamRequirement: "100 active units + milestone audit",
        quote: "Income becomes impact — name becomes power."
    },
];

type Props = {
    levels?: Level[];
    /** 1-based id of user’s current level; centers on it */
    currentLevelId?: number; // e.g., 3
};

const Arrow = ({ dir, onClick }: { dir: "prev" | "next"; onClick?: () => void }) => (
    <button
        type="button"
        aria-label={dir === "next" ? "Next" : "Previous"}
        onClick={onClick}
        className={`slick-arrow-pill ${dir}`}
        style={{ cursor: "pointer" }} // ensures pointer stays clickable
    >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
                d={dir === "next" ? "M8 4l8 8-8 8" : "M16 4l-8 8 8 8"} // flipped path for prev
                stroke="black"
                strokeWidth="2.5"

                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </button>
);


export default function LevelCardsCarousel({ levels }: Props) {
    const data = levels ?? DEFAULT_LEVELS;

    const settings: Settings = {
        dots: true,
        infinite: false,
        speed: 450,
        swipeToSlide: true,
        centerMode: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <Arrow dir="next" />,
        prevArrow: <Arrow dir="prev" />,
        responsive: [
            { breakpoint: 1400, settings: { slidesToShow: 4 } },
            { breakpoint: 1200, settings: { slidesToShow: 3 } },
            { breakpoint: 992, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mb-4">
                        <div className="text-start">
                            <h1
                                className="text-yellow fw-bold display-4 mb-4"
                                style={{
                                    textShadow: '2px 2px 4px rgba(254, 230, 0, 0.3)',
                                    letterSpacing: '2px'
                                }}
                            >
                                Vortex Zone DETAILS
                            </h1>
                            <p
                                className="text-white"
                                style={{
                                    fontSize: '0.95rem',
                                    // lineHeight: '1.8',
                                    // maxWidth: '500px'
                                }}
                            >
                                Don&apos;t miss out on the opportunity to maximize your earning potential with our multi-Vortex Zone referral program! Join today and start earning unlimited rewards by sharing our platform with others. With up to 15 levels of referral rewards available and triple rewards for each account, there&apos;s never been a better time to join our community and start earning passive income. Quick incept now and unlock the power of unlimited referral rewards!
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-6 text-lg-end text-center mb-3">
                        <Image
                            src="/assets/levels/level.png"
                            alt="Levels graphic"
                            width={420}
                            height={160}
                            style={{ height: 'auto', maxWidth: '100%' }}
                        />
                    </div>

                </div>
                <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                    <Slider {...settings} className="levels-slider">
                        {data.map((lvl) => {
                            return (
                                <div key={lvl.id} className="px-2" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                                    <article
                                        className="level-card-pro h-100"
                                        style={{
                                            minHeight: '480px',
                                            padding: '1.25rem',
                                        }}
                                    >
                                        <header className="d-flex align-items-center justify-content-between mb-3" style={{ paddingTop: '0.5rem' }}>
                                            <span className="badge level-badge">
                                                Zone {lvl.id}
                                            </span>
                                            <div className="level-coin">
                                                <span>V</span>
                                            </div>
                                        </header>

                                        {/* Zone Name */}
                                        <h5
                                            className="mb-3 fw-bold level-title"
                                            style={{
                                                fontSize: '1.25rem',
                                                color: '#FEE739',
                                                textShadow: '0 2px 8px rgba(254, 231, 57, 0.3)',
                                                letterSpacing: '0.5px',
                                            }}
                                        >
                                            {lvl.zoneName || lvl.name}
                                        </h5>

                                        {/* Purpose */}
                                        <div className="mb-3">
                                            <div style={{
                                                fontSize: '0.7rem',
                                                color: 'rgba(255, 255, 255, 0.5)',
                                                marginBottom: '0.4rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                fontWeight: '600',
                                            }}>
                                                Purpose
                                            </div>
                                            <div style={{
                                                fontSize: '0.85rem',
                                                color: '#ffffff',
                                                fontWeight: '500',
                                                lineHeight: '1.4',
                                            }}>
                                                {lvl.purpose || 'N/A'}
                                            </div>
                                        </div>

                                        {/* Requirements */}
                                        <div className="mb-3">
                                            <div style={{
                                                fontSize: '0.7rem',
                                                color: 'rgba(255, 255, 255, 0.5)',
                                                marginBottom: '0.4rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                fontWeight: '600',
                                            }}>
                                                Requirements
                                            </div>
                                            <div style={{
                                                fontSize: '0.8rem',
                                                color: '#ffffff',
                                                marginBottom: '0.4rem',
                                                lineHeight: '1.4',
                                            }}>
                                                <strong style={{ color: '#FEE739' }}>Personal:</strong> {lvl.personalRequirement || 'N/A'}
                                            </div>
                                            <div style={{
                                                fontSize: '0.8rem',
                                                color: '#ffffff',
                                                lineHeight: '1.4',
                                            }}>
                                                <strong style={{ color: '#FEE739' }}>Team:</strong> {lvl.teamRequirement || 'N/A'}
                                            </div>
                                        </div>

                                        {/* Reward Share */}
                                        <div className="mb-3">
                                            <div style={{
                                                fontSize: '0.7rem',
                                                color: 'rgba(255, 255, 255, 0.5)',
                                                marginBottom: '0.4rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                fontWeight: '600',
                                            }}>
                                                Reward Share
                                            </div>
                                            <div style={{
                                                fontSize: '1.4rem',
                                                color: '#00d6a3',
                                                fontWeight: '700',
                                                textShadow: '0 2px 8px rgba(0, 214, 163, 0.3)',
                                            }}>
                                                {lvl.directReward}
                                            </div>
                                        </div>

                                        {/* Essence / Quote */}
                                        <div className="mb-2" style={{ marginTop: 'auto' }}>
                                            <div style={{
                                                fontSize: '0.7rem',
                                                color: 'rgba(255, 255, 255, 0.5)',
                                                marginBottom: '0.4rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                fontWeight: '600',
                                            }}>
                                                Essence / Quote
                                            </div>
                                            <div style={{
                                                fontSize: '0.85rem',
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                fontStyle: 'italic',
                                                lineHeight: '1.5',
                                                padding: '0.75rem',
                                                background: 'rgba(0, 0, 0, 0.2)',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(254, 231, 57, 0.1)',
                                            }}>
                                                &ldquo;{lvl.quote || 'N/A'}&rdquo;
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            );
                        })}
                    </Slider>
                </div>

                {/* <p className="text-center mt-4 text-gray small">
                    Tip: invite friends to stack referral rewards up to 15 Vortex Zone.
                </p> */}
            </div>
        </section>
    );
}
