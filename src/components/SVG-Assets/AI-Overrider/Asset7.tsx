import React from 'react';

const Asset7: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="cyberTigerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff8c00" />
          <stop offset="50%" stopColor="#00ffff" />
          <stop offset="100%" stopColor="#ff00ff" />
        </linearGradient>
        <filter id="cyberTigerGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="cyberTigerFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Body */}
      <ellipse cx="64" cy="80" rx="30" ry="34" fill="url(#cyberTigerGrad)" mask="url(#cyberTigerFillMask)" filter="url(#cyberTigerGlow)" />
      <ellipse cx="64" cy="80" rx="30" ry="34" fill="none" stroke="#00ffff" strokeWidth="2" />
      {/* Tech stripes */}
      <path d="M48 72 Q52 74, 56 72" stroke="#000" strokeWidth="3" mask="url(#cyberTigerFillMask)" opacity="0.7" />
      <path d="M72 72 Q76 74, 80 72" stroke="#000" strokeWidth="3" mask="url(#cyberTigerFillMask)" opacity="0.7" />
      <path d="M45 82 Q50 84, 55 82" stroke="#000" strokeWidth="3" mask="url(#cyberTigerFillMask)" opacity="0.7" />
      <path d="M73 82 Q78 84, 83 82" stroke="#000" strokeWidth="3" mask="url(#cyberTigerFillMask)" opacity="0.7" />
      {/* Neon stripes */}
      <line x1="50" y1="75" x2="54" y2="75" stroke="#00ffff" strokeWidth="2" mask="url(#cyberTigerFillMask)" />
      <line x1="74" y1="75" x2="78" y2="75" stroke="#ff00ff" strokeWidth="2" mask="url(#cyberTigerFillMask)" />
      <line x1="47" y1="85" x2="52" y2="85" stroke="#00ffff" strokeWidth="2" mask="url(#cyberTigerFillMask)" />
      <line x1="76" y1="85" x2="81" y2="85" stroke="#ff00ff" strokeWidth="2" mask="url(#cyberTigerFillMask)" />
      {/* Head */}
      <ellipse cx="64" cy="48" rx="26" ry="24" fill="url(#cyberTigerGrad)" mask="url(#cyberTigerFillMask)" />
      <ellipse cx="64" cy="48" rx="26" ry="24" fill="none" stroke="#00ffff" strokeWidth="2" />
      {/* Mechanical ears */}
      <path d="M42 32 L36 20 L40 24 L44 30 Z" fill="#ff8c00" mask="url(#cyberTigerFillMask)" />
      <path d="M42 32 L36 20 L40 24 L44 30 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
      <path d="M86 32 L92 20 L88 24 L84 30 Z" fill="#ff8c00" mask="url(#cyberTigerFillMask)" />
      <path d="M86 32 L92 20 L88 24 L84 30 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
      {/* Cybernetic eyes */}
      <ellipse cx="52" cy="46" rx="7" ry="8" fill="#00ffff" mask="url(#cyberTigerFillMask)" />
      <ellipse cx="76" cy="46" rx="7" ry="8" fill="#00ffff" mask="url(#cyberTigerFillMask)" />
      <ellipse cx="52" cy="46" rx="3" ry="6" fill="#ff0000" mask="url(#cyberTigerFillMask)" />
      <ellipse cx="76" cy="46" rx="3" ry="6" fill="#ff0000" mask="url(#cyberTigerFillMask)" />
      <circle cx="52" cy="44" r="2" fill="#ffffff" mask="url(#cyberTigerFillMask)" />
      <circle cx="76" cy="44" r="2" fill="#ffffff" mask="url(#cyberTigerFillMask)" />
      {/* Tech snout */}
      <ellipse cx="64" cy="56" rx="10" ry="8" fill="#00ffff" mask="url(#cyberTigerFillMask)" opacity="0.5" />
      <ellipse cx="64" cy="58" rx="4" ry="3" fill="#000" mask="url(#cyberTigerFillMask)" />
      {/* Energy whiskers */}
      <line x1="40" y1="50" x2="28" y2="48" stroke="#00ffff" strokeWidth="1.5" mask="url(#cyberTigerFillMask)" />
      <line x1="40" y1="54" x2="28" y2="54" stroke="#ff00ff" strokeWidth="1.5" mask="url(#cyberTigerFillMask)" />
      <line x1="88" y1="50" x2="100" y2="48" stroke="#00ffff" strokeWidth="1.5" mask="url(#cyberTigerFillMask)" />
      <line x1="88" y1="54" x2="100" y2="54" stroke="#ff00ff" strokeWidth="1.5" mask="url(#cyberTigerFillMask)" />
      {/* Power core */}
      <circle cx="64" cy="80" r="5" fill="#ffff00" mask="url(#cyberTigerFillMask)" />
      <circle cx="64" cy="80" r="3" fill="#ffffff" mask="url(#cyberTigerFillMask)" />
    </svg>
  );
};

export default Asset7;

