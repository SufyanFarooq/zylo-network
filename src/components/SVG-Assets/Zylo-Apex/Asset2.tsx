import React from 'react';

const Asset2: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="planetCoreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#87ceeb" />
          <stop offset="50%" stopColor="#4169e1" />
          <stop offset="100%" stopColor="#000080" />
        </radialGradient>
        <filter id="planetGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="planetFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Planet body */}
      <circle cx="64" cy="64" r="40" fill="url(#planetCoreGrad)" mask="url(#planetFillMask)" filter="url(#planetGlow)" />
      <circle cx="64" cy="64" r="40" fill="none" stroke="#4169e1" strokeWidth="2.5" />
      {/* Atmospheric rings */}
      <ellipse cx="64" cy="64" rx="42" ry="38" fill="none" stroke="#87ceeb" strokeWidth="1.5" mask="url(#planetFillMask)" opacity="0.5" />
      <ellipse cx="64" cy="64" rx="44" ry="40" fill="none" stroke="#4169e1" strokeWidth="1" mask="url(#planetFillMask)" opacity="0.3" />
      {/* Surface features - continents/oceans */}
      <ellipse cx="55" cy="58" rx="12" ry="15" fill="#000080" mask="url(#planetFillMask)" opacity="0.6" />
      <ellipse cx="70" cy="70" rx="10" ry="12" fill="#000080" mask="url(#planetFillMask)" opacity="0.5" />
      <path d="M48 75 Q52 80, 58 78 Q54 75, 48 75" fill="#000080" mask="url(#planetFillMask)" opacity="0.4" />
      {/* Cloud formations */}
      <ellipse cx="60" cy="50" rx="8" ry="5" fill="#ffffff" mask="url(#planetFillMask)" opacity="0.7" />
      <ellipse cx="75" cy="55" rx="6" ry="4" fill="#ffffff" mask="url(#planetFillMask)" opacity="0.6" />
      <ellipse cx="50" cy="65" rx="7" ry="4" fill="#ffffff" mask="url(#planetFillMask)" opacity="0.5" />
      {/* Highlight reflection */}
      <ellipse cx="52" cy="50" rx="15" ry="12" fill="#ffffff" mask="url(#planetFillMask)" opacity="0.3" />
      {/* Orbital ring */}
      <ellipse cx="64" cy="64" rx="50" ry="8" fill="none" stroke="#87ceeb" strokeWidth="2" mask="url(#planetFillMask)" opacity="0.6" transform="rotate(25 64 64)" />
      <ellipse cx="64" cy="64" rx="50" ry="8" fill="none" stroke="#4169e1" strokeWidth="1.5" mask="url(#planetFillMask)" opacity="0.4" transform="rotate(-15 64 64)" />
    </svg>
  );
};

export default Asset2;
