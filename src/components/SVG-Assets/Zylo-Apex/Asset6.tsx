import React from 'react';

const Asset6: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="blackHoleCoreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="70%" stopColor="#1a0033" />
          <stop offset="100%" stopColor="#4b0082" />
        </radialGradient>
        <radialGradient id="blackHoleAccretionGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff00ff" opacity="0.9" />
          <stop offset="50%" stopColor="#9370db" opacity="0.6" />
          <stop offset="100%" stopColor="#4b0082" opacity="0.3" />
        </radialGradient>
        <filter id="blackHoleGlow"><feGaussianBlur stdDeviation="8" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="blackHoleFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Accretion disk - outer ring */}
      <ellipse cx="64" cy="64" rx="50" ry="20" fill="url(#blackHoleAccretionGrad)" mask="url(#blackHoleFillMask)" filter="url(#blackHoleGlow)" opacity="0.7" transform="rotate(0 64 64)" />
      <ellipse cx="64" cy="64" rx="45" ry="18" fill="url(#blackHoleAccretionGrad)" mask="url(#blackHoleFillMask)" filter="url(#blackHoleGlow)" opacity="0.6" transform="rotate(15 64 64)" />
      <ellipse cx="64" cy="64" rx="40" ry="16" fill="url(#blackHoleAccretionGrad)" mask="url(#blackHoleFillMask)" filter="url(#blackHoleGlow)" opacity="0.5" transform="rotate(30 64 64)" />
      {/* Event horizon */}
      <circle cx="64" cy="64" r="28" fill="url(#blackHoleCoreGrad)" mask="url(#blackHoleFillMask)" filter="url(#blackHoleGlow)" />
      <circle cx="64" cy="64" r="28" fill="none" stroke="#4b0082" strokeWidth="2.5" />
      {/* Inner dark core */}
      <circle cx="64" cy="64" r="20" fill="#000000" mask="url(#blackHoleFillMask)" />
      <circle cx="64" cy="64" r="15" fill="#1a0033" mask="url(#blackHoleFillMask)" opacity="0.8" />
      {/* Gravitational lensing effect - light distortion */}
      <ellipse cx="64" cy="64" rx="32" ry="26" fill="none" stroke="#9370db" strokeWidth="1" mask="url(#blackHoleFillMask)" opacity="0.4" />
      <ellipse cx="64" cy="64" rx="36" ry="28" fill="none" stroke="#ff00ff" strokeWidth="1" mask="url(#blackHoleFillMask)" opacity="0.3" />
      {/* Energy particles being pulled in */}
      <circle cx="30" cy="64" r="2" fill="#ff00ff" mask="url(#blackHoleFillMask)" filter="url(#blackHoleGlow)" />
      <circle cx="98" cy="64" r="2" fill="#ff00ff" mask="url(#blackHoleFillMask)" filter="url(#blackHoleGlow)" />
      <circle cx="64" cy="30" r="1.5" fill="#9370db" mask="url(#blackHoleFillMask)" filter="url(#blackHoleGlow)" />
      <circle cx="64" cy="98" r="1.5" fill="#9370db" mask="url(#blackHoleFillMask)" filter="url(#blackHoleGlow)" />
      <circle cx="45" cy="45" r="1.5" fill="#ff00ff" mask="url(#blackHoleFillMask)" filter="url(#blackHoleGlow)" />
      <circle cx="83" cy="83" r="1.5" fill="#ff00ff" mask="url(#blackHoleFillMask)" filter="url(#blackHoleGlow)" />
    </svg>
  );
};

export default Asset6;

