import React from 'react';

const Asset2: React.FC = () => {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      className="w-32 h-32"
    >
      <defs>
        <radialGradient id="glow3D" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#e0ffff" />
          <stop offset="60%" stopColor="#87ceeb" />
          <stop offset="100%" stopColor="#4169e1" />
        </radialGradient>
        <filter id="glowEffect" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <mask id="glowFillMask">
          <rect 
            x="0" 
            y="0" 
            width="128" 
            height="128" 
            fill="white"
            transform="translate(0, 0)"
          />
        </mask>
      </defs>
      
      {/* Glow Body - Orb */}
      <circle cx="64" cy="64" r="35" fill="url(#glow3D)" mask="url(#glowFillMask)" filter="url(#glowEffect)" />
      <circle cx="64" cy="64" r="35" fill="none" stroke="#87ceeb" strokeWidth="2" />
      
      {/* Inner Orb Layers */}
      <circle cx="64" cy="64" r="25" fill="#e0ffff" mask="url(#glowFillMask)" opacity="0.5" />
      <circle cx="64" cy="64" r="15" fill="#ffffff" mask="url(#glowFillMask)" opacity="0.7" />
      
      {/* Glow Eyes */}
      <ellipse cx="58" cy="60" rx="4" ry="5" fill="#4169e1" />
      <ellipse cx="70" cy="60" rx="4" ry="5" fill="#4169e1" />
      <circle cx="59" cy="59" r="1.5" fill="#fff" />
      <circle cx="71" cy="59" r="1.5" fill="#fff" />
      
      {/* Glow Smile */}
      <path d="M58 72 Q64 78, 70 72" fill="none" stroke="#87ceeb" strokeWidth="2.5" mask="url(#glowFillMask)" />
      
      {/* Aura Rings */}
      <circle cx="64" cy="64" r="40" fill="none" stroke="#87ceeb" strokeWidth="2" opacity="0.4" mask="url(#glowFillMask)" />
      <circle cx="64" cy="64" r="45" fill="none" stroke="#4169e1" strokeWidth="1.5" opacity="0.3" mask="url(#glowFillMask)" />
      <circle cx="64" cy="64" r="50" fill="none" stroke="#00ffff" strokeWidth="1" opacity="0.2" mask="url(#glowFillMask)" />
      
      {/* Light Rays */}
      <line x1="64" y1="20" x2="64" y2="30" stroke="#e0ffff" strokeWidth="2" mask="url(#glowFillMask)" opacity="0.6" />
      <line x1="64" y1="98" x2="64" y2="108" stroke="#e0ffff" strokeWidth="2" mask="url(#glowFillMask)" opacity="0.6" />
      <line x1="20" y1="64" x2="30" y2="64" stroke="#e0ffff" strokeWidth="2" mask="url(#glowFillMask)" opacity="0.6" />
      <line x1="98" y1="64" x2="108" y2="64" stroke="#e0ffff" strokeWidth="2" mask="url(#glowFillMask)" opacity="0.6" />
      
      {/* Sparkle Details */}
      <circle cx="50" cy="50" r="2" fill="#ffffff" mask="url(#glowFillMask)" opacity="0.8" />
      <circle cx="78" cy="50" r="2" fill="#ffffff" mask="url(#glowFillMask)" opacity="0.8" />
      <circle cx="64" cy="85" r="2.5" fill="#e0ffff" mask="url(#glowFillMask)" opacity="0.7" />
    </svg>
  );
};

export default Asset2;

