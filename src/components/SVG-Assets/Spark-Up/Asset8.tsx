import React from 'react';

const Asset8: React.FC = () => {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      className="w-32 h-32"
    >
      <defs>
        <radialGradient id="pebble3D" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#c4a57b" />
          <stop offset="50%" stopColor="#a0826d" />
          <stop offset="100%" stopColor="#8b7355" />
        </radialGradient>
        <filter id="pebbleShadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
        </filter>
        <mask id="pebbleFillMask">
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
      
      {/* Pebble Body - Irregular Stone Shape */}
      <ellipse cx="64" cy="70" rx="35" ry="32" fill="url(#pebble3D)" mask="url(#pebbleFillMask)" filter="url(#pebbleShadow)" />
      <ellipse cx="64" cy="70" rx="35" ry="32" fill="none" stroke="#8b7355" strokeWidth="2" />
      
      {/* Stone Texture Spots */}
      <circle cx="50" cy="60" r="3" fill="rgba(0,0,0,0.15)" mask="url(#pebbleFillMask)" />
      <circle cx="75" cy="65" r="2.5" fill="rgba(0,0,0,0.12)" mask="url(#pebbleFillMask)" />
      <circle cx="58" cy="80" r="2" fill="rgba(0,0,0,0.1)" mask="url(#pebbleFillMask)" />
      <circle cx="70" cy="75" r="2.2" fill="rgba(0,0,0,0.13)" mask="url(#pebbleFillMask)" />
      <circle cx="45" cy="72" r="1.8" fill="rgba(0,0,0,0.11)" mask="url(#pebbleFillMask)" />
      
      {/* Highlight Shine */}
      <ellipse cx="50" cy="55" rx="12" ry="8" fill="rgba(255,255,255,0.3)" mask="url(#pebbleFillMask)" />
      <ellipse cx="48" cy="52" rx="6" ry="4" fill="rgba(255,255,255,0.4)" mask="url(#pebbleFillMask)" />
      
      {/* Pebble Eyes */}
      <circle cx="58" cy="65" r="4" fill="#3d3d3d" />
      <circle cx="70" cy="65" r="4" fill="#3d3d3d" />
      <circle cx="59" cy="64" r="1.5" fill="#fff" />
      <circle cx="71" cy="64" r="1.5" fill="#fff" />
      
      {/* Pebble Smile */}
      <path d="M56 78 Q64 83, 72 78" fill="none" stroke="#6b5d4f" strokeWidth="2" mask="url(#pebbleFillMask)" />
      
      {/* Stone Cracks */}
      <path d="M40 65 Q45 67, 48 65" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" mask="url(#pebbleFillMask)" />
      <path d="M82 72 Q85 75, 88 73" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" mask="url(#pebbleFillMask)" />
    </svg>
  );
};

export default Asset8;

