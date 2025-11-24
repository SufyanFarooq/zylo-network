import React from 'react';

const Asset15: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="celestialOrbGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#87ceeb" />
          <stop offset="60%" stopColor="#9370db" />
          <stop offset="100%" stopColor="#4b0082" />
        </radialGradient>
        <radialGradient id="celestialOrbInnerGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" opacity="0.9" />
          <stop offset="50%" stopColor="#9370db" opacity="0.6" />
          <stop offset="100%" stopColor="#4b0082" opacity="0.3" />
        </radialGradient>
        <filter id="celestialOrbGlow"><feGaussianBlur stdDeviation="6" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="celestialOrbFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Outer ethereal glow rings */}
      <circle cx="64" cy="64" r="55" fill="none" stroke="#9370db" strokeWidth="1.5" mask="url(#celestialOrbFillMask)" opacity="0.3" />
      <circle cx="64" cy="64" r="50" fill="none" stroke="#87ceeb" strokeWidth="1" mask="url(#celestialOrbFillMask)" opacity="0.4" />
      <circle cx="64" cy="64" r="45" fill="none" stroke="#9370db" strokeWidth="1.5" mask="url(#celestialOrbFillMask)" opacity="0.5" />
      {/* Main orb body */}
      <circle cx="64" cy="64" r="38" fill="url(#celestialOrbGrad)" mask="url(#celestialOrbFillMask)" filter="url(#celestialOrbGlow)" />
      <circle cx="64" cy="64" r="38" fill="none" stroke="#9370db" strokeWidth="2.5" />
      {/* Inner mystical patterns */}
      <circle cx="64" cy="64" r="32" fill="url(#celestialOrbInnerGrad)" mask="url(#celestialOrbFillMask)" filter="url(#celestialOrbGlow)" opacity="0.7" />
      <circle cx="64" cy="64" r="26" fill="none" stroke="#87ceeb" strokeWidth="1.5" mask="url(#celestialOrbFillMask)" opacity="0.6" />
      <circle cx="64" cy="64" r="20" fill="none" stroke="#ffffff" strokeWidth="1" mask="url(#celestialOrbFillMask)" opacity="0.7" />
      {/* Crystal-like internal structures */}
      <path d="M64 44 L74 54 L64 64 L54 54 Z" fill="#87ceeb" mask="url(#celestialOrbFillMask)" opacity="0.5" />
      <path d="M64 64 L74 74 L64 84 L54 74 Z" fill="#9370db" mask="url(#celestialOrbFillMask)" opacity="0.5" />
      <path d="M44 64 L54 74 L64 64 L54 54 Z" fill="#4b0082" mask="url(#celestialOrbFillMask)" opacity="0.4" />
      <path d="M64 64 L74 54 L84 64 L74 74 Z" fill="#87ceeb" mask="url(#celestialOrbFillMask)" opacity="0.4" />
      <line x1="64" y1="44" x2="64" y2="84" stroke="#ffffff" strokeWidth="1" mask="url(#celestialOrbFillMask)" opacity="0.5" />
      <line x1="44" y1="64" x2="84" y2="64" stroke="#ffffff" strokeWidth="1" mask="url(#celestialOrbFillMask)" opacity="0.5" />
      <line x1="52" y1="52" x2="76" y2="76" stroke="#87ceeb" strokeWidth="0.5" mask="url(#celestialOrbFillMask)" opacity="0.5" />
      <line x1="76" y1="52" x2="52" y2="76" stroke="#87ceeb" strokeWidth="0.5" mask="url(#celestialOrbFillMask)" opacity="0.5" />
      {/* Core bright spot */}
      <circle cx="64" cy="64" r="10" fill="#ffffff" mask="url(#celestialOrbFillMask)" opacity="0.8" filter="url(#celestialOrbGlow)" />
      <circle cx="64" cy="64" r="6" fill="#ffffff" mask="url(#celestialOrbFillMask)" />
      {/* Highlight reflection */}
      <ellipse cx="54" cy="52" rx="12" ry="8" fill="#ffffff" mask="url(#celestialOrbFillMask)" opacity="0.5" />
      <ellipse cx="54" cy="52" rx="8" ry="5" fill="#ffffff" mask="url(#celestialOrbFillMask)" opacity="0.7" />
      {/* Floating energy particles around orb */}
      <circle cx="40" cy="50" r="2" fill="#87ceeb" mask="url(#celestialOrbFillMask)" opacity="0.8" filter="url(#celestialOrbGlow)" />
      <circle cx="88" cy="55" r="1.5" fill="#9370db" mask="url(#celestialOrbFillMask)" opacity="0.7" filter="url(#celestialOrbGlow)" />
      <circle cx="45" cy="80" r="2" fill="#ffffff" mask="url(#celestialOrbFillMask)" opacity="0.9" />
      <circle cx="85" cy="75" r="1.5" fill="#87ceeb" mask="url(#celestialOrbFillMask)" opacity="0.8" filter="url(#celestialOrbGlow)" />
      <circle cx="64" cy="30" r="1.5" fill="#ffffff" mask="url(#celestialOrbFillMask)" opacity="0.9" />
      <circle cx="30" cy="64" r="2" fill="#9370db" mask="url(#celestialOrbFillMask)" opacity="0.7" filter="url(#celestialOrbGlow)" />
      <circle cx="98" cy="64" r="1.5" fill="#87ceeb" mask="url(#celestialOrbFillMask)" opacity="0.8" filter="url(#celestialOrbGlow)" />
      <circle cx="64" cy="98" r="2" fill="#ffffff" mask="url(#celestialOrbFillMask)" opacity="0.9" />
    </svg>
  );
};

export default Asset15;

