import React from 'react';

const Asset4: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="eagleBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#daa520" />
          <stop offset="50%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
        <filter id="eagleGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="eagleFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Wings - spread out */}
      <ellipse cx="35" cy="70" rx="22" ry="35" fill="url(#eagleBodyGrad)" mask="url(#eagleFillMask)" transform="rotate(-20 35 70)" filter="url(#eagleGlow)" />
      <ellipse cx="35" cy="70" rx="22" ry="35" fill="none" stroke="#8b6914" strokeWidth="2" transform="rotate(-20 35 70)" />
      <ellipse cx="93" cy="70" rx="22" ry="35" fill="url(#eagleBodyGrad)" mask="url(#eagleFillMask)" transform="rotate(20 93 70)" filter="url(#eagleGlow)" />
      <ellipse cx="93" cy="70" rx="22" ry="35" fill="none" stroke="#8b6914" strokeWidth="2" transform="rotate(20 93 70)" />
      {/* Wing feathers */}
      <path d="M20 75 L15 80 L20 85" fill="none" stroke="#8b6914" strokeWidth="2" mask="url(#eagleFillMask)" />
      <path d="M108 75 L113 80 L108 85" fill="none" stroke="#8b6914" strokeWidth="2" mask="url(#eagleFillMask)" />
      {/* Body */}
      <ellipse cx="64" cy="75" rx="24" ry="32" fill="url(#eagleBodyGrad)" mask="url(#eagleFillMask)" filter="url(#eagleGlow)" />
      <ellipse cx="64" cy="75" rx="24" ry="32" fill="none" stroke="#8b6914" strokeWidth="2" />
      {/* Head */}
      <circle cx="64" cy="42" r="20" fill="url(#eagleBodyGrad)" mask="url(#eagleFillMask)" />
      <circle cx="64" cy="42" r="20" fill="none" stroke="#8b6914" strokeWidth="2" />
      {/* White head feathers */}
      <ellipse cx="64" cy="35" rx="18" ry="15" fill="#fff" mask="url(#eagleFillMask)" opacity="0.9" />
      {/* Eyes - fierce */}
      <ellipse cx="56" cy="40" rx="4" ry="5" fill="#fff" mask="url(#eagleFillMask)" />
      <ellipse cx="72" cy="40" rx="4" ry="5" fill="#fff" mask="url(#eagleFillMask)" />
      <circle cx="56" cy="40" r="3" fill="#000" mask="url(#eagleFillMask)" />
      <circle cx="72" cy="40" r="3" fill="#000" mask="url(#eagleFillMask)" />
      <circle cx="56.5" cy="39" r="1" fill="#fff" mask="url(#eagleFillMask)" />
      <circle cx="72.5" cy="39" r="1" fill="#fff" mask="url(#eagleFillMask)" />
      {/* Hooked Beak */}
      <path d="M64 48 L58 54 L62 56 L64 58 L66 56 L70 54 Z" fill="#ffa500" mask="url(#eagleFillMask)" />
      <path d="M64 48 L58 54 L62 56 L64 58" fill="none" stroke="#ff8c00" strokeWidth="1.5" />
      {/* Tail feathers */}
      <path d="M54 100 L50 115 L54 108 Z" fill="url(#eagleBodyGrad)" mask="url(#eagleFillMask)" />
      <path d="M64 102 L64 118 L64 110 Z" fill="url(#eagleBodyGrad)" mask="url(#eagleFillMask)" />
      <path d="M74 100 L78 115 L74 108 Z" fill="url(#eagleBodyGrad)" mask="url(#eagleFillMask)" />
      {/* Talons */}
      <path d="M56 100 L54 110 L52 108" fill="none" stroke="#333" strokeWidth="2" mask="url(#eagleFillMask)" />
      <path d="M72 100 L74 110 L76 108" fill="none" stroke="#333" strokeWidth="2" mask="url(#eagleFillMask)" />
    </svg>
  );
};

export default Asset4;

