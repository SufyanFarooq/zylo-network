import React from 'react';

const Asset5: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="pantherBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="50%" stopColor="#2f2f2f" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <filter id="pantherGlow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="pantherFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Sleek body */}
      <ellipse cx="64" cy="82" rx="30" ry="36" fill="url(#pantherBodyGrad)" mask="url(#pantherFillMask)" filter="url(#pantherGlow)" />
      <ellipse cx="64" cy="82" rx="30" ry="36" fill="none" stroke="#555" strokeWidth="2" />
      {/* Head - cat-like */}
      <ellipse cx="64" cy="42" rx="24" ry="26" fill="url(#pantherBodyGrad)" mask="url(#pantherFillMask)" />
      <ellipse cx="64" cy="42" rx="24" ry="26" fill="none" stroke="#555" strokeWidth="2" />
      {/* Pointed cat ears */}
      <path d="M46 20 L42 10 L48 24 Z" fill="url(#pantherBodyGrad)" mask="url(#pantherFillMask)" />
      <path d="M46 20 L42 10 L48 24 Z" fill="none" stroke="#555" strokeWidth="1.5" />
      <path d="M82 20 L86 10 L80 24 Z" fill="url(#pantherBodyGrad)" mask="url(#pantherFillMask)" />
      <path d="M82 20 L86 10 L80 24 Z" fill="none" stroke="#555" strokeWidth="1.5" />
      {/* Inner ears */}
      <path d="M46 20 L44 14 L47 22 Z" fill="#333" mask="url(#pantherFillMask)" />
      <path d="M82 20 L84 14 L81 22 Z" fill="#333" mask="url(#pantherFillMask)" />
      {/* Sleek snout */}
      <ellipse cx="64" cy="52" rx="16" ry="14" fill="#2a2a2a" mask="url(#pantherFillMask)" opacity="0.8" />
      {/* Cat-like green glowing eyes */}
      <ellipse cx="54" cy="42" rx="6" ry="9" fill="#32cd32" mask="url(#pantherFillMask)" />
      <ellipse cx="74" cy="42" rx="6" ry="9" fill="#32cd32" mask="url(#pantherFillMask)" />
      <ellipse cx="54" cy="42" rx="2.5" ry="7" fill="#000" mask="url(#pantherFillMask)" />
      <ellipse cx="74" cy="42" rx="2.5" ry="7" fill="#000" mask="url(#pantherFillMask)" />
      <circle cx="54.5" cy="40" r="1.5" fill="#fff" mask="url(#pantherFillMask)" opacity="0.9" />
      <circle cx="74.5" cy="40" r="1.5" fill="#fff" mask="url(#pantherFillMask)" opacity="0.9" />
      {/* Small pink nose */}
      <ellipse cx="64" cy="56" rx="3" ry="4" fill="#ff69b4" mask="url(#pantherFillMask)" opacity="0.8" />
      {/* Mouth */}
      <path d="M64 60 L64 64" stroke="#111" strokeWidth="2" mask="url(#pantherFillMask)" />
      <path d="M64 64 Q58 66, 54 64" fill="none" stroke="#111" strokeWidth="2" mask="url(#pantherFillMask)" />
      <path d="M64 64 Q70 66, 74 64" fill="none" stroke="#111" strokeWidth="2" mask="url(#pantherFillMask)" />
      {/* Whiskers */}
      <line x1="45" y1="52" x2="28" y2="50" stroke="#999" strokeWidth="1.5" mask="url(#pantherFillMask)" opacity="0.7" />
      <line x1="45" y1="56" x2="28" y2="56" stroke="#999" strokeWidth="1.5" mask="url(#pantherFillMask)" opacity="0.7" />
      <line x1="83" y1="52" x2="100" y2="50" stroke="#999" strokeWidth="1.5" mask="url(#pantherFillMask)" opacity="0.7" />
      <line x1="83" y1="56" x2="100" y2="56" stroke="#999" strokeWidth="1.5" mask="url(#pantherFillMask)" opacity="0.7" />
      {/* Legs - sleek */}
      <ellipse cx="50" cy="106" rx="7" ry="12" fill="url(#pantherBodyGrad)" mask="url(#pantherFillMask)" />
      <ellipse cx="78" cy="106" rx="7" ry="12" fill="url(#pantherBodyGrad)" mask="url(#pantherFillMask)" />
      {/* Paws */}
      <ellipse cx="50" cy="114" rx="6" ry="4" fill="#1a1a1a" mask="url(#pantherFillMask)" />
      <ellipse cx="78" cy="114" rx="6" ry="4" fill="#1a1a1a" mask="url(#pantherFillMask)" />
      {/* Long tail */}
      <path d="M88 90 Q100 100, 105 110 Q102 115, 95 108" fill="url(#pantherBodyGrad)" mask="url(#pantherFillMask)" />
    </svg>
  );
};

export default Asset5;

