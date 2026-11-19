import { useState, useCallback } from 'react';

const COLORS = [
  { id: 'red',    label: 'Red',    hex: '#C0392B' },
  { id: 'blue',   label: 'Blue',   hex: '#2980B9' },
  { id: 'green',  label: 'Green',  hex: '#27AE60' },
  { id: 'yellow', label: 'Yellow', hex: '#F1C40F' },
  { id: 'purple', label: 'Purple', hex: '#8E44AD' },
  { id: 'orange', label: 'Orange', hex: '#E67E22' },
];
const CODE_LENGTH = 4;
const MAX_ATTEMPTS = 10;

function randomCode() {
  return Array.from({ length: CODE_LENGTH }, () => COLORS[Math.floor(Math.random() * COLORS.length)].id);
}

function getFeedback(guess, secret) {
  let black = 0, white = 0;
  const sCopy = [...secret];
  const gCopy = [...guess];

  // Black pegs (exact matches)
  gCopy.forEach((c, i) => {
    if (c === sCopy[i]) { black++; sCopy[i] = null; gCopy[i] = null; }
  });
  // White pegs (right color, wrong pos)
  gCopy.forEach((c) => {
    if (!c) return;
    const idx = sCopy.indexOf(c);
    if (idx !== -1) { white++; sCopy[idx] = null; }
  });
  return { black, white };
}

function colorHex(id) {
  return COLORS.find(c => c.id === id)?.hex || '#333';
}

