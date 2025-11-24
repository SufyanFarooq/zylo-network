import React from 'react';

const Asset13: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="auroraGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00ffff" opacity="0.8" />
          <stop offset="50%" stopColor="#00ff00" opacity="0.6" />
          <stop offset="100%" stopColor="#00ffff" opacity="0.4" />
        </linearGradient>
        <linearGradient id="auroraGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff00ff" opacity="0.7" />
          <stop offset="50%" stopColor="#9370db" opacity="0.5" />
          <stop offset="100%" stopColor="#ff00ff" opacity="0.3" />
        </linearGradient>
        <linearGradient id="auroraGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00ff00" opacity="0.8" />
          <stop offset="50%" stopColor="#7fff00" opacity="0.6" />
          <stop offset="100%" stopColor="#00ff00" opacity="0.4" />
        </linearGradient>
        <filter id="auroraGlow"><feGaussianBlur stdDeviation="7" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="auroraFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Flowing aurora waves - cyan */}
      <path d="M20 50 Q35 35, 50 40 T80 35 Q95 32, 108 38" stroke="url(#auroraGrad1)" strokeWidth="8" fill="none" mask="url(#auroraFillMask)" filter="url(#auroraGlow)" opacity="0.8" strokeLinecap="round" />
      <path d="M18 55 Q33 38, 48 45 T78 38 Q93 35, 110 42" stroke="url(#auroraGrad1)" strokeWidth="6" fill="none" mask="url(#auroraFillMask)" filter="url(#auroraGlow)" opacity="0.6" strokeLinecap="round" />
      {/* Magenta/purple waves */}
      <path d="M22 65 Q38 50, 54 58 T84 52 Q98 48, 112 55" stroke="url(#auroraGrad2)" strokeWidth="10" fill="none" mask="url(#auroraFillMask)" filter="url(#auroraGlow)" opacity="0.7" strokeLinecap="round" />
      <path d="M20 70 Q36 53, 52 63 T82 55 Q96 50, 114 60" stroke="url(#auroraGrad2)" strokeWidth="7" fill="none" mask="url(#auroraFillMask)" filter="url(#auroraGlow)" opacity="0.5" strokeLinecap="round" />
      {/* Green waves */}
      <path d="M18 82 Q34 68, 50 75 T80 70 Q94 66, 110 72" stroke="url(#auroraGrad3)" strokeWidth="9" fill="none" mask="url(#auroraFillMask)" filter="url(#auroraGlow)" opacity="0.8" strokeLinecap="round" />
      <path d="M16 88 Q32 72, 48 82 T78 75 Q92 70, 112 78" stroke="url(#auroraGrad3)" strokeWidth="6" fill="none" mask="url(#auroraFillMask)" filter="url(#auroraGlow)" opacity="0.6" strokeLinecap="round" />
      {/* Additional flowing curves for depth */}
      <path d="M25 45 Q40 32, 55 38 T85 33" stroke="#00ffff" strokeWidth="4" fill="none" mask="url(#auroraFillMask)" filter="url(#auroraGlow)" opacity="0.5" strokeLinecap="round" />
      <path d="M28 78 Q43 62, 58 70 T88 65" stroke="#ff00ff" strokeWidth="5" fill="none" mask="url(#auroraFillMask)" filter="url(#auroraGlow)" opacity="0.4" strokeLinecap="round" />
      {/* Vertical rays emanating upward */}
      <line x1="40" y1="95" x2="38" y2="70" stroke="#00ffff" strokeWidth="2" mask="url(#auroraFillMask)" opacity="0.6" filter="url(#auroraGlow)" strokeLinecap="round" />
      <line x1="55" y1="100" x2="54" y2="65" stroke="#00ff00" strokeWidth="2.5" mask="url(#auroraFillMask)" opacity="0.7" filter="url(#auroraGlow)" strokeLinecap="round" />
      <line x1="70" y1="98" x2="69" y2="68" stroke="#ff00ff" strokeWidth="2" mask="url(#auroraFillMask)" opacity="0.6" filter="url(#auroraGlow)" strokeLinecap="round" />
      <line x1="85" y1="95" x2="84" y2="72" stroke="#7fff00" strokeWidth="2" mask="url(#auroraFillMask)" opacity="0.5" filter="url(#auroraGlow)" strokeLinecap="round" />
      {/* Shimmer particles */}
      <circle cx="45" cy="42" r="2" fill="#ffffff" mask="url(#auroraFillMask)" opacity="0.9" />
      <circle cx="60" cy="38" r="1.5" fill="#00ffff" mask="url(#auroraFillMask)" opacity="0.8" filter="url(#auroraGlow)" />
      <circle cx="75" cy="40" r="2" fill="#ffffff" mask="url(#auroraFillMask)" opacity="0.9" />
      <circle cx="50" cy="62" r="1.5" fill="#ff00ff" mask="url(#auroraFillMask)" opacity="0.7" filter="url(#auroraGlow)" />
      <circle cx="65" cy="58" r="2" fill="#00ff00" mask="url(#auroraFillMask)" opacity="0.8" filter="url(#auroraGlow)" />
      <circle cx="80" cy="55" r="1.5" fill="#ffffff" mask="url(#auroraFillMask)" opacity="0.9" />
      <circle cx="55" cy="78" r="2" fill="#7fff00" mask="url(#auroraFillMask)" opacity="0.8" filter="url(#auroraGlow)" />
      <circle cx="70" cy="75" r="1.5" fill="#00ffff" mask="url(#auroraFillMask)" opacity="0.7" filter="url(#auroraGlow)" />
      {/* Bright glow spots */}
      <circle cx="64" cy="55" r="8" fill="#ffffff" mask="url(#auroraFillMask)" opacity="0.3" filter="url(#auroraGlow)" />
      <circle cx="50" cy="68" r="6" fill="#00ffff" mask="url(#auroraFillMask)" opacity="0.3" filter="url(#auroraGlow)" />
      <circle cx="78" cy="62" r="7" fill="#ff00ff" mask="url(#auroraFillMask)" opacity="0.3" filter="url(#auroraGlow)" />
    </svg>
  );
};

export default Asset13;

