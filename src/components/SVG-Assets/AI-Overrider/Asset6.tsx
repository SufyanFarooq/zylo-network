import React from 'react';

const Asset6: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="cyberLionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="50%" stopColor="#00bfff" />
          <stop offset="100%" stopColor="#ff00ff" />
        </linearGradient>
        <filter id="cyberLionGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="cyberLionFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Body */}
      <ellipse cx="64" cy="82" rx="28" ry="32" fill="url(#cyberLionGrad)" mask="url(#cyberLionFillMask)" filter="url(#cyberLionGlow)" />
      <ellipse cx="64" cy="82" rx="28" ry="32" fill="none" stroke="#00ffff" strokeWidth="2" />
      {/* Circuit pattern on body */}
      <path d="M50 75 L58 75 L58 85 L50 85" fill="none" stroke="#00ffff" strokeWidth="1.5" mask="url(#cyberLionFillMask)" opacity="0.6" />
      <path d="M70 75 L78 75 L78 85 L70 85" fill="none" stroke="#ff00ff" strokeWidth="1.5" mask="url(#cyberLionFillMask)" opacity="0.6" />
      {/* Head */}
      <circle cx="64" cy="50" r="24" fill="url(#cyberLionGrad)" mask="url(#cyberLionFillMask)" />
      <circle cx="64" cy="50" r="24" fill="none" stroke="#00ffff" strokeWidth="2" />
      {/* Digital mane */}
      <path d="M40 40 L30 25 L35 28 L40 35 Z" fill="#ffd700" mask="url(#cyberLionFillMask)" opacity="0.8" />
      <path d="M50 32 L45 18 L48 22 L52 28 Z" fill="#00bfff" mask="url(#cyberLionFillMask)" opacity="0.8" />
      <path d="M64 28 L64 14 L66 18 L64 24 Z" fill="#ff00ff" mask="url(#cyberLionFillMask)" opacity="0.8" />
      <path d="M78 32 L83 18 L80 22 L76 28 Z" fill="#ffd700" mask="url(#cyberLionFillMask)" opacity="0.8" />
      <path d="M88 40 L98 25 L93 28 L88 35 Z" fill="#00bfff" mask="url(#cyberLionFillMask)" opacity="0.8" />
      {/* Glowing eyes */}
      <circle cx="54" cy="48" r="6" fill="#00ffff" mask="url(#cyberLionFillMask)" />
      <circle cx="74" cy="48" r="6" fill="#00ffff" mask="url(#cyberLionFillMask)" />
      <circle cx="54" cy="48" r="3" fill="#ffffff" mask="url(#cyberLionFillMask)" />
      <circle cx="74" cy="48" r="3" fill="#ffffff" mask="url(#cyberLionFillMask)" />
      {/* Tech snout */}
      <ellipse cx="64" cy="58" rx="8" ry="6" fill="#4169e1" mask="url(#cyberLionFillMask)" />
      <ellipse cx="64" cy="60" rx="3" ry="2" fill="#000" mask="url(#cyberLionFillMask)" />
      {/* Energy tail */}
      <path d="M90 85 Q105 90, 110 100 L108 102 L105 95 Q95 88, 88 87" fill="url(#cyberLionGrad)" mask="url(#cyberLionFillMask)" opacity="0.8" />
      <circle cx="110" cy="100" r="4" fill="#ffff00" mask="url(#cyberLionFillMask)" />
      {/* Tech details */}
      <line x1="44" y1="50" x2="34" y2="50" stroke="#00ffff" strokeWidth="1.5" mask="url(#cyberLionFillMask)" />
      <line x1="84" y1="50" x2="94" y2="50" stroke="#00ffff" strokeWidth="1.5" mask="url(#cyberLionFillMask)" />
      <circle cx="64" cy="50" r="2" fill="#ff00ff" mask="url(#cyberLionFillMask)" />
    </svg>
  );
};

export default Asset6;

