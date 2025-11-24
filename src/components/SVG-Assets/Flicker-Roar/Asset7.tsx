import React from 'react';

const Asset7: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="goatBodyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5deb3" />
          <stop offset="50%" stopColor="#daa520" />
          <stop offset="100%" stopColor="#cd853f" />
        </radialGradient>
        <linearGradient id="goatHornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b7355" />
          <stop offset="100%" stopColor="#654321" />
        </linearGradient>
        <filter id="goatGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="goatFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Body */}
      <ellipse cx="64" cy="78" rx="28" ry="36" fill="url(#goatBodyGrad)" mask="url(#goatFillMask)" filter="url(#goatGlow)" />
      <ellipse cx="64" cy="78" rx="28" ry="36" fill="none" stroke="#cd853f" strokeWidth="2" />
      {/* Neck */}
      <ellipse cx="64" cy="52" rx="18" ry="22" fill="url(#goatBodyGrad)" mask="url(#goatFillMask)" />
      {/* Head */}
      <ellipse cx="64" cy="38" rx="22" ry="20" fill="url(#goatBodyGrad)" mask="url(#goatFillMask)" />
      <ellipse cx="64" cy="38" rx="22" ry="20" fill="none" stroke="#cd853f" strokeWidth="2" />
      {/* Ears */}
      <ellipse cx="48" cy="32" rx="6" ry="12" fill="url(#goatBodyGrad)" mask="url(#goatFillMask)" transform="rotate(-25 48 32)" />
      <ellipse cx="48" cy="32" rx="3" ry="8" fill="#daa520" mask="url(#goatFillMask)" transform="rotate(-25 48 32)" opacity="0.7" />
      <ellipse cx="80" cy="32" rx="6" ry="12" fill="url(#goatBodyGrad)" mask="url(#goatFillMask)" transform="rotate(25 80 32)" />
      <ellipse cx="80" cy="32" rx="3" ry="8" fill="#daa520" mask="url(#goatFillMask)" transform="rotate(25 80 32)" opacity="0.7" />
      {/* Curved horns */}
      <path d="M48 26 Q42 18, 38 12 Q36 8, 38 10 Q40 14, 44 20 Q46 24, 48 28" fill="url(#goatHornGrad)" mask="url(#goatFillMask)" />
      <path d="M48 26 Q42 18, 38 12" fill="none" stroke="#654321" strokeWidth="2" />
      <path d="M80 26 Q86 18, 90 12 Q92 8, 90 10 Q88 14, 84 20 Q82 24, 80 28" fill="url(#goatHornGrad)" mask="url(#goatFillMask)" />
      <path d="M80 26 Q86 18, 90 12" fill="none" stroke="#654321" strokeWidth="2" />
      {/* Horn ridges */}
      <line x1="40" y1="16" x2="42" y2="18" stroke="#000" strokeWidth="1" opacity="0.3" />
      <line x1="42" y1="20" x2="44" y2="22" stroke="#000" strokeWidth="1" opacity="0.3" />
      <line x1="88" y1="16" x2="86" y2="18" stroke="#000" strokeWidth="1" opacity="0.3" />
      <line x1="86" y1="20" x2="84" y2="22" stroke="#000" strokeWidth="1" opacity="0.3" />
      {/* Goat eyes with horizontal pupils */}
      <ellipse cx="56" cy="38" rx="6" ry="7" fill="#ffffe0" mask="url(#goatFillMask)" />
      <ellipse cx="72" cy="38" rx="6" ry="7" fill="#ffffe0" mask="url(#goatFillMask)" />
      <rect x="54" y="37" width="4" height="2" rx="0.5" fill="#000" mask="url(#goatFillMask)" />
      <rect x="70" y="37" width="4" height="2" rx="0.5" fill="#000" mask="url(#goatFillMask)" />
      <circle cx="55" cy="37" r="1" fill="#fff" mask="url(#goatFillMask)" opacity="0.9" />
      <circle cx="71" cy="37" r="1" fill="#fff" mask="url(#goatFillMask)" opacity="0.9" />
      {/* Snout */}
      <ellipse cx="64" cy="48" rx="10" ry="9" fill="#daa520" mask="url(#goatFillMask)" opacity="0.9" />
      <ellipse cx="61" cy="50" rx="2" ry="2.5" fill="#000" mask="url(#goatFillMask)" />
      <ellipse cx="67" cy="50" rx="2" ry="2.5" fill="#000" mask="url(#goatFillMask)" />
      <path d="M64 52 L64 55" stroke="#8b7355" strokeWidth="2" mask="url(#goatFillMask)" />
      <path d="M64 55 Q60 57, 58 56" fill="none" stroke="#8b7355" strokeWidth="2" mask="url(#goatFillMask)" />
      <path d="M64 55 Q68 57, 70 56" fill="none" stroke="#8b7355" strokeWidth="2" mask="url(#goatFillMask)" />
      {/* Goat beard */}
      <path d="M64 56 L62 64 L60 68 M64 56 L64 70 M64 56 L66 64 L68 68" stroke="#8b7355" strokeWidth="2" mask="url(#goatFillMask)" opacity="0.8" />
      {/* Fur texture */}
      <circle cx="52" cy="75" r="2" fill="#cd853f" mask="url(#goatFillMask)" opacity="0.5" />
      <circle cx="76" cy="78" r="2" fill="#cd853f" mask="url(#goatFillMask)" opacity="0.5" />
      <circle cx="64" cy="88" r="2" fill="#cd853f" mask="url(#goatFillMask)" opacity="0.5" />
    </svg>
  );
};

export default Asset7;

