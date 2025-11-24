import React from 'react';

const Asset15: React.FC = () => {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      className="w-32 h-32"
    >
      <defs>
        <radialGradient id="sunbeam3D" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#ffd700" />
          <stop offset="70%" stopColor="#ff8c00" />
          <stop offset="100%" stopColor="#ff6347" />
        </radialGradient>
        <radialGradient id="sunbeamCore" cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#ffff00" />
          <stop offset="100%" stopColor="#ffd700" />
        </radialGradient>
        <filter id="sunbeamGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <mask id="sunbeamFillMask">
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
      
      {/* Sun Rays - Long */}
      <line x1="64" y1="10" x2="64" y2="30" stroke="#ffd700" strokeWidth="4" mask="url(#sunbeamFillMask)" opacity="0.8" />
      <line x1="64" y1="98" x2="64" y2="118" stroke="#ffd700" strokeWidth="4" mask="url(#sunbeamFillMask)" opacity="0.8" />
      <line x1="10" y1="64" x2="30" y2="64" stroke="#ffd700" strokeWidth="4" mask="url(#sunbeamFillMask)" opacity="0.8" />
      <line x1="98" y1="64" x2="118" y2="64" stroke="#ffd700" strokeWidth="4" mask="url(#sunbeamFillMask)" opacity="0.8" />
      
      {/* Sun Rays - Diagonal */}
      <line x1="25" y1="25" x2="38" y2="38" stroke="#ffd700" strokeWidth="4" mask="url(#sunbeamFillMask)" opacity="0.7" />
      <line x1="103" y1="103" x2="90" y2="90" stroke="#ffd700" strokeWidth="4" mask="url(#sunbeamFillMask)" opacity="0.7" />
      <line x1="103" y1="25" x2="90" y2="38" stroke="#ffd700" strokeWidth="4" mask="url(#sunbeamFillMask)" opacity="0.7" />
      <line x1="25" y1="103" x2="38" y2="90" stroke="#ffd700" strokeWidth="4" mask="url(#sunbeamFillMask)" opacity="0.7" />
      
      {/* Sun Core Body */}
      <circle cx="64" cy="64" r="28" fill="url(#sunbeam3D)" mask="url(#sunbeamFillMask)" filter="url(#sunbeamGlow)" />
      <circle cx="64" cy="64" r="28" fill="none" stroke="#ff8c00" strokeWidth="2" />
      
      {/* Inner Core */}
      <circle cx="64" cy="64" r="18" fill="url(#sunbeamCore)" mask="url(#sunbeamFillMask)" opacity="0.8" />
      
      {/* Sun Eyes */}
      <circle cx="58" cy="60" r="4" fill="#ff8c00" />
      <circle cx="70" cy="60" r="4" fill="#ff8c00" />
      <circle cx="59" cy="59" r="1.5" fill="#fff" />
      <circle cx="71" cy="59" r="1.5" fill="#fff" />
      
      {/* Sun Smile */}
      <path d="M56 70 Q64 76, 72 70" fill="none" stroke="#ff8c00" strokeWidth="2.5" mask="url(#sunbeamFillMask)" />
      
      {/* Sparkles */}
      <circle cx="48" cy="50" r="2" fill="#ffffff" mask="url(#sunbeamFillMask)" opacity="0.9" />
      <circle cx="80" cy="52" r="2" fill="#ffffff" mask="url(#sunbeamFillMask)" opacity="0.9" />
      <circle cx="60" cy="80" r="1.8" fill="#ffffff" mask="url(#sunbeamFillMask)" opacity="0.8" />
      
      {/* Ray Tips - Small Stars */}
      <path d="M64 8 L65 12 L64 16 L63 12 Z" fill="#ffff00" mask="url(#sunbeamFillMask)" opacity="0.8" />
      <path d="M64 112 L65 116 L64 120 L63 116 Z" fill="#ffff00" mask="url(#sunbeamFillMask)" opacity="0.8" />
      <path d="M8 64 L12 65 L16 64 L12 63 Z" fill="#ffff00" mask="url(#sunbeamFillMask)" opacity="0.8" />
      <path d="M112 64 L116 65 L120 64 L116 63 Z" fill="#ffff00" mask="url(#sunbeamFillMask)" opacity="0.8" />
    </svg>
  );
};

export default Asset15;

