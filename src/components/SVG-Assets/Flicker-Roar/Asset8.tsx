import React from 'react';

const Asset8: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="foxBodyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff8c00" />
          <stop offset="50%" stopColor="#ff7f50" />
          <stop offset="100%" stopColor="#ff6347" />
        </radialGradient>
        <linearGradient id="foxTailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff8c00" />
          <stop offset="70%" stopColor="#ff6347" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
        <filter id="foxGlow"><feGaussianBlur stdDeviation="2.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="foxFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Bushy tail */}
      <ellipse cx="90" cy="88" rx="20" ry="28" fill="url(#foxTailGrad)" mask="url(#foxFillMask)" filter="url(#foxGlow)" transform="rotate(35 90 88)" />
      <ellipse cx="88" cy="92" rx="12" ry="16" fill="#fff" mask="url(#foxFillMask)" opacity="0.8" transform="rotate(35 88 92)" />
      {/* Body */}
      <ellipse cx="62" cy="75" rx="28" ry="34" fill="url(#foxBodyGrad)" mask="url(#foxFillMask)" filter="url(#foxGlow)" />
      <ellipse cx="62" cy="75" rx="28" ry="34" fill="none" stroke="#ff6347" strokeWidth="2" />
      {/* White chest */}
      <ellipse cx="62" cy="78" rx="18" ry="24" fill="#fff" mask="url(#foxFillMask)" opacity="0.85" />
      {/* Neck */}
      <ellipse cx="60" cy="52" rx="20" ry="24" fill="url(#foxBodyGrad)" mask="url(#foxFillMask)" />
      {/* Head */}
      <ellipse cx="58" cy="38" rx="22" ry="20" fill="url(#foxBodyGrad)" mask="url(#foxFillMask)" />
      <ellipse cx="58" cy="38" rx="22" ry="20" fill="none" stroke="#ff6347" strokeWidth="2" />
      {/* Pointy ears */}
      <path d="M46 28 L42 12 L50 26 Z" fill="url(#foxBodyGrad)" mask="url(#foxFillMask)" />
      <path d="M46 28 L42 12 L50 26 Z" fill="none" stroke="#ff6347" strokeWidth="2" />
      <path d="M46 24 L43 16 L48 24 Z" fill="#fff" mask="url(#foxFillMask)" opacity="0.7" />
      <path d="M70 28 L74 12 L62 26 Z" fill="url(#foxBodyGrad)" mask="url(#foxFillMask)" />
      <path d="M70 28 L74 12 L62 26 Z" fill="none" stroke="#ff6347" strokeWidth="2" />
      <path d="M68 24 L71 16 L64 24 Z" fill="#fff" mask="url(#foxFillMask)" opacity="0.7" />
      {/* White face markings */}
      <ellipse cx="48" cy="42" rx="8" ry="10" fill="#fff" mask="url(#foxFillMask)" opacity="0.85" />
      <ellipse cx="68" cy="42" rx="8" ry="10" fill="#fff" mask="url(#foxFillMask)" opacity="0.85" />
      {/* Clever eyes */}
      <ellipse cx="50" cy="40" rx="4" ry="6" fill="#333" mask="url(#foxFillMask)" />
      <ellipse cx="66" cy="40" rx="4" ry="6" fill="#333" mask="url(#foxFillMask)" />
      <circle cx="51" cy="39" r="1.5" fill="#fff" mask="url(#foxFillMask)" />
      <circle cx="67" cy="39" r="1.5" fill="#fff" mask="url(#foxFillMask)" />
      {/* Snout */}
      <ellipse cx="58" cy="50" rx="12" ry="10" fill="#ff8c00" mask="url(#foxFillMask)" opacity="0.9" />
      <ellipse cx="58" cy="48" rx="8" ry="6" fill="#fff" mask="url(#foxFillMask)" opacity="0.8" />
      {/* Black nose */}
      <ellipse cx="58" cy="52" rx="4" ry="3" fill="#000" mask="url(#foxFillMask)" />
      <path d="M58 54 L58 58" stroke="#000" strokeWidth="1.5" mask="url(#foxFillMask)" />
      {/* Smile */}
      <path d="M58 58 Q54 60, 50 58" fill="none" stroke="#000" strokeWidth="2" mask="url(#foxFillMask)" />
      <path d="M58 58 Q62 60, 66 58" fill="none" stroke="#000" strokeWidth="2" mask="url(#foxFillMask)" />
      {/* Whisker dots */}
      <circle cx="42" cy="48" r="1.5" fill="#000" mask="url(#foxFillMask)" />
      <circle cx="74" cy="48" r="1.5" fill="#000" mask="url(#foxFillMask)" />
    </svg>
  );
};

export default Asset8;

