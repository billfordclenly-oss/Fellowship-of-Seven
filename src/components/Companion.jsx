// Companion.jsx — SVG illustrated companion character
// Props: expression ('happy'|'excited'|'proud'|'surprised'|'encouraging'), size ('sm'|'md'|'lg')

const SIZE_MAP = {
  sm: 80,
  md: 120,
  lg: 160,
};

const EXPRESSIONS = {
  happy: { eyeY: 62, smileD: 'M 36 73 Q 44 80 52 73', browLift: 0, mouthOpen: false },
  excited: { eyeY: 60, smileD: 'M 34 72 Q 44 83 54 72', browLift: -3, mouthOpen: true },
  proud: { eyeY: 63, smileD: 'M 37 73 Q 44 79 51 73', browLift: -2, mouthOpen: false },
  surprised: { eyeY: 58, smileD: 'M 38 76 Q 44 82 50 76', browLift: -5, mouthOpen: true },
  encouraging: { eyeY: 61, smileD: 'M 35 72 Q 44 81 53 72', browLift: -1, mouthOpen: false },
};

export default function Companion({ expression = 'happy', size = 'md' }) {
  const px = SIZE_MAP[size] ?? SIZE_MAP.md;
  const expr = EXPRESSIONS[expression] ?? EXPRESSIONS.happy;
  const scale = px / 160;

  return (
    <svg
      width={px}
      height={px * 1.3}
      viewBox="0 0 88 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Companion character with ${expression} expression`}
      role="img"
    >
      {/* Cloak / body */}
      <ellipse cx="44" cy="90" rx="30" ry="28" fill="#5C3A1E" />
      <path d="M 14 95 Q 20 115 44 115 Q 68 115 74 95 Z" fill="#4A2E18" />
      {/* Cloak lapels */}
      <path d="M 44 72 L 30 95 L 44 88 Z" fill="#6B4423" />
      <path d="M 44 72 L 58 95 L 44 88 Z" fill="#6B4423" />
      {/* Cloak clasp */}
      <circle cx="44" cy="78" r="4" fill="#C6A15B" />
      <circle cx="44" cy="78" r="2" fill="#E8C97A" />

      {/* Arms */}
      <path d="M 14 85 Q 6 90 10 100 L 18 95 Z" fill="#5C3A1E" />
      <path d="M 74 85 Q 82 90 78 100 L 70 95 Z" fill="#5C3A1E" />
      {/* Hands */}
      <ellipse cx="10" cy="101" rx="5" ry="4" fill="#C49A6C" />
      <ellipse cx="78" cy="101" rx="5" ry="4" fill="#C49A6C" />

      {/* Satchel */}
      <rect x="68" y="88" width="14" height="12" rx="3" fill="#7B4F2E" />
      <rect x="69" y="89" width="12" height="10" rx="2" fill="#8B5E3C" />
      <rect x="74" y="93" width="4" height="3" rx="1" fill="#C6A15B" />
      {/* Satchel strap */}
      <path d="M 70 88 Q 68 80 64 78" stroke="#7B4F2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Neck */}
      <rect x="40" y="66" width="8" height="8" rx="2" fill="#C49A6C" />

      {/* Head */}
      <ellipse cx="44" cy="52" rx="22" ry="20" fill="#C49A6C" />

      {/* Hair — dark, slightly wavy */}
      <ellipse cx="44" cy="34" rx="21" ry="11" fill="#1A1A1A" />
      <rect x="23" y="34" width="6" height="12" rx="3" fill="#1A1A1A" />
      <rect x="59" y="34" width="6" height="12" rx="3" fill="#1A1A1A" />
      {/* Hair fringe */}
      <path d="M 28 38 Q 34 32 44 32 Q 54 32 60 38" fill="#1A1A1A" />
      <path d="M 28 36 Q 32 30 38 30 Q 36 38 30 40 Z" fill="#1A1A1A" />
      <path d="M 60 36 Q 56 30 50 30 Q 52 38 58 40 Z" fill="#1A1A1A" />

      {/* Ears */}
      <ellipse cx="22" cy="52" rx="4" ry="5" fill="#C49A6C" />
      <ellipse cx="66" cy="52" rx="4" ry="5" fill="#C49A6C" />
      <ellipse cx="22" cy="52" rx="2.5" ry="3.5" fill="#B8865A" />
      <ellipse cx="66" cy="52" rx="2.5" ry="3.5" fill="#B8865A" />

      {/* Eyebrows */}
      <path
        d={`M 32 ${54 + expr.browLift} Q 36 ${51 + expr.browLift} 40 ${53 + expr.browLift}`}
        stroke="#2A1A0A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M 48 ${53 + expr.browLift} Q 52 ${51 + expr.browLift} 56 ${54 + expr.browLift}`}
        stroke="#2A1A0A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Glasses frames */}
      <rect x="30" y="54" width="13" height="10" rx="3" fill="none" stroke="#2A1A0A" strokeWidth="1.8" />
      <rect x="45" y="54" width="13" height="10" rx="3" fill="none" stroke="#2A1A0A" strokeWidth="1.8" />
      {/* Glasses bridge */}
      <line x1="43" y1="59" x2="45" y2="59" stroke="#2A1A0A" strokeWidth="1.8" />
      {/* Glasses temples */}
      <line x1="30" y1="59" x2="26" y2="58" stroke="#2A1A0A" strokeWidth="1.8" />
      <line x1="58" y1="59" x2="62" y2="58" stroke="#2A1A0A" strokeWidth="1.8" />
      {/* Lens glare */}
      <circle cx="33" cy="57" r="1.5" fill="rgba(255,255,255,0.3)" />
      <circle cx="48" cy="57" r="1.5" fill="rgba(255,255,255,0.3)" />

      {/* Eyes */}
      <circle cx="36.5" cy="59.5" r="3.5" fill="#2A1A0A" />
      <circle cx="51.5" cy="59.5" r="3.5" fill="#2A1A0A" />
      {/* Eye shine */}
      <circle cx="37.8" cy="58.2" r="1.2" fill="white" opacity="0.8" />
      <circle cx="52.8" cy="58.2" r="1.2" fill="white" opacity="0.8" />

      {/* Nose */}
      <path d="M 44 63 Q 42 67 44 68 Q 46 67 44 63" fill="none" stroke="#A07050" strokeWidth="1.2" strokeLinecap="round" />

      {/* Mouth / smile */}
      {expr.mouthOpen ? (
        <>
          <path d={expr.smileD} stroke="#2A1A0A" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d={expr.smileD} fill="rgba(200,100,80,0.4)" />
        </>
      ) : (
        <path d={expr.smileD} stroke="#2A1A0A" strokeWidth="2" strokeLinecap="round" fill="none" />
      )}

      {/* Cheek blush */}
      <ellipse cx="28" cy="66" rx="5" ry="3" fill="rgba(220,120,100,0.25)" />
      <ellipse cx="60" cy="66" rx="5" ry="3" fill="rgba(220,120,100,0.25)" />
    </svg>
  );
}
