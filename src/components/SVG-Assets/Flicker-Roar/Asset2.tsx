import React from 'react';

const Asset2: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="tigerBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffa500" />
          <stop offset="50%" stopColor="#ff8c00" />
          <stop offset="100%" stopColor="#ff7700" />
        </linearGradient>
        <filter id="tigerGlow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="tigerFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Body */}
      <ellipse cx="64" cy="85" rx="32" ry="35" fill="url(#tigerBodyGrad)" mask="url(#tigerFillMask)" filter="url(#tigerGlow)" />
      <ellipse cx="64" cy="85" rx="32" ry="35" fill="none" stroke="#ff6347" strokeWidth="2" />
      {/* Head */}
      <ellipse cx="64" cy="45" rx="28" ry="30" fill="url(#tigerBodyGrad)" mask="url(#tigerFillMask)" />
      <ellipse cx="64" cy="45" rx="28" ry="30" fill="none" stroke="#ff6347" strokeWidth="2" />
      {/* Ears */}
      <ellipse cx="42" cy="25" rx="10" ry="14" fill="url(#tigerBodyGrad)" mask="url(#tigerFillMask)" transform="rotate(-15 42 25)" />
      <ellipse cx="86" cy="25" rx="10" ry="14" fill="url(#tigerBodyGrad)" mask="url(#tigerFillMask)" transform="rotate(15 86 25)" />
      <ellipse cx="42" cy="27" rx="5" ry="8" fill="#ffb366" mask="url(#tigerFillMask)" transform="rotate(-15 42 27)" />
      <ellipse cx="86" cy="27" rx="5" ry="8" fill="#ffb366" mask="url(#tigerFillMask)" transform="rotate(15 86 27)" />
      {/* Tiger Stripes - Black */}
      <path d="M50 35 L48 40" stroke="#000" strokeWidth="2.5" mask="url(#tigerFillMask)" opacity="0.8" />
      <path d="M78 35 L80 40" stroke="#000" strokeWidth="2.5" mask="url(#tigerFillMask)" opacity="0.8" />
      <path d="M45 45 L43 50" stroke="#000" strokeWidth="2" mask="url(#tigerFillMask)" opacity="0.7" />
      <path d="M83 45 L85 50" stroke="#000" strokeWidth="2" mask="url(#tigerFillMask)" opacity="0.7" />
      <path d="M50 90 L48 95" stroke="#000" strokeWidth="2.5" mask="url(#tigerFillMask)" opacity="0.8" />
      <path d="M78 90 L80 95" stroke="#000" strokeWidth="2.5" mask="url(#tigerFillMask)" opacity="0.8" />
      <path d="M55 85 L53 92" stroke="#000" strokeWidth="2" mask="url(#tigerFillMask)" opacity="0.7" />
      <path d="M73 85 L75 92" stroke="#000" strokeWidth="2" mask="url(#tigerFillMask)" opacity="0.7" />
      {/* Snout area */}
      <ellipse cx="64" cy="55" rx="18" ry="15" fill="#ffcc99" mask="url(#tigerFillMask)" opacity="0.9" />
      {/* Eyes */}
      <ellipse cx="54" cy="45" rx="5" ry="7" fill="#fff" mask="url(#tigerFillMask)" />
      <ellipse cx="74" cy="45" rx="5" ry="7" fill="#fff" mask="url(#tigerFillMask)" />
      <ellipse cx="54" cy="46" rx="3" ry="5" fill="#000" mask="url(#tigerFillMask)" />
      <ellipse cx="74" cy="46" rx="3" ry="5" fill="#000" mask="url(#tigerFillMask)" />
      <circle cx="54.5" cy="44" r="1.5" fill="#fff" mask="url(#tigerFillMask)" opacity="0.9" />
      <circle cx="74.5" cy="44" r="1.5" fill="#fff" mask="url(#tigerFillMask)" opacity="0.9" />
      {/* Nose */}
      <path d="M64 60 L60 64 L64 66 L68 64 Z" fill="#000" mask="url(#tigerFillMask)" />
      {/* Mouth */}
      <path d="M64 66 L64 70" stroke="#000" strokeWidth="2" mask="url(#tigerFillMask)" />
      <path d="M64 70 Q58 72, 54 70" fill="none" stroke="#000" strokeWidth="2" mask="url(#tigerFillMask)" />
      <path d="M64 70 Q70 72, 74 70" fill="none" stroke="#000" strokeWidth="2" mask="url(#tigerFillMask)" />
      {/* Whiskers */}
      <line x1="45" y1="55" x2="30" y2="53" stroke="#333" strokeWidth="1.5" mask="url(#tigerFillMask)" />
      <line x1="45" y1="60" x2="30" y2="60" stroke="#333" strokeWidth="1.5" mask="url(#tigerFillMask)" />
      <line x1="83" y1="55" x2="98" y2="53" stroke="#333" strokeWidth="1.5" mask="url(#tigerFillMask)" />
      <line x1="83" y1="60" x2="98" y2="60" stroke="#333" strokeWidth="1.5" mask="url(#tigerFillMask)" />
      {/* Legs */}
      <ellipse cx="50" cy="110" rx="8" ry="14" fill="url(#tigerBodyGrad)" mask="url(#tigerFillMask)" />
      <ellipse cx="78" cy="110" rx="8" ry="14" fill="url(#tigerBodyGrad)" mask="url(#tigerFillMask)" />
      {/* Paws */}
      <ellipse cx="50" cy="118" rx="7" ry="4" fill="#ff8c00" mask="url(#tigerFillMask)" />
      <ellipse cx="78" cy="118" rx="7" ry="4" fill="#ff8c00" mask="url(#tigerFillMask)" />
    </svg>
  );
};

export default Asset2;

