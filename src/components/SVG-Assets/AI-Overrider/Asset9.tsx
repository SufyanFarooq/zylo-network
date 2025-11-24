import React from 'react';

const Asset9: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="neuralOrbGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff00ff" />
          <stop offset="40%" stopColor="#9370db" />
          <stop offset="70%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#4169e1" />
        </radialGradient>
        <filter id="neuralOrbGlow"><feGaussianBlur stdDeviation="6" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="neuralOrbFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Main orb */}
      <circle cx="64" cy="64" r="30" fill="url(#neuralOrbGrad)" mask="url(#neuralOrbFillMask)" filter="url(#neuralOrbGlow)" />
      <circle cx="64" cy="64" r="30" fill="none" stroke="#00ffff" strokeWidth="2" />
      {/* Inner neural network */}
      <circle cx="64" cy="64" r="22" fill="none" stroke="#ff00ff" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.6" />
      <circle cx="64" cy="64" r="15" fill="none" stroke="#9370db" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.6" />
      <circle cx="64" cy="64" r="8" fill="none" stroke="#00ffff" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.6" />
      {/* Neural nodes */}
      <circle cx="64" cy="42" r="3" fill="#ff00ff" mask="url(#neuralOrbFillMask)" />
      <circle cx="64" cy="86" r="3" fill="#ff00ff" mask="url(#neuralOrbFillMask)" />
      <circle cx="42" cy="64" r="3" fill="#00ffff" mask="url(#neuralOrbFillMask)" />
      <circle cx="86" cy="64" r="3" fill="#00ffff" mask="url(#neuralOrbFillMask)" />
      <circle cx="52" cy="52" r="2" fill="#9370db" mask="url(#neuralOrbFillMask)" />
      <circle cx="76" cy="52" r="2" fill="#9370db" mask="url(#neuralOrbFillMask)" />
      <circle cx="52" cy="76" r="2" fill="#9370db" mask="url(#neuralOrbFillMask)" />
      <circle cx="76" cy="76" r="2" fill="#9370db" mask="url(#neuralOrbFillMask)" />
      {/* Neural connections */}
      <line x1="64" y1="42" x2="64" y2="64" stroke="#ff00ff" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.5" />
      <line x1="64" y1="86" x2="64" y2="64" stroke="#ff00ff" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.5" />
      <line x1="42" y1="64" x2="64" y2="64" stroke="#00ffff" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.5" />
      <line x1="86" y1="64" x2="64" y2="64" stroke="#00ffff" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.5" />
      <line x1="52" y1="52" x2="64" y2="64" stroke="#9370db" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.5" />
      <line x1="76" y1="52" x2="64" y2="64" stroke="#9370db" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.5" />
      <line x1="52" y1="76" x2="64" y2="64" stroke="#9370db" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.5" />
      <line x1="76" y1="76" x2="64" y2="64" stroke="#9370db" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.5" />
      {/* Core */}
      <circle cx="64" cy="64" r="6" fill="#ffffff" mask="url(#neuralOrbFillMask)" opacity="0.9" />
      <circle cx="64" cy="64" r="4" fill="#ff00ff" mask="url(#neuralOrbFillMask)" />
      <circle cx="64" cy="64" r="2" fill="#00ffff" mask="url(#neuralOrbFillMask)" />
      {/* Outer energy rings */}
      <circle cx="64" cy="64" r="38" fill="none" stroke="#ff00ff" strokeWidth="1.5" mask="url(#neuralOrbFillMask)" opacity="0.4" />
      <circle cx="64" cy="64" r="44" fill="none" stroke="#00ffff" strokeWidth="1.5" mask="url(#neuralOrbFillMask)" opacity="0.3" />
      {/* Data streams */}
      <path d="M64 24 Q80 30, 88 40" stroke="#ff00ff" strokeWidth="1.5" mask="url(#neuralOrbFillMask)" fill="none" opacity="0.5" />
      <path d="M64 104 Q48 98, 40 88" stroke="#00ffff" strokeWidth="1.5" mask="url(#neuralOrbFillMask)" fill="none" opacity="0.5" />
      <path d="M24 64 Q30 48, 40 40" stroke="#9370db" strokeWidth="1.5" mask="url(#neuralOrbFillMask)" fill="none" opacity="0.5" />
      <path d="M104 64 Q98 80, 88 88" stroke="#9370db" strokeWidth="1.5" mask="url(#neuralOrbFillMask)" fill="none" opacity="0.5" />
    </svg>
  );
};

export default Asset9;

