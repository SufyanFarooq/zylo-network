import React from 'react';

const Asset15: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="snakeBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#32cd32" />
          <stop offset="50%" stopColor="#228b22" />
          <stop offset="100%" stopColor="#006400" />
        </linearGradient>
        <radialGradient id="snakeScaleGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3cb371" />
          <stop offset="100%" stopColor="#228b22" />
        </radialGradient>
        <filter id="snakeGlow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="snakeFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Coiled snake body - S-shaped */}
      <path d="M30 100 Q25 85, 32 70 Q40 55, 52 48 Q64 42, 76 48 Q88 55, 96 70 Q103 85, 98 100" fill="url(#snakeBodyGrad)" mask="url(#snakeFillMask)" filter="url(#snakeGlow)" stroke="#006400" strokeWidth="3" />
      {/* Body segments with width variation */}
      <ellipse cx="32" cy="70" rx="14" ry="16" fill="url(#snakeBodyGrad)" mask="url(#snakeFillMask)" transform="rotate(-30 32 70)" />
      <ellipse cx="52" cy="52" rx="16" ry="18" fill="url(#snakeBodyGrad)" mask="url(#snakeFillMask)" />
      <ellipse cx="76" cy="52" rx="16" ry="18" fill="url(#snakeBodyGrad)" mask="url(#snakeFillMask)" />
      <ellipse cx="96" cy="70" rx="14" ry="16" fill="url(#snakeBodyGrad)" mask="url(#snakeFillMask)" transform="rotate(30 96 70)" />
      {/* Belly scales - lighter */}
      <ellipse cx="52" cy="54" rx="10" ry="12" fill="#90ee90" mask="url(#snakeFillMask)" opacity="0.5" />
      <ellipse cx="76" cy="54" rx="10" ry="12" fill="#90ee90" mask="url(#snakeFillMask)" opacity="0.5" />
      {/* Head - triangular shape */}
      <path d="M48 38 L64 28 L80 38 L76 48 L52 48 Z" fill="url(#snakeBodyGrad)" mask="url(#snakeFillMask)" />
      <path d="M48 38 L64 28 L80 38" fill="none" stroke="#006400" strokeWidth="2" />
      {/* Snake eyes - slitted pupils */}
      <ellipse cx="56" cy="38" rx="6" ry="7" fill="#ffff00" mask="url(#snakeFillMask)" />
      <ellipse cx="72" cy="38" rx="6" ry="7" fill="#ffff00" mask="url(#snakeFillMask)" />
      <rect x="55" y="36" width="2" height="4" fill="#000" mask="url(#snakeFillMask)" />
      <rect x="71" y="36" width="2" height="4" fill="#000" mask="url(#snakeFillMask)" />
      <circle cx="56" cy="37" r="1" fill="#fff" mask="url(#snakeFillMask)" opacity="0.9" />
      <circle cx="72" cy="37" r="1" fill="#fff" mask="url(#snakeFillMask)" opacity="0.9" />
      {/* Forked tongue */}
      <path d="M64 44 L64 52" stroke="#ff0000" strokeWidth="2" mask="url(#snakeFillMask)" />
      <path d="M64 52 L60 56 M64 52 L68 56" stroke="#ff0000" strokeWidth="2" mask="url(#snakeFillMask)" />
      {/* Scale pattern */}
      <circle cx="42" cy="60" r="4" fill="url(#snakeScaleGrad)" mask="url(#snakeFillMask)" opacity="0.7" />
      <circle cx="52" cy="65" r="3.5" fill="url(#snakeScaleGrad)" mask="url(#snakeFillMask)" opacity="0.7" />
      <circle cx="64" cy="58" r="4" fill="url(#snakeScaleGrad)" mask="url(#snakeFillMask)" opacity="0.7" />
      <circle cx="76" cy="65" r="3.5" fill="url(#snakeScaleGrad)" mask="url(#snakeFillMask)" opacity="0.7" />
      <circle cx="86" cy="60" r="4" fill="url(#snakeScaleGrad)" mask="url(#snakeFillMask)" opacity="0.7" />
      <circle cx="38" cy="80" r="3" fill="url(#snakeScaleGrad)" mask="url(#snakeFillMask)" opacity="0.7" />
      <circle cx="90" cy="80" r="3" fill="url(#snakeScaleGrad)" mask="url(#snakeFillMask)" opacity="0.7" />
      {/* Diamond patterns on back */}
      <path d="M64 46 L60 50 L64 54 L68 50 Z" fill="#006400" mask="url(#snakeFillMask)" opacity="0.6" />
      <path d="M40 68 L36 72 L40 76 L44 72 Z" fill="#006400" mask="url(#snakeFillMask)" opacity="0.6" />
      <path d="M88 68 L84 72 L88 76 L92 72 Z" fill="#006400" mask="url(#snakeFillMask)" opacity="0.6" />
    </svg>
  );
};

export default Asset15;

