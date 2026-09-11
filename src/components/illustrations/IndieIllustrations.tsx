import React from 'react';

/**
 * Hand-drawn style indie vector illustrations with expressive line art
 * and soft pastel accent fills for a warm, human-centric wellness vibe.
 */

export const MindfulMeditationArt: React.FC<{ className?: string }> = ({ className = 'w-32 h-32' }) => (
  <svg
    viewBox="0 0 200 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Soft pastel background glow */}
    <ellipse cx="100" cy="110" rx="75" ry="55" fill="#E8E0F2" opacity="0.6" />
    <circle cx="100" cy="52" r="34" fill="#FDF0DB" opacity="0.8" />
    
    {/* Sun rays line art */}
    <path d="M100 8V16" stroke="#C98B32" strokeWidth="2" strokeLinecap="round" />
    <path d="M130 18L124 24" stroke="#C98B32" strokeWidth="2" strokeLinecap="round" />
    <path d="M70 18L76 24" stroke="#C98B32" strokeWidth="2" strokeLinecap="round" />
    <path d="M142 45H134" stroke="#C98B32" strokeWidth="2" strokeLinecap="round" />
    <path d="M58 45H66" stroke="#C98B32" strokeWidth="2" strokeLinecap="round" />

    {/* Botanical leaves / sprigs on sides */}
    <path
      d="M32 145C32 145 28 115 50 102C72 89 60 145 60 145"
      fill="#D5E8D8"
      stroke="#3B6344"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M42 140C46 122 52 112 52 112" stroke="#3B6344" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M168 145C168 145 172 115 150 102C128 89 140 145 140 145"
      fill="#D5E8D8"
      stroke="#3B6344"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M158 140C154 122 148 112 148 112" stroke="#3B6344" strokeWidth="1.5" strokeLinecap="round" />

    {/* Meditation Pillow */}
    <ellipse cx="100" cy="152" rx="42" ry="12" fill="#F4DDD2" stroke="#8A513E" strokeWidth="1.8" />

    {/* Person meditating - Body */}
    <path
      d="M74 148C74 135 82 118 100 118C118 118 126 135 126 148C116 153 84 153 74 148Z"
      fill="#F9F4EC"
      stroke="#382C48"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Crossed legs */}
    <path
      d="M62 146C65 136 82 134 100 144C118 134 135 136 138 146C130 156 70 156 62 146Z"
      fill="#E7DCF2"
      stroke="#382C48"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Head & Peaceful Face */}
    <circle cx="100" cy="88" r="15" fill="#FCEADF" stroke="#382C48" strokeWidth="2" />
    {/* Hair top-knot bun */}
    <ellipse cx="100" cy="71" rx="7" ry="5" fill="#382C48" />
    <path d="M92 78C92 78 97 73 108 76" stroke="#382C48" strokeWidth="2" strokeLinecap="round" />
    {/* Gentle closed serene eyes */}
    <path d="M94 88C96 90 98 90 100 88" stroke="#382C48" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M102 88C104 90 106 90 108 88" stroke="#382C48" strokeWidth="1.6" strokeLinecap="round" />
    {/* Gentle serene smile */}
    <path d="M98 94C99.5 95.5 101.5 95.5 103 94" stroke="#8A513E" strokeWidth="1.4" strokeLinecap="round" />
    {/* Blush dots */}
    <circle cx="93" cy="91" r="1.8" fill="#ECA793" />
    <circle cx="107" cy="91" r="1.8" fill="#ECA793" />

    {/* Hand-drawn floating zen sparkles */}
    <path d="M46 64L48 58L50 64L56 66L50 68L48 74L46 68L40 66L46 64Z" fill="#E7DCF2" stroke="#685584" strokeWidth="1" />
    <path d="M152 56L153.5 51L155 56L160 57.5L155 59L153.5 64L152 59L147 57.5L152 56Z" fill="#FDECCB" stroke="#B88228" strokeWidth="1" />
  </svg>
);

