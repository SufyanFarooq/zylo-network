import React from 'react';

const Asset13: React.FC = () => {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      className="w-32 h-32"
    >
      <defs>
        <linearGradient id="raindropGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#add8e6" />
          <stop offset="50%" stopColor="#4682b4" />
          <stop offset="100%" stopColor="#1e90ff" />
        </linearGradient>
        <radialGradient id="raindrop3D" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#e0ffff" />
          <stop offset="50%" stopColor="#87ceeb" />
          <stop offset="100%" stopColor="#4682b4" />
        </radialGradient>
        <filter id="raindropShadow">
          <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.2"/>
        </filter>
        <mask id="raindropFillMask">
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
      
      {/* Raindrop Body - Teardrop Shape */}
      <path
        d="M64 20 Q50 35, 45 55 Q40 75, 45 85 Q50 95, 64 100 Q78 95, 83 85 Q88 75, 83 55 Q78 35, 64 20 Z"
        fill="url(#raindrop3D)"
        mask="url(#raindropFillMask)"
        filter="url(#raindropShadow)"
        stroke="#4682b4"
        strokeWidth="2"
      />
      
      {/* Shine Highlight */}
      <ellipse cx="55" cy="40" rx="10" ry="15" fill="rgba(255,255,255,0.6)" mask="url(#raindropFillMask)" />
      <ellipse cx="52" cy="35" rx="5" ry="8" fill="rgba(255,255,255,0.8)" mask="url(#raindropFillMask)" />
      
      {/* Raindrop Eyes */}
      <circle cx="58" cy="58" r="4" fill="#1e90ff" />
      <circle cx="70" cy="58" r="4" fill="#1e90ff" />
      <circle cx="59" cy="57" r="1.5" fill="#fff" />
      <circle cx="71" cy="57" r="1.5" fill="#fff" />
      
      {/* Raindrop Smile */}
      <path d="M56 70 Q64 76, 72 70" fill="none" stroke="#4682b4" strokeWidth="2" mask="url(#raindropFillMask)" />
      
      {/* Water Ripple Effect */}
      <ellipse cx="64" cy="60" rx="15" ry="18" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" mask="url(#raindropFillMask)" />
      
      {/* Small Droplets */}
      <circle cx="45" cy="50" r="2" fill="rgba(173,216,230,0.6)" mask="url(#raindropFillMask)" stroke="#87ceeb" strokeWidth="1" />
      <circle cx="83" cy="55" r="1.8" fill="rgba(173,216,230,0.6)" mask="url(#raindropFillMask)" stroke="#87ceeb" strokeWidth="1" />
      
      {/* Inner Reflection */}
      <path d="M70 45 Q75 50, 78 55" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" mask="url(#raindropFillMask)" />
    </svg>
  );
};

export default Asset13;

