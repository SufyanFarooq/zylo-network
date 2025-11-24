import React from 'react';

const Asset12: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="catBodyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffa500" />
          <stop offset="50%" stopColor="#ff8c00" />
          <stop offset="100%" stopColor="#ff7f50" />
        </radialGradient>
        <filter id="catGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="catFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Curled tail */}
      <path d="M88 85 Q95 75, 98 65 Q100 55, 95 50" fill="none" stroke="url(#catBodyGrad)" strokeWidth="10" mask="url(#catFillMask)" strokeLinecap="round" />
      {/* Body */}
      <ellipse cx="62" cy="75" rx="28" ry="34" fill="url(#catBodyGrad)" mask="url(#catFillMask)" filter="url(#catGlow)" />
      <ellipse cx="62" cy="75" rx="28" ry="34" fill="none" stroke="#ff7f50" strokeWidth="2" />
      {/* Neck */}
      <ellipse cx="60" cy="52" rx="20" ry="24" fill="url(#catBodyGrad)" mask="url(#catFillMask)" />
      {/* Head - rounder */}
      <ellipse cx="58" cy="38" rx="24" ry="22" fill="url(#catBodyGrad)" mask="url(#catFillMask)" />
      <ellipse cx="58" cy="38" rx="24" ry="22" fill="none" stroke="#ff7f50" strokeWidth="2" />
      {/* Pointy triangular ears */}
      <path d="M42 28 L36 12 L48 24 Z" fill="url(#catBodyGrad)" mask="url(#catFillMask)" />
      <path d="M42 28 L36 12 L48 24 Z" fill="none" stroke="#ff7f50" strokeWidth="2" />
      <path d="M42 24 L38 16 L46 22 Z" fill="#ff69b4" mask="url(#catFillMask)" opacity="0.7" />
      <path d="M74 28 L80 12 L68 24 Z" fill="url(#catBodyGrad)" mask="url(#catFillMask)" />
      <path d="M74 28 L80 12 L68 24 Z" fill="none" stroke="#ff7f50" strokeWidth="2" />
      <path d="M72 24 L76 16 L68 22 Z" fill="#ff69b4" mask="url(#catFillMask)" opacity="0.7" />
      {/* Cat eyes - slanted and mysterious */}
      <ellipse cx="50" cy="40" rx="6" ry="9" fill="#32cd32" mask="url(#catFillMask)" transform="rotate(-10 50 40)" />
      <ellipse cx="66" cy="40" rx="6" ry="9" fill="#32cd32" mask="url(#catFillMask)" transform="rotate(10 66 40)" />
      <ellipse cx="50" cy="40" rx="2" ry="7" fill="#000" mask="url(#catFillMask)" transform="rotate(-10 50 40)" />
      <ellipse cx="66" cy="40" rx="2" ry="7" fill="#000" mask="url(#catFillMask)" transform="rotate(10 66 40)" />
      <circle cx="50" cy="38" r="1.5" fill="#fff" mask="url(#catFillMask)" opacity="0.9" />
      <circle cx="66" cy="38" r="1.5" fill="#fff" mask="url(#catFillMask)" opacity="0.9" />
      {/* Pink nose */}
      <path d="M58 48 L55 50 L58 52 L61 50 Z" fill="#ff69b4" mask="url(#catFillMask)" />
      <path d="M58 52 L58 54" stroke="#ff69b4" strokeWidth="1.5" mask="url(#catFillMask)" />
      {/* Whiskers */}
      <line x1="40" y1="46" x2="28" y2="44" stroke="#333" strokeWidth="1.5" mask="url(#catFillMask)" />
      <line x1="40" y1="50" x2="28" y2="50" stroke="#333" strokeWidth="1.5" mask="url(#catFillMask)" />
      <line x1="40" y1="54" x2="28" y2="56" stroke="#333" strokeWidth="1.5" mask="url(#catFillMask)" />
      <line x1="76" y1="46" x2="88" y2="44" stroke="#333" strokeWidth="1.5" mask="url(#catFillMask)" />
      <line x1="76" y1="50" x2="88" y2="50" stroke="#333" strokeWidth="1.5" mask="url(#catFillMask)" />
      <line x1="76" y1="54" x2="88" y2="56" stroke="#333" strokeWidth="1.5" mask="url(#catFillMask)" />
      {/* Mouth - W shape */}
      <path d="M58 54 Q54 56, 50 54" fill="none" stroke="#333" strokeWidth="1.5" mask="url(#catFillMask)" />
      <path d="M58 54 Q62 56, 66 54" fill="none" stroke="#333" strokeWidth="1.5" mask="url(#catFillMask)" />
      {/* Stripes */}
      <path d="M46 72 Q44 74, 46 76" stroke="#ff6347" strokeWidth="2" mask="url(#catFillMask)" opacity="0.6" />
      <path d="M70 74 Q72 76, 70 78" stroke="#ff6347" strokeWidth="2" mask="url(#catFillMask)" opacity="0.6" />
    </svg>
  );
};

export default Asset12;

