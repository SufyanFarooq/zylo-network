import React from 'react';

const Asset12: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="meteorCoreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#ffff00" />
          <stop offset="60%" stopColor="#ff8c00" />
          <stop offset="100%" stopColor="#8b4513" />
        </radialGradient>
        <linearGradient id="meteorTrailGrad" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ff4500" opacity="0.9" />
          <stop offset="40%" stopColor="#ff8c00" opacity="0.6" />
          <stop offset="70%" stopColor="#ffd700" opacity="0.3" />
          <stop offset="100%" stopColor="#ffff00" opacity="0" />
        </linearGradient>
        <filter id="meteorGlow"><feGaussianBlur stdDeviation="6" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="meteorFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Long trail */}
      <path d="M100 28 Q70 50, 30 80 Q50 65, 65 55 Q80 40, 100 28" fill="url(#meteorTrailGrad)" mask="url(#meteorFillMask)" filter="url(#meteorGlow)" />
      <path d="M98 32 Q68 54, 28 84 Q48 69, 63 59 Q78 44, 98 32" fill="url(#meteorTrailGrad)" mask="url(#meteorFillMask)" opacity="0.7" />
      <path d="M95 30 Q75 55, 40 90 Q55 75, 68 65 Q82 48, 95 30" fill="#ff8c00" mask="url(#meteorFillMask)" opacity="0.4" />
      {/* Trail particles */}
      <circle cx="88" cy="40" r="3" fill="#ffff00" mask="url(#meteorFillMask)" opacity="0.8" filter="url(#meteorGlow)" />
      <circle cx="75" cy="52" r="2.5" fill="#ff8c00" mask="url(#meteorFillMask)" opacity="0.7" filter="url(#meteorGlow)" />
      <circle cx="62" cy="64" r="2" fill="#ffd700" mask="url(#meteorFillMask)" opacity="0.6" />
      <circle cx="48" cy="76" r="1.5" fill="#ff4500" mask="url(#meteorFillMask)" opacity="0.5" />
      <circle cx="82" cy="45" r="2" fill="#ffffff" mask="url(#meteorFillMask)" opacity="0.9" />
      <circle cx="68" cy="58" r="1.5" fill="#ffffff" mask="url(#meteorFillMask)" opacity="0.8" />
      <circle cx="55" cy="70" r="1" fill="#ffff00" mask="url(#meteorFillMask)" opacity="0.7" />
      {/* Meteor head - irregular rock shape */}
      <ellipse cx="108" cy="20" rx="12" ry="10" fill="url(#meteorCoreGrad)" mask="url(#meteorFillMask)" filter="url(#meteorGlow)" transform="rotate(-45 108 20)" />
      <ellipse cx="108" cy="20" rx="12" ry="10" fill="none" stroke="#ff8c00" strokeWidth="2" transform="rotate(-45 108 20)" />
      {/* Rocky texture */}
      <circle cx="105" cy="18" r="3" fill="#8b4513" mask="url(#meteorFillMask)" opacity="0.7" />
      <circle cx="110" cy="22" r="2.5" fill="#8b4513" mask="url(#meteorFillMask)" opacity="0.6" />
      <circle cx="108" cy="19" r="2" fill="#a0522d" mask="url(#meteorFillMask)" opacity="0.5" />
      {/* Fire glow around head */}
      <ellipse cx="108" cy="20" rx="16" ry="14" fill="#ff4500" mask="url(#meteorFillMask)" opacity="0.4" filter="url(#meteorGlow)" transform="rotate(-45 108 20)" />
      <ellipse cx="108" cy="20" rx="20" ry="18" fill="#ff8c00" mask="url(#meteorFillMask)" opacity="0.2" filter="url(#meteorGlow)" transform="rotate(-45 108 20)" />
      {/* Hot core glow */}
      <circle cx="108" cy="20" r="5" fill="#ffffff" mask="url(#meteorFillMask)" opacity="0.8" />
      <circle cx="108" cy="20" r="3" fill="#ffff00" mask="url(#meteorFillMask)" />
      {/* Additional flame wisps */}
      <path d="M102 16 Q98 18, 95 22" stroke="#ff4500" strokeWidth="2" fill="none" mask="url(#meteorFillMask)" opacity="0.6" />
      <path d="M114 24 Q118 26, 120 30" stroke="#ff8c00" strokeWidth="2" fill="none" mask="url(#meteorFillMask)" opacity="0.6" />
      <circle cx="95" cy="22" r="2" fill="#ffd700" mask="url(#meteorFillMask)" opacity="0.7" filter="url(#meteorGlow)" />
      <circle cx="120" cy="30" r="1.5" fill="#ffd700" mask="url(#meteorFillMask)" opacity="0.7" filter="url(#meteorGlow)" />
    </svg>
  );
};

export default Asset12;

