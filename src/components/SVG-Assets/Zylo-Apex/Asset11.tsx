import React from 'react';

const Asset11: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="cosmicDragonBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9370db" />
          <stop offset="50%" stopColor="#4169e1" />
          <stop offset="100%" stopColor="#00ffff" />
        </linearGradient>
        <radialGradient id="cosmicDragonGlowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" opacity="0.8" />
          <stop offset="50%" stopColor="#9370db" opacity="0.5" />
          <stop offset="100%" stopColor="#4169e1" opacity="0.2" />
        </radialGradient>
        <filter id="cosmicDragonGlow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="cosmicDragonFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Cosmic aura */}
      <circle cx="64" cy="64" r="55" fill="url(#cosmicDragonGlowGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" opacity="0.4" />
      {/* Tail */}
      <path d="M30 100 Q20 95, 15 85 Q18 90, 22 92 Q26 95, 30 100" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" />
      <path d="M30 100 Q35 110, 40 118 Q37 112, 34 106 Q32 102, 30 100" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" />
      <line x1="30" y1="100" x2="50" y2="95" stroke="#4169e1" strokeWidth="6" mask="url(#cosmicDragonFillMask)" strokeLinecap="round" />
      <circle cx="15" cy="85" r="3" fill="#00ffff" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" />
      <circle cx="40" cy="118" r="3" fill="#00ffff" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" />
      {/* Body */}
      <ellipse cx="60" cy="80" rx="20" ry="25" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" />
      <ellipse cx="60" cy="80" rx="20" ry="25" fill="none" stroke="#9370db" strokeWidth="2.5" />
      {/* Scales/spots */}
      <circle cx="55" cy="75" r="3" fill="#00ffff" mask="url(#cosmicDragonFillMask)" opacity="0.6" />
      <circle cx="65" cy="82" r="2.5" fill="#00ffff" mask="url(#cosmicDragonFillMask)" opacity="0.6" />
      <circle cx="58" cy="88" r="2" fill="#00ffff" mask="url(#cosmicDragonFillMask)" opacity="0.6" />
      {/* Wings */}
      <path d="M55 65 Q30 55, 20 50 Q25 52, 35 58 Q45 63, 55 65" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" opacity="0.8" />
      <path d="M55 75 Q28 80, 18 88 Q26 84, 38 78 Q48 74, 55 75" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" opacity="0.8" />
      <path d="M65 65 Q90 55, 100 50 Q95 52, 85 58 Q75 63, 65 65" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" opacity="0.8" />
      <path d="M65 75 Q92 80, 102 88 Q94 84, 82 78 Q72 74, 65 75" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" opacity="0.8" />
      {/* Wing stars */}
      <circle cx="25" cy="52" r="2" fill="#ffffff" mask="url(#cosmicDragonFillMask)" />
      <circle cx="22" cy="85" r="1.5" fill="#ffffff" mask="url(#cosmicDragonFillMask)" />
      <circle cx="95" cy="52" r="2" fill="#ffffff" mask="url(#cosmicDragonFillMask)" />
      <circle cx="98" cy="85" r="1.5" fill="#ffffff" mask="url(#cosmicDragonFillMask)" />
      {/* Neck */}
      <ellipse cx="68" cy="58" rx="10" ry="18" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" transform="rotate(-25 68 58)" />
      <ellipse cx="68" cy="58" rx="10" ry="18" fill="none" stroke="#9370db" strokeWidth="2" transform="rotate(-25 68 58)" />
      {/* Head */}
      <ellipse cx="78" cy="38" rx="16" ry="18" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" />
      <ellipse cx="78" cy="38" rx="16" ry="18" fill="none" stroke="#9370db" strokeWidth="2.5" />
      {/* Eyes */}
      <circle cx="74" cy="35" r="4" fill="#ffff00" mask="url(#cosmicDragonFillMask)" />
      <circle cx="82" cy="35" r="4" fill="#ffff00" mask="url(#cosmicDragonFillMask)" />
      <circle cx="74" cy="35" r="2" fill="#ff4500" mask="url(#cosmicDragonFillMask)" />
      <circle cx="82" cy="35" r="2" fill="#ff4500" mask="url(#cosmicDragonFillMask)" />
      {/* Horns */}
      <path d="M70 22 L68 18 Q70 20, 70 22" fill="#9370db" mask="url(#cosmicDragonFillMask)" />
      <path d="M86 22 L88 18 Q86 20, 86 22" fill="#9370db" mask="url(#cosmicDragonFillMask)" />
      <circle cx="68" cy="18" r="2" fill="#00ffff" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" />
      <circle cx="88" cy="18" r="2" fill="#00ffff" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" />
      {/* Snout */}
      <ellipse cx="85" cy="43" rx="8" ry="6" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" />
      <ellipse cx="85" cy="43" rx="8" ry="6" fill="none" stroke="#4169e1" strokeWidth="1.5" />
      {/* Nostrils */}
      <circle cx="88" cy="42" r="1.5" fill="#4169e1" mask="url(#cosmicDragonFillMask)" />
      <circle cx="88" cy="45" r="1.5" fill="#4169e1" mask="url(#cosmicDragonFillMask)" />
      {/* Cosmic breath */}
      <circle cx="95" cy="43" r="2" fill="#00ffff" mask="url(#cosmicDragonFillMask)" opacity="0.7" filter="url(#cosmicDragonGlow)" />
      <circle cx="100" cy="40" r="1.5" fill="#9370db" mask="url(#cosmicDragonFillMask)" opacity="0.6" filter="url(#cosmicDragonGlow)" />
      <circle cx="103" cy="45" r="1" fill="#ffffff" mask="url(#cosmicDragonFillMask)" opacity="0.8" />
    </svg>
  );
};

export default Asset11;

