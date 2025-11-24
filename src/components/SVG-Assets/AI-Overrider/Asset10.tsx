import React from 'react';

const Asset10: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="laserGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff0000" />
          <stop offset="50%" stopColor="#ff4500" />
          <stop offset="100%" stopColor="#ffff00" />
        </linearGradient>
        <filter id="laserGlow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="laserFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Laser cannon base */}
      <rect x="48" y="85" width="32" height="20" rx="3" fill="#696969" mask="url(#laserFillMask)" />
      <rect x="48" y="85" width="32" height="20" rx="3" fill="none" stroke="#00ffff" strokeWidth="2" />
      {/* Barrel */}
      <rect x="54" y="45" width="20" height="40" rx="2" fill="url(#laserGrad)" mask="url(#laserFillMask)" filter="url(#laserGlow)" />
      <rect x="54" y="45" width="20" height="40" rx="2" fill="none" stroke="#ff0000" strokeWidth="2" />
      {/* Barrel details */}
      <line x1="54" y1="55" x2="74" y2="55" stroke="#ffff00" strokeWidth="1.5" mask="url(#laserFillMask)" />
      <line x1="54" y1="65" x2="74" y2="65" stroke="#ffff00" strokeWidth="1.5" mask="url(#laserFillMask)" />
      <line x1="54" y1="75" x2="74" y2="75" stroke="#ffff00" strokeWidth="1.5" mask="url(#laserFillMask)" />
      {/* Energy vents */}
      <rect x="50" y="50" width="2" height="8" fill="#ff4500" mask="url(#laserFillMask)" />
      <rect x="76" y="50" width="2" height="8" fill="#ff4500" mask="url(#laserFillMask)" />
      <rect x="50" y="62" width="2" height="8" fill="#ff4500" mask="url(#laserFillMask)" />
      <rect x="76" y="62" width="2" height="8" fill="#ff4500" mask="url(#laserFillMask)" />
      <rect x="50" y="74" width="2" height="8" fill="#ff4500" mask="url(#laserFillMask)" />
      <rect x="76" y="74" width="2" height="8" fill="#ff4500" mask="url(#laserFillMask)" />
      {/* Laser beam exit */}
      <ellipse cx="64" cy="45" rx="10" ry="8" fill="#ff0000" mask="url(#laserFillMask)" opacity="0.8" />
      <ellipse cx="64" cy="45" rx="7" ry="5" fill="#ff4500" mask="url(#laserFillMask)" />
      <ellipse cx="64" cy="45" rx="4" ry="3" fill="#ffff00" mask="url(#laserFillMask)" />
      <circle cx="64" cy="45" r="2" fill="#ffffff" mask="url(#laserFillMask)" />
      {/* Laser beam */}
      <rect x="60" y="15" width="8" height="30" fill="#ff0000" mask="url(#laserFillMask)" opacity="0.7" />
      <rect x="61" y="15" width="6" height="30" fill="#ff4500" mask="url(#laserFillMask)" opacity="0.6" />
      <rect x="62" y="15" width="4" height="30" fill="#ffff00" mask="url(#laserFillMask)" opacity="0.5" />
      <rect x="63" y="15" width="2" height="30" fill="#ffffff" mask="url(#laserFillMask)" opacity="0.4" />
      {/* Energy core */}
      <circle cx="64" cy="95" r="6" fill="#ff0000" mask="url(#laserFillMask)" />
      <circle cx="64" cy="95" r="4" fill="#ffff00" mask="url(#laserFillMask)" />
      <circle cx="64" cy="95" r="2" fill="#ffffff" mask="url(#laserFillMask)" />
      {/* Tech panels */}
      <rect x="52" y="88" width="3" height="12" fill="#00ffff" mask="url(#laserFillMask)" opacity="0.6" />
      <rect x="73" y="88" width="3" height="12" fill="#00ffff" mask="url(#laserFillMask)" opacity="0.6" />
      {/* Status lights */}
      <circle cx="58" cy="92" r="1.5" fill="#00ff00" mask="url(#laserFillMask)" />
      <circle cx="70" cy="92" r="1.5" fill="#00ff00" mask="url(#laserFillMask)" />
      {/* Cooling fins */}
      <path d="M45 70 L42 68 L42 72 Z" fill="#696969" mask="url(#laserFillMask)" />
      <path d="M83 70 L86 68 L86 72 Z" fill="#696969" mask="url(#laserFillMask)" />
      <path d="M45 60 L42 58 L42 62 Z" fill="#696969" mask="url(#laserFillMask)" />
      <path d="M83 60 L86 58 L86 62 Z" fill="#696969" mask="url(#laserFillMask)" />
    </svg>
  );
};

export default Asset10;

