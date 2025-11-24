import React from 'react';

const Asset2: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="droneBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#87ceeb" />
          <stop offset="50%" stopColor="#4682b4" />
          <stop offset="100%" stopColor="#5f9ea0" />
        </linearGradient>
        <radialGradient id="dronePropGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#b0e0e6" />
          <stop offset="100%" stopColor="#4682b4" />
        </radialGradient>
        <linearGradient id="droneArmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#708090" />
          <stop offset="100%" stopColor="#4682b4" />
        </linearGradient>
        <filter id="droneGlow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <mask id="droneFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" /></mask>
      </defs>
      {/* Propeller arms */}
      <path d="M38 52 L15 25" stroke="url(#droneArmGrad)" strokeWidth="5" mask="url(#droneFillMask)" strokeLinecap="round" />
      <path d="M90 52 L113 25" stroke="url(#droneArmGrad)" strokeWidth="5" mask="url(#droneFillMask)" strokeLinecap="round" />
      <path d="M38 76 L15 103" stroke="url(#droneArmGrad)" strokeWidth="5" mask="url(#droneFillMask)" strokeLinecap="round" />
      <path d="M90 76 L113 103" stroke="url(#droneArmGrad)" strokeWidth="5" mask="url(#droneFillMask)" strokeLinecap="round" />
      {/* Arm details */}
      <path d="M38 52 L15 25" stroke="#1e90ff" strokeWidth="1.5" mask="url(#droneFillMask)" strokeLinecap="round" opacity="0.6" />
      <path d="M90 52 L113 25" stroke="#ff0000" strokeWidth="1.5" mask="url(#droneFillMask)" strokeLinecap="round" opacity="0.6" />
      <path d="M38 76 L15 103" stroke="#ffff00" strokeWidth="1.5" mask="url(#droneFillMask)" strokeLinecap="round" opacity="0.6" />
      <path d="M90 76 L113 103" stroke="#00ff00" strokeWidth="1.5" mask="url(#droneFillMask)" strokeLinecap="round" opacity="0.6" />
      {/* Propellers */}
      <ellipse cx="15" cy="25" rx="14" ry="4" fill="url(#dronePropGrad)" mask="url(#droneFillMask)" opacity="0.6" transform="rotate(30 15 25)" />
      <ellipse cx="15" cy="25" rx="14" ry="4" fill="url(#dronePropGrad)" mask="url(#droneFillMask)" opacity="0.6" transform="rotate(-30 15 25)" />
      <ellipse cx="113" cy="25" rx="14" ry="4" fill="url(#dronePropGrad)" mask="url(#droneFillMask)" opacity="0.6" transform="rotate(45 113 25)" />
      <ellipse cx="113" cy="25" rx="14" ry="4" fill="url(#dronePropGrad)" mask="url(#droneFillMask)" opacity="0.6" transform="rotate(-45 113 25)" />
      <ellipse cx="15" cy="103" rx="14" ry="4" fill="url(#dronePropGrad)" mask="url(#droneFillMask)" opacity="0.6" transform="rotate(60 15 103)" />
      <ellipse cx="15" cy="103" rx="14" ry="4" fill="url(#dronePropGrad)" mask="url(#droneFillMask)" opacity="0.6" transform="rotate(-60 15 103)" />
      <ellipse cx="113" cy="103" rx="14" ry="4" fill="url(#dronePropGrad)" mask="url(#droneFillMask)" opacity="0.6" transform="rotate(75 113 103)" />
      <ellipse cx="113" cy="103" rx="14" ry="4" fill="url(#dronePropGrad)" mask="url(#droneFillMask)" opacity="0.6" transform="rotate(-75 113 103)" />
      {/* Motor housings */}
      <circle cx="15" cy="25" r="7" fill="#2f4f4f" mask="url(#droneFillMask)" />
      <circle cx="15" cy="25" r="7" fill="none" stroke="#4682b4" strokeWidth="1.5" />
      <circle cx="15" cy="25" r="3" fill="#708090" mask="url(#droneFillMask)" />
      <circle cx="113" cy="25" r="7" fill="#2f4f4f" mask="url(#droneFillMask)" />
      <circle cx="113" cy="25" r="7" fill="none" stroke="#4682b4" strokeWidth="1.5" />
      <circle cx="113" cy="25" r="3" fill="#708090" mask="url(#droneFillMask)" />
      <circle cx="15" cy="103" r="7" fill="#2f4f4f" mask="url(#droneFillMask)" />
      <circle cx="15" cy="103" r="7" fill="none" stroke="#4682b4" strokeWidth="1.5" />
      <circle cx="15" cy="103" r="3" fill="#708090" mask="url(#droneFillMask)" />
      <circle cx="113" cy="103" r="7" fill="#2f4f4f" mask="url(#droneFillMask)" />
      <circle cx="113" cy="103" r="7" fill="none" stroke="#4682b4" strokeWidth="1.5" />
      <circle cx="113" cy="103" r="3" fill="#708090" mask="url(#droneFillMask)" />
      {/* Central body */}
      <rect x="40" y="50" width="48" height="28" rx="4" fill="url(#droneBodyGrad)" mask="url(#droneFillMask)" filter="url(#droneGlow)" />
      <rect x="40" y="50" width="48" height="28" rx="4" fill="none" stroke="#4682b4" strokeWidth="3" />
      {/* Battery indicator */}
      <rect x="45" y="55" width="38" height="8" rx="2" fill="#2f4f4f" mask="url(#droneFillMask)" opacity="0.7" />
      <rect x="47" y="57" width="10" height="4" rx="1" fill="#00ff00" mask="url(#droneFillMask)" />
      <rect x="59" y="57" width="10" height="4" rx="1" fill="#00ff00" mask="url(#droneFillMask)" />
      <rect x="71" y="57" width="10" height="4" rx="1" fill="#ffff00" mask="url(#droneFillMask)" />
      {/* LED status lights */}
      <circle cx="46" cy="70" r="2.5" fill="#00ff00" mask="url(#droneFillMask)" />
      <circle cx="82" cy="70" r="2.5" fill="#ff0000" mask="url(#droneFillMask)" />
      {/* Camera gimbal */}
      <rect x="58" y="78" width="12" height="6" rx="1" fill="#708090" mask="url(#droneFillMask)" />
      <rect x="60" y="84" width="8" height="10" rx="2" fill="#2f4f4f" mask="url(#droneFillMask)" />
      {/* Camera lens */}
      <circle cx="64" cy="88" r="6" fill="#000" mask="url(#droneFillMask)" />
      <circle cx="64" cy="88" r="5" fill="#1e90ff" mask="url(#droneFillMask)" opacity="0.8" />
      <circle cx="64" cy="88" r="3" fill="#000" mask="url(#droneFillMask)" />
      <circle cx="65" cy="87" r="1.5" fill="#87ceeb" mask="url(#droneFillMask)" opacity="0.9" />
      {/* Sensors */}
      <circle cx="52" cy="64" r="3" fill="#ff6347" mask="url(#droneFillMask)" opacity="0.8" />
      <circle cx="76" cy="64" r="3" fill="#ff6347" mask="url(#droneFillMask)" opacity="0.8" />
      {/* Landing gear */}
      <line x1="48" y1="78" x2="46" y2="96" stroke="#708090" strokeWidth="3" mask="url(#droneFillMask)" strokeLinecap="round" />
      <line x1="80" y1="78" x2="82" y2="96" stroke="#708090" strokeWidth="3" mask="url(#droneFillMask)" strokeLinecap="round" />
      <path d="M44 96 L48 96 L48 100 L44 100 Z" fill="#5f9ea0" mask="url(#droneFillMask)" />
      <path d="M80 96 L84 96 L84 100 L80 100 Z" fill="#5f9ea0" mask="url(#droneFillMask)" />
      {/* Antenna */}
      <line x1="64" y1="50" x2="64" y2="42" stroke="#4682b4" strokeWidth="2" mask="url(#droneFillMask)" />
      <circle cx="64" cy="40" r="2" fill="#ff0000" mask="url(#droneFillMask)" />
    </svg>
  );
};

export default Asset2;

