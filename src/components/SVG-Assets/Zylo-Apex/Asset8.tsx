import React from 'react';

const Asset8: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <radialGradient id="constellationStarGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#87ceeb" />
          <stop offset="100%" stopColor="#4169e1" />
        </radialGradient>
        <filter id="constellationGlow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="constellationFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Constellation lines connecting stars */}
      <line x1="64" y1="30" x2="50" y2="50" stroke="#87ceeb" strokeWidth="2" mask="url(#constellationFillMask)" opacity="0.6" />
      <line x1="50" y1="50" x2="40" y2="75" stroke="#87ceeb" strokeWidth="2" mask="url(#constellationFillMask)" opacity="0.6" />
      <line x1="64" y1="30" x2="78" y2="50" stroke="#87ceeb" strokeWidth="2" mask="url(#constellationFillMask)" opacity="0.6" />
      <line x1="78" y1="50" x2="88" y2="75" stroke="#87ceeb" strokeWidth="2" mask="url(#constellationFillMask)" opacity="0.6" />
      <line x1="64" y1="30" x2="64" y2="60" stroke="#87ceeb" strokeWidth="2" mask="url(#constellationFillMask)" opacity="0.6" />
      <line x1="64" y1="60" x2="50" y2="85" stroke="#87ceeb" strokeWidth="2" mask="url(#constellationFillMask)" opacity="0.6" />
      <line x1="64" y1="60" x2="78" y2="85" stroke="#87ceeb" strokeWidth="2" mask="url(#constellationFillMask)" opacity="0.6" />
      <line x1="40" y1="75" x2="50" y2="85" stroke="#87ceeb" strokeWidth="2" mask="url(#constellationFillMask)" opacity="0.6" />
      <line x1="88" y1="75" x2="78" y2="85" stroke="#87ceeb" strokeWidth="2" mask="url(#constellationFillMask)" opacity="0.6" />
      {/* Stars */}
      <circle cx="64" cy="30" r="5" fill="url(#constellationStarGrad)" mask="url(#constellationFillMask)" filter="url(#constellationGlow)" />
      <circle cx="50" cy="50" r="4" fill="url(#constellationStarGrad)" mask="url(#constellationFillMask)" filter="url(#constellationGlow)" />
      <circle cx="78" cy="50" r="4" fill="url(#constellationStarGrad)" mask="url(#constellationFillMask)" filter="url(#constellationGlow)" />
      <circle cx="64" cy="60" r="4.5" fill="url(#constellationStarGrad)" mask="url(#constellationFillMask)" filter="url(#constellationGlow)" />
      <circle cx="40" cy="75" r="3.5" fill="url(#constellationStarGrad)" mask="url(#constellationFillMask)" filter="url(#constellationGlow)" />
      <circle cx="88" cy="75" r="3.5" fill="url(#constellationStarGrad)" mask="url(#constellationFillMask)" filter="url(#constellationGlow)" />
      <circle cx="50" cy="85" r="3" fill="url(#constellationStarGrad)" mask="url(#constellationFillMask)" filter="url(#constellationGlow)" />
      <circle cx="78" cy="85" r="3" fill="url(#constellationStarGrad)" mask="url(#constellationFillMask)" filter="url(#constellationGlow)" />
      {/* Star highlights */}
      <circle cx="64" cy="30" r="2" fill="#ffffff" mask="url(#constellationFillMask)" />
      <circle cx="50" cy="50" r="1.5" fill="#ffffff" mask="url(#constellationFillMask)" />
      <circle cx="78" cy="50" r="1.5" fill="#ffffff" mask="url(#constellationFillMask)" />
      <circle cx="64" cy="60" r="2" fill="#ffffff" mask="url(#constellationFillMask)" />
      <circle cx="40" cy="75" r="1.5" fill="#ffffff" mask="url(#constellationFillMask)" />
      <circle cx="88" cy="75" r="1.5" fill="#ffffff" mask="url(#constellationFillMask)" />
      <circle cx="50" cy="85" r="1" fill="#ffffff" mask="url(#constellationFillMask)" />
      <circle cx="78" cy="85" r="1" fill="#ffffff" mask="url(#constellationFillMask)" />
    </svg>
  );
};

export default Asset8;

