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
        directReward: "10%",
        progress: 40,
        zoneName: "Spark Lift",
        purpose: "Entry ignition & trust building",
        personalRequirement: "1 active unit Spark up",
        teamRequirement: "2 Active unit Spark up",
        quote: "The first spark that lights your Zylo fire."
    },
    {
        id: 2,
        name: "Scout",
        selfHold: "200 ZYLO",
        directReferrals: "3",
        directReward: "8%",
        progress: 15,
        zoneName: "Flicker Growth",
        purpose: "Foundation + duplication",
        personalRequirement: "2 active unit Spark up",
        teamRequirement: "5 Active unit Spark up",
        quote: "You didn't just earn — you duplicated success."
    },
    {
        id: 3,
        name: "Seeker",
        selfHold: "500 ZYLO",
        directReferrals: "5",
        directReward: "6%",
        progress: 65,
        zoneName: "AI Momentum",
        purpose: "Skill + strategy validation",
        personalRequirement: "1 active unit flicker roar",
        teamRequirement: "10 Active unit Spark up",
        quote: "Action-takers only — vision applied, results proven."
    },
    {
        id: 4,
        name: "Ranger",
        selfHold: "700 ZYLO",
        directReferrals: "7",
        directReward: "5%",
        progress: 30,
        zoneName: "Apex Expansion",
        purpose: "Leadership proof stage",
        personalRequirement: "1 active unit flicker roar",
        teamRequirement: "10 Spark up + 1 Flicker",
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
        personalRequirement: "1 active unit flicker roar",
        teamRequirement: "12 Spark up + 1 Flicker",
        quote: "Not just earning — you're building a legacy."
    },
    {
        id: 6,
        name: "Warden",
        selfHold: "1,000 ZYLO",
        directReferrals: "13",
        directReward: "4%",
        progress: 0,
        zoneName: "Elite Circle",
        purpose: "Leader-producing stage",
        personalRequirement: "2 active unit flicker roar",
        teamRequirement: "15 Spark up + 1 Flicker",
        quote: "Your circle now produces leaders — not followers."
    },
    {
        id: 7,
        name: "Champion",
        selfHold: "1,200 ZYLO",
        directReferrals: "15",
        directReward: "3%",
        progress: 0,
        zoneName: "Prime Network",
        purpose: "Large-scale duplication",
        personalRequirement: "1 active unit Ai overrider",
        teamRequirement: "18 Spark up + 2 Flicker",
        quote: "Scale achieved — your network is a force."
    },
    {
        id: 8,
        name: "Overseer",
        selfHold: "1,500 ZYLO",
        directReferrals: "17",
        directReward: "3%",
        progress: 0,
        zoneName: "Master Tier",
        purpose: "System architect level",
        personalRequirement: "1 active unit Ai overrider",
        teamRequirement: "21 Spark up + 2 Flicker",
        quote: "You are architecting growth — not chasing it."
    },
    {
        id: 9,
        name: "Mythic",
        selfHold: "1,700 ZYLO",
        directReferrals: "20",
        directReward: "3%",
        progress: 0,
        zoneName: "Crown League",
        purpose: "Champion tier",
        personalRequirement: "2 active unit Ai overrider",
        teamRequirement: "25 Spark up + 2 Flicker",
        quote: "Champions only — results speak."
    },
    {
        id: 10,
        name: "Vortex Elite",
        selfHold: "2,500 ZYLO",
        directReferrals: "30",
        directReward: "2%",
        progress: 0,
        zoneName: "Infinity Champion",
        purpose: "Global elite",
        personalRequirement: "1 active unit Zylo apex",
        teamRequirement: "30 Spark up + 3 Flicker",
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
                                Vortex Zone Details
                            </h1>
                            <p
                                className="text-white"
                                style={{
                                    fontSize: '0.95rem',
                                    // lineHeight: '1.8',
                                    // maxWidth: '500px'
                                }}
                            >
                                Unlock the full potential of your ZYLO energy within the Vortex Zones. Activate your Units, reach milestones, and earn rewards based on skill, strategy, and engagement.
                                With multiple Zone’s and dynamic reward multipliers, every action counts. Step into the Vortex, power up your energy, and watch your influence and rewards grow. Join the community today and experience the next-level gamified earning ecosystem.
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
