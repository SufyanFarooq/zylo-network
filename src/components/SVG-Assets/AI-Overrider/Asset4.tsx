import React from 'react';

const Asset4: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="nanoBotGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="50%" stopColor="#00ff00" />
          <stop offset="100%" stopColor="#00bfff" />
        </radialGradient>
        <filter id="nanoBotGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="nanoBotFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Central sphere */}
      <circle cx="64" cy="64" r="18" fill="url(#nanoBotGrad)" mask="url(#nanoBotFillMask)" filter="url(#nanoBotGlow)" />
      <circle cx="64" cy="64" r="18" fill="none" stroke="#00ffff" strokeWidth="2" />
      {/* Inner core */}
      <circle cx="64" cy="64" r="10" fill="#00ff00" mask="url(#nanoBotFillMask)" opacity="0.8" />
      <circle cx="64" cy="64" r="5" fill="#ffffff" mask="url(#nanoBotFillMask)" />
      {/* Orbiting particles */}
      <circle cx="84" cy="64" r="4" fill="#00ffff" mask="url(#nanoBotFillMask)" />
      <circle cx="44" cy="64" r="4" fill="#00ff00" mask="url(#nanoBotFillMask)" />
      <circle cx="64" cy="44" r="4" fill="#ff00ff" mask="url(#nanoBotFillMask)" />
      <circle cx="64" cy="84" r="4" fill="#00bfff" mask="url(#nanoBotFillMask)" />
      <circle cx="76" cy="52" r="3" fill="#00ffff" mask="url(#nanoBotFillMask)" opacity="0.7" />
      <circle cx="52" cy="76" r="3" fill="#00ff00" mask="url(#nanoBotFillMask)" opacity="0.7" />
      <circle cx="76" cy="76" r="3" fill="#ff00ff" mask="url(#nanoBotFillMask)" opacity="0.7" />
      <circle cx="52" cy="52" r="3" fill="#00bfff" mask="url(#nanoBotFillMask)" opacity="0.7" />
      {/* Orbit lines */}
      <circle cx="64" cy="64" r="24" fill="none" stroke="#00ffff" strokeWidth="1" mask="url(#nanoBotFillMask)" opacity="0.3" />
      <circle cx="64" cy="64" r="30" fill="none" stroke="#00ff00" strokeWidth="1" mask="url(#nanoBotFillMask)" opacity="0.3" />
      <circle cx="64" cy="64" r="36" fill="none" stroke="#ff00ff" strokeWidth="1" mask="url(#nanoBotFillMask)" opacity="0.3" />
      {/* Molecular bonds */}
      <line x1="64" y1="64" x2="84" y2="64" stroke="#00ffff" strokeWidth="1.5" mask="url(#nanoBotFillMask)" opacity="0.5" />
      <line x1="64" y1="64" x2="44" y2="64" stroke="#00ff00" strokeWidth="1.5" mask="url(#nanoBotFillMask)" opacity="0.5" />
      <line x1="64" y1="64" x2="64" y2="44" stroke="#ff00ff" strokeWidth="1.5" mask="url(#nanoBotFillMask)" opacity="0.5" />
      <line x1="64" y1="64" x2="64" y2="84" stroke="#00bfff" strokeWidth="1.5" mask="url(#nanoBotFillMask)" opacity="0.5" />
      {/* Nano appendages */}
      <path d="M82 64 L100 54 L102 56 L100 58" stroke="#00ffff" strokeWidth="2" mask="url(#nanoBotFillMask)" fill="none" />
      <path d="M46 64 L28 54 L26 56 L28 58" stroke="#00ff00" strokeWidth="2" mask="url(#nanoBotFillMask)" fill="none" />
      <path d="M64 46 L74 28 L76 30 L74 32" stroke="#ff00ff" strokeWidth="2" mask="url(#nanoBotFillMask)" fill="none" />
      <path d="M64 82 L74 100 L76 98 L74 96" stroke="#00bfff" strokeWidth="2" mask="url(#nanoBotFillMask)" fill="none" />
      {/* Micro details */}
      <circle cx="64" cy="64" r="2" fill="#ffffff" mask="url(#nanoBotFillMask)" />
    </svg>
  );
};

export default Asset4;

