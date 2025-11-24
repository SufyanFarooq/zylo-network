import React from 'react';

const Asset14: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="rhinoBodyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#808080" />
          <stop offset="50%" stopColor="#696969" />
          <stop offset="100%" stopColor="#4a4a4a" />
        </radialGradient>
        <linearGradient id="rhinoHornGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d3d3d3" />
          <stop offset="100%" stopColor="#696969" />
        </linearGradient>
        <filter id="rhinoGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="rhinoFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Body - massive */}
      <ellipse cx="64" cy="82" rx="36" ry="40" fill="url(#rhinoBodyGrad)" mask="url(#rhinoFillMask)" filter="url(#rhinoGlow)" />
      <ellipse cx="64" cy="82" rx="36" ry="40" fill="none" stroke="#4a4a4a" strokeWidth="2" />
      {/* Thick neck */}
      <ellipse cx="62" cy="54" rx="28" ry="30" fill="url(#rhinoBodyGrad)" mask="url(#rhinoFillMask)" />
      {/* Large head */}
      <ellipse cx="60" cy="38" rx="26" ry="24" fill="url(#rhinoBodyGrad)" mask="url(#rhinoFillMask)" />
      <ellipse cx="60" cy="38" rx="26" ry="24" fill="none" stroke="#4a4a4a" strokeWidth="2" />
      {/* Prominent horn */}
      <path d="M60 32 L58 12 L54 18 L56 30 Z" fill="url(#rhinoHornGrad)" mask="url(#rhinoFillMask)" />
      <path d="M60 32 L58 12 L56 30 Z" fill="none" stroke="#555" strokeWidth="2" />
      {/* Smaller second horn */}
      <path d="M60 36 L59 24 L57 28 L58 35 Z" fill="url(#rhinoHornGrad)" mask="url(#rhinoFillMask)" opacity="0.9" />
      {/* Small ears */}
      <ellipse cx="44" cy="30" rx="6" ry="10" fill="url(#rhinoBodyGrad)" mask="url(#rhinoFillMask)" transform="rotate(-20 44 30)" />
      <ellipse cx="76" cy="30" rx="6" ry="10" fill="url(#rhinoBodyGrad)" mask="url(#rhinoFillMask)" transform="rotate(20 76 30)" />
      {/* Small eyes */}
      <ellipse cx="52" cy="36" rx="3" ry="5" fill="#333" mask="url(#rhinoFillMask)" />
      <ellipse cx="68" cy="36" rx="3" ry="5" fill="#333" mask="url(#rhinoFillMask)" />
      <circle cx="53" cy="35" r="1" fill="#fff" mask="url(#rhinoFillMask)" opacity="0.8" />
      <circle cx="69" cy="35" r="1" fill="#fff" mask="url(#rhinoFillMask)" opacity="0.8" />
      {/* Long snout */}
      <ellipse cx="60" cy="50" rx="20" ry="16" fill="#696969" mask="url(#rhinoFillMask)" opacity="0.95" />
      <ellipse cx="60" cy="48" rx="16" ry="12" fill="#808080" mask="url(#rhinoFillMask)" opacity="0.8" />
      {/* Nostrils */}
      <ellipse cx="56" cy="54" rx="3" ry="4" fill="#000" mask="url(#rhinoFillMask)" />
      <ellipse cx="64" cy="54" rx="3" ry="4" fill="#000" mask="url(#rhinoFillMask)" />
      {/* Mouth line */}
      <path d="M50 58 Q55 60, 60 60 Q65 60, 70 58" fill="none" stroke="#4a4a4a" strokeWidth="2" mask="url(#rhinoFillMask)" />
      {/* Thick skin folds */}
      <path d="M40 62 Q38 64, 40 66" stroke="#4a4a4a" strokeWidth="2" mask="url(#rhinoFillMask)" opacity="0.5" />
      <path d="M36 75 Q34 77, 36 79" stroke="#4a4a4a" strokeWidth="2" mask="url(#rhinoFillMask)" opacity="0.5" />
      <path d="M84 75 Q86 77, 84 79" stroke="#4a4a4a" strokeWidth="2" mask="url(#rhinoFillMask)" opacity="0.5" />
      {/* Stubby legs hint */}
      <ellipse cx="50" cy="110" rx="8" ry="12" fill="url(#rhinoBodyGrad)" mask="url(#rhinoFillMask)" opacity="0.8" />
      <ellipse cx="74" cy="110" rx="8" ry="12" fill="url(#rhinoBodyGrad)" mask="url(#rhinoFillMask)" opacity="0.8" />
    </svg>
  );
};

export default Asset14;

