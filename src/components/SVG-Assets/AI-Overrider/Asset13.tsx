import React from 'react';

const Asset13: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="aiWolfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4169e1" />
          <stop offset="50%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#c0c0c0" />
        </linearGradient>
        <filter id="aiWolfGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="aiWolfFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Body */}
      <ellipse cx="64" cy="78" rx="30" ry="34" fill="url(#aiWolfGrad)" mask="url(#aiWolfFillMask)" filter="url(#aiWolfGlow)" />
      <ellipse cx="64" cy="78" rx="30" ry="34" fill="none" stroke="#00ffff" strokeWidth="2" />
      {/* Fur tech pattern */}
      <path d="M50 70 Q54 72, 58 70" stroke="#c0c0c0" strokeWidth="2" mask="url(#aiWolfFillMask)" fill="none" />
      <path d="M70 70 Q74 72, 78 70" stroke="#c0c0c0" strokeWidth="2" mask="url(#aiWolfFillMask)" fill="none" />
      <line x1="60" y1="82" x2="64" y2="82" stroke="#00ffff" strokeWidth="2" mask="url(#aiWolfFillMask)" />
      <line x1="64" y1="82" x2="68" y2="82" stroke="#00ffff" strokeWidth="2" mask="url(#aiWolfFillMask)" />
      {/* Head */}
      <ellipse cx="64" cy="46" rx="24" ry="22" fill="url(#aiWolfGrad)" mask="url(#aiWolfFillMask)" />
      <ellipse cx="64" cy="46" rx="24" ry="22" fill="none" stroke="#00ffff" strokeWidth="2" />
      {/* Tech ears */}
      <path d="M46 32 L40 18 L44 22 L50 30 Z" fill="#4169e1" mask="url(#aiWolfFillMask)" />
      <path d="M46 32 L40 18 L44 22 L50 30 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
      <line x1="43" y1="25" x2="47" y2="28" stroke="#c0c0c0" strokeWidth="1" mask="url(#aiWolfFillMask)" />
      <path d="M82 32 L88 18 L84 22 L78 30 Z" fill="#4169e1" mask="url(#aiWolfFillMask)" />
      <path d="M82 32 L88 18 L84 22 L78 30 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
      <line x1="85" y1="25" x2="81" y2="28" stroke="#c0c0c0" strokeWidth="1" mask="url(#aiWolfFillMask)" />
      {/* AI eyes */}
      <ellipse cx="54" cy="44" rx="6" ry="7" fill="#00ffff" mask="url(#aiWolfFillMask)" />
      <ellipse cx="74" cy="44" rx="6" ry="7" fill="#00ffff" mask="url(#aiWolfFillMask)" />
      <circle cx="54" cy="43" r="3" fill="#4169e1" mask="url(#aiWolfFillMask)" />
      <circle cx="74" cy="43" r="3" fill="#4169e1" mask="url(#aiWolfFillMask)" />
      <circle cx="54" cy="42" r="1" fill="#ffffff" mask="url(#aiWolfFillMask)" />
      <circle cx="74" cy="42" r="1" fill="#ffffff" mask="url(#aiWolfFillMask)" />
      {/* Snout */}
      <ellipse cx="64" cy="54" rx="10" ry="8" fill="#c0c0c0" mask="url(#aiWolfFillMask)" opacity="0.6" />
      <ellipse cx="64" cy="56" rx="4" ry="3" fill="#000" mask="url(#aiWolfFillMask)" />
      <line x1="64" y1="56" x2="64" y2="60" stroke="#00ffff" strokeWidth="1" mask="url(#aiWolfFillMask)" />
      {/* Energy aura lines */}
      <line x1="40" y1="46" x2="32" y2="46" stroke="#00ffff" strokeWidth="1.5" mask="url(#aiWolfFillMask)" opacity="0.6" />
      <line x1="88" y1="46" x2="96" y2="46" stroke="#00ffff" strokeWidth="1.5" mask="url(#aiWolfFillMask)" opacity="0.6" />
      {/* Power core */}
      <circle cx="64" cy="78" r="5" fill="#4169e1" mask="url(#aiWolfFillMask)" opacity="0.8" />
      <circle cx="64" cy="78" r="3" fill="#00ffff" mask="url(#aiWolfFillMask)" />
    </svg>
  );
};

export default Asset13;

