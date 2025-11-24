import React from 'react';

const Asset10: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="ratGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a9a9a9" />
          <stop offset="50%" stopColor="#808080" />
          <stop offset="100%" stopColor="#696969" />
        </radialGradient>
        <filter id="ratGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="ratFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      <ellipse cx="64" cy="75" rx="28" ry="35" fill="url(#ratGradient)" mask="url(#ratFillMask)" filter="url(#ratGlow)" />
      <ellipse cx="64" cy="75" rx="28" ry="35" fill="none" stroke="#696969" strokeWidth="2" />
      <circle cx="42" cy="40" r="14" fill="url(#ratGradient)" mask="url(#ratFillMask)" />
      <circle cx="86" cy="40" r="14" fill="url(#ratGradient)" mask="url(#ratFillMask)" />
      <ellipse cx="64" cy="52" rx="24" ry="28" fill="url(#ratGradient)" mask="url(#ratFillMask)" />
      <circle cx="42" cy="35" r="10" fill="#f5f5f5" mask="url(#ratFillMask)" opacity="0.4" />
      <circle cx="86" cy="35" r="10" fill="#f5f5f5" mask="url(#ratFillMask)" opacity="0.4" />
      <ellipse cx="54" cy="60" rx="3" ry="5" fill="#000" mask="url(#ratFillMask)" />
      <ellipse cx="74" cy="60" rx="3" ry="5" fill="#000" mask="url(#ratFillMask)" />
      <circle cx="55" cy="59" r="1" fill="#fff" mask="url(#ratFillMask)" />
      <circle cx="75" cy="59" r="1" fill="#fff" mask="url(#ratFillMask)" />
      <ellipse cx="64" cy="70" rx="3" ry="4" fill="#ff69b4" mask="url(#ratFillMask)" />
      <path d="M64 74 L60 78 L58 76" fill="none" stroke="#696969" strokeWidth="1.5" mask="url(#ratFillMask)" />
      <path d="M64 74 L68 78 L70 76" fill="none" stroke="#696969" strokeWidth="1.5" mask="url(#ratFillMask)" />
      <path d="M52 72 Q46 73, 42 72" stroke="#808080" strokeWidth="1" opacity="0.6" mask="url(#ratFillMask)" />
      <path d="M76 72 Q82 73, 86 72" stroke="#808080" strokeWidth="1" opacity="0.6" mask="url(#ratFillMask)" />
      <path d="M90 70 Q100 65, 105 68" fill="none" stroke="#808080" strokeWidth="2" mask="url(#ratFillMask)" opacity="0.7" />
    </svg>
  );
};

export default Asset10;

