import React from 'react';

const Asset6: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="dragonBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4500" />
          <stop offset="50%" stopColor="#ff6347" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>
        <filter id="dragonGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="dragonFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Dragon Wings */}
      <path d="M35 65 Q20 55, 15 70 Q12 85, 25 80 L35 75 Z" fill="url(#dragonBodyGrad)" mask="url(#dragonFillMask)" opacity="0.9" filter="url(#dragonGlow)" />
      <path d="M35 65 Q20 55, 15 70 Q12 85, 25 80 L35 75 Z" fill="none" stroke="#ff4500" strokeWidth="2" />
      <path d="M93 65 Q108 55, 113 70 Q116 85, 103 80 L93 75 Z" fill="url(#dragonBodyGrad)" mask="url(#dragonFillMask)" opacity="0.9" filter="url(#dragonGlow)" />
      <path d="M93 65 Q108 55, 113 70 Q116 85, 103 80 L93 75 Z" fill="none" stroke="#ff4500" strokeWidth="2" />
      {/* Body */}
      <ellipse cx="64" cy="75" rx="32" ry="38" fill="url(#dragonBodyGrad)" mask="url(#dragonFillMask)" filter="url(#dragonGlow)" />
      <ellipse cx="64" cy="75" rx="32" ry="38" fill="none" stroke="#ff4500" strokeWidth="3" />
      {/* Neck */}
      <ellipse cx="64" cy="55" rx="22" ry="25" fill="url(#dragonBodyGrad)" mask="url(#dragonFillMask)" />
      {/* Head */}
      <ellipse cx="64" cy="38" rx="24" ry="26" fill="url(#dragonBodyGrad)" mask="url(#dragonFillMask)" />
      <ellipse cx="64" cy="38" rx="24" ry="26" fill="none" stroke="#ff4500" strokeWidth="2" />
      {/* Horns */}
      <path d="M48 22 L42 10 L46 26 Z" fill="#ffd700" mask="url(#dragonFillMask)" />
      <path d="M48 22 L42 10 L46 26 Z" fill="none" stroke="#ff8c00" strokeWidth="1.5" />
      <path d="M80 22 L86 10 L82 26 Z" fill="#ffd700" mask="url(#dragonFillMask)" />
      <path d="M80 22 L86 10 L82 26 Z" fill="none" stroke="#ff8c00" strokeWidth="1.5" />
      {/* Back spikes */}
      <path d="M64 50 L60 40 L64 50 L68 40 L64 50" fill="#ffd700" mask="url(#dragonFillMask)" opacity="0.9" />
      <path d="M64 65 L60 55 L64 65 L68 55 L64 65" fill="#ffd700" mask="url(#dragonFillMask)" opacity="0.9" />
      <path d="M64 80 L60 70 L64 80 L68 70 L64 80" fill="#ffd700" mask="url(#dragonFillMask)" opacity="0.9" />
      {/* Dragon scales */}
      <circle cx="55" cy="70" r="3" fill="#ff8c00" mask="url(#dragonFillMask)" opacity="0.7" />
      <circle cx="73" cy="72" r="3" fill="#ff8c00" mask="url(#dragonFillMask)" opacity="0.7" />
      <circle cx="64" cy="85" r="3" fill="#ff8c00" mask="url(#dragonFillMask)" opacity="0.7" />
      {/* Fierce eyes */}
      <ellipse cx="54" cy="36" rx="6" ry="8" fill="#ffff00" mask="url(#dragonFillMask)" />
      <ellipse cx="74" cy="36" rx="6" ry="8" fill="#ffff00" mask="url(#dragonFillMask)" />
      <ellipse cx="54" cy="36" rx="2.5" ry="6" fill="#ff0000" mask="url(#dragonFillMask)" />
      <ellipse cx="74" cy="36" rx="2.5" ry="6" fill="#ff0000" mask="url(#dragonFillMask)" />
      <circle cx="54.5" cy="34" r="1.5" fill="#fff" mask="url(#dragonFillMask)" opacity="0.9" />
      <circle cx="74.5" cy="34" r="1.5" fill="#fff" mask="url(#dragonFillMask)" opacity="0.9" />
      {/* Snout with nostrils */}
      <ellipse cx="64" cy="48" rx="14" ry="12" fill="#ff6347" mask="url(#dragonFillMask)" opacity="0.9" />
      <ellipse cx="60" cy="50" rx="2" ry="3" fill="#000" mask="url(#dragonFillMask)" />
      <ellipse cx="68" cy="50" rx="2" ry="3" fill="#000" mask="url(#dragonFillMask)" />
      {/* Mouth with fire */}
      <path d="M64 54 Q58 58, 54 56" fill="none" stroke="#ff0000" strokeWidth="2" mask="url(#dragonFillMask)" />
      <path d="M64 54 Q70 58, 74 56" fill="none" stroke="#ff0000" strokeWidth="2" mask="url(#dragonFillMask)" />
      {/* Long tail with spikes */}
      <path d="M88 90 Q100 100, 108 110 Q110 115, 105 118" fill="url(#dragonBodyGrad)" mask="url(#dragonFillMask)" />
      <path d="M100 100 L98 95 L100 100 L102 95" fill="#ffd700" mask="url(#dragonFillMask)" />
    </svg>
  );
};

export default Asset6;

