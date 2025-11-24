import React from 'react';

const Asset12: React.FC = () => {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      className="w-32 h-32"
    >
      <defs>
        <linearGradient id="boltGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffff00" />
          <stop offset="50%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#ff8c00" />
        </linearGradient>
        <radialGradient id="bolt3D" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#ffff00" />
          <stop offset="100%" stopColor="#ff8c00" />
        </radialGradient>
        <filter id="boltGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <mask id="boltFillMask">
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
      
      {/* Bolt Main Shape */}
      <path
        d="M70 10 L45 60 L60 60 L50 110 L95 50 L75 50 L85 10 Z"
        fill="url(#bolt3D)"
        mask="url(#boltFillMask)"
        filter="url(#boltGlow)"
        stroke="#ffd700"
        strokeWidth="3"
      />
      
      {/* Inner Lightning Core */}
      <path
        d="M70 20 L52 60 L62 60 L58 90 L85 50 L73 50 L78 20 Z"
        fill="#ffffff"
        mask="url(#boltFillMask)"
        opacity="0.7"
      />
      
      {/* Bolt Eyes */}
      <circle cx="62" cy="45" r="3" fill="#333" />
      <circle cx="73" cy="45" r="3" fill="#333" />
      <circle cx="63" cy="44" r="1" fill="#fff" />
      <circle cx="74" cy="44" r="1" fill="#fff" />
      
      {/* Bolt Smile */}
      <path d="M60 55 Q67.5 60, 75 55" fill="none" stroke="#ff8c00" strokeWidth="2" mask="url(#boltFillMask)" />
      
      {/* Electric Sparks */}
      <circle cx="40" cy="55" r="2.5" fill="#ffff00" mask="url(#boltFillMask)" opacity="0.8" />
      <circle cx="95" cy="45" r="2" fill="#ffd700" mask="url(#boltFillMask)" opacity="0.8" />
      <circle cx="48" cy="105" r="2.2" fill="#ff8c00" mask="url(#boltFillMask)" opacity="0.7" />
      
      {/* Energy Lines */}
      <line x1="35" y1="50" x2="25" y2="45" stroke="#ffff00" strokeWidth="2" mask="url(#boltFillMask)" opacity="0.6" />
      <line x1="100" y1="48" x2="110" y2="43" stroke="#ffd700" strokeWidth="2" mask="url(#boltFillMask)" opacity="0.6" />
      <line x1="45" y1="100" x2="35" y2="105" stroke="#ff8c00" strokeWidth="2" mask="url(#boltFillMask)" opacity="0.5" />
    </svg>
  );
};

export default Asset12;

