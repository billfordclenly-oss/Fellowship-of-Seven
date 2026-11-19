// SettingsModal.jsx
// Props: { isOpen, onClose }

import { useState } from 'react';
import { getSoundEnabled, setSoundEnabled, resetProgress } from '../utils/storage';
import { useProgressContext } from '../contexts/ProgressContext';

export default function SettingsModal({ isOpen, onClose }) {
  const { reset } = useProgressContext();
  const [soundOn, setSoundOn] = useState(() => getSoundEnabled());
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleSoundToggle = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const handleReset = () => {
    if (confirmReset) {
      reset();
      setConfirmReset(false);
      onClose();
    } else {
      setConfirmReset(true);
    }
  };

  const handleClose = () => {
    setConfirmReset(false);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={e => e.target === e.currentTarget && handleClose()}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '380px',
          animation: 'slideUp 0.3s ease',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          borderBottom: '1px solid rgba(198,161,91,0.2)',
          paddingBottom: '1rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-title)',
            color: 'var(--color-gold)',
            fontSize: '1.3rem',
          }}>
            ⚙️ Settings
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close settings"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-mist)',
              fontSize: '1.4rem',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-parchment)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-mist)'}
          >
            ✕
          </button>
        </div>

        {/* Sound toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          background: 'rgba(38,61,48,0.4)',
          borderRadius: '10px',
          marginBottom: '1rem',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-parchment)',
              fontWeight: 600,
              fontSize: '1rem',
            }}>
              {soundOn ? '🔊' : '🔇'} Sound Effects
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--color-mist)',
              opacity: 0.7,
            }}>
              {soundOn ? 'Sound is on' : 'Sound is off'}
            </div>
          </div>
          <button
            onClick={handleSoundToggle}
            aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
            style={{
              width: '52px',
              height: '28px',
              borderRadius: '14px',
              background: soundOn
                ? 'linear-gradient(90deg, #C6A15B, #E8C97A)'
                : 'rgba(100,100,100,0.4)',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 0.3s ease',
              flexShrink: 0,
            }}
          >
            <div style={{
              position: 'absolute',
              top: '3px',
              left: soundOn ? '26px' : '3px',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: 'white',
              transition: 'left 0.3s ease',
              boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }} />
          </button>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'rgba(198,161,91,0.15)',
          margin: '1rem 0',
        }} />

        {/* Reset progress */}
        <div style={{
          padding: '1rem',
          background: confirmReset ? 'rgba(192,57,43,0.15)' : 'rgba(38,61,48,0.4)',
          borderRadius: '10px',
          border: confirmReset ? '1px solid rgba(192,57,43,0.4)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-parchment)',
            fontWeight: 600,
            fontSize: '1rem',
            marginBottom: '0.5rem',
          }}>
            🗑️ Reset Progress
          </div>
          <div style={{
            fontSize: '0.78rem',
            color: 'var(--color-mist)',
            opacity: 0.7,
            marginBottom: '0.75rem',
          }}>
            {confirmReset
              ? '⚠️ This will erase ALL progress, tokens, and scores. Are you sure?'
              : 'Erase all progress and start the journey from the beginning.'}
          </div>

          {confirmReset ? (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                className="btn btn-danger btn-sm"
                onClick={handleReset}
                style={{ flex: 1 }}
              >
                Yes, Reset Everything
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setConfirmReset(false)}
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleReset}
              style={{
                borderColor: 'rgba(192,57,43,0.4)',
                color: '#E74C3C',
                width: '100%',
              }}
            >
              Reset Progress
            </button>
          )}
        </div>

        {/* Close button */}
        <button
          className="btn btn-secondary"
          onClick={handleClose}
          style={{ width: '100%', marginTop: '1.25rem' }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
