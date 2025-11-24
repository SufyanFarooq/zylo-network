import React from 'react';

const Asset11: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="hologramGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="25%" stopColor="#00ffaa" />
          <stop offset="50%" stopColor="#00ccff" />
          <stop offset="75%" stopColor="#66ffff" />
          <stop offset="100%" stopColor="#ccffff" />
        </linearGradient>
        <radialGradient id="hologramRadial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" opacity="0.8" />
          <stop offset="30%" stopColor="#00ffff" opacity="0.6" />
          <stop offset="70%" stopColor="#00ffaa" opacity="0.4" />
          <stop offset="100%" stopColor="#00ccff" opacity="0.2" />
        </radialGradient>
        <filter id="hologramGlow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="hologramFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Outer glow aura */}
      <circle cx="64" cy="64" r="55" fill="url(#hologramRadial)" mask="url(#hologramFillMask)" opacity="0.15" />
      {/* Head */}
      <circle cx="64" cy="45" r="18" fill="url(#hologramGrad)" mask="url(#hologramFillMask)" filter="url(#hologramGlow)" opacity="0.85" />
      <circle cx="64" cy="45" r="18" fill="none" stroke="#00ffff" strokeWidth="2.5" opacity="0.9" />
      <circle cx="64" cy="45" r="20" fill="none" stroke="#00ffaa" strokeWidth="1" mask="url(#hologramFillMask)" opacity="0.4" />
      {/* Eyes */}
      <circle cx="58" cy="43" r="3" fill="#00ffff" mask="url(#hologramFillMask)" />
      <circle cx="70" cy="43" r="3" fill="#00ffff" mask="url(#hologramFillMask)" />
      <circle cx="58" cy="42" r="1.5" fill="#ffffff" mask="url(#hologramFillMask)" />
      <circle cx="70" cy="42" r="1.5" fill="#ffffff" mask="url(#hologramFillMask)" />
      {/* Mouth */}
      <line x1="58" y1="50" x2="70" y2="50" stroke="#00ffff" strokeWidth="2" mask="url(#hologramFillMask)" opacity="0.9" />
      {/* Body */}
      <path d="M50 63 L64 58 L78 63 L74 90 L54 90 Z" fill="url(#hologramGrad)" mask="url(#hologramFillMask)" filter="url(#hologramGlow)" opacity="0.75" />
      <path d="M50 63 L64 58 L78 63 L74 90 L54 90 Z" fill="none" stroke="#00ffff" strokeWidth="2.5" opacity="0.9" />
      <path d="M50 63 L64 58 L78 63 L74 90 L54 90 Z" fill="none" stroke="#00ffaa" strokeWidth="1" mask="url(#hologramFillMask)" opacity="0.5" />
      {/* Chest core */}
      <circle cx="64" cy="75" r="4" fill="#00ffff" mask="url(#hologramFillMask)" opacity="0.8" />
      <circle cx="64" cy="75" r="6" fill="none" stroke="#00ffaa" strokeWidth="1" mask="url(#hologramFillMask)" opacity="0.5" />
      <circle cx="64" cy="75" r="2" fill="#ffffff" mask="url(#hologramFillMask)" />
      {/* Arms */}
      <line x1="50" y1="65" x2="38" y2="75" stroke="#00ffff" strokeWidth="3.5" mask="url(#hologramFillMask)" opacity="0.8" />
      <line x1="78" y1="65" x2="90" y2="75" stroke="#00ffff" strokeWidth="3.5" mask="url(#hologramFillMask)" opacity="0.8" />
      <line x1="50" y1="65" x2="38" y2="75" stroke="#00ffaa" strokeWidth="1.5" mask="url(#hologramFillMask)" opacity="0.5" />
      <line x1="78" y1="65" x2="90" y2="75" stroke="#00ffaa" strokeWidth="1.5" mask="url(#hologramFillMask)" opacity="0.5" />
      {/* Hands */}
      <circle cx="38" cy="75" r="3" fill="#00ffff" mask="url(#hologramFillMask)" opacity="0.7" />
      <circle cx="90" cy="75" r="3" fill="#00ffff" mask="url(#hologramFillMask)" opacity="0.7" />
      {/* Legs */}
      <line x1="58" y1="90" x2="56" y2="110" stroke="#00ffff" strokeWidth="3.5" mask="url(#hologramFillMask)" opacity="0.8" />
      <line x1="70" y1="90" x2="72" y2="110" stroke="#00ffff" strokeWidth="3.5" mask="url(#hologramFillMask)" opacity="0.8" />
      <line x1="58" y1="90" x2="56" y2="110" stroke="#00ffaa" strokeWidth="1.5" mask="url(#hologramFillMask)" opacity="0.5" />
      <line x1="70" y1="90" x2="72" y2="110" stroke="#00ffaa" strokeWidth="1.5" mask="url(#hologramFillMask)" opacity="0.5" />
      {/* Feet */}
      <circle cx="56" cy="110" r="2.5" fill="#00ffff" mask="url(#hologramFillMask)" opacity="0.7" />
      <circle cx="72" cy="110" r="2.5" fill="#00ffff" mask="url(#hologramFillMask)" opacity="0.7" />
      {/* Scan lines */}
      <line x1="40" y1="40" x2="88" y2="40" stroke="#00ffff" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.5" />
      <line x1="40" y1="48" x2="88" y2="48" stroke="#00ffaa" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.4" />
      <line x1="40" y1="56" x2="88" y2="56" stroke="#00ffff" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.5" />
      <line x1="40" y1="64" x2="88" y2="64" stroke="#00ccff" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.4" />
      <line x1="40" y1="72" x2="88" y2="72" stroke="#00ffff" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.5" />
      <line x1="40" y1="80" x2="88" y2="80" stroke="#00ffaa" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.4" />
      <line x1="40" y1="88" x2="88" y2="88" stroke="#00ffff" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.5" />
      <line x1="40" y1="96" x2="88" y2="96" stroke="#00ccff" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.4" />
      <line x1="40" y1="104" x2="88" y2="104" stroke="#00ffaa" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.4" />
      {/* Data particles */}
      <circle cx="45" cy="55" r="2" fill="#00ffff" mask="url(#hologramFillMask)" opacity="0.8" />
      <circle cx="83" cy="68" r="2" fill="#00ffaa" mask="url(#hologramFillMask)" opacity="0.8" />
      <circle cx="50" cy="85" r="2" fill="#00ccff" mask="url(#hologramFillMask)" opacity="0.8" />
      <circle cx="78" cy="78" r="2" fill="#66ffff" mask="url(#hologramFillMask)" opacity="0.8" />
      <circle cx="42" cy="70" r="1.5" fill="#00ffff" mask="url(#hologramFillMask)" opacity="0.6" />
      <circle cx="86" cy="92" r="1.5" fill="#00ffaa" mask="url(#hologramFillMask)" opacity="0.6" />
      {/* Pixel glitches */}
      <rect x="48" y="47" width="2" height="1" fill="#ffffff" mask="url(#hologramFillMask)" opacity="0.7" />
      <rect x="75" y="52" width="1" height="2" fill="#ffffff" mask="url(#hologramFillMask)" opacity="0.7" />
      <rect x="52" y="78" width="2" height="1" fill="#00ffff" mask="url(#hologramFillMask)" opacity="0.6" />
      <rect x="73" y="83" width="1" height="2" fill="#00ffaa" mask="url(#hologramFillMask)" opacity="0.6" />
    </svg>
  );
};

export default Asset11;

