import React from 'react';

const Asset14: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="circuitBotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#32cd32" />
          <stop offset="50%" stopColor="#00ff00" />
          <stop offset="100%" stopColor="#ffff00" />
        </linearGradient>
        <filter id="circuitBotGlow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="circuitBotFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Body */}
      <rect x="44" y="60" width="40" height="44" rx="4" fill="url(#circuitBotGrad)" mask="url(#circuitBotFillMask)" filter="url(#circuitBotGlow)" />
      <rect x="44" y="60" width="40" height="44" rx="4" fill="none" stroke="#00ff00" strokeWidth="2" />
      {/* Circuit board patterns */}
      <path d="M52 68 L60 68 L60 76 L52 76 Z" fill="none" stroke="#ffff00" strokeWidth="1.5" mask="url(#circuitBotFillMask)" />
      <path d="M68 68 L76 68 L76 76 L68 76 Z" fill="none" stroke="#ffff00" strokeWidth="1.5" mask="url(#circuitBotFillMask)" />
      <line x1="56" y1="72" x2="64" y2="72" stroke="#00ff00" strokeWidth="1.5" mask="url(#circuitBotFillMask)" />
      <line x1="64" y1="72" x2="72" y2="72" stroke="#00ff00" strokeWidth="1.5" mask="url(#circuitBotFillMask)" />
      <circle cx="56" cy="72" r="2" fill="#ffff00" mask="url(#circuitBotFillMask)" />
      <circle cx="72" cy="72" r="2" fill="#ffff00" mask="url(#circuitBotFillMask)" />
      {/* Power core */}
      <rect x="58" y="84" width="12" height="12" rx="2" fill="#32cd32" mask="url(#circuitBotFillMask)" />
      <circle cx="64" cy="90" r="4" fill="#ffff00" mask="url(#circuitBotFillMask)" />
      <circle cx="64" cy="90" r="2" fill="#ffffff" mask="url(#circuitBotFillMask)" />
      {/* Head */}
      <rect x="50" y="36" width="28" height="24" rx="3" fill="url(#circuitBotGrad)" mask="url(#circuitBotFillMask)" />
      <rect x="50" y="36" width="28" height="24" rx="3" fill="none" stroke="#00ff00" strokeWidth="2" />
      {/* LED eyes */}
      <rect x="56" y="44" width="6" height="8" rx="1" fill="#00ff00" mask="url(#circuitBotFillMask)" />
      <rect x="66" y="44" width="6" height="8" rx="1" fill="#00ff00" mask="url(#circuitBotFillMask)" />
      <rect x="57" y="46" width="4" height="4" fill="#ffff00" mask="url(#circuitBotFillMask)" />
      <rect x="67" y="46" width="4" height="4" fill="#ffff00" mask="url(#circuitBotFillMask)" />
      {/* Antenna */}
      <line x1="64" y1="36" x2="64" y2="26" stroke="#32cd32" strokeWidth="2" mask="url(#circuitBotFillMask)" />
      <circle cx="64" cy="26" r="3" fill="#ffff00" mask="url(#circuitBotFillMask)" />
      <circle cx="64" cy="26" r="5" fill="none" stroke="#00ff00" strokeWidth="1" mask="url(#circuitBotFillMask)" opacity="0.5" />
      {/* Arms */}
      <rect x="36" y="68" width="8" height="16" rx="2" fill="#32cd32" mask="url(#circuitBotFillMask)" />
      <rect x="84" y="68" width="8" height="16" rx="2" fill="#32cd32" mask="url(#circuitBotFillMask)" />
      <circle cx="40" cy="84" r="3" fill="#00ff00" mask="url(#circuitBotFillMask)" />
      <circle cx="88" cy="84" r="3" fill="#00ff00" mask="url(#circuitBotFillMask)" />
      {/* Legs */}
      <rect x="52" y="104" width="8" height="12" rx="2" fill="#32cd32" mask="url(#circuitBotFillMask)" />
      <rect x="68" y="104" width="8" height="12" rx="2" fill="#32cd32" mask="url(#circuitBotFillMask)" />
      {/* Circuit connectors */}
      <line x1="50" y1="70" x2="44" y2="70" stroke="#00ff00" strokeWidth="1.5" mask="url(#circuitBotFillMask)" />
      <line x1="78" y1="70" x2="84" y2="70" stroke="#00ff00" strokeWidth="1.5" mask="url(#circuitBotFillMask)" />
    </svg>
  );
};

export default Asset14;

