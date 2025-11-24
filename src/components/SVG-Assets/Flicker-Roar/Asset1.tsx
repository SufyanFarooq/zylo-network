import React from 'react';

const Asset1: React.FC = () => {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
      <defs>
        <linearGradient id="lionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="30%" stopColor="#ff8c00" />
          <stop offset="70%" stopColor="#ff7f00" />
          <stop offset="100%" stopColor="#ff4500" />
        </linearGradient>
        <radialGradient id="lion3D" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffed4e" />
          <stop offset="50%" stopColor="#ff8c00" />
          <stop offset="100%" stopColor="#ff4500" />
        </radialGradient>
        <filter id="lionShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
        </filter>
        <mask id="lionFillMask">
          <rect x="0" y="0" width="128" height="128" fill="white" transform="translate(0, 0)" />
        </mask>
      </defs>
      <ellipse cx="64" cy="85" rx="30" ry="35" fill="url(#lion3D)" mask="url(#lionFillMask)" filter="url(#lionShadow)" />
      <ellipse cx="64" cy="85" rx="30" ry="35" fill="none" stroke="#ff4500" strokeWidth="2" />
      <circle cx="64" cy="50" r="28" fill="url(#lion3D)" mask="url(#lionFillMask)" filter="url(#lionShadow)" />
      <circle cx="64" cy="50" r="28" fill="none" stroke="#ff4500" strokeWidth="2" />
      <path d="M36 35 Q25 20, 40 15 Q55 10, 64 15 Q73 10, 88 15 Q103 20, 92 35 Q88 45, 78 40 Q68 35, 64 40 Q60 35, 50 40 Q40 45, 36 35" fill="url(#lion3D)" mask="url(#lionFillMask)" filter="url(#lionShadow)" />
      <path d="M36 35 Q25 20, 40 15 Q55 10, 64 15 Q73 10, 88 15 Q103 20, 92 35 Q88 45, 78 40 Q68 35, 64 40 Q60 35, 50 40 Q40 45, 36 35" fill="none" stroke="#ff4500" strokeWidth="2" />
      <path d="M94 85 Q110 80, 115 90 Q113 100, 105 105 Q100 110, 94 100 Q92 90, 94 85" fill="url(#lion3D)" mask="url(#lionFillMask)" filter="url(#lionShadow)" />
      <path d="M94 85 Q110 80, 115 90 Q113 100, 105 105 Q100 110, 94 100 Q92 90, 94 85" fill="none" stroke="#ff4500" strokeWidth="2" />
      <ellipse cx="50" cy="110" rx="8" ry="15" fill="url(#lion3D)" mask="url(#lionFillMask)" />
      <ellipse cx="78" cy="110" rx="8" ry="15" fill="url(#lion3D)" mask="url(#lionFillMask)" />
      <ellipse cx="50" cy="110" rx="8" ry="15" fill="none" stroke="#ff4500" strokeWidth="2" />
      <ellipse cx="78" cy="110" rx="8" ry="15" fill="none" stroke="#ff4500" strokeWidth="2" />
      <ellipse cx="50" cy="120" rx="6" ry="4" fill="url(#lion3D)" mask="url(#lionFillMask)" />
      <ellipse cx="78" cy="120" rx="6" ry="4" fill="url(#lion3D)" mask="url(#lionFillMask)" />
      <ellipse cx="50" cy="120" rx="6" ry="4" fill="none" stroke="#ff4500" strokeWidth="1" />
      <ellipse cx="78" cy="120" rx="6" ry="4" fill="none" stroke="#ff4500" strokeWidth="1" />
      <ellipse cx="55" cy="40" rx="6" ry="8" fill="#fff" mask="url(#lionFillMask)" />
      <ellipse cx="73" cy="40" rx="6" ry="8" fill="#fff" mask="url(#lionFillMask)" />
      <ellipse cx="55" cy="40" rx="4" ry="6" fill="#333" mask="url(#lionFillMask)" />
      <ellipse cx="73" cy="40" rx="4" ry="6" fill="#333" mask="url(#lionFillMask)" />
      <circle cx="56" cy="38" r="1.5" fill="#fff" mask="url(#lionFillMask)" />
      <circle cx="74" cy="38" r="1.5" fill="#fff" mask="url(#lionFillMask)" />
      <ellipse cx="64" cy="55" rx="4" ry="3" fill="#ff4500" mask="url(#lionFillMask)" />
      <ellipse cx="64" cy="55" rx="2" ry="1.5" fill="#ff8c00" mask="url(#lionFillMask)" />
      <path d="M64 60 Q60 65, 55 60" fill="none" stroke="#ff4500" strokeWidth="2" mask="url(#lionFillMask)" />
      <path d="M64 60 Q68 65, 73 60" fill="none" stroke="#ff4500" strokeWidth="2" mask="url(#lionFillMask)" />
      <line x1="40" y1="50" x2="25" y2="48" stroke="#ff4500" strokeWidth="2" mask="url(#lionFillMask)" />
      <line x1="40" y1="55" x2="25" y2="55" stroke="#ff4500" strokeWidth="2" mask="url(#lionFillMask)" />
      <line x1="40" y1="60" x2="25" y2="62" stroke="#ff4500" strokeWidth="2" mask="url(#lionFillMask)" />
      <line x1="88" y1="50" x2="103" y2="48" stroke="#ff4500" strokeWidth="2" mask="url(#lionFillMask)" />
      <line x1="88" y1="55" x2="103" y2="55" stroke="#ff4500" strokeWidth="2" mask="url(#lionFillMask)" />
      <line x1="88" y1="60" x2="103" y2="62" stroke="#ff4500" strokeWidth="2" mask="url(#lionFillMask)" />
      <ellipse cx="45" cy="25" rx="8" ry="12" fill="url(#lion3D)" mask="url(#lionFillMask)" transform="rotate(-20 45 25)" />
      <ellipse cx="83" cy="25" rx="8" ry="12" fill="url(#lion3D)" mask="url(#lionFillMask)" transform="rotate(20 83 25)" />
      <ellipse cx="45" cy="25" rx="8" ry="12" fill="none" stroke="#ff4500" strokeWidth="2" transform="rotate(-20 45 25)" />
      <ellipse cx="83" cy="25" rx="8" ry="12" fill="none" stroke="#ff4500" strokeWidth="2" transform="rotate(20 83 25)" />
      <ellipse cx="45" cy="25" rx="4" ry="8" fill="#ff8c00" mask="url(#lionFillMask)" transform="rotate(-20 45 25)" />
      <ellipse cx="83" cy="25" rx="4" ry="8" fill="#ff8c00" mask="url(#lionFillMask)" transform="rotate(20 83 25)" />
      <circle cx="50" cy="30" r="2" fill="rgba(255,255,255,0.3)" mask="url(#lionFillMask)" />
      <circle cx="75" cy="25" r="1.5" fill="rgba(255,255,255,0.2)" mask="url(#lionFillMask)" />
      <circle cx="40" cy="40" r="1.8" fill="rgba(255,255,255,0.25)" mask="url(#lionFillMask)" />
      <circle cx="85" cy="35" r="1.2" fill="rgba(255,255,255,0.2)" mask="url(#lionFillMask)" />
      <path d="M45 15 Q50 5, 55 10 Q60 0, 64 5 Q68 0, 73 10 Q78 5, 83 15 Q80 20, 75 18 Q70 25, 64 20 Q58 25, 53 18 Q48 20, 45 15" fill="url(#lion3D)" mask="url(#lionFillMask)" opacity="0.8" />
      <circle cx="55" cy="85" r="2" fill="rgba(255,255,255,0.2)" mask="url(#lionFillMask)" />
      <circle cx="75" cy="90" r="1.5" fill="rgba(255,255,255,0.15)" mask="url(#lionFillMask)" />
      <circle cx="45" cy="95" r="1.8" fill="rgba(255,255,255,0.2)" mask="url(#lionFillMask)" />
      <circle cx="80" cy="100" r="1.2" fill="rgba(255,255,255,0.15)" mask="url(#lionFillMask)" />
      <ellipse cx="64" cy="55" rx="1" ry="0.5" fill="rgba(255,255,255,0.4)" mask="url(#lionFillMask)" />
      <circle cx="55" cy="40" r="1" fill="rgba(255,255,255,0.6)" mask="url(#lionFillMask)" />
      <circle cx="73" cy="40" r="1" fill="rgba(255,255,255,0.6)" mask="url(#lionFillMask)" />
      <path d="M35 20 Q30 15, 25 20 Q30 25, 35 20" fill="rgba(255,255,255,0.2)" mask="url(#lionFillMask)" />
      <path d="M93 20 Q98 15, 103 20 Q98 25, 93 20" fill="rgba(255,255,255,0.2)" mask="url(#lionFillMask)" />
      <ellipse cx="55" cy="95" rx="15" ry="10" fill="rgba(0,0,0,0.1)" mask="url(#lionFillMask)" />
      <circle cx="115" cy="90" r="3" fill="url(#lion3D)" mask="url(#lionFillMask)" />
      <circle cx="115" cy="90" r="3" fill="none" stroke="#ff4500" strokeWidth="1" />
    </svg>
  );
};

export default Asset1;

