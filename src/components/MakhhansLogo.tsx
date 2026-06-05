import React from 'react';

interface MakhhansLogoProps {
  className?: string;
  showBackground?: boolean;
}

export function MakhhansLogo({ className = "w-16 h-16", showBackground = false }: MakhhansLogoProps) {
  // Generate 12 ornamental petals rotated around the center
  const petals = Array.from({ length: 12 }, (_, i) => {
    const angle = i * 30;
    return (
      <g key={i} transform={`rotate(${angle} 50 50)`}>
        {/* Outer flourishing point */}
        <path
          d="M 50 2 C 52 6, 55 10, 50 16 C 45 10, 48 6, 50 2 Z"
          fill="url(#goldGrad)"
          opacity="0.9"
        />
        {/* Small jewelry dot */}
        <circle cx="50" cy="8" r="1" fill="#fff" opacity="0.8" />
        {/* Lace loop arches */}
        <path
          d="M 42 18 C 45 12, 55 12, 58 18"
          stroke="url(#goldGrad)"
          strokeWidth="1"
          fill="none"
        />
        {/* Inner flourish petal details */}
        <path
          d="M 50 14 C 51.5 17, 52.5 19, 50 24 C 47.5 19, 48.5 17, 50 14 Z"
          fill="url(#goldGrad)"
          opacity="0.4"
        />
      </g>
    );
  });

  return (
    <div className={`relative inline-block ${className} select-none`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(212,175,55,0.25)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA7C11" />
            <stop offset="100%" stopColor="#5E4300" />
          </linearGradient>
          
          <radialGradient id="radialBG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2e1a12" />
            <stop offset="100%" stopColor="#0f0704" />
          </radialGradient>

          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Optional radial brown/black background gradient matching the uploaded logo */}
        {showBackground && (
          <circle cx="50" cy="50" r="49" fill="url(#radialBG)" stroke="url(#goldGrad)" strokeWidth="1" />
        )}

        {/* Intricate Outer Lace Mandala Borders */}
        {petals}

        {/* Inner solid circular rings holding the core elements */}
        <circle cx="50" cy="50" r="36" stroke="url(#goldGrad)" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="33.5" stroke="url(#goldGrad)" strokeWidth="0.5" strokeDasharray="2 1.5" opacity="0.8" />
        <circle cx="50" cy="50" r="32" stroke="url(#goldGrad)" strokeWidth="0.75" opacity="0.6" />

        {/* Core Content Group */}
        <g transform="translate(0, -1)">
          {/* Serif Letter 'M' in beautiful Roman style */}
          <text
            x="50"
            y="48"
            fill="url(#goldGrad)"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="26"
            fontWeight="bold"
            textAnchor="middle"
            filter="url(#goldGlow)"
          >
            M
          </text>

          {/* Fork & Spoon Divider */}
          <g transform="translate(0, 1.5)">
            {/* Horizontal Line Handle */}
            <line x1="36" y1="54" x2="64" y2="54" stroke="url(#goldGrad)" strokeWidth="1.2" strokeLinecap="round" />
            
            {/* Spoon Head on Right */}
            <path
              d="M 58 54 C 58 51.5, 64 51.5, 64 54 C 64 56.5, 58 56.5, 58 54 Z"
              fill="url(#goldGrad)"
            />
            
            {/* Fork Heads/Tines on Left */}
            <path
              d="M 36 54 H 42 M 36 50.5 V 54 M 38 51 V 54 M 40 51 V 54 M 42 50.5 V 54"
              stroke="url(#goldGrad)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </g>

          {/* Estd. 2008 Typography */}
          <text
            x="50"
            y="66.5"
            fill="url(#goldGrad)"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="5.7"
            fontStyle="italic"
            fontWeight="600"
            letterSpacing="0.06em"
            textAnchor="middle"
          >
            Estd. 2008
          </text>
        </g>
      </svg>
    </div>
  );
}
