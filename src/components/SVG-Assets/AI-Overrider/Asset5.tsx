import React from 'react';

const Asset5: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="holoChipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7fffd4" />
          <stop offset="50%" stopColor="#40e0d0" />
          <stop offset="100%" stopColor="#48d1cc" />
        </linearGradient>
        <filter id="holoChipGlow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="holoChipFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Chip body */}
      <rect x="36" y="36" width="56" height="56" rx="4" fill="url(#holoChipGrad)" mask="url(#holoChipFillMask)" filter="url(#holoChipGlow)" />
      <rect x="36" y="36" width="56" height="56" rx="4" fill="none" stroke="#40e0d0" strokeWidth="3" />
      {/* Circuit patterns */}
      <path d="M44 44 L54 44 L54 54 L44 54 Z" fill="none" stroke="#00ffff" strokeWidth="2" mask="url(#holoChipFillMask)" />
      <path d="M74 44 L84 44 L84 54 L74 54 Z" fill="none" stroke="#00ffff" strokeWidth="2" mask="url(#holoChipFillMask)" />
      <path d="M44 74 L54 74 L54 84 L44 84 Z" fill="none" stroke="#00ffff" strokeWidth="2" mask="url(#holoChipFillMask)" />
      <path d="M74 74 L84 74 L84 84 L74 84 Z" fill="none" stroke="#00ffff" strokeWidth="2" mask="url(#holoChipFillMask)" />
      {/* Central processor */}
      <rect x="56" y="56" width="16" height="16" rx="2" fill="#7fffd4" mask="url(#holoChipFillMask)" />
      <rect x="56" y="56" width="16" height="16" rx="2" fill="none" stroke="#ffffff" strokeWidth="2" />
      <circle cx="64" cy="64" r="4" fill="#ffffff" mask="url(#holoChipFillMask)" />
      {/* Circuit lines */}
      <line x1="49" y1="49" x2="56" y2="56" stroke="#00ffff" strokeWidth="1.5" mask="url(#holoChipFillMask)" />
      <line x1="79" y1="49" x2="72" y2="56" stroke="#00ffff" strokeWidth="1.5" mask="url(#holoChipFillMask)" />
      <line x1="49" y1="79" x2="56" y2="72" stroke="#00ffff" strokeWidth="1.5" mask="url(#holoChipFillMask)" />
      <line x1="79" y1="79" x2="72" y2="72" stroke="#00ffff" strokeWidth="1.5" mask="url(#holoChipFillMask)" />
      {/* Connection pins */}
      <rect x="28" y="56" width="8" height="3" fill="#40e0d0" mask="url(#holoChipFillMask)" />
      <rect x="28" y="64" width="8" height="3" fill="#40e0d0" mask="url(#holoChipFillMask)" />
      <rect x="28" y="72" width="8" height="3" fill="#40e0d0" mask="url(#holoChipFillMask)" />
      <rect x="92" y="56" width="8" height="3" fill="#40e0d0" mask="url(#holoChipFillMask)" />
      <rect x="92" y="64" width="8" height="3" fill="#40e0d0" mask="url(#holoChipFillMask)" />
      <rect x="92" y="72" width="8" height="3" fill="#40e0d0" mask="url(#holoChipFillMask)" />
      <rect x="56" y="28" width="3" height="8" fill="#40e0d0" mask="url(#holoChipFillMask)" />
      <rect x="64" y="28" width="3" height="8" fill="#40e0d0" mask="url(#holoChipFillMask)" />
      <rect x="72" y="28" width="3" height="8" fill="#40e0d0" mask="url(#holoChipFillMask)" />
      <rect x="56" y="92" width="3" height="8" fill="#40e0d0" mask="url(#holoChipFillMask)" />
      <rect x="64" y="92" width="3" height="8" fill="#40e0d0" mask="url(#holoChipFillMask)" />
      <rect x="72" y="92" width="3" height="8" fill="#40e0d0" mask="url(#holoChipFillMask)" />
      {/* Holographic data streams */}
      <circle cx="49" cy="49" r="2" fill="#00ffff" mask="url(#holoChipFillMask)" />
      <circle cx="79" cy="49" r="2" fill="#00ffff" mask="url(#holoChipFillMask)" />
      <circle cx="49" cy="79" r="2" fill="#00ffff" mask="url(#holoChipFillMask)" />
      <circle cx="79" cy="79" r="2" fill="#00ffff" mask="url(#holoChipFillMask)" />
    </svg>
  );
};

export default Asset5;

