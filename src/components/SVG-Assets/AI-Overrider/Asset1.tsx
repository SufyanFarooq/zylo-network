import React from 'react';

const Asset1: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="robotBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00bfff" />
          <stop offset="50%" stopColor="#1e90ff" />
          <stop offset="100%" stopColor="#4169e1" />
        </linearGradient>
        <filter id="robotGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="robotFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Body - enhanced with segments */}
      <rect x="38" y="65" width="52" height="50" rx="6" fill="url(#robotBodyGrad)" mask="url(#robotFillMask)" filter="url(#robotGlow)" />
      <rect x="38" y="65" width="52" height="50" rx="6" fill="none" stroke="#00bfff" strokeWidth="3" />
      {/* Body segments */}
      <line x1="40" y1="85" x2="88" y2="85" stroke="#1e90ff" strokeWidth="2" mask="url(#robotFillMask)" opacity="0.6" />
      <line x1="40" y1="100" x2="88" y2="100" stroke="#1e90ff" strokeWidth="2" mask="url(#robotFillMask)" opacity="0.6" />
      {/* Chest panel with more detail */}
      <rect x="46" y="72" width="36" height="20" rx="3" fill="#1e90ff" mask="url(#robotFillMask)" opacity="0.6" />
      <rect x="50" y="76" width="28" height="12" rx="2" fill="#00bfff" mask="url(#robotFillMask)" opacity="0.4" />
      {/* LED indicators */}
      <circle cx="52" cy="82" r="2.5" fill="#00ffff" mask="url(#robotFillMask)" />
      <circle cx="60" cy="82" r="2.5" fill="#00ff00" mask="url(#robotFillMask)" />
      <circle cx="68" cy="82" r="2.5" fill="#ffff00" mask="url(#robotFillMask)" />
      <circle cx="76" cy="82" r="2.5" fill="#ff9900" mask="url(#robotFillMask)" />
      {/* Core power display */}
      <rect x="56" y="98" width="16" height="12" rx="2" fill="#4169e1" mask="url(#robotFillMask)" opacity="0.7" />
      <circle cx="64" cy="104" r="4" fill="#00ffff" mask="url(#robotFillMask)" />
      <circle cx="64" cy="104" r="2" fill="#ffffff" mask="url(#robotFillMask)" />
      {/* Head - enhanced box */}
      <rect x="44" y="28" width="40" height="36" rx="4" fill="url(#robotBodyGrad)" mask="url(#robotFillMask)" />
      <rect x="44" y="28" width="40" height="36" rx="4" fill="none" stroke="#00bfff" strokeWidth="3" />
      {/* Head top panel */}
      <rect x="48" y="30" width="32" height="8" rx="2" fill="#1e90ff" mask="url(#robotFillMask)" opacity="0.6" />
      {/* Antenna with segments */}
      <rect x="62" y="22" width="4" height="6" rx="1" fill="#00bfff" mask="url(#robotFillMask)" />
      <line x1="64" y1="22" x2="64" y2="15" stroke="#00bfff" strokeWidth="2.5" mask="url(#robotFillMask)" />
      <circle cx="64" cy="12" r="4" fill="#ff0000" mask="url(#robotFillMask)" />
      <circle cx="64" cy="12" r="6" fill="none" stroke="#ff0000" strokeWidth="1.5" mask="url(#robotFillMask)" opacity="0.5" />
      {/* Eyes - enhanced digital displays */}
      <rect x="50" y="40" width="11" height="12" rx="2" fill="#00ffff" mask="url(#robotFillMask)" />
      <rect x="67" y="40" width="11" height="12" rx="2" fill="#00ffff" mask="url(#robotFillMask)" />
      <rect x="51" y="41" width="9" height="10" fill="#000" mask="url(#robotFillMask)" />
      <rect x="68" y="41" width="9" height="10" fill="#000" mask="url(#robotFillMask)" />
      {/* Pupil glow */}
      <rect x="53" y="43" width="5" height="6" fill="#00ffff" mask="url(#robotFillMask)" opacity="0.8" />
      <rect x="70" y="43" width="5" height="6" fill="#00ffff" mask="url(#robotFillMask)" opacity="0.8" />
      <rect x="54" y="44" width="2" height="4" fill="#ffffff" mask="url(#robotFillMask)" />
      <rect x="71" y="44" width="2" height="4" fill="#ffffff" mask="url(#robotFillMask)" />
      {/* Mouth - enhanced grille */}
      <rect x="52" y="56" width="24" height="6" rx="1" fill="#1e90ff" mask="url(#robotFillMask)" opacity="0.5" />
      <line x1="54" y1="57" x2="54" y2="61" stroke="#00ffff" strokeWidth="1" mask="url(#robotFillMask)" opacity="0.7" />
      <line x1="58" y1="57" x2="58" y2="61" stroke="#00ffff" strokeWidth="1" mask="url(#robotFillMask)" opacity="0.7" />
      <line x1="62" y1="57" x2="62" y2="61" stroke="#00ffff" strokeWidth="1" mask="url(#robotFillMask)" opacity="0.7" />
      <line x1="66" y1="57" x2="66" y2="61" stroke="#00ffff" strokeWidth="1" mask="url(#robotFillMask)" opacity="0.7" />
      <line x1="70" y1="57" x2="70" y2="61" stroke="#00ffff" strokeWidth="1" mask="url(#robotFillMask)" opacity="0.7" />
      <line x1="74" y1="57" x2="74" y2="61" stroke="#00ffff" strokeWidth="1" mask="url(#robotFillMask)" opacity="0.7" />
      {/* Arms with joints */}
      <circle cx="38" cy="70" r="4" fill="#4169e1" mask="url(#robotFillMask)" />
      <circle cx="90" cy="70" r="4" fill="#4169e1" mask="url(#robotFillMask)" />
      <rect x="26" y="72" width="9" height="26" rx="2" fill="url(#robotBodyGrad)" mask="url(#robotFillMask)" />
      <rect x="26" y="72" width="9" height="26" rx="2" fill="none" stroke="#00bfff" strokeWidth="2" />
      <rect x="93" y="72" width="9" height="26" rx="2" fill="url(#robotBodyGrad)" mask="url(#robotFillMask)" />
      <rect x="93" y="72" width="9" height="26" rx="2" fill="none" stroke="#00bfff" strokeWidth="2" />
      {/* Elbow joints */}
      <circle cx="30" cy="87" r="3" fill="#1e90ff" mask="url(#robotFillMask)" />
      <circle cx="98" cy="87" r="3" fill="#1e90ff" mask="url(#robotFillMask)" />
      {/* Hands - enhanced claws */}
      <ellipse cx="30" cy="102" rx="5" ry="6" fill="#4169e1" mask="url(#robotFillMask)" />
      <ellipse cx="98" cy="102" rx="5" ry="6" fill="#4169e1" mask="url(#robotFillMask)" />
      <line x1="28" y1="107" x2="28" y2="112" stroke="#4169e1" strokeWidth="2" mask="url(#robotFillMask)" />
      <line x1="30" y1="107" x2="30" y2="114" stroke="#4169e1" strokeWidth="2" mask="url(#robotFillMask)" />
      <line x1="32" y1="107" x2="32" y2="112" stroke="#4169e1" strokeWidth="2" mask="url(#robotFillMask)" />
      <line x1="96" y1="107" x2="96" y2="112" stroke="#4169e1" strokeWidth="2" mask="url(#robotFillMask)" />
      <line x1="98" y1="107" x2="98" y2="114" stroke="#4169e1" strokeWidth="2" mask="url(#robotFillMask)" />
      <line x1="100" y1="107" x2="100" y2="112" stroke="#4169e1" strokeWidth="2" mask="url(#robotFillMask)" />
      {/* Bolts and screws */}
      <circle cx="47" cy="32" r="2" fill="#87ceeb" mask="url(#robotFillMask)" />
      <circle cx="81" cy="32" r="2" fill="#87ceeb" mask="url(#robotFillMask)" />
      <circle cx="47" cy="60" r="2" fill="#87ceeb" mask="url(#robotFillMask)" />
      <circle cx="81" cy="60" r="2" fill="#87ceeb" mask="url(#robotFillMask)" />
      <circle cx="42" cy="70" r="1.5" fill="#87ceeb" mask="url(#robotFillMask)" />
      <circle cx="86" cy="70" r="1.5" fill="#87ceeb" mask="url(#robotFillMask)" />
    </svg>
  );
};

export default Asset1;

