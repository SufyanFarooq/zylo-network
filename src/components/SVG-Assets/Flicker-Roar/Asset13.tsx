import React from 'react';

const Asset13: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="bearBodyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a0522d" />
          <stop offset="50%" stopColor="#8b4513" />
          <stop offset="100%" stopColor="#654321" />
        </radialGradient>
        <filter id="bearGlow"><feGaussianBlur stdDeviation="2.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="bearFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Body - large and round */}
      <ellipse cx="64" cy="80" rx="34" ry="40" fill="url(#bearBodyGrad)" mask="url(#bearFillMask)" filter="url(#bearGlow)" />
      <ellipse cx="64" cy="80" rx="34" ry="40" fill="none" stroke="#654321" strokeWidth="2" />
      {/* Neck */}
      <ellipse cx="64" cy="54" rx="28" ry="26" fill="url(#bearBodyGrad)" mask="url(#bearFillMask)" />
      {/* Head */}
      <ellipse cx="64" cy="42" rx="30" ry="28" fill="url(#bearBodyGrad)" mask="url(#bearFillMask)" />
      <ellipse cx="64" cy="42" rx="30" ry="28" fill="none" stroke="#654321" strokeWidth="2" />
      {/* Round ears */}
      <circle cx="44" cy="26" r="12" fill="url(#bearBodyGrad)" mask="url(#bearFillMask)" />
      <circle cx="44" cy="26" r="12" fill="none" stroke="#654321" strokeWidth="2" />
      <circle cx="44" cy="28" r="7" fill="#d2691e" mask="url(#bearFillMask)" opacity="0.7" />
      <circle cx="84" cy="26" r="12" fill="url(#bearBodyGrad)" mask="url(#bearFillMask)" />
      <circle cx="84" cy="26" r="12" fill="none" stroke="#654321" strokeWidth="2" />
      <circle cx="84" cy="28" r="7" fill="#d2691e" mask="url(#bearFillMask)" opacity="0.7" />
      {/* Light belly patch */}
      <ellipse cx="64" cy="85" rx="24" ry="30" fill="#d2691e" mask="url(#bearFillMask)" opacity="0.6" />
      {/* Small eyes */}
      <ellipse cx="54" cy="42" rx="4" ry="6" fill="#333" mask="url(#bearFillMask)" />
      <ellipse cx="74" cy="42" rx="4" ry="6" fill="#333" mask="url(#bearFillMask)" />
      <circle cx="55" cy="41" r="1.5" fill="#fff" mask="url(#bearFillMask)" opacity="0.9" />
      <circle cx="75" cy="41" r="1.5" fill="#fff" mask="url(#bearFillMask)" opacity="0.9" />
      {/* Large snout area */}
      <ellipse cx="64" cy="52" rx="16" ry="14" fill="#d2691e" mask="url(#bearFillMask)" opacity="0.9" />
      <ellipse cx="64" cy="50" rx="12" ry="10" fill="#cd853f" mask="url(#bearFillMask)" opacity="0.8" />
      {/* Big black nose */}
      <ellipse cx="64" cy="54" rx="6" ry="5" fill="#000" mask="url(#bearFillMask)" />
      <path d="M64 58 L64 62" stroke="#000" strokeWidth="2.5" mask="url(#bearFillMask)" />
      {/* Mouth */}
      <path d="M64 62 Q58 65, 54 63" fill="none" stroke="#000" strokeWidth="2" mask="url(#bearFillMask)" />
      <path d="M64 62 Q70 65, 74 63" fill="none" stroke="#000" strokeWidth="2" mask="url(#bearFillMask)" />
      {/* Claws hint */}
      <circle cx="46" cy="105" r="3" fill="#000" mask="url(#bearFillMask)" opacity="0.5" />
      <circle cx="52" cy="108" r="3" fill="#000" mask="url(#bearFillMask)" opacity="0.5" />
      <circle cx="76" cy="108" r="3" fill="#000" mask="url(#bearFillMask)" opacity="0.5" />
      <circle cx="82" cy="105" r="3" fill="#000" mask="url(#bearFillMask)" opacity="0.5" />
    </svg>
  );
};

export default Asset13;

