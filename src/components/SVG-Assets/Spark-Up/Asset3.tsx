import React from 'react';

const Asset3: React.FC = () => {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      className="w-32 h-32"
    >
      <defs>
        <radialGradient id="spark3D" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#ffff00" />
          <stop offset="70%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#ff8c00" />
        </radialGradient>
        <filter id="sparkGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <mask id="sparkFillMask">
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
      
      {/* Spark Core */}
      <circle cx="64" cy="64" r="15" fill="url(#spark3D)" mask="url(#sparkFillMask)" filter="url(#sparkGlow)" />
      <circle cx="64" cy="64" r="15" fill="none" stroke="#ffd700" strokeWidth="2" />
      
      {/* Main Lightning Bolts */}
      <path d="M64 25 L68 50 L75 45 L64 75" fill="#ffff00" mask="url(#sparkFillMask)" stroke="#ffd700" strokeWidth="2" />
      <path d="M64 103 L60 78 L53 83 L64 53" fill="#ffff00" mask="url(#sparkFillMask)" stroke="#ffd700" strokeWidth="2" />
      <path d="M25 64 L50 60 L45 53 L75 64" fill="#ffff00" mask="url(#sparkFillMask)" stroke="#ffd700" strokeWidth="2" />
      <path d="M103 64 L78 68 L83 75 L53 64" fill="#ffff00" mask="url(#sparkFillMask)" stroke="#ffd700" strokeWidth="2" />
      
      {/* Diagonal Lightning Bolts */}
      <path d="M35 35 L55 50 L50 55 L64 64" fill="#ffd700" mask="url(#sparkFillMask)" opacity="0.8" />
      <path d="M93 93 L73 78 L78 73 L64 64" fill="#ffd700" mask="url(#sparkFillMask)" opacity="0.8" />
      <path d="M93 35 L73 50 L78 55 L64 64" fill="#ffd700" mask="url(#sparkFillMask)" opacity="0.8" />
      <path d="M35 93 L55 78 L50 73 L64 64" fill="#ffd700" mask="url(#sparkFillMask)" opacity="0.8" />
      
      {/* Electric Arcs */}
      <path d="M64 30 Q80 40, 85 50" fill="none" stroke="#ffff00" strokeWidth="2" mask="url(#sparkFillMask)" opacity="0.6" />
      <path d="M64 98 Q48 88, 43 78" fill="none" stroke="#ffff00" strokeWidth="2" mask="url(#sparkFillMask)" opacity="0.6" />
      
      {/* Inner Core Details */}
      <circle cx="64" cy="64" r="8" fill="#ffffff" mask="url(#sparkFillMask)" opacity="0.8" />
      <circle cx="64" cy="64" r="4" fill="#ffff00" mask="url(#sparkFillMask)" />
      
      {/* Spark Eyes */}
      <circle cx="60" cy="62" r="2" fill="#333" />
      <circle cx="68" cy="62" r="2" fill="#333" />
      <circle cx="60.5" cy="61" r="0.8" fill="#fff" />
      <circle cx="68.5" cy="61" r="0.8" fill="#fff" />
      
      {/* Energy Rings */}
      <circle cx="64" cy="64" r="20" fill="none" stroke="#ffd700" strokeWidth="1.5" opacity="0.4" mask="url(#sparkFillMask)" />
      <circle cx="64" cy="64" r="25" fill="none" stroke="#ff8c00" strokeWidth="1" opacity="0.3" mask="url(#sparkFillMask)" />
    </svg>
  );
};

export default Asset3;

