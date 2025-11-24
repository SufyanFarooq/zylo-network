import React from 'react';

const Asset1: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="starCoreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#ff8c00" />
        </radialGradient>
        <filter id="starGlow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="starFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Outer glow */}
      <circle cx="64" cy="64" r="50" fill="url(#starCoreGrad)" mask="url(#starFillMask)" filter="url(#starGlow)" opacity="0.3" />
      {/* Main star shape - 5 points */}
      <path d="M64 20 L72 50 L102 50 L78 68 L88 98 L64 80 L40 98 L50 68 L26 50 L56 50 Z" fill="url(#starCoreGrad)" mask="url(#starFillMask)" filter="url(#starGlow)" />
      <path d="M64 20 L72 50 L102 50 L78 68 L88 98 L64 80 L40 98 L50 68 L26 50 L56 50 Z" fill="none" stroke="#ffd700" strokeWidth="2.5" />
      {/* Inner smaller star */}
      <path d="M64 38 L68 54 L84 54 L72 62 L76 78 L64 70 L52 78 L56 62 L44 54 L60 54 Z" fill="#ffffff" mask="url(#starFillMask)" filter="url(#starGlow)" opacity="0.9" />
      {/* Core bright center */}
      <circle cx="64" cy="64" r="12" fill="#ffffff" mask="url(#starFillMask)" filter="url(#starGlow)" opacity="0.8" />
      <circle cx="64" cy="64" r="8" fill="#ffd700" mask="url(#starFillMask)" />
      <circle cx="64" cy="64" r="4" fill="#ffffff" mask="url(#starFillMask)" />
      {/* Sparkle particles */}
      <circle cx="64" cy="30" r="2" fill="#ffffff" mask="url(#starFillMask)" />
      <circle cx="90" cy="50" r="1.5" fill="#ffd700" mask="url(#starFillMask)" />
      <circle cx="88" cy="90" r="2" fill="#ffffff" mask="url(#starFillMask)" />
      <circle cx="50" cy="90" r="1.5" fill="#ffd700" mask="url(#starFillMask)" />
      <circle cx="38" cy="50" r="2" fill="#ffffff" mask="url(#starFillMask)" />
    </svg>
  );
};

export default Asset1;

