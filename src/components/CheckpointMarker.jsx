// CheckpointMarker.jsx
// Props: { checkpoint, state: 'locked'|'unlocked'|'completed', onClick, token }

import { useState } from 'react';

export default function CheckpointMarker({ checkpoint, state, onClick, token }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const isLocked = state === 'locked';
  const isUnlocked = state === 'unlocked';
  const isCompleted = state === 'completed';

  const handleClick = () => {
    if (isLocked) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }
    onClick?.();
  };

  const markerStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: isLocked ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    transition: 'transform 0.2s ease',
  };

  const circleSize = 56;

  const circleStyle = {
    width: `${circleSize}px`,
    height: `${circleSize}px`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    border: isCompleted
      ? '3px solid #E8C97A'
      : isUnlocked
      ? '3px solid var(--color-gold)'
      : '2px solid rgba(198,161,91,0.3)',
    background: isCompleted
      ? 'linear-gradient(135deg, #C6A15B, #E8C97A)'
      : isUnlocked
      ? 'rgba(38,61,48,0.9)'
      : 'rgba(23,41,31,0.8)',
    boxShadow: isCompleted
      ? '0 0 20px rgba(198,161,91,0.7), 0 0 40px rgba(198,161,91,0.3)'
      : isUnlocked
      ? '0 0 15px rgba(198,161,91,0.5)'
      : 'none',
    animation: isUnlocked ? 'pulse-glow 2s ease-in-out infinite' : 'none',
    filter: isLocked ? 'grayscale(80%) brightness(0.5)' : 'none',
    position: 'relative',
    transition: 'transform 0.2s ease',
  };

  const numberBadgeStyle = {
    position: 'absolute',
    top: '-6px',
    right: '-6px',
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    background: isCompleted ? '#E8C97A' : isUnlocked ? 'var(--color-gold)' : 'rgba(100,100,100,0.6)',
    color: isLocked ? '#888' : '#2A1A0A',
    fontSize: '0.65rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-title)',
    border: '2px solid rgba(23,41,31,0.8)',
  };

  const labelStyle = {
    marginTop: '6px',
    fontSize: '0.7rem',
    fontFamily: 'var(--font-title)',
    color: isLocked ? 'rgba(185,198,183,0.4)' : isCompleted ? 'var(--color-gold)' : 'var(--color-parchment)',
    textAlign: 'center',
    maxWidth: '70px',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  return (
    <div
      style={markerStyle}
      onClick={handleClick}
      onMouseEnter={e => { if (!isLocked) e.currentTarget.style.transform = 'scale(1.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      title={isLocked ? 'Complete previous trial to continue' : checkpoint.name}
      aria-label={`Checkpoint: ${checkpoint.name} — ${state}`}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
    >
      <div style={circleStyle}>
        {isCompleted ? '✅' : isLocked ? '🔒' : checkpoint.icon}
        <div style={numberBadgeStyle}>{checkpoint.id + 1}</div>
      </div>

      <div style={labelStyle}>
        {checkpoint.name}
      </div>

      {isCompleted && token && (
        <div style={{
          marginTop: '3px',
          fontSize: '0.6rem',
          color: 'var(--color-gold)',
          textAlign: 'center',
          maxWidth: '70px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          opacity: 0.8,
        }}>
          {token}
        </div>
      )}

      {/* Locked tooltip */}
      {showTooltip && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(10,20,12,0.95)',
          border: '1px solid rgba(198,161,91,0.4)',
          borderRadius: '8px',
          padding: '6px 10px',
          fontSize: '0.7rem',
          color: 'var(--color-parchment)',
          whiteSpace: 'nowrap',
          marginBottom: '8px',
          zIndex: 100,
          animation: 'fadeInUp 0.2s ease',
          pointerEvents: 'none',
        }}>
          🔒 Complete previous trial first
        </div>
      )}
    </div>
  );
}
