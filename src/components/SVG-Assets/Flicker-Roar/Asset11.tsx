import React from 'react';

const Asset11: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="dogBodyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#daa520" />
          <stop offset="50%" stopColor="#cd853f" />
          <stop offset="100%" stopColor="#8b4513" />
        </radialGradient>
        <filter id="dogGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="dogFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Wagging tail */}
      <ellipse cx="88" cy="88" rx="12" ry="22" fill="url(#dogBodyGrad)" mask="url(#dogFillMask)" opacity="0.9" transform="rotate(25 88 88)" />
      {/* Body */}
      <ellipse cx="62" cy="78" rx="30" ry="36" fill="url(#dogBodyGrad)" mask="url(#dogFillMask)" filter="url(#dogGlow)" />
      <ellipse cx="62" cy="78" rx="30" ry="36" fill="none" stroke="#8b4513" strokeWidth="2" />
      {/* Neck */}
      <ellipse cx="60" cy="52" rx="22" ry="26" fill="url(#dogBodyGrad)" mask="url(#dogFillMask)" />
      {/* Head */}
      <ellipse cx="58" cy="38" rx="24" ry="22" fill="url(#dogBodyGrad)" mask="url(#dogFillMask)" />
      <ellipse cx="58" cy="38" rx="24" ry="22" fill="none" stroke="#8b4513" strokeWidth="2" />
      {/* Floppy ears */}
      <ellipse cx="42" cy="38" rx="10" ry="18" fill="url(#dogBodyGrad)" mask="url(#dogFillMask)" transform="rotate(-15 42 38)" />
      <ellipse cx="42" cy="38" rx="10" ry="18" fill="none" stroke="#8b4513" strokeWidth="1.5" transform="rotate(-15 42 38)" />
      <ellipse cx="42" cy="40" rx="6" ry="12" fill="#8b4513" mask="url(#dogFillMask)" opacity="0.5" transform="rotate(-15 42 40)" />
      <ellipse cx="74" cy="38" rx="10" ry="18" fill="url(#dogBodyGrad)" mask="url(#dogFillMask)" transform="rotate(15 74 38)" />
      <ellipse cx="74" cy="38" rx="10" ry="18" fill="none" stroke="#8b4513" strokeWidth="1.5" transform="rotate(15 74 38)" />
      <ellipse cx="74" cy="40" rx="6" ry="12" fill="#8b4513" mask="url(#dogFillMask)" opacity="0.5" transform="rotate(15 74 40)" />
      {/* Friendly eyes */}
      <ellipse cx="52" cy="38" rx="5" ry="6" fill="#333" mask="url(#dogFillMask)" />
      <ellipse cx="64" cy="38" rx="5" ry="6" fill="#333" mask="url(#dogFillMask)" />
      <circle cx="53" cy="37" r="2" fill="#fff" mask="url(#dogFillMask)" opacity="0.9" />
      <circle cx="65" cy="37" r="2" fill="#fff" mask="url(#dogFillMask)" opacity="0.9" />
      {/* Snout */}
      <ellipse cx="58" cy="48" rx="14" ry="12" fill="#cd853f" mask="url(#dogFillMask)" opacity="0.95" />
      <ellipse cx="58" cy="46" rx="10" ry="8" fill="#daa520" mask="url(#dogFillMask)" opacity="0.8" />
      {/* Big black nose */}
      <ellipse cx="58" cy="50" rx="5" ry="4" fill="#000" mask="url(#dogFillMask)" />
      <path d="M58 53 L58 56" stroke="#000" strokeWidth="2" mask="url(#dogFillMask)" />
      {/* Happy smile */}
      <path d="M58 56 Q54 59, 50 57" fill="none" stroke="#000" strokeWidth="2" mask="url(#dogFillMask)" />
      <path d="M58 56 Q62 59, 66 57" fill="none" stroke="#000" strokeWidth="2" mask="url(#dogFillMask)" />
      {/* Panting tongue */}
      <ellipse cx="58" cy="60" rx="4" ry="6" fill="#ff69b4" mask="url(#dogFillMask)" opacity="0.9" />
      {/* Spots */}
      <circle cx="48" cy="75" r="4" fill="#8b4513" mask="url(#dogFillMask)" opacity="0.6" />
      <circle cx="72" cy="80" r="3" fill="#8b4513" mask="url(#dogFillMask)" opacity="0.6" />
    </svg>
  );
};

export default Asset11;

