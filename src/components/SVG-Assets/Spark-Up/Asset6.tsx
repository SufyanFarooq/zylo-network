import React from 'react';

const Asset6: React.FC = () => {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      className="w-32 h-32"
    >
      <defs>
        <radialGradient id="bubble3D" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#e0ffff" />
          <stop offset="70%" stopColor="#add8e6" />
          <stop offset="100%" stopColor="#87ceeb" />
        </radialGradient>
        <radialGradient id="bubbleShine" cx="30%" cy="30%" r="40%">
          <stop offset="0%" stopColor="#ffffff" opacity="0.9" />
          <stop offset="70%" stopColor="#ffffff" opacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" opacity="0" />
        </radialGradient>
        <filter id="bubbleShadow">
          <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.15"/>
        </filter>
        <mask id="bubbleFillMask">
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
      
      {/* Main Bubble Body */}
      <circle cx="64" cy="64" r="38" fill="url(#bubble3D)" mask="url(#bubbleFillMask)" filter="url(#bubbleShadow)" />
      <circle cx="64" cy="64" r="38" fill="none" stroke="#87ceeb" strokeWidth="2.5" />
      
      {/* Bubble Shine Effect */}
      <ellipse cx="48" cy="45" rx="18" ry="22" fill="url(#bubbleShine)" mask="url(#bubbleFillMask)" />
      
      {/* Secondary Shine */}
      <ellipse cx="45" cy="42" rx="8" ry="12" fill="#ffffff" mask="url(#bubbleFillMask)" opacity="0.6" />
      <ellipse cx="42" cy="38" rx="4" ry="6" fill="#ffffff" mask="url(#bubbleFillMask)" opacity="0.8" />
      
      {/* Bubble Eyes */}
      <circle cx="58" cy="60" r="4" fill="#4169e1" />
      <circle cx="70" cy="60" r="4" fill="#4169e1" />
      <circle cx="59" cy="59" r="1.5" fill="#fff" />
      <circle cx="71" cy="59" r="1.5" fill="#fff" />
      
      {/* Bubble Smile */}
      <path d="M56 72 Q64 78, 72 72" fill="none" stroke="#87ceeb" strokeWidth="2.5" mask="url(#bubbleFillMask)" />
      
      {/* Small Bubbles Around */}
      <circle cx="30" cy="40" r="6" fill="url(#bubble3D)" mask="url(#bubbleFillMask)" opacity="0.8" stroke="#87ceeb" strokeWidth="1.5" />
      <circle cx="98" cy="50" r="8" fill="url(#bubble3D)" mask="url(#bubbleFillMask)" opacity="0.7" stroke="#87ceeb" strokeWidth="1.5" />
      <circle cx="25" cy="75" r="5" fill="url(#bubble3D)" mask="url(#bubbleFillMask)" opacity="0.8" stroke="#87ceeb" strokeWidth="1.5" />
      <circle cx="95" cy="85" r="7" fill="url(#bubble3D)" mask="url(#bubbleFillMask)" opacity="0.7" stroke="#87ceeb" strokeWidth="1.5" />
      <circle cx="64" cy="20" r="4" fill="url(#bubble3D)" mask="url(#bubbleFillMask)" opacity="0.9" stroke="#87ceeb" strokeWidth="1" />
      
      {/* Tiny Shine Spots on Small Bubbles */}
      <circle cx="28" cy="38" r="2" fill="#ffffff" mask="url(#bubbleFillMask)" opacity="0.7" />
      <circle cx="96" cy="48" r="2.5" fill="#ffffff" mask="url(#bubbleFillMask)" opacity="0.7" />
      <circle cx="23" cy="73" r="1.5" fill="#ffffff" mask="url(#bubbleFillMask)" opacity="0.7" />
      <circle cx="93" cy="83" r="2" fill="#ffffff" mask="url(#bubbleFillMask)" opacity="0.7" />
      
      {/* Reflection Details */}
      <path d="M75 55 Q80 50, 85 55" fill="none" stroke="#ffffff" strokeWidth="1.5" mask="url(#bubbleFillMask)" opacity="0.4" />
      <ellipse cx="78" cy="70" rx="3" ry="5" fill="#ffffff" mask="url(#bubbleFillMask)" opacity="0.3" />
    </svg>
  );
};

export default Asset6;

