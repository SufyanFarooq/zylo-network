import React from 'react';

const Asset3: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="wolfBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a9a9a9" />
          <stop offset="50%" stopColor="#808080" />
          <stop offset="100%" stopColor="#696969" />
        </linearGradient>
        <filter id="wolfGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="wolfFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Body */}
      <ellipse cx="64" cy="85" rx="30" ry="36" fill="url(#wolfBodyGrad)" mask="url(#wolfFillMask)" filter="url(#wolfGlow)" />
      <ellipse cx="64" cy="85" rx="30" ry="36" fill="none" stroke="#696969" strokeWidth="2" />
      {/* Head - more elongated for wolf snout */}
      <ellipse cx="64" cy="42" rx="26" ry="28" fill="url(#wolfBodyGrad)" mask="url(#wolfFillMask)" />
      <ellipse cx="64" cy="42" rx="26" ry="28" fill="none" stroke="#696969" strokeWidth="2" />
      {/* Pointed Ears */}
      <path d="M42 18 L38 8 L45 22 Z" fill="url(#wolfBodyGrad)" mask="url(#wolfFillMask)" />
      <path d="M42 18 L38 8 L45 22 Z" fill="none" stroke="#696969" strokeWidth="1.5" />
      <path d="M86 18 L90 8 L83 22 Z" fill="url(#wolfBodyGrad)" mask="url(#wolfFillMask)" />
      <path d="M86 18 L90 8 L83 22 Z" fill="none" stroke="#696969" strokeWidth="1.5" />
      {/* Inner ears */}
      <path d="M42 18 L40 12 L43 20 Z" fill="#999" mask="url(#wolfFillMask)" />
      <path d="M86 18 L88 12 L85 20 Z" fill="#999" mask="url(#wolfFillMask)" />
      {/* Snout - elongated */}
      <ellipse cx="64" cy="55" rx="16" ry="18" fill="#d3d3d3" mask="url(#wolfFillMask)" opacity="0.9" />
      {/* Eyes - wolf-like yellow */}
      <ellipse cx="54" cy="40" rx="5" ry="7" fill="#ffcc00" mask="url(#wolfFillMask)" />
      <ellipse cx="74" cy="40" rx="5" ry="7" fill="#ffcc00" mask="url(#wolfFillMask)" />
      <ellipse cx="54" cy="40" rx="2.5" ry="5" fill="#000" mask="url(#wolfFillMask)" />
      <ellipse cx="74" cy="40" rx="2.5" ry="5" fill="#000" mask="url(#wolfFillMask)" />
      <circle cx="54.5" cy="38" r="1" fill="#fff" mask="url(#wolfFillMask)" opacity="0.9" />
      <circle cx="74.5" cy="38" r="1" fill="#fff" mask="url(#wolfFillMask)" opacity="0.9" />
      {/* Nose */}
      <ellipse cx="64" cy="62" rx="4" ry="5" fill="#000" mask="url(#wolfFillMask)" />
      {/* Mouth */}
      <path d="M64 67 L64 72" stroke="#000" strokeWidth="2" mask="url(#wolfFillMask)" />
      <path d="M64 72 Q58 75, 54 73" fill="none" stroke="#000" strokeWidth="2" mask="url(#wolfFillMask)" />
      <path d="M64 72 Q70 75, 74 73" fill="none" stroke="#000" strokeWidth="2" mask="url(#wolfFillMask)" />
      {/* Chest fur */}
      <ellipse cx="64" cy="75" rx="18" ry="22" fill="#d3d3d3" mask="url(#wolfFillMask)" opacity="0.6" />
      {/* Legs */}
      <ellipse cx="50" cy="108" rx="7" ry="13" fill="url(#wolfBodyGrad)" mask="url(#wolfFillMask)" />
      <ellipse cx="78" cy="108" rx="7" ry="13" fill="url(#wolfBodyGrad)" mask="url(#wolfFillMask)" />
      {/* Paws */}
      <ellipse cx="50" cy="116" rx="6" ry="4" fill="#696969" mask="url(#wolfFillMask)" />
      <ellipse cx="78" cy="116" rx="6" ry="4" fill="#696969" mask="url(#wolfFillMask)" />
    </svg>
  );
};

export default Asset3;

