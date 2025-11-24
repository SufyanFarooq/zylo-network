import React from 'react';

const Asset9: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="alienBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#39ff14" />
          <stop offset="50%" stopColor="#00ff00" />
          <stop offset="100%" stopColor="#00cc00" />
        </linearGradient>
        <radialGradient id="alienEyeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="70%" stopColor="#001a00" />
          <stop offset="100%" stopColor="#003300" />
        </radialGradient>
        <filter id="alienGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="alienFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Head */}
      <ellipse cx="64" cy="50" rx="35" ry="42" fill="url(#alienBodyGrad)" mask="url(#alienFillMask)" filter="url(#alienGlow)" />
      <ellipse cx="64" cy="50" rx="35" ry="42" fill="none" stroke="#00ff00" strokeWidth="2.5" />
      {/* Large alien eyes */}
      <ellipse cx="52" cy="48" rx="12" ry="18" fill="url(#alienEyeGrad)" mask="url(#alienFillMask)" />
      <ellipse cx="76" cy="48" rx="12" ry="18" fill="url(#alienEyeGrad)" mask="url(#alienFillMask)" />
      <ellipse cx="52" cy="48" rx="12" ry="18" fill="none" stroke="#39ff14" strokeWidth="2" />
      <ellipse cx="76" cy="48" rx="12" ry="18" fill="none" stroke="#39ff14" strokeWidth="2" />
      {/* Eye highlights */}
      <ellipse cx="54" cy="45" rx="4" ry="6" fill="#39ff14" mask="url(#alienFillMask)" opacity="0.6" />
      <ellipse cx="78" cy="45" rx="4" ry="6" fill="#39ff14" mask="url(#alienFillMask)" opacity="0.6" />
      <circle cx="55" cy="43" r="2" fill="#7fff00" mask="url(#alienFillMask)" />
      <circle cx="79" cy="43" r="2" fill="#7fff00" mask="url(#alienFillMask)" />
      {/* Antenna */}
      <line x1="50" y1="15" x2="50" y2="25" stroke="#00ff00" strokeWidth="2.5" mask="url(#alienFillMask)" />
      <circle cx="50" cy="12" r="4" fill="#39ff14" mask="url(#alienFillMask)" filter="url(#alienGlow)" />
      <circle cx="50" cy="12" r="6" fill="none" stroke="#39ff14" strokeWidth="1.5" mask="url(#alienFillMask)" opacity="0.5" />
      <line x1="78" y1="15" x2="78" y2="25" stroke="#00ff00" strokeWidth="2.5" mask="url(#alienFillMask)" />
      <circle cx="78" cy="12" r="4" fill="#39ff14" mask="url(#alienFillMask)" filter="url(#alienGlow)" />
      <circle cx="78" cy="12" r="6" fill="none" stroke="#39ff14" strokeWidth="1.5" mask="url(#alienFillMask)" opacity="0.5" />
      {/* Neck */}
      <rect x="56" y="78" width="16" height="8" rx="2" fill="url(#alienBodyGrad)" mask="url(#alienFillMask)" />
      <rect x="56" y="78" width="16" height="8" rx="2" fill="none" stroke="#00ff00" strokeWidth="2" />
      {/* Body */}
      <ellipse cx="64" cy="100" rx="28" ry="20" fill="url(#alienBodyGrad)" mask="url(#alienFillMask)" filter="url(#alienGlow)" />
      <ellipse cx="64" cy="100" rx="28" ry="20" fill="none" stroke="#00ff00" strokeWidth="2.5" />
      {/* Arms */}
      <path d="M38 95 Q30 95, 25 100" stroke="#00ff00" strokeWidth="5" fill="none" mask="url(#alienFillMask)" strokeLinecap="round" />
      <circle cx="25" cy="100" r="4" fill="#39ff14" mask="url(#alienFillMask)" />
      <path d="M90 95 Q98 95, 103 100" stroke="#00ff00" strokeWidth="5" fill="none" mask="url(#alienFillMask)" strokeLinecap="round" />
      <circle cx="103" cy="100" r="4" fill="#39ff14" mask="url(#alienFillMask)" />
      {/* Small mouth */}
      <line x1="58" y1="68" x2="70" y2="68" stroke="#00cc00" strokeWidth="2" mask="url(#alienFillMask)" strokeLinecap="round" />
      {/* Tech details */}
      <circle cx="64" cy="100" r="5" fill="#7fff00" mask="url(#alienFillMask)" opacity="0.5" />
      <circle cx="64" cy="100" r="3" fill="#39ff14" mask="url(#alienFillMask)" />
    </svg>
  );
};

export default Asset9;

