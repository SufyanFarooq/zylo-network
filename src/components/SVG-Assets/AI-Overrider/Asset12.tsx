import React from 'react';

const Asset12: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="techFoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff8c00" />
          <stop offset="50%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>
        <filter id="techFoxGlow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="techFoxFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Body */}
      <ellipse cx="64" cy="80" rx="28" ry="32" fill="url(#techFoxGrad)" mask="url(#techFoxFillMask)" filter="url(#techFoxGlow)" />
      <ellipse cx="64" cy="80" rx="28" ry="32" fill="none" stroke="#00ffff" strokeWidth="2" />
      {/* Tech belly panel */}
      <rect x="56" y="75" width="16" height="12" rx="2" fill="#00ffff" mask="url(#techFoxFillMask)" opacity="0.4" />
      <circle cx="58" cy="78" r="1" fill="#ffd700" mask="url(#techFoxFillMask)" />
      <circle cx="64" cy="78" r="1" fill="#ffd700" mask="url(#techFoxFillMask)" />
      <circle cx="70" cy="78" r="1" fill="#ffd700" mask="url(#techFoxFillMask)" />
      {/* Head */}
      <ellipse cx="64" cy="48" rx="20" ry="18" fill="url(#techFoxGrad)" mask="url(#techFoxFillMask)" />
      <ellipse cx="64" cy="48" rx="20" ry="18" fill="none" stroke="#00ffff" strokeWidth="2" />
      {/* Tech ears */}
      <path d="M50 35 L44 20 L48 24 L54 32 Z" fill="#ff8c00" mask="url(#techFoxFillMask)" />
      <path d="M50 35 L44 20 L48 24 L54 32 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
      <circle cx="48" cy="26" r="2" fill="#ffd700" mask="url(#techFoxFillMask)" />
      <path d="M78 35 L84 20 L80 24 L74 32 Z" fill="#ff8c00" mask="url(#techFoxFillMask)" />
      <path d="M78 35 L84 20 L80 24 L74 32 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
      <circle cx="80" cy="26" r="2" fill="#ffd700" mask="url(#techFoxFillMask)" />
      {/* Cyber eyes */}
      <ellipse cx="56" cy="46" rx="5" ry="6" fill="#00ffff" mask="url(#techFoxFillMask)" />
      <ellipse cx="72" cy="46" rx="5" ry="6" fill="#00ffff" mask="url(#techFoxFillMask)" />
      <circle cx="56" cy="45" r="2" fill="#ffffff" mask="url(#techFoxFillMask)" />
      <circle cx="72" cy="45" r="2" fill="#ffffff" mask="url(#techFoxFillMask)" />
      {/* Snout */}
      <path d="M64 52 Q68 56, 70 58 L64 56 L58 58 Q60 56, 64 52 Z" fill="#ffd700" mask="url(#techFoxFillMask)" />
      <circle cx="64" cy="56" r="2" fill="#000" mask="url(#techFoxFillMask)" />
      {/* Energy tail */}
      <path d="M90 85 Q105 88, 115 95 Q110 90, 105 88 Q100 85, 92 86 Z" fill="url(#techFoxGrad)" mask="url(#techFoxFillMask)" opacity="0.8" />
      <path d="M90 85 Q105 88, 115 95" stroke="#00ffff" strokeWidth="2" mask="url(#techFoxFillMask)" fill="none" />
      <circle cx="115" cy="95" r="3" fill="#ffd700" mask="url(#techFoxFillMask)" />
      {/* Circuit lines */}
      <line x1="60" y1="70" x2="60" y2="75" stroke="#00ffff" strokeWidth="1" mask="url(#techFoxFillMask)" opacity="0.5" />
      <line x1="68" y1="70" x2="68" y2="75" stroke="#00ffff" strokeWidth="1" mask="url(#techFoxFillMask)" opacity="0.5" />
    </svg>
  );
};

export default Asset12;

