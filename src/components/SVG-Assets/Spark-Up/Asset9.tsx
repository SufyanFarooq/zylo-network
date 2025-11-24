import React from 'react';

const Asset9: React.FC = () => {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      className="w-32 h-32"
    >
      <defs>
        <linearGradient id="crystalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e0ffff" />
          <stop offset="50%" stopColor="#b0e0e6" />
          <stop offset="100%" stopColor="#87ceeb" />
        </linearGradient>
        <radialGradient id="crystal3D" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#e0ffff" />
          <stop offset="100%" stopColor="#87ceeb" />
        </radialGradient>
        <filter id="crystalGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <mask id="crystalFillMask">
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
      
      {/* Crystal Main Body - Hexagonal */}
      <path
        d="M64 20 L85 40 L85 75 L64 95 L43 75 L43 40 Z"
        fill="url(#crystal3D)"
        mask="url(#crystalFillMask)"
        filter="url(#crystalGlow)"
        stroke="#87ceeb"
        strokeWidth="2"
      />
      
      {/* Crystal Facets */}
      <path d="M64 20 L64 95" stroke="#ffffff" strokeWidth="1.5" mask="url(#crystalFillMask)" opacity="0.4" />
      <path d="M43 40 L85 75" stroke="#ffffff" strokeWidth="1.5" mask="url(#crystalFillMask)" opacity="0.3" />
      <path d="M85 40 L43 75" stroke="#ffffff" strokeWidth="1.5" mask="url(#crystalFillMask)" opacity="0.3" />
      <path d="M43 40 L64 57.5 L85 40" stroke="#b0e0e6" strokeWidth="1" mask="url(#crystalFillMask)" opacity="0.5" />
      <path d="M43 75 L64 57.5 L85 75" stroke="#b0e0e6" strokeWidth="1" mask="url(#crystalFillMask)" opacity="0.5" />
      
      {/* Inner Glow */}
      <ellipse cx="64" cy="57" rx="15" ry="20" fill="#ffffff" mask="url(#crystalFillMask)" opacity="0.5" />
      
      {/* Crystal Eyes */}
      <circle cx="58" cy="55" r="3" fill="#4682b4" />
      <circle cx="70" cy="55" r="3" fill="#4682b4" />
      <circle cx="59" cy="54" r="1" fill="#fff" />
      <circle cx="71" cy="54" r="1" fill="#fff" />
      
      {/* Crystal Smile */}
      <path d="M58 66 Q64 70, 70 66" fill="none" stroke="#87ceeb" strokeWidth="2" mask="url(#crystalFillMask)" />
      
      {/* Sparkle Points */}
      <circle cx="50" cy="35" r="2" fill="#ffffff" mask="url(#crystalFillMask)" opacity="0.9" />
      <circle cx="78" cy="35" r="2" fill="#ffffff" mask="url(#crystalFillMask)" opacity="0.9" />
      <circle cx="38" cy="57" r="1.5" fill="#e0ffff" mask="url(#crystalFillMask)" opacity="0.8" />
      <circle cx="90" cy="57" r="1.5" fill="#e0ffff" mask="url(#crystalFillMask)" opacity="0.8" />
      <circle cx="64" cy="100" r="2.5" fill="#b0e0e6" mask="url(#crystalFillMask)" opacity="0.7" />
      
      {/* Light Refraction */}
      <path d="M64 20 L60 10" stroke="#e0ffff" strokeWidth="2" mask="url(#crystalFillMask)" opacity="0.6" />
      <path d="M64 20 L68 10" stroke="#87ceeb" strokeWidth="2" mask="url(#crystalFillMask)" opacity="0.6" />
    </svg>
  );
};

export default Asset9;

