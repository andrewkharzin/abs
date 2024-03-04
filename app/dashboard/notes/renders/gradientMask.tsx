import React from 'react';

const GradientMask: React.FC = () => {
  return (
    <div className="hidden">
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient-mask" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#FF1CF7', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#b249f8', stopOpacity: 1 }} />
          </linearGradient>
          <mask id="icon-mask" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill="url(#gradient-mask)" />
          </mask>
        </defs>
      </svg>
    </div>
  );
};

export default GradientMask;
