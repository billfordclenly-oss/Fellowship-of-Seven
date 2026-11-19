// SpeechBubble.jsx
// Props: { message, characterExpression, onContinue, token, checkpointName }

import Companion from './Companion';

export default function SpeechBubble({ message, characterExpression = 'happy', onContinue, token, checkpointName }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '0 0.5rem 1rem',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      {/* Dialog card */}
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          background: 'linear-gradient(135deg, #17291F, #263D30)',
          border: '1px solid rgba(198,161,91,0.4)',
          borderRadius: '20px 20px 20px 20px',
          padding: '1.5rem',
          display: 'flex',
          gap: '1.25rem',
          alignItems: 'flex-start',
          boxShadow: '0 -4px 60px rgba(0,0,0,0.6), 0 0 40px rgba(198,161,91,0.1)',
          animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Companion */}
        <div style={{ flexShrink: 0, animation: 'float 3s ease-in-out infinite' }}>
          <Companion expression={characterExpression} size="md" />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Checkpoint name */}
          {checkpointName && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(198,161,91,0.15)',
              border: '1px solid rgba(198,161,91,0.3)',
              borderRadius: '20px',
              padding: '3px 10px',
              marginBottom: '0.75rem',
            }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontFamily: 'var(--font-title)' }}>
                ✦ {checkpointName}
              </span>
            </div>
          )}

          {/* Speech bubble */}
          <div style={{
            position: 'relative',
            background: 'rgba(245,236,217,0.95)',
            borderRadius: '16px 16px 16px 4px',
            padding: '1rem 1.1rem',
            marginBottom: '0.9rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              color: '#2A1A0A',
              lineHeight: 1.6,
              margin: 0,
            }}>
              {message}
            </p>
          </div>

          {/* Token badge */}
          {token && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, rgba(198,161,91,0.25), rgba(232,201,122,0.15))',
              border: '1px solid rgba(198,161,91,0.5)',
              borderRadius: '20px',
              padding: '6px 14px',
              marginBottom: '1rem',
              boxShadow: '0 0 15px rgba(198,161,91,0.2)',
            }}>
              <span style={{ fontSize: '1rem' }}>💍</span>
              <span style={{
                fontFamily: 'var(--font-title)',
                fontSize: '0.78rem',
                color: 'var(--color-gold)',
                letterSpacing: '0.03em',
              }}>
                {token}
              </span>
              <span style={{ fontSize: '0.8rem' }}>✨</span>
            </div>
          )}

          {/* Continue button */}
          <button
            className="btn btn-primary"
            onClick={onContinue}
            style={{
              width: '100%',
              fontFamily: 'var(--font-title)',
              letterSpacing: '0.03em',
            }}
          >
            Continue the Journey →
          </button>
        </div>
      </div>
    </div>
  );
}
