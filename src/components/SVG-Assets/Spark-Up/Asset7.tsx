import React from 'react';

const Asset7: React.FC = () => {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      className="w-32 h-32"
    >
      <defs>
        <linearGradient id="prismGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff0000" />
          <stop offset="20%" stopColor="#ff7f00" />
          <stop offset="40%" stopColor="#ffff00" />
          <stop offset="60%" stopColor="#00ff00" />
          <stop offset="80%" stopColor="#0000ff" />
          <stop offset="100%" stopColor="#8b00ff" />
        </linearGradient>
        <linearGradient id="prismGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff00ff" />
          <stop offset="33%" stopColor="#00ffff" />
          <stop offset="66%" stopColor="#ffff00" />
          <stop offset="100%" stopColor="#ff00ff" />
        </linearGradient>
        <filter id="prismGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <mask id="prismFillMask">
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
      
      {/* Prism Triangle Body */}
      <path
        d="M64 20 L100 100 L28 100 Z"
        fill="url(#prismGradient1)"
        mask="url(#prismFillMask)"
        filter="url(#prismGlow)"
        stroke="#ff00ff"
        strokeWidth="2"
      />
      
      {/* Inner Triangle */}
      <path
        d="M64 35 L88 85 L40 85 Z"
        fill="url(#prismGradient2)"
        mask="url(#prismFillMask)"
        opacity="0.7"
      />
      
      {/* Light Refraction Beams */}
      <line x1="64" y1="30" x2="75" y2="10" stroke="#ff0000" strokeWidth="2" mask="url(#prismFillMask)" opacity="0.6" />
      <line x1="64" y1="30" x2="80" y2="15" stroke="#ffff00" strokeWidth="2" mask="url(#prismFillMask)" opacity="0.6" />
      <line x1="64" y1="30" x2="48" y2="15" stroke="#00ffff" strokeWidth="2" mask="url(#prismFillMask)" opacity="0.6" />
      <line x1="64" y1="30" x2="53" y2="10" stroke="#ff00ff" strokeWidth="2" mask="url(#prismFillMask)" opacity="0.6" />
      
      {/* Prism Eyes */}
      <circle cx="58" cy="55" r="4" fill="#fff" />
      <circle cx="70" cy="55" r="4" fill="#fff" />
      <circle cx="58" cy="55" r="2.5" fill="#333" />
      <circle cx="70" cy="55" r="2.5" fill="#333" />
      <circle cx="59" cy="54" r="1" fill="#fff" />
      <circle cx="71" cy="54" r="1" fill="#fff" />
      
      {/* Prism Smile */}
      <path d="M56 68 Q64 74, 72 68" fill="none" stroke="#ff00ff" strokeWidth="2" mask="url(#prismFillMask)" />
      
      {/* Rainbow Sparkles */}
      <circle cx="45" cy="50" r="2" fill="#ff0000" mask="url(#prismFillMask)" opacity="0.8" />
      <circle cx="83" cy="50" r="2" fill="#0000ff" mask="url(#prismFillMask)" opacity="0.8" />
      <circle cx="64" cy="90" r="2.5" fill="#ffff00" mask="url(#prismFillMask)" opacity="0.7" />
      
      {/* Facet Lines */}
      <line x1="64" y1="35" x2="64" y2="85" stroke="#ffffff" strokeWidth="1" mask="url(#prismFillMask)" opacity="0.4" />
      <line x1="50" y1="65" x2="78" y2="65" stroke="#ffffff" strokeWidth="1" mask="url(#prismFillMask)" opacity="0.4" />
    </svg>
  );
};

export default Asset7;

