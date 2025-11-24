import React from 'react';

const Asset9: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="owlBodyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a0826d" />
          <stop offset="50%" stopColor="#8b7355" />
          <stop offset="100%" stopColor="#696969" />
        </radialGradient>
        <radialGradient id="owlChestGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5deb3" />
          <stop offset="100%" stopColor="#d2b48c" />
        </radialGradient>
        <filter id="owlGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="owlFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Body - oval shape */}
      <ellipse cx="64" cy="78" rx="32" ry="40" fill="url(#owlBodyGrad)" mask="url(#owlFillMask)" filter="url(#owlGlow)" />
      <ellipse cx="64" cy="78" rx="32" ry="40" fill="none" stroke="#696969" strokeWidth="2" />
      {/* Chest markings */}
      <ellipse cx="64" cy="82" rx="20" ry="28" fill="url(#owlChestGrad)" mask="url(#owlFillMask)" opacity="0.9" />
      {/* Feather patterns on chest */}
      <path d="M56 70 Q56 75, 56 80" stroke="#8b7355" strokeWidth="1" mask="url(#owlFillMask)" opacity="0.6" />
      <path d="M64 72 Q64 77, 64 82" stroke="#8b7355" strokeWidth="1" mask="url(#owlFillMask)" opacity="0.6" />
      <path d="M72 70 Q72 75, 72 80" stroke="#8b7355" strokeWidth="1" mask="url(#owlFillMask)" opacity="0.6" />
      {/* Head - large and round */}
      <ellipse cx="64" cy="48" rx="36" ry="32" fill="url(#owlBodyGrad)" mask="url(#owlFillMask)" />
      <ellipse cx="64" cy="48" rx="36" ry="32" fill="none" stroke="#696969" strokeWidth="2" />
      {/* Ear tufts */}
      <path d="M36 28 L32 14 L38 26 Z" fill="url(#owlBodyGrad)" mask="url(#owlFillMask)" />
      <path d="M36 28 L32 14 L38 26 Z" fill="none" stroke="#696969" strokeWidth="1.5" />
      <path d="M92 28 L96 14 L90 26 Z" fill="url(#owlBodyGrad)" mask="url(#owlFillMask)" />
      <path d="M92 28 L96 14 L90 26 Z" fill="none" stroke="#696969" strokeWidth="1.5" />
      {/* Facial disk */}
      <ellipse cx="46" cy="48" rx="18" ry="20" fill="#8b7355" mask="url(#owlFillMask)" opacity="0.3" />
      <ellipse cx="82" cy="48" rx="18" ry="20" fill="#8b7355" mask="url(#owlFillMask)" opacity="0.3" />
      {/* Huge round eyes */}
      <circle cx="48" cy="48" r="14" fill="#fff" mask="url(#owlFillMask)" />
      <circle cx="48" cy="48" r="14" fill="none" stroke="#696969" strokeWidth="2" />
      <circle cx="80" cy="48" r="14" fill="#fff" mask="url(#owlFillMask)" />
      <circle cx="80" cy="48" r="14" fill="none" stroke="#696969" strokeWidth="2" />
      {/* Pupils */}
      <circle cx="48" cy="48" r="10" fill="#000" mask="url(#owlFillMask)" />
      <circle cx="80" cy="48" r="10" fill="#000" mask="url(#owlFillMask)" />
      {/* Eye highlights */}
      <circle cx="50" cy="45" r="4" fill="#fff" mask="url(#owlFillMask)" opacity="0.9" />
      <circle cx="82" cy="45" r="4" fill="#fff" mask="url(#owlFillMask)" opacity="0.9" />
      <circle cx="46" cy="51" r="2" fill="#fff" mask="url(#owlFillMask)" opacity="0.6" />
      <circle cx="78" cy="51" r="2" fill="#fff" mask="url(#owlFillMask)" opacity="0.6" />
      {/* Hooked beak */}
      <path d="M64 56 L60 62 L64 66 L68 62 Z" fill="#ffa500" mask="url(#owlFillMask)" />
      <path d="M64 56 L60 62 L64 66 L68 62 Z" fill="none" stroke="#ff8c00" strokeWidth="2" />
      <ellipse cx="64" cy="64" rx="3" ry="4" fill="#ff8c00" mask="url(#owlFillMask)" />
      {/* Eyebrows */}
      <path d="M36 38 Q42 34, 48 36" fill="none" stroke="#696969" strokeWidth="2" mask="url(#owlFillMask)" opacity="0.7" />
      <path d="M92 38 Q86 34, 80 36" fill="none" stroke="#696969" strokeWidth="2" mask="url(#owlFillMask)" opacity="0.7" />
      {/* Wing details */}
      <ellipse cx="40" cy="85" rx="8" ry="20" fill="url(#owlBodyGrad)" mask="url(#owlFillMask)" opacity="0.8" transform="rotate(-20 40 85)" />
      <ellipse cx="88" cy="85" rx="8" ry="20" fill="url(#owlBodyGrad)" mask="url(#owlFillMask)" opacity="0.8" transform="rotate(20 88 85)" />
      {/* Feather texture */}
      <circle cx="50" cy="90" r="2" fill="#696969" mask="url(#owlFillMask)" opacity="0.4" />
      <circle cx="78" cy="92" r="2" fill="#696969" mask="url(#owlFillMask)" opacity="0.4" />
      <circle cx="64" cy="100" r="2" fill="#696969" mask="url(#owlFillMask)" opacity="0.4" />
    </svg>
  );
};

export default Asset9;

