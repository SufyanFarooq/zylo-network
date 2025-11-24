import React from 'react';

const Asset5: React.FC = () => {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      className="w-32 h-32"
    >
      <defs>
        <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffff00" />
          <stop offset="30%" stopColor="#ffd700" />
          <stop offset="60%" stopColor="#ff8c00" />
          <stop offset="100%" stopColor="#ff4500" />
        </linearGradient>
        <radialGradient id="flame3D" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="20%" stopColor="#ffff00" />
          <stop offset="50%" stopColor="#ff8c00" />
          <stop offset="100%" stopColor="#ff4500" />
        </radialGradient>
        <filter id="flameShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#ff4500" floodOpacity="0.5"/>
        </filter>
        <mask id="flameFillMask">
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
      
      {/* Large Flame Body */}
      <path
        d="M64 15 Q80 25, 90 45 Q95 65, 88 85 Q80 100, 64 110 Q48 100, 40 85 Q33 65, 38 45 Q48 25, 64 15 Z"
        fill="url(#flame3D)"
        mask="url(#flameFillMask)"
        filter="url(#flameShadow)"
        stroke="#ff8c00"
        strokeWidth="2"
      />
      
      {/* Middle Flame Layer */}
      <path
        d="M64 25 Q75 32, 80 48 Q83 63, 78 78 Q72 90, 64 95 Q56 90, 50 78 Q45 63, 48 48 Q53 32, 64 25 Z"
        fill="url(#flameGradient)"
        mask="url(#flameFillMask)"
        opacity="0.8"
      />
      
      {/* Inner Hot Core */}
      <path
        d="M64 35 Q70 40, 72 50 Q74 60, 70 68 Q66 75, 64 78 Q62 75, 58 68 Q54 60, 56 50 Q58 40, 64 35 Z"
        fill="#ffffff"
        mask="url(#flameFillMask)"
        opacity="0.7"
      />
      
      {/* Flame Eyes */}
      <ellipse cx="58" cy="55" rx="3" ry="4" fill="#333" />
      <ellipse cx="70" cy="55" rx="3" ry="4" fill="#333" />
      <circle cx="59" cy="54" r="1" fill="#fff" />
      <circle cx="71" cy="54" r="1" fill="#fff" />
      
      {/* Flame Smile */}
      <path d="M58 65 Q64 69, 70 65" fill="none" stroke="#ff4500" strokeWidth="2" mask="url(#flameFillMask)" />
      
      {/* Flame Wisps - Top */}
      <path d="M58 20 Q55 10, 60 8 Q62 12, 60 18" fill="#ffff00" mask="url(#flameFillMask)" opacity="0.7" />
      <path d="M70 20 Q73 10, 68 8 Q66 12, 68 18" fill="#ffff00" mask="url(#flameFillMask)" opacity="0.7" />
      <path d="M64 12 Q66 5, 64 3 Q62 5, 64 12" fill="#ffffff" mask="url(#flameFillMask)" opacity="0.8" />
      
      {/* Side Flames */}
      <path d="M40 55 Q33 50, 30 55 Q33 60, 38 58" fill="#ff8c00" mask="url(#flameFillMask)" opacity="0.6" />
      <path d="M88 55 Q95 50, 98 55 Q95 60, 90 58" fill="#ff8c00" mask="url(#flameFillMask)" opacity="0.6" />
      
      {/* Base Glow */}
      <ellipse cx="64" cy="110" rx="25" ry="10" fill="#ff4500" mask="url(#flameFillMask)" opacity="0.4" />
      <ellipse cx="64" cy="108" rx="18" ry="7" fill="#ff8c00" mask="url(#flameFillMask)" opacity="0.3" />
    </svg>
  );
};

export default Asset5;

