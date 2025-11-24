import React from 'react';

const Asset11: React.FC = () => {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      className="w-32 h-32"
    >
      <defs>
        <radialGradient id="cloud3D" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f0f8ff" />
          <stop offset="100%" stopColor="#e0e0e0" />
        </radialGradient>
        <filter id="cloudShadow">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.15"/>
        </filter>
        <mask id="cloudFillMask">
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
      
      {/* Cloud Puffs - Main Body */}
      <circle cx="50" cy="65" r="22" fill="url(#cloud3D)" mask="url(#cloudFillMask)" filter="url(#cloudShadow)" />
      <circle cx="78" cy="65" r="22" fill="url(#cloud3D)" mask="url(#cloudFillMask)" filter="url(#cloudShadow)" />
      <circle cx="64" cy="50" r="25" fill="url(#cloud3D)" mask="url(#cloudFillMask)" filter="url(#cloudShadow)" />
      <circle cx="38" cy="75" r="18" fill="url(#cloud3D)" mask="url(#cloudFillMask)" filter="url(#cloudShadow)" />
      <circle cx="90" cy="75" r="18" fill="url(#cloud3D)" mask="url(#cloudFillMask)" filter="url(#cloudShadow)" />
      
      {/* Cloud Outlines */}
      <circle cx="50" cy="65" r="22" fill="none" stroke="#d3d3d3" strokeWidth="1.5" />
      <circle cx="78" cy="65" r="22" fill="none" stroke="#d3d3d3" strokeWidth="1.5" />
      <circle cx="64" cy="50" r="25" fill="none" stroke="#d3d3d3" strokeWidth="1.5" />
      <circle cx="38" cy="75" r="18" fill="none" stroke="#d3d3d3" strokeWidth="1.5" />
      <circle cx="90" cy="75" r="18" fill="none" stroke="#d3d3d3" strokeWidth="1.5" />
      
      {/* Cloud Eyes */}
      <circle cx="58" cy="58" r="4" fill="#87ceeb" />
      <circle cx="70" cy="58" r="4" fill="#87ceeb" />
      <circle cx="59" cy="57" r="1.5" fill="#fff" />
      <circle cx="71" cy="57" r="1.5" fill="#fff" />
      
      {/* Cloud Smile */}
      <path d="M56 70 Q64 76, 72 70" fill="none" stroke="#b0c4de" strokeWidth="2.5" mask="url(#cloudFillMask)" />
      
      {/* Fluffy Details */}
      <ellipse cx="48" cy="45" rx="8" ry="10" fill="rgba(255,255,255,0.6)" mask="url(#cloudFillMask)" />
      <ellipse cx="75" cy="42" rx="7" ry="9" fill="rgba(255,255,255,0.5)" mask="url(#cloudFillMask)" />
      
      {/* Wind Lines */}
      <path d="M100 55 L115 55" stroke="#d3d3d3" strokeWidth="2" opacity="0.5" mask="url(#cloudFillMask)" />
      <path d="M102 65 L120 65" stroke="#d3d3d3" strokeWidth="2" opacity="0.4" mask="url(#cloudFillMask)" />
      <path d="M98 75 L112 75" stroke="#d3d3d3" strokeWidth="2" opacity="0.3" mask="url(#cloudFillMask)" />
    </svg>
  );
};

export default Asset11;

