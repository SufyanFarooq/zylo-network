import React from 'react';

const Asset7: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="voidGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="60%" stopColor="#0a0a0a" />
          <stop offset="90%" stopColor="#1a001a" />
          <stop offset="100%" stopColor="#2f2f2f" />
        </radialGradient>
        <filter id="voidGlow"><feGaussianBlur stdDeviation="6" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="voidFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Outer distortion rings */}
      <circle cx="64" cy="64" r="58" fill="none" stroke="#2f2f2f" strokeWidth="1.5" mask="url(#voidFillMask)" opacity="0.3" />
      <circle cx="64" cy="64" r="52" fill="none" stroke="#4b0082" strokeWidth="1" mask="url(#voidFillMask)" opacity="0.4" />
      <circle cx="64" cy="64" r="46" fill="none" stroke="#2f2f2f" strokeWidth="1.5" mask="url(#voidFillMask)" opacity="0.5" />
      {/* Void body */}
      <circle cx="64" cy="64" r="40" fill="url(#voidGrad)" mask="url(#voidFillMask)" filter="url(#voidGlow)" />
      <circle cx="64" cy="64" r="40" fill="none" stroke="#4b0082" strokeWidth="2" opacity="0.6" />
      {/* Inner void */}
      <circle cx="64" cy="64" r="32" fill="#000000" mask="url(#voidFillMask)" />
      <circle cx="64" cy="64" r="24" fill="#000000" mask="url(#voidFillMask)" opacity="0.9" />
      <circle cx="64" cy="64" r="16" fill="#000000" mask="url(#voidFillMask)" />
      {/* Distortion effects */}
      <path d="M64 30 Q70 35, 75 30" stroke="#4b0082" strokeWidth="1" fill="none" mask="url(#voidFillMask)" opacity="0.5" />
      <path d="M64 98 Q58 93, 53 98" stroke="#4b0082" strokeWidth="1" fill="none" mask="url(#voidFillMask)" opacity="0.5" />
      <path d="M30 64 Q35 58, 30 53" stroke="#4b0082" strokeWidth="1" fill="none" mask="url(#voidFillMask)" opacity="0.5" />
      <path d="M98 64 Q93 70, 98 75" stroke="#4b0082" strokeWidth="1" fill="none" mask="url(#voidFillMask)" opacity="0.5" />
      {/* Swirl patterns */}
      <path d="M64 44 Q70 50, 64 56 Q58 62, 64 68" stroke="#2f2f2f" strokeWidth="2" fill="none" mask="url(#voidFillMask)" opacity="0.4" />
      <path d="M44 64 Q50 58, 56 64 Q62 70, 68 64" stroke="#2f2f2f" strokeWidth="2" fill="none" mask="url(#voidFillMask)" opacity="0.4" />
      {/* Gravity well indicators */}
      <circle cx="64" cy="64" r="10" fill="none" stroke="#4b0082" strokeWidth="1.5" mask="url(#voidFillMask)" opacity="0.6" />
      <circle cx="64" cy="64" r="5" fill="none" stroke="#8b00ff" strokeWidth="1" mask="url(#voidFillMask)" opacity="0.7" />
      {/* Faint stars being pulled in */}
      <circle cx="50" cy="50" r="1" fill="#ffffff" mask="url(#voidFillMask)" opacity="0.3" />
      <circle cx="78" cy="50" r="1" fill="#ffffff" mask="url(#voidFillMask)" opacity="0.3" />
      <circle cx="50" cy="78" r="1" fill="#ffffff" mask="url(#voidFillMask)" opacity="0.3" />
      <circle cx="78" cy="78" r="1" fill="#ffffff" mask="url(#voidFillMask)" opacity="0.3" />
    </svg>
  );
};

export default Asset7;