export const DawnCompanionArt: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Soft pastel background aura */}
    <circle cx="70" cy="70" r="54" fill="#E8EFF8" opacity="0.8" />
    <circle cx="70" cy="65" r="42" fill="#FDF3E3" opacity="0.9" />

    {/* Halo & sparkles */}
    <path
      d="M48 30C60 22 80 22 92 30"
      stroke="#DCA842"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="2 4"
    />
    <path d="M70 14V22" stroke="#DCA842" strokeWidth="2" strokeLinecap="round" />

    {/* Companion Body / Cloud silhouette */}
    <path
      d="M45 88C35 88 32 75 42 66C38 52 54 44 65 50C72 38 90 40 94 52C106 50 112 62 106 72C112 82 102 92 90 90C84 96 74 96 68 91C60 96 48 94 45 88Z"
      fill="#FFFFFF"
      stroke="#382C48"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Expressive warm eyes */}
    <ellipse cx="60" cy="68" rx="3.5" ry="4.5" fill="#382C48" />
    <ellipse cx="80" cy="68" rx="3.5" ry="4.5" fill="#382C48" />
    <circle cx="61.5" cy="66.5" r="1.2" fill="#FFFFFF" />
    <circle cx="81.5" cy="66.5" r="1.2" fill="#FFFFFF" />

    {/* Cheerful warm smile */}
    <path d="M66 75C68.5 78 72.5 78 75 75" stroke="#382C48" strokeWidth="2" strokeLinecap="round" />

    {/* Peach blush */}
    <ellipse cx="53" cy="74" rx="4" ry="2.5" fill="#F5BDB0" />
    <ellipse cx="87" cy="74" rx="4" ry="2.5" fill="#F5BDB0" />

    {/* Little heart floating above */}
    <path
      d="M98 40C98 37 101 34 104 36C107 34 110 37 110 40C110 45 104 49 104 49C104 49 98 45 98 40Z"
      fill="#E87C74"
      stroke="#8C2C24"
      strokeWidth="1.2"
    />
  </svg>
);

export const BreathLeavesArt: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="50" cy="50" r="38" fill="#E2EFE5" />
    <circle cx="50" cy="50" r="28" fill="#D3E7D8" />
    {/* Flowing breath wind spirals */}
    <path
      d="M26 44C34 38 46 40 50 48C54 56 64 56 70 50"
      stroke="#386542"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M32 56C38 52 46 54 50 60"
      stroke="#4E7F5A"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Floating green leaf */}
    <path
      d="M62 30C62 30 74 32 75 42C65 43 62 30 62 30Z"
      fill="#85B891"
      stroke="#386542"
      strokeWidth="1.4"
    />
    <path d="M64 36L72 39" stroke="#386542" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export const JournalPenArt: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="50" cy="50" r="38" fill="#FDF3E3" />
    {/* Book / Journal */}
    <rect
      x="32"
      y="28"
      width="34"
      height="44"
      rx="5"
      fill="#FFFFFF"
      stroke="#382C48"
      strokeWidth="2"
    />
    {/* Page spine & lines */}
    <line x1="39" y1="38" x2="58" y2="38" stroke="#D8AF67" strokeWidth="2" strokeLinecap="round" />
    <line x1="39" y1="46" x2="58" y2="46" stroke="#E2D4BD" strokeWidth="2" strokeLinecap="round" />
    <line x1="39" y1="54" x2="52" y2="54" stroke="#E2D4BD" strokeWidth="2" strokeLinecap="round" />
    {/* Stylized pencil */}
    <path
      d="M60 66L62 60L74 38C75 36 78 36 79 38L81 40C82 41 82 44 80 45L68 67L60 66Z"
      fill="#E7C582"
      stroke="#382C48"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <polygon points="60,66 63,64 61,61" fill="#382C48" />
  </svg>
);

export const BotanicalBranch: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M15 65C30 55 45 40 65 15"
      stroke="#486B52"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M32 50C30 40 38 34 44 38C40 45 32 50 32 50Z"
      fill="#D1E8D6"
      stroke="#486B52"
      strokeWidth="1.5"
    />
    <path
      d="M45 38C52 32 58 38 54 44C47 44 45 38 45 38Z"
      fill="#D1E8D6"
      stroke="#486B52"
      strokeWidth="1.5"
    />
    <path
      d="M55 25C54 16 63 15 65 20C65 26 55 25 55 25Z"
      fill="#D1E8D6"
      stroke="#486B52"
      strokeWidth="1.5"
    />
  </svg>
);

export const StarDoodle: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path
      d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9L12 2Z"
      fill="#EBD6B0"
      stroke="#966C2A"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
