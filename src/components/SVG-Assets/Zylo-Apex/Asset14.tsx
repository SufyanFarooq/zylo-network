import React from 'react';

const Asset14: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="quantumStarCoreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#00ffff" />
          <stop offset="60%" stopColor="#ff00ff" />
          <stop offset="100%" stopColor="#ffff00" />
        </radialGradient>
        <filter id="quantumStarGlow"><feGaussianBlur stdDeviation="6" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="quantumStarFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Quantum field effect */}
      <circle cx="64" cy="64" r="50" fill="none" stroke="#00ffff" strokeWidth="1" mask="url(#quantumStarFillMask)" opacity="0.3" strokeDasharray="4 4" />
      <circle cx="64" cy="64" r="45" fill="none" stroke="#ff00ff" strokeWidth="1" mask="url(#quantumStarFillMask)" opacity="0.3" strokeDasharray="3 3" />
      <circle cx="64" cy="64" r="40" fill="none" stroke="#ffff00" strokeWidth="1" mask="url(#quantumStarFillMask)" opacity="0.3" strokeDasharray="5 5" />
      {/* Quantum particles orbiting */}
      <circle cx="64" cy="20" r="3" fill="#00ffff" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
      <circle cx="108" cy="64" r="3" fill="#ff00ff" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
      <circle cx="64" cy="108" r="3" fill="#ffff00" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
      <circle cx="20" cy="64" r="3" fill="#00ffff" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
      <circle cx="92" cy="36" r="2" fill="#ffffff" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
      <circle cx="92" cy="92" r="2" fill="#ff00ff" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
      <circle cx="36" cy="92" r="2" fill="#00ffff" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
      <circle cx="36" cy="36" r="2" fill="#ffff00" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
      {/* Main quantum star shape */}
      <path d="M64 25 L70 50 L95 50 L74 65 L82 92 L64 75 L46 92 L54 65 L33 50 L58 50 Z" fill="url(#quantumStarCoreGrad)" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
      <path d="M64 25 L70 50 L95 50 L74 65 L82 92 L64 75 L46 92 L54 65 L33 50 L58 50 Z" fill="none" stroke="#00ffff" strokeWidth="2" />
      {/* Inner quantum core */}
      <circle cx="64" cy="64" r="18" fill="#ffffff" mask="url(#quantumStarFillMask)" opacity="0.8" filter="url(#quantumStarGlow)" />
      <circle cx="64" cy="64" r="14" fill="#00ffff" mask="url(#quantumStarFillMask)" opacity="0.7" />
      <circle cx="64" cy="64" r="10" fill="#ff00ff" mask="url(#quantumStarFillMask)" opacity="0.8" />
      <circle cx="64" cy="64" r="6" fill="#ffffff" mask="url(#quantumStarFillMask)" />
      {/* Quantum entanglement lines */}
      <line x1="64" y1="20" x2="64" y2="44" stroke="#00ffff" strokeWidth="1.5" mask="url(#quantumStarFillMask)" opacity="0.5" strokeDasharray="2 2" />
      <line x1="108" y1="64" x2="84" y2="64" stroke="#ff00ff" strokeWidth="1.5" mask="url(#quantumStarFillMask)" opacity="0.5" strokeDasharray="2 2" />
      <line x1="64" y1="108" x2="64" y2="84" stroke="#ffff00" strokeWidth="1.5" mask="url(#quantumStarFillMask)" opacity="0.5" strokeDasharray="2 2" />
      <line x1="20" y1="64" x2="44" y2="64" stroke="#00ffff" strokeWidth="1.5" mask="url(#quantumStarFillMask)" opacity="0.5" strokeDasharray="2 2" />
      {/* Additional sparkles */}
      <circle cx="64" cy="35" r="2" fill="#ffffff" mask="url(#quantumStarFillMask)" />
      <circle cx="85" cy="50" r="1.5" fill="#00ffff" mask="url(#quantumStarFillMask)" />
      <circle cx="78" cy="78" r="2" fill="#ff00ff" mask="url(#quantumStarFillMask)" />
      <circle cx="50" cy="78" r="1.5" fill="#ffff00" mask="url(#quantumStarFillMask)" />
      <circle cx="43" cy="50" r="2" fill="#ffffff" mask="url(#quantumStarFillMask)" />
    </svg>
  );
};

export default Asset14;

