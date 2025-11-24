import React from 'react';

const Asset14: React.FC = () => {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      className="w-32 h-32"
    >
      <defs>
        <linearGradient id="iceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f0ffff" />
          <stop offset="50%" stopColor="#b0e0e6" />
          <stop offset="100%" stopColor="#87ceeb" />
        </linearGradient>
        <radialGradient id="ice3D" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#e0ffff" />
          <stop offset="100%" stopColor="#add8e6" />
        </radialGradient>
        <filter id="iceGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <mask id="iceFillMask">
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
      
      {/* Ice Crystal - Snowflake Shape */}
      {/* Center Hexagon */}
      <path
        d="M64 45 L75 51 L75 63 L64 69 L53 63 L53 51 Z"
        fill="url(#ice3D)"
        mask="url(#iceFillMask)"
        filter="url(#iceGlow)"
        stroke="#87ceeb"
        strokeWidth="2"
      />
      
      {/* Snowflake Arms */}
      <line x1="64" y1="20" x2="64" y2="45" stroke="url(#iceGradient)" strokeWidth="3" mask="url(#iceFillMask)" />
      <line x1="64" y1="69" x2="64" y2="100" stroke="url(#iceGradient)" strokeWidth="3" mask="url(#iceFillMask)" />
      <line x1="35" y1="35" x2="53" y2="51" stroke="url(#iceGradient)" strokeWidth="3" mask="url(#iceFillMask)" />
      <line x1="75" y1="63" x2="93" y2="85" stroke="url(#iceGradient)" strokeWidth="3" mask="url(#iceFillMask)" />
      <line x1="93" y1="35" x2="75" y2="51" stroke="url(#iceGradient)" strokeWidth="3" mask="url(#iceFillMask)" />
      <line x1="53" y1="63" x2="35" y2="85" stroke="url(#iceGradient)" strokeWidth="3" mask="url(#iceFillMask)" />
      
      {/* Ice Crystals at Tips */}
      <circle cx="64" cy="20" r="4" fill="#ffffff" mask="url(#iceFillMask)" stroke="#b0e0e6" strokeWidth="1.5" />
      <circle cx="64" cy="100" r="4" fill="#ffffff" mask="url(#iceFillMask)" stroke="#b0e0e6" strokeWidth="1.5" />
      <circle cx="35" cy="35" r="4" fill="#ffffff" mask="url(#iceFillMask)" stroke="#b0e0e6" strokeWidth="1.5" />
      <circle cx="93" cy="85" r="4" fill="#ffffff" mask="url(#iceFillMask)" stroke="#b0e0e6" strokeWidth="1.5" />
      <circle cx="93" cy="35" r="4" fill="#ffffff" mask="url(#iceFillMask)" stroke="#b0e0e6" strokeWidth="1.5" />
      <circle cx="35" cy="85" r="4" fill="#ffffff" mask="url(#iceFillMask)" stroke="#b0e0e6" strokeWidth="1.5" />
      
      {/* Ice Eyes */}
      <circle cx="60" cy="56" r="3" fill="#4682b4" />
      <circle cx="68" cy="56" r="3" fill="#4682b4" />
      <circle cx="61" cy="55" r="1" fill="#fff" />
      <circle cx="69" cy="55" r="1" fill="#fff" />
      
      {/* Ice Smile */}
      <path d="M58 62 Q64 65, 70 62" fill="none" stroke="#87ceeb" strokeWidth="2" mask="url(#iceFillMask)" />
      
      {/* Frost Details */}
      <circle cx="50" cy="45" r="1.5" fill="#ffffff" mask="url(#iceFillMask)" opacity="0.8" />
      <circle cx="78" cy="50" r="1.5" fill="#ffffff" mask="url(#iceFillMask)" opacity="0.8" />
      <circle cx="60" cy="75" r="1.2" fill="#ffffff" mask="url(#iceFillMask)" opacity="0.7" />
      <circle cx="72" cy="70" r="1.3" fill="#ffffff" mask="url(#iceFillMask)" opacity="0.7" />
      
      {/* Inner Sparkles */}
      <path d="M64 30 L65 35 L64 40 L63 35 Z" fill="#ffffff" mask="url(#iceFillMask)" opacity="0.6" />
      <path d="M45 45 L50 46 L45 47 L40 46 Z" fill="#ffffff" mask="url(#iceFillMask)" opacity="0.6" />
      <path d="M83 75 L88 76 L83 77 L78 76 Z" fill="#ffffff" mask="url(#iceFillMask)" opacity="0.6" />
    </svg>
  );
};

export default Asset14;

