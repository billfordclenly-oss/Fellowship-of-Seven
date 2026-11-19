import { useEffect, useRef } from 'react';
import { useProgressContext } from '../contexts/ProgressContext';
import SpeechBubble from './SpeechBubble';
import Companion from './Companion';

export default function GameCompletion({ checkpoint, won, onContinue }) {
  const { completeCheckpoint } = useProgressContext();
  const completedRef = useRef(false);

  useEffect(() => {
    if (won && !completedRef.current) {
      completedRef.current = true;
      completeCheckpoint(checkpoint.id);
    }
  }, [won, checkpoint.id, completeCheckpoint]);

  const message = won
    ? checkpoint.encouragement
    : "Don't worry, sweetheart! Every adventurer stumbles before reaching the summit. Take a deep breath and let's try it again together! ❤️";

  return (
    <>
      {won ? (
        <SpeechBubble
          message={message}
          characterExpression="excited"
          token={checkpoint.token}
          checkpointName={checkpoint.name}
          onContinue={onContinue}
        />
      ) : (
        <div className="card animate-fadeInUp" style={{
          maxWidth: '520px',
          width: '100%',
          marginTop: '2rem',
          textAlign: 'center',
          padding: '2rem 1.5rem',
        }}>
          <div style={{ animation: 'float 3s ease-in-out infinite', display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Companion expression="encouraging" size="md" />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-title)',
            color: '#E74C3C',
            fontSize: '1.5rem',
            marginBottom: '0.75rem',
          }}>
            Trial Incomplete
          </h2>
          <p style={{
            color: 'var(--color-cream)',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
            fontSize: '0.95rem',
          }}>
            {message}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              🔄 Try Again
            </button>
            <button className="btn btn-secondary" onClick={onContinue}>
              ← Back to Map
            </button>
          </div>
        </div>
      )}
    </>
  );
}
