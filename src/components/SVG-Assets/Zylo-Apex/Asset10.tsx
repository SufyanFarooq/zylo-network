import React from 'react';

const Asset10: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="phoenixBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="40%" stopColor="#ff8c00" />
          <stop offset="100%" stopColor="#ff4500" />
        </linearGradient>
        <radialGradient id="phoenixFlameGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffff00" opacity="0.9" />
          <stop offset="50%" stopColor="#ff8c00" opacity="0.6" />
          <stop offset="100%" stopColor="#ff4500" opacity="0.3" />
        </radialGradient>
        <filter id="phoenixGlow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="phoenixFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Flame aura */}
      <ellipse cx="64" cy="64" rx="50" ry="55" fill="url(#phoenixFlameGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" opacity="0.5" />
      {/* Tail feathers with flames */}
      <path d="M64 95 Q50 105, 40 115 Q45 110, 50 105 Q55 100, 64 95" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      <path d="M64 95 Q64 108, 60 120 Q62 112, 64 105 Q64 100, 64 95" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      <path d="M64 95 Q78 105, 88 115 Q83 110, 78 105 Q73 100, 64 95" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      {/* Flame tips on tail */}
      <circle cx="40" cy="115" r="4" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      <circle cx="60" cy="120" r="4" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      <circle cx="88" cy="115" r="4" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      {/* Body */}
      <ellipse cx="64" cy="65" rx="22" ry="28" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      <ellipse cx="64" cy="65" rx="22" ry="28" fill="none" stroke="#ff8c00" strokeWidth="2.5" />
      {/* Wings spread */}
      <path d="M42 60 Q20 50, 15 45 Q25 48, 35 52 Q40 56, 42 60" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      <path d="M42 70 Q18 75, 10 80 Q22 77, 32 73 Q40 72, 42 70" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      <path d="M86 60 Q108 50, 113 45 Q103 48, 93 52 Q88 56, 86 60" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      <path d="M86 70 Q110 75, 118 80 Q106 77, 96 73 Q88 72, 86 70" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      {/* Wing flame tips */}
      <circle cx="15" cy="45" r="3" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      <circle cx="10" cy="80" r="3" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      <circle cx="113" cy="45" r="3" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      <circle cx="118" cy="80" r="3" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      {/* Head */}
      <ellipse cx="64" cy="42" rx="14" ry="16" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      <ellipse cx="64" cy="42" rx="14" ry="16" fill="none" stroke="#ff8c00" strokeWidth="2" />
      {/* Crest flames */}
      <path d="M64 26 Q62 20, 60 15 Q62 20, 64 25" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      <path d="M64 26 Q64 18, 64 12 Q64 18, 64 25" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      <path d="M64 26 Q66 20, 68 15 Q66 20, 64 25" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
      <circle cx="60" cy="15" r="2.5" fill="#ffffff" mask="url(#phoenixFillMask)" />
      <circle cx="64" cy="12" r="2.5" fill="#ffffff" mask="url(#phoenixFillMask)" />
      <circle cx="68" cy="15" r="2.5" fill="#ffffff" mask="url(#phoenixFillMask)" />
      {/* Eyes */}
      <circle cx="59" cy="40" r="3" fill="#ff4500" mask="url(#phoenixFillMask)" />
      <circle cx="69" cy="40" r="3" fill="#ff4500" mask="url(#phoenixFillMask)" />
      <circle cx="59" cy="40" r="1.5" fill="#ffff00" mask="url(#phoenixFillMask)" />
      <circle cx="69" cy="40" r="1.5" fill="#ffff00" mask="url(#phoenixFillMask)" />
      {/* Beak */}
      <path d="M64 45 L67 50 L64 48 L61 50 Z" fill="#ff8c00" mask="url(#phoenixFillMask)" />
      {/* Body glow center */}
      <ellipse cx="64" cy="65" rx="10" ry="14" fill="#ffff00" mask="url(#phoenixFillMask)" opacity="0.4" />
      <circle cx="64" cy="65" r="6" fill="#ffffff" mask="url(#phoenixFillMask)" opacity="0.3" />
    </svg>
  );
};

export default Asset10;

