import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Geometric Isometric Wireframe Sports Grid Icon */}
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0197FF] via-[#8BF3F5] to-[#FD7040] rounded-xl opacity-80 blur-[6px] animate-pulse"></div>
        <div className="relative w-full h-full bg-[#051F39] border border-[#8BF3F5]/60 rounded-xl flex items-center justify-center p-1.5 shadow-lg shadow-[#0197FF]/20 overflow-hidden">
          {/* Isometric Grid Wireframe SVG */}
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            {/* 3D Isometric Cube Grid with Cyan and Orange lines */}
            <path
              d="M24 4L42 14.5V33.5L24 44L6 33.5V14.5L24 4Z"
              stroke="#8BF3F5"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M24 4V44M24 24L42 14.5M24 24L6 14.5M24 24L42 33.5M24 24L6 33.5"
              stroke="#0197FF"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
            {/* Center Orange Sports Pulse Dot */}
            <circle cx="24" cy="24" r="3.5" fill="#FD7040" />
            <circle cx="24" cy="24" r="5.5" stroke="#FD7040" strokeWidth="1" strokeOpacity="0.6" />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center tracking-wider">
            <span className={`font-black font-['Outfit'] text-white ${textClasses[size]} tracking-tight`}>
              GAME
            </span>
            <span className={`font-black font-['Outfit'] text-[#0197FF] ml-1 ${textClasses[size]} tracking-tight`}>
              GRID
            </span>
          </div>
          <span className="text-[9px] font-semibold tracking-widest text-[#8BF3F5] uppercase opacity-90">
            Sports & Community
          </span>
        </div>
      )}
    </div>
  );
};
