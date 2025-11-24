import React from 'react';

const Asset10: React.FC = () => {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      className="w-32 h-32"
    >
      <defs>
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#98fb98" />
          <stop offset="50%" stopColor="#32cd32" />
          <stop offset="100%" stopColor="#228b22" />
        </linearGradient>
        <radialGradient id="leaf3D" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#adff2f" />
          <stop offset="50%" stopColor="#32cd32" />
          <stop offset="100%" stopColor="#228b22" />
        </radialGradient>
        <filter id="leafShadow">
          <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.2"/>
        </filter>
        <mask id="leafFillMask">
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
      
      {/* Leaf Body */}
      <path
        d="M64 20 Q80 30, 90 50 Q95 70, 85 85 Q75 95, 64 100 Q53 95, 43 85 Q33 70, 38 50 Q48 30, 64 20 Z"
        fill="url(#leaf3D)"
        mask="url(#leafFillMask)"
        filter="url(#leafShadow)"
        stroke="#228b22"
        strokeWidth="2"
      />
      
      {/* Central Vein */}
      <path d="M64 20 Q64 40, 64 100" stroke="#90ee90" strokeWidth="2.5" mask="url(#leafFillMask)" />
      
      {/* Side Veins */}
      <path d="M64 35 Q55 45, 48 50" stroke="#90ee90" strokeWidth="1.5" mask="url(#leafFillMask)" opacity="0.7" />
      <path d="M64 35 Q73 45, 80 50" stroke="#90ee90" strokeWidth="1.5" mask="url(#leafFillMask)" opacity="0.7" />
      <path d="M64 50 Q55 58, 48 65" stroke="#90ee90" strokeWidth="1.5" mask="url(#leafFillMask)" opacity="0.7" />
      <path d="M64 50 Q73 58, 80 65" stroke="#90ee90" strokeWidth="1.5" mask="url(#leafFillMask)" opacity="0.7" />
      <path d="M64 65 Q55 72, 50 78" stroke="#90ee90" strokeWidth="1.5" mask="url(#leafFillMask)" opacity="0.7" />
      <path d="M64 65 Q73 72, 78 78" stroke="#90ee90" strokeWidth="1.5" mask="url(#leafFillMask)" opacity="0.7" />
      <path d="M64 80 Q58 88, 55 92" stroke="#90ee90" strokeWidth="1.5" mask="url(#leafFillMask)" opacity="0.7" />
      <path d="M64 80 Q70 88, 73 92" stroke="#90ee90" strokeWidth="1.5" mask="url(#leafFillMask)" opacity="0.7" />
      
      {/* Leaf Eyes */}
      <circle cx="58" cy="55" r="4" fill="#1a5c1a" />
      <circle cx="70" cy="55" r="4" fill="#1a5c1a" />
      <circle cx="59" cy="54" r="1.5" fill="#fff" />
      <circle cx="71" cy="54" r="1.5" fill="#fff" />
      
      {/* Leaf Smile */}
      <path d="M56 68 Q64 74, 72 68" fill="none" stroke="#228b22" strokeWidth="2" mask="url(#leafFillMask)" />
      
      {/* Dew Drops */}
      <circle cx="75" cy="40" r="2.5" fill="rgba(255,255,255,0.6)" mask="url(#leafFillMask)" stroke="#e0ffff" strokeWidth="1" />
      <circle cx="52" cy="45" r="2" fill="rgba(255,255,255,0.5)" mask="url(#leafFillMask)" stroke="#e0ffff" strokeWidth="1" />
      <circle cx="78" cy="75" r="1.8" fill="rgba(255,255,255,0.5)" mask="url(#leafFillMask)" stroke="#e0ffff" strokeWidth="1" />
      
      {/* Shine Spots */}
      <ellipse cx="55" cy="38" rx="6" ry="8" fill="rgba(255,255,255,0.25)" mask="url(#leafFillMask)" />
    </svg>
  );
};

export default Asset10;

