import React from 'react';

const Asset4: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="cometCoreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#000080" />
        </radialGradient>
        <linearGradient id="cometTailGrad" x1="100%" y1="50%" x2="0%" y2="50%">
          <stop offset="0%" stopColor="#00ffff" opacity="0.9" />
          <stop offset="50%" stopColor="#4169e1" opacity="0.6" />
          <stop offset="100%" stopColor="#000080" opacity="0.3" />
        </linearGradient>
        <filter id="cometGlow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="cometFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Comet tail */}
      <path d="M100 35 Q70 50, 40 65 Q55 52, 70 45 Q85 38, 100 35" fill="url(#cometTailGrad)" mask="url(#cometFillMask)" filter="url(#cometGlow)" />
      <path d="M98 38 Q68 53, 38 68 Q53 55, 68 48 Q83 41, 98 38" fill="url(#cometTailGrad)" mask="url(#cometFillMask)" opacity="0.7" />
      {/* Tail particles */}
      <circle cx="85" cy="42" r="2" fill="#00ffff" mask="url(#cometFillMask)" opacity="0.8" filter="url(#cometGlow)" />
      <circle cx="70" cy="48" r="1.5" fill="#4169e1" mask="url(#cometFillMask)" opacity="0.7" />
      <circle cx="55" cy="54" r="2" fill="#00ffff" mask="url(#cometFillMask)" opacity="0.6" />
      <circle cx="40" cy="60" r="1.5" fill="#4169e1" mask="url(#cometFillMask)" opacity="0.5" />
      {/* Comet head/ice core */}
      <circle cx="108" cy="30" r="12" fill="url(#cometCoreGrad)" mask="url(#cometFillMask)" filter="url(#cometGlow)" />
      <circle cx="108" cy="30" r="12" fill="none" stroke="#00ffff" strokeWidth="2.5" />
      {/* Ice crystals */}
      <circle cx="105" cy="26" r="2" fill="#ffffff" mask="url(#cometFillMask)" />
      <circle cx="111" cy="28" r="1.5" fill="#ffffff" mask="url(#cometFillMask)" />
      <circle cx="108" cy="32" r="2" fill="#ffffff" mask="url(#cometFillMask)" />
      <circle cx="104" cy="33" r="1.5" fill="#ffffff" mask="url(#cometFillMask)" />
      {/* Bright core */}
      <circle cx="108" cy="30" r="6" fill="#ffffff" mask="url(#cometFillMask)" filter="url(#cometGlow)" opacity="0.9" />
      <circle cx="108" cy="30" r="4" fill="#00ffff" mask="url(#cometFillMask)" />
      <circle cx="108" cy="30" r="2" fill="#ffffff" mask="url(#cometFillMask)" />
    </svg>
  );
};

export default Asset4;