export default function CodeBreaker({ onComplete }) {
  const [secret, setSecret]     = useState(() => randomCode());
  const [attempts, setAttempts] = useState([]); // [{guess, feedback}]
  const [current, setCurrent]   = useState([]); // building current guess (up to 4)
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon]           = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const remaining = MAX_ATTEMPTS - attempts.length;

  function addColor(colorId) {
    if (gameOver || current.length >= CODE_LENGTH) return;
    setCurrent(c => [...c, colorId]);
  }

  function removeLastColor() {
    setCurrent(c => c.slice(0, -1));
  }

  function submitGuess() {
    if (current.length !== CODE_LENGTH || gameOver) return;
    setSubmitting(true);
    setTimeout(() => {
      const feedback = getFeedback(current, secret);
      const newAttempts = [...attempts, { guess: [...current], feedback }];
      setAttempts(newAttempts);
      setCurrent([]);
      setSubmitting(false);

      if (feedback.black === CODE_LENGTH) {
        setGameOver(true);
        setWon(true);
        setTimeout(() => onComplete(true), 1000);
      } else if (newAttempts.length >= MAX_ATTEMPTS) {
        setGameOver(true);
        setWon(false);
        setTimeout(() => onComplete(false), 1500);
      }
    }, 400);
  }

  function newGame() {
    setSecret(randomCode());
    setAttempts([]);
    setCurrent([]);
    setGameOver(false);
    setWon(false);
  }

  return (
    <div style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <h2 style={{
        fontFamily: 'var(--font-title)',
        color: 'var(--color-gold)',
        fontSize: 'clamp(1.1rem,4vw,1.5rem)',
        textAlign: 'center',
        margin: 0,
      }}>
        🔮 The Code Breaker's Trial
      </h2>
      <p style={{ color: 'var(--color-mist)', fontSize: '0.8rem', textAlign: 'center', margin: 0 }}>
        Crack the 4-peg code in {MAX_ATTEMPTS} attempts
      </p>

      {/* Remaining + status */}
      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--color-parchment)' }}>
        <span>🎯 Attempts left: <strong style={{ color: remaining <= 3 ? '#E74C3C' : 'var(--color-gold)' }}>{remaining}</strong></span>
        {gameOver && <span style={{ color: won ? '#4A7C59' : '#C0392B' }}>{won ? '✅ Victory!' : '❌ Defeated'}</span>}
      </div>

      {/* History */}
      <div style={{
        width: '100%',
        maxHeight: '340px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        paddingRight: '4px',
      }}>
        {attempts.length === 0 && (
          <p style={{ color: 'var(--color-mist)', textAlign: 'center', fontSize: '0.85rem', margin: '1rem 0' }}>
            No guesses yet — select 4 colors below!
          </p>
        )}
        {attempts.map((attempt, ai) => (
          <AttemptRow key={ai} attempt={attempt} number={ai + 1} />
        ))}
      </div>

      {/* Current guess row */}
      {!gameOver && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '0.75rem 1rem',
          background: 'rgba(38,61,48,0.6)',
          borderRadius: '10px',
          border: '1px solid rgba(198,161,91,0.4)',
          width: '100%',
          animation: submitting ? 'shake 0.4s ease' : undefined,
        }}>
          <span style={{ color: 'var(--color-mist)', fontSize: '0.75rem', minWidth: '20px', textAlign: 'right' }}>
            #{attempts.length + 1}
          </span>
          <div style={{ display: 'flex', gap: '8px', flex: 1, justifyContent: 'center' }}>
            {Array.from({ length: CODE_LENGTH }).map((_, i) => (
              <div key={i} style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: current[i] ? colorHex(current[i]) : 'rgba(23,41,31,0.8)',
                border: `2px solid ${current[i] ? colorHex(current[i]) : 'rgba(198,161,91,0.3)'}`,
                boxShadow: current[i] ? `0 0 10px ${colorHex(current[i])}55` : 'none',
                transition: 'background 0.2s, box-shadow 0.2s',
              }} />
            ))}
          </div>
          <button
            onClick={removeLastColor}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
            disabled={current.length === 0}
          >
            ⌫
          </button>
        </div>
      )}

      {/* Color palette */}
      {!gameOver && (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {COLORS.map(col => (
            <button
              key={col.id}
              onClick={() => addColor(col.id)}
              title={col.label}
              style={{
                width: '52px',
                height: '52px',
                minWidth: '44px',
                minHeight: '44px',
                borderRadius: '50%',
                background: col.hex,
                border: current.filter(c => c === col.id).length
                  ? '3px solid var(--color-cream)'
                  : '3px solid transparent',
                cursor: current.length >= CODE_LENGTH ? 'not-allowed' : 'pointer',
                boxShadow: `0 0 10px ${col.hex}66`,
                transition: 'transform 0.15s, box-shadow 0.15s',
                transform: 'scale(1)',
                WebkitTapHighlightColor: 'transparent',
              }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.12)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            />
          ))}
        </div>
      )}

      {/* Submit / New Game */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {!gameOver && (
          <button
            className="btn btn-primary"
            onClick={submitGuess}
            disabled={current.length !== CODE_LENGTH || submitting}
            style={{ opacity: current.length !== CODE_LENGTH ? 0.5 : 1 }}
          >
            Submit Guess
          </button>
        )}
        <button className="btn btn-secondary btn-sm" onClick={newGame}>
          🔄 New Code
        </button>
      </div>

      {/* Reveal on loss */}
      {gameOver && !won && (
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--color-mist)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>The secret code was:</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {secret.map((id, i) => (
              <div key={i} style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: colorHex(id),
                border: `2px solid ${colorHex(id)}`,
                boxShadow: `0 0 8px ${colorHex(id)}66`,
              }} />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-6px)}
          80%{transform:translateX(6px)}
        }
        @keyframes slideInRow {
          from{opacity:0;transform:translateY(-10px)}
          to{opacity:1;transform:translateY(0)}
        }
      `}</style>
    </div>
  );
}

function AttemptRow({ attempt, number }) {
  const { guess, feedback } = attempt;
  const pegs = [
    ...Array(feedback.black).fill('black'),
    ...Array(feedback.white).fill('white'),
    ...Array(CODE_LENGTH - feedback.black - feedback.white).fill('empty'),
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '0.5rem 0.75rem',
      background: 'rgba(23,41,31,0.6)',
      borderRadius: '10px',
      border: '1px solid rgba(198,161,91,0.15)',
      animation: 'slideInRow 0.35s ease both',
    }}>
      <span style={{ color: 'var(--color-mist)', fontSize: '0.7rem', minWidth: '20px', textAlign: 'right' }}>
        #{number}
      </span>
      <div style={{ display: 'flex', gap: '7px', flex: 1, justifyContent: 'center' }}>
        {guess.map((id, i) => (
          <div key={i} style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: colorHex(id),
            border: `2px solid ${colorHex(id)}`,
          }} />
        ))}
      </div>
      {/* Feedback pegs in 2×2 grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', flexShrink: 0 }}>
        {pegs.map((peg, i) => (
          <div key={i} style={{
            width: '14px', height: '14px', borderRadius: '50%',
            background: peg === 'black' ? '#2C2C2C' : peg === 'white' ? '#F0F0F0' : 'rgba(255,255,255,0.1)',
            border: `1px solid ${peg === 'empty' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.3)'}`,
          }} />
        ))}
      </div>
      <span style={{
        fontSize: '0.7rem',
        color: feedback.black === CODE_LENGTH ? '#4A7C59' : 'var(--color-mist)',
        minWidth: '36px',
        textAlign: 'center',
        fontWeight: 700,
      }}>
        {feedback.black === CODE_LENGTH ? '🏆' : `${feedback.black}⚫ ${feedback.white}⚪`}
      </span>
    </div>
  );
}
