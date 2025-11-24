import React from 'react';

const Asset1: React.FC = () => {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      className="w-32 h-32"
    >
      <defs>
        <linearGradient id="emberGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="30%" stopColor="#ff8c00" />
          <stop offset="70%" stopColor="#ff4500" />
          <stop offset="100%" stopColor="#dc143c" />
        </linearGradient>
        <radialGradient id="ember3D" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffff00" />
          <stop offset="30%" stopColor="#ffd700" />
          <stop offset="60%" stopColor="#ff8c00" />
          <stop offset="100%" stopColor="#ff4500" />
        </radialGradient>
        <radialGradient id="emberCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="20%" stopColor="#ffff00" />
          <stop offset="50%" stopColor="#ff8c00" />
          <stop offset="100%" stopColor="#ff4500" />
        </radialGradient>
        <filter id="emberGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="emberShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#ff4500" floodOpacity="0.4"/>
        </filter>
        <mask id="emberFillMask">
          <rect 
            x="0" 
            y="0" 
            width="128" 
            height="128" 
            fill="white"
            transform="translate(0, 0)"
          />
        </mask>
      </defs>
      
      {/* Ember Base - Flame Shape */}
      <path
        d="M64 20 Q75 25, 80 35 Q85 50, 82 65 Q80 80, 75 90 Q70 100, 64 105 Q58 100, 53 90 Q48 80, 46 65 Q43 50, 48 35 Q53 25, 64 20 Z"
        fill="url(#ember3D)"
        mask="url(#emberFillMask)"
        filter="url(#emberShadow)"
      />
      {/* Ember Outline - Always Visible */}
      <path
        d="M64 20 Q75 25, 80 35 Q85 50, 82 65 Q80 80, 75 90 Q70 100, 64 105 Q58 100, 53 90 Q48 80, 46 65 Q43 50, 48 35 Q53 25, 64 20 Z"
        fill="none"
        stroke="#ff4500"
        strokeWidth="2"
      />
      
      {/* Inner Flame - Brighter Core */}
      <path
        d="M64 30 Q70 33, 73 42 Q75 55, 73 65 Q70 75, 64 80 Q58 75, 55 65 Q53 55, 55 42 Q58 33, 64 30 Z"
        fill="url(#emberCore)"
        mask="url(#emberFillMask)"
        filter="url(#emberGlow)"
      />
      {/* Inner Flame Outline */}
      <path
        d="M64 30 Q70 33, 73 42 Q75 55, 73 65 Q70 75, 64 80 Q58 75, 55 65 Q53 55, 55 42 Q58 33, 64 30 Z"
        fill="none"
        stroke="#ffd700"
        strokeWidth="1"
      />
      
      {/* Flame Flicker Left */}
      <path
        d="M48 40 Q45 35, 42 45 Q40 55, 45 60 Q48 58, 48 50 Q48 45, 48 40"
        fill="url(#ember3D)"
        mask="url(#emberFillMask)"
        opacity="0.8"
      />
      
      {/* Flame Flicker Right */}
      <path
        d="M80 40 Q83 35, 86 45 Q88 55, 83 60 Q80 58, 80 50 Q80 45, 80 40"
        fill="url(#ember3D)"
        mask="url(#emberFillMask)"
        opacity="0.8"
      />
      
      {/* Top Flame Point */}
      <path
        d="M64 15 Q67 18, 68 25 Q67 30, 64 28 Q61 30, 60 25 Q61 18, 64 15"
        fill="url(#emberCore)"
        mask="url(#emberFillMask)"
        filter="url(#emberGlow)"
      />
      
      {/* Ember Eyes - Glowing */}
      <ellipse cx="57" cy="50" rx="4" ry="6" fill="#ffff00" />
      <ellipse cx="71" cy="50" rx="4" ry="6" fill="#ffff00" />
      <ellipse cx="57" cy="50" rx="2" ry="4" fill="#ff8c00" />
      <ellipse cx="71" cy="50" rx="2" ry="4" fill="#ff8c00" />
      <circle cx="57" cy="48" r="1" fill="#ffffff" opacity="0.8" />
      <circle cx="71" cy="48" r="1" fill="#ffffff" opacity="0.8" />
      
      {/* Ember Smile - Fiery */}
      <path
        d="M58 62 Q64 67, 70 62"
        fill="none"
        stroke="#ffd700"
        strokeWidth="2"
        mask="url(#emberFillMask)"
      />
      
      {/* Flame Swirls - Decorative */}
      <path
        d="M50 55 Q48 60, 52 63"
        fill="none"
        stroke="#ffd700"
        strokeWidth="1.5"
        mask="url(#emberFillMask)"
        opacity="0.6"
      />
      <path
        d="M78 55 Q80 60, 76 63"
        fill="none"
        stroke="#ffd700"
        strokeWidth="1.5"
        mask="url(#emberFillMask)"
        opacity="0.6"
      />
      
      {/* Ember Arms - Flame Tendrils */}
      <path
        d="M48 65 Q35 68, 30 75 Q28 80, 32 82 Q38 78, 45 72"
        fill="url(#ember3D)"
        mask="url(#emberFillMask)"
        opacity="0.7"
      />
      <path
        d="M80 65 Q93 68, 98 75 Q100 80, 96 82 Q90 78, 83 72"
        fill="url(#ember3D)"
        mask="url(#emberFillMask)"
        opacity="0.7"
      />
      
      {/* Ember Arms Outline */}
      <path
        d="M48 65 Q35 68, 30 75 Q28 80, 32 82 Q38 78, 45 72"
        fill="none"
        stroke="#ff8c00"
        strokeWidth="1"
      />
      <path
        d="M80 65 Q93 68, 98 75 Q100 80, 96 82 Q90 78, 83 72"
        fill="none"
        stroke="#ff8c00"
        strokeWidth="1"
      />
      
      {/* Hot Spots - White Highlights */}
      <circle cx="64" cy="40" r="2" fill="#ffffff" mask="url(#emberFillMask)" opacity="0.6" />
      <circle cx="60" cy="55" r="1.5" fill="#ffffff" mask="url(#emberFillMask)" opacity="0.5" />
      <circle cx="68" cy="58" r="1.5" fill="#ffffff" mask="url(#emberFillMask)" opacity="0.5" />
      <circle cx="64" cy="70" r="2" fill="#ffffff" mask="url(#emberFillMask)" opacity="0.4" />
      
      {/* Ember Sparks - Floating */}
      <circle cx="40" cy="45" r="1" fill="#ffd700" mask="url(#emberFillMask)" opacity="0.8" />
      <circle cx="88" cy="50" r="1.2" fill="#ffd700" mask="url(#emberFillMask)" opacity="0.7" />
      <circle cx="35" cy="60" r="0.8" fill="#ff8c00" mask="url(#emberFillMask)" opacity="0.6" />
      <circle cx="92" cy="65" r="0.9" fill="#ff8c00" mask="url(#emberFillMask)" opacity="0.6" />
      
      {/* Flame Wisps - Bottom */}
      <path
        d="M55 95 Q50 100, 48 105 Q50 108, 52 105 Q55 100, 55 95"
        fill="url(#ember3D)"
        mask="url(#emberFillMask)"
        opacity="0.5"
      />
      <path
        d="M64 100 Q62 105, 60 110 Q62 113, 64 110 Q66 105, 64 100"
        fill="url(#ember3D)"
        mask="url(#emberFillMask)"
        opacity="0.5"
      />
      <path
        d="M73 95 Q78 100, 80 105 Q78 108, 76 105 Q73 100, 73 95"
        fill="url(#ember3D)"
        mask="url(#emberFillMask)"
        opacity="0.5"
      />
      
      {/* Ember Cheeks - Glow */}
      <ellipse cx="52" cy="56" rx="3" ry="2" fill="#ffd700" mask="url(#emberFillMask)" opacity="0.4" />
      <ellipse cx="76" cy="56" rx="3" ry="2" fill="#ffd700" mask="url(#emberFillMask)" opacity="0.4" />
      
      {/* Core Pulse Effect */}
      <circle cx="64" cy="55" r="3" fill="#ffffff" mask="url(#emberFillMask)" opacity="0.3" />
      
      {/* Flame Details - Texture */}
      <path
        d="M58 75 Q60 72, 62 75"
        fill="none"
        stroke="#ff8c00"
        strokeWidth="1"
        mask="url(#emberFillMask)"
        opacity="0.5"
      />
      <path
        d="M66 75 Q68 72, 70 75"
        fill="none"
        stroke="#ff8c00"
        strokeWidth="1"
        mask="url(#emberFillMask)"
        opacity="0.5"
      />
      
      {/* Bottom Glow Base */}
      <ellipse cx="64" cy="105" rx="20" ry="8" fill="#ff4500" mask="url(#emberFillMask)" opacity="0.3" />
      <ellipse cx="64" cy="105" rx="15" ry="6" fill="#ff8c00" mask="url(#emberFillMask)" opacity="0.2" />
    </svg>
  );
};

export default Asset1;

