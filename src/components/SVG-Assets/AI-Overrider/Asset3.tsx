import React from 'react';

const Asset3: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="aiCoreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="50%" stopColor="#00bfff" />
          <stop offset="100%" stopColor="#ff00ff" />
        </radialGradient>
        <linearGradient id="aiNeuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="50%" stopColor="#ff00ff" />
          <stop offset="100%" stopColor="#00ffff" />
        </linearGradient>
        <filter id="aiCoreGlow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="aiCoreFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Outer ring */}
      <circle cx="64" cy="64" r="50" fill="none" stroke="url(#aiNeuralGrad)" strokeWidth="3" mask="url(#aiCoreFillMask)" opacity="0.7" />
      <circle cx="64" cy="64" r="42" fill="none" stroke="url(#aiNeuralGrad)" strokeWidth="2" mask="url(#aiCoreFillMask)" opacity="0.5" />
      {/* Neural network nodes */}
      <circle cx="64" cy="20" r="5" fill="#ff00ff" mask="url(#aiCoreFillMask)" />
      <circle cx="100" cy="50" r="5" fill="#ff00ff" mask="url(#aiCoreFillMask)" />
      <circle cx="100" cy="78" r="5" fill="#00ffff" mask="url(#aiCoreFillMask)" />
      <circle cx="64" cy="108" r="5" fill="#ff00ff" mask="url(#aiCoreFillMask)" />
      <circle cx="28" cy="78" r="5" fill="#00ffff" mask="url(#aiCoreFillMask)" />
      <circle cx="28" cy="50" r="5" fill="#ff00ff" mask="url(#aiCoreFillMask)" />
      {/* Connection lines */}
      <line x1="64" y1="20" x2="64" y2="40" stroke="#ff00ff" strokeWidth="1.5" mask="url(#aiCoreFillMask)" opacity="0.6" />
      <line x1="100" y1="50" x2="82" y2="55" stroke="#ff00ff" strokeWidth="1.5" mask="url(#aiCoreFillMask)" opacity="0.6" />
      <line x1="100" y1="78" x2="82" y2="73" stroke="#00ffff" strokeWidth="1.5" mask="url(#aiCoreFillMask)" opacity="0.6" />
      <line x1="64" y1="108" x2="64" y2="88" stroke="#ff00ff" strokeWidth="1.5" mask="url(#aiCoreFillMask)" opacity="0.6" />
      <line x1="28" y1="78" x2="46" y2="73" stroke="#00ffff" strokeWidth="1.5" mask="url(#aiCoreFillMask)" opacity="0.6" />
      <line x1="28" y1="50" x2="46" y2="55" stroke="#ff00ff" strokeWidth="1.5" mask="url(#aiCoreFillMask)" opacity="0.6" />
      {/* Core sphere */}
      <circle cx="64" cy="64" r="28" fill="url(#aiCoreGrad)" mask="url(#aiCoreFillMask)" filter="url(#aiCoreGlow)" />
      <circle cx="64" cy="64" r="28" fill="none" stroke="#00ffff" strokeWidth="2" />
      {/* Brain pattern inside */}
      <path d="M50 60 Q55 55, 60 60 Q62 58, 64 60 Q66 58, 68 60 Q73 55, 78 60" fill="none" stroke="#ff00ff" strokeWidth="2" mask="url(#aiCoreFillMask)" opacity="0.8" />
      <path d="M50 68 Q55 73, 60 68 Q62 70, 64 68 Q66 70, 68 68 Q73 73, 78 68" fill="none" stroke="#00ffff" strokeWidth="2" mask="url(#aiCoreFillMask)" opacity="0.8" />
      {/* Center glow */}
      <circle cx="64" cy="64" r="8" fill="#ffffff" mask="url(#aiCoreFillMask)" opacity="0.9" />
      <circle cx="64" cy="64" r="4" fill="#00ffff" mask="url(#aiCoreFillMask)" />
      {/* Data particles */}
      <circle cx="64" cy="50" r="2" fill="#00ffff" mask="url(#aiCoreFillMask)" />
      <circle cx="75" cy="64" r="2" fill="#ff00ff" mask="url(#aiCoreFillMask)" />
      <circle cx="64" cy="78" r="2" fill="#00ffff" mask="url(#aiCoreFillMask)" />
      <circle cx="53" cy="64" r="2" fill="#ff00ff" mask="url(#aiCoreFillMask)" />
    </svg>
  );
};

export default Asset3;

