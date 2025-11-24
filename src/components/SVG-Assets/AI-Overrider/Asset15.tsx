import React from 'react';

const Asset15: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="cyberPantherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9400d3" />
          <stop offset="50%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#ff00ff" />
        </linearGradient>
        <filter id="cyberPantherGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="cyberPantherFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Body */}
      <ellipse cx="64" cy="80" rx="32" ry="36" fill="url(#cyberPantherGrad)" mask="url(#cyberPantherFillMask)" filter="url(#cyberPantherGlow)" />
      <ellipse cx="64" cy="80" rx="32" ry="36" fill="none" stroke="#00ffff" strokeWidth="2" />
      {/* Tech spots */}
      <circle cx="52" cy="75" r="4" fill="#ff00ff" mask="url(#cyberPantherFillMask)" opacity="0.7" />
      <circle cx="76" cy="75" r="4" fill="#ff00ff" mask="url(#cyberPantherFillMask)" opacity="0.7" />
      <circle cx="58" cy="88" r="3" fill="#00ffff" mask="url(#cyberPantherFillMask)" opacity="0.7" />
      <circle cx="70" cy="88" r="3" fill="#00ffff" mask="url(#cyberPantherFillMask)" opacity="0.7" />
      {/* Neon lines */}
      <line x1="48" y1="80" x2="54" y2="80" stroke="#ff00ff" strokeWidth="2" mask="url(#cyberPantherFillMask)" />
      <line x1="74" y1="80" x2="80" y2="80" stroke="#ff00ff" strokeWidth="2" mask="url(#cyberPantherFillMask)" />
      {/* Head */}
      <ellipse cx="64" cy="46" rx="26" ry="24" fill="url(#cyberPantherGrad)" mask="url(#cyberPantherFillMask)" />
      <ellipse cx="64" cy="46" rx="26" ry="24" fill="none" stroke="#00ffff" strokeWidth="2" />
      {/* Mechanical ears */}
      <path d="M42 30 L36 18 L40 22 L46 28 Z" fill="#9400d3" mask="url(#cyberPantherFillMask)" />
      <path d="M42 30 L36 18 L40 22 L46 28 Z" fill="none" stroke="#ff00ff" strokeWidth="1.5" />
      <circle cx="40" cy="23" r="2" fill="#00ffff" mask="url(#cyberPantherFillMask)" />
      <path d="M86 30 L92 18 L88 22 L82 28 Z" fill="#9400d3" mask="url(#cyberPantherFillMask)" />
      <path d="M86 30 L92 18 L88 22 L82 28 Z" fill="none" stroke="#ff00ff" strokeWidth="1.5" />
      <circle cx="88" cy="23" r="2" fill="#00ffff" mask="url(#cyberPantherFillMask)" />
      {/* Glowing eyes */}
      <ellipse cx="52" cy="44" rx="7" ry="8" fill="#ff00ff" mask="url(#cyberPantherFillMask)" />
      <ellipse cx="76" cy="44" rx="7" ry="8" fill="#ff00ff" mask="url(#cyberPantherFillMask)" />
      <ellipse cx="52" cy="44" rx="4" ry="6" fill="#00ffff" mask="url(#cyberPantherFillMask)" />
      <ellipse cx="76" cy="44" rx="4" ry="6" fill="#00ffff" mask="url(#cyberPantherFillMask)" />
      <circle cx="52" cy="42" r="2" fill="#ffffff" mask="url(#cyberPantherFillMask)" />
      <circle cx="76" cy="42" r="2" fill="#ffffff" mask="url(#cyberPantherFillMask)" />
      {/* Tech snout */}
      <ellipse cx="64" cy="54" rx="9" ry="7" fill="#9400d3" mask="url(#cyberPantherFillMask)" opacity="0.6" />
      <ellipse cx="64" cy="56" rx="3" ry="2" fill="#000" mask="url(#cyberPantherFillMask)" />
      {/* Energy whiskers */}
      <line x1="38" y1="48" x2="26" y2="46" stroke="#ff00ff" strokeWidth="1.5" mask="url(#cyberPantherFillMask)" />
      <line x1="38" y1="52" x2="26" y2="52" stroke="#00ffff" strokeWidth="1.5" mask="url(#cyberPantherFillMask)" />
      <line x1="90" y1="48" x2="102" y2="46" stroke="#ff00ff" strokeWidth="1.5" mask="url(#cyberPantherFillMask)" />
      <line x1="90" y1="52" x2="102" y2="52" stroke="#00ffff" strokeWidth="1.5" mask="url(#cyberPantherFillMask)" />
      {/* Energy tail */}
      <path d="M92 90 Q105 95, 112 105 L110 103 Q102 93, 90 92 Z" fill="url(#cyberPantherGrad)" mask="url(#cyberPantherFillMask)" opacity="0.8" />
      <circle cx="112" cy="105" r="4" fill="#ff00ff" mask="url(#cyberPantherFillMask)" />
      <circle cx="112" cy="105" r="2" fill="#00ffff" mask="url(#cyberPantherFillMask)" />
      {/* Power core */}
      <circle cx="64" cy="80" r="6" fill="#9400d3" mask="url(#cyberPantherFillMask)" opacity="0.8" />
      <circle cx="64" cy="80" r="4" fill="#ff00ff" mask="url(#cyberPantherFillMask)" />
      <circle cx="64" cy="80" r="2" fill="#ffffff" mask="url(#cyberPantherFillMask)" />
    </svg>
  );
};

export default Asset15;

