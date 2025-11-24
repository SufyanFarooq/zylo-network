import React from 'react';

const Asset4: React.FC = () => {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      className="w-32 h-32"
    >
      <defs>
        <radialGradient id="flicker3D" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#ffd700" />
          <stop offset="80%" stopColor="#ff8c00" />
          <stop offset="100%" stopColor="#ff6347" />
        </radialGradient>
        <filter id="flickerGlow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <mask id="flickerFillMask">
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
      
      {/* Flicker Body - Star Shape */}
      <path
        d="M64 20 L70 50 L95 45 L75 65 L85 95 L64 80 L43 95 L53 65 L33 45 L58 50 Z"
        fill="url(#flicker3D)"
        mask="url(#flickerFillMask)"
        filter="url(#flickerGlow)"
        stroke="#ffd700"
        strokeWidth="2"
      />
      
      {/* Inner Star */}
      <path
        d="M64 35 L68 55 L82 52 L72 64 L78 80 L64 70 L50 80 L56 64 L46 52 L60 55 Z"
        fill="#ffffff"
        mask="url(#flickerFillMask)"
        opacity="0.6"
      />
      
      {/* Flicker Eyes */}
      <circle cx="60" cy="58" r="3" fill="#333" />
      <circle cx="68" cy="58" r="3" fill="#333" />
      <circle cx="61" cy="57" r="1" fill="#fff" />
      <circle cx="69" cy="57" r="1" fill="#fff" />
      
      {/* Flicker Smile */}
      <path d="M58 66 Q64 70, 70 66" fill="none" stroke="#ff8c00" strokeWidth="2" mask="url(#flickerFillMask)" />
      
      {/* Sparkle Points */}
      <circle cx="30" cy="50" r="2" fill="#ffd700" mask="url(#flickerFillMask)" opacity="0.8" />
      <circle cx="98" cy="50" r="2" fill="#ffd700" mask="url(#flickerFillMask)" opacity="0.8" />
      <circle cx="64" cy="15" r="2.5" fill="#ffffff" mask="url(#flickerFillMask)" />
      <circle cx="50" cy="100" r="2" fill="#ff8c00" mask="url(#flickerFillMask)" opacity="0.7" />
      <circle cx="78" cy="100" r="2" fill="#ff8c00" mask="url(#flickerFillMask)" opacity="0.7" />
      
      {/* Glow Rings */}
      <circle cx="64" cy="64" r="30" fill="none" stroke="#ffd700" strokeWidth="1" opacity="0.3" mask="url(#flickerFillMask)" />
    </svg>
  );
};

export default Asset4;

