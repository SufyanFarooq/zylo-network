import React from 'react';

const Asset8: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="mechaDragonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4500" />
          <stop offset="50%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>
        <filter id="mechaDragonGlow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="mechaDragonFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Body */}
      <ellipse cx="64" cy="75" rx="32" ry="38" fill="url(#mechaDragonGrad)" mask="url(#mechaDragonFillMask)" filter="url(#mechaDragonGlow)" />
      <ellipse cx="64" cy="75" rx="32" ry="38" fill="none" stroke="#00ffff" strokeWidth="2" />
      {/* Mechanical plates */}
      <path d="M50 65 L58 65 L58 70 L50 70 Z" fill="#ff4500" mask="url(#mechaDragonFillMask)" opacity="0.8" />
      <path d="M70 65 L78 65 L78 70 L70 70 Z" fill="#ff4500" mask="url(#mechaDragonFillMask)" opacity="0.8" />
      <path d="M48 78 L56 78 L56 85 L48 85 Z" fill="#ffd700" mask="url(#mechaDragonFillMask)" opacity="0.8" />
      <path d="M72 78 L80 78 L80 85 L72 85 Z" fill="#ffd700" mask="url(#mechaDragonFillMask)" opacity="0.8" />
      {/* Tech details */}
      <circle cx="54" cy="67" r="2" fill="#00ffff" mask="url(#mechaDragonFillMask)" />
      <circle cx="74" cy="67" r="2" fill="#00ffff" mask="url(#mechaDragonFillMask)" />
      <line x1="52" y1="81" x2="58" y2="81" stroke="#00ffff" strokeWidth="2" mask="url(#mechaDragonFillMask)" />
      <line x1="70" y1="81" x2="76" y2="81" stroke="#00ffff" strokeWidth="2" mask="url(#mechaDragonFillMask)" />
      {/* Head */}
      <ellipse cx="64" cy="40" rx="22" ry="20" fill="url(#mechaDragonGrad)" mask="url(#mechaDragonFillMask)" />
      <ellipse cx="64" cy="40" rx="22" ry="20" fill="none" stroke="#00ffff" strokeWidth="2" />
      {/* Mechanical horns */}
      <path d="M48 32 L42 20 L44 22 L50 30 Z" fill="#ff4500" mask="url(#mechaDragonFillMask)" />
      <path d="M48 32 L42 20 L44 22 L50 30 Z" fill="none" stroke="#ffd700" strokeWidth="1.5" />
      <path d="M80 32 L86 20 L84 22 L78 30 Z" fill="#ff4500" mask="url(#mechaDragonFillMask)" />
      <path d="M80 32 L86 20 L84 22 L78 30 Z" fill="none" stroke="#ffd700" strokeWidth="1.5" />
      {/* Cyber eyes */}
      <ellipse cx="54" cy="38" rx="6" ry="7" fill="#ff0000" mask="url(#mechaDragonFillMask)" />
      <ellipse cx="74" cy="38" rx="6" ry="7" fill="#ff0000" mask="url(#mechaDragonFillMask)" />
      <circle cx="54" cy="37" r="3" fill="#ffff00" mask="url(#mechaDragonFillMask)" />
      <circle cx="74" cy="37" r="3" fill="#ffff00" mask="url(#mechaDragonFillMask)" />
      <circle cx="54" cy="36" r="1" fill="#ffffff" mask="url(#mechaDragonFillMask)" />
      <circle cx="74" cy="36" r="1" fill="#ffffff" mask="url(#mechaDragonFillMask)" />
      {/* Snout with exhaust */}
      <path d="M64 45 Q70 48, 72 52 Q70 50, 64 48 Z" fill="#ffd700" mask="url(#mechaDragonFillMask)" />
      <path d="M64 45 Q58 48, 56 52 Q58 50, 64 48 Z" fill="#ffd700" mask="url(#mechaDragonFillMask)" />
      <circle cx="68" cy="50" r="2" fill="#ff4500" mask="url(#mechaDragonFillMask)" />
      <circle cx="60" cy="50" r="2" fill="#ff4500" mask="url(#mechaDragonFillMask)" />
      {/* Mechanical wings */}
      <path d="M36 65 L20 50 L22 52 L24 60 L30 68 Z" fill="url(#mechaDragonGrad)" mask="url(#mechaDragonFillMask)" opacity="0.7" />
      <path d="M36 65 L20 50 L22 52 L24 60 L30 68 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
      <path d="M92 65 L108 50 L106 52 L104 60 L98 68 Z" fill="url(#mechaDragonGrad)" mask="url(#mechaDragonFillMask)" opacity="0.7" />
      <path d="M92 65 L108 50 L106 52 L104 60 L98 68 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
      {/* Wing details */}
      <line x1="25" y1="55" x2="32" y2="66" stroke="#ffd700" strokeWidth="1.5" mask="url(#mechaDragonFillMask)" opacity="0.7" />
      <line x1="103" y1="55" x2="96" y2="66" stroke="#ffd700" strokeWidth="1.5" mask="url(#mechaDragonFillMask)" opacity="0.7" />
      {/* Energy tail */}
      <path d="M64 110 L60 120 L64 118 L68 120 Z" fill="#ff4500" mask="url(#mechaDragonFillMask)" />
      <path d="M64 110 L60 120 L64 118 L68 120 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
      <circle cx="64" cy="115" r="3" fill="#ffff00" mask="url(#mechaDragonFillMask)" />
      {/* Power core */}
      <circle cx="64" cy="75" r="6" fill="#ff4500" mask="url(#mechaDragonFillMask)" opacity="0.8" />
      <circle cx="64" cy="75" r="4" fill="#ffff00" mask="url(#mechaDragonFillMask)" />
      <circle cx="64" cy="75" r="2" fill="#ffffff" mask="url(#mechaDragonFillMask)" />
    </svg>
  );
};

export default Asset8;

