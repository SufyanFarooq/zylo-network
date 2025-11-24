import React from 'react';

const Asset3: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="galaxyCoreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#ff00ff" />
          <stop offset="50%" stopColor="#9370db" />
          <stop offset="100%" stopColor="#000080" />
        </radialGradient>
        <filter id="galaxyGlow"><feGaussianBlur stdDeviation="7" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="galaxyFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Spiral arms */}
      <path d="M64 64 Q80 40, 95 30 Q85 50, 75 60 Q70 55, 64 64" fill="url(#galaxyCoreGrad)" mask="url(#galaxyFillMask)" filter="url(#galaxyGlow)" opacity="0.6" />
      <path d="M64 64 Q48 40, 33 30 Q43 50, 53 60 Q58 55, 64 64" fill="url(#galaxyCoreGrad)" mask="url(#galaxyFillMask)" filter="url(#galaxyGlow)" opacity="0.6" />
      <path d="M64 64 Q95 50, 110 64 Q100 70, 85 75 Q75 70, 64 64" fill="url(#galaxyCoreGrad)" mask="url(#galaxyFillMask)" filter="url(#galaxyGlow)" opacity="0.5" />
      <path d="M64 64 Q33 50, 18 64 Q28 70, 43 75 Q53 70, 64 64" fill="url(#galaxyCoreGrad)" mask="url(#galaxyFillMask)" filter="url(#galaxyGlow)" opacity="0.5" />
      {/* Central bulge */}
      <ellipse cx="64" cy="64" rx="25" ry="30" fill="url(#galaxyCoreGrad)" mask="url(#galaxyFillMask)" filter="url(#galaxyGlow)" />
      <ellipse cx="64" cy="64" rx="25" ry="30" fill="none" stroke="#ff00ff" strokeWidth="2.5" />
      {/* Bright core */}
      <circle cx="64" cy="64" r="15" fill="#ffffff" mask="url(#galaxyFillMask)" filter="url(#galaxyGlow)" opacity="0.8" />
      <circle cx="64" cy="64" r="10" fill="#ff00ff" mask="url(#galaxyFillMask)" opacity="0.9" />
      <circle cx="64" cy="64" r="6" fill="#ffffff" mask="url(#galaxyFillMask)" />
      {/* Stars in spiral */}
      <circle cx="85" cy="35" r="2" fill="#ffffff" mask="url(#galaxyFillMask)" />
      <circle cx="100" cy="45" r="1.5" fill="#ff00ff" mask="url(#galaxyFillMask)" filter="url(#galaxyGlow)" />
      <circle cx="90" cy="55" r="2" fill="#ffffff" mask="url(#galaxyFillMask)" />
      <circle cx="43" cy="35" r="2" fill="#ffffff" mask="url(#galaxyFillMask)" />
      <circle cx="28" cy="45" r="1.5" fill="#ff00ff" mask="url(#galaxyFillMask)" filter="url(#galaxyGlow)" />
      <circle cx="38" cy="55" r="2" fill="#ffffff" mask="url(#galaxyFillMask)" />
      <circle cx="105" cy="70" r="1.5" fill="#9370db" mask="url(#galaxyFillMask)" />
      <circle cx="23" cy="70" r="1.5" fill="#9370db" mask="url(#galaxyFillMask)" />
    </svg>
  );
};

export default Asset3;

