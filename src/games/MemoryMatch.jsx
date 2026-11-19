import { useState, useEffect, useCallback, useRef } from 'react';

const SYMBOLS = ['💍', '⭐', '🍃', '⚔️', '👑', '💎'];

function createDeck() {
  const pairs = [...SYMBOLS, ...SYMBOLS];
  // Fisher-Yates shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((sym, idx) => ({ id: idx, symbol: sym, state: 'hidden' }));
}

export default function MemoryMatch({ onComplete }) {
  const [cards, setCards]   = useState(() => createDeck());
  const [flipped, setFlipped] = useState([]); // indices of face-up unmatched
  const [moves, setMoves]   = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const lockRef = useRef(false);
  const timerRef = useRef(null);

  // Start timer on first flip
  useEffect(() => {
    if (started && !finished) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [started, finished]);

  useEffect(() => {
    if (finished) clearInterval(timerRef.current);
  }, [finished]);

  const handleFlip = useCallback((idx) => {
    if (lockRef.current) return;
    if (cards[idx].state !== 'hidden') return;
    if (flipped.length === 2) return;
    if (flipped.includes(idx)) return;

    if (!started) setStarted(true);

    const newFlipped = [...flipped, idx];
    setCards(prev => prev.map((c, i) => i === idx ? { ...c, state: 'flipped' } : c));
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      lockRef.current = true;
      const [a, b] = newFlipped;
      setTimeout(() => {
        setCards(prev => {
          const sym1 = prev[a].symbol;
          const sym2 = prev[b].symbol;
          const matched = sym1 === sym2;
          const next = prev.map((c, i) => {
            if (i === a || i === b) return { ...c, state: matched ? 'matched' : 'hidden' };
            return c;
          });
          const allDone = next.every(c => c.state === 'matched');
          if (allDone) {
            setFinished(true);
            setTimeout(() => onComplete(true), 800);
          }
          return next;
        });
        setFlipped([]);
        lockRef.current = false;
      }, 1000);
    }
  }, [cards, flipped, started, onComplete]);

  function handleReset() {
    clearInterval(timerRef.current);
    setCards(createDeck());
    setFlipped([]);
    setMoves(0);
    setSeconds(0);
    setStarted(false);
    setFinished(false);
    lockRef.current = false;
  }

  const matchedCount = cards.filter(c => c.state === 'matched').length / 2;

  return (
    <div style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <h2 style={{
        fontFamily: 'var(--font-title)',
        color: 'var(--color-gold)',
        fontSize: 'clamp(1.1rem,4vw,1.5rem)',
        textAlign: 'center',
        margin: 0,
      }}>
        🃏 The Memory Trial
      </h2>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--color-parchment)' }}>
        <span>⏱ {Math.floor(seconds/60).toString().padStart(2,'0')}:{(seconds%60).toString().padStart(2,'0')}</span>
        <span>🃏 Moves: {moves}</span>
        <span>✅ {matchedCount}/6</span>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
        width: '100%',
      }}>
        {cards.map((card, idx) => (
          <Card key={card.id} card={card} onClick={() => handleFlip(idx)} />
        ))}
      </div>

      {finished && (
        <div className="card animate-fadeInUp" style={{ textAlign: 'center', marginTop: '0.5rem', width: '100%' }}>
          <div style={{ fontSize: '2rem' }}>🎉</div>
          <p style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-title)', margin: '0.25rem 0' }}>
            All pairs found!
          </p>
          <p style={{ color: 'var(--color-parchment)', fontSize: '0.9rem' }}>
            Time: {seconds}s — Moves: {moves}
          </p>
        </div>
      )}

      <button className="btn btn-secondary btn-sm" onClick={handleReset}>
        🔄 New Game
      </button>

      <style>{`
        .memory-card-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.45s ease;
          border-radius: 10px;
        }
        .memory-card-inner.face-up { transform: rotateY(180deg); }
        .memory-card-face, .memory-card-back {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .memory-card-back { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}

function Card({ card, onClick }) {
  const faceUp = card.state !== 'hidden';
  const matched = card.state === 'matched';

  return (
    <div
      onClick={onClick}
      style={{
        aspectRatio: '1',
        perspective: '600px',
        cursor: faceUp ? 'default' : 'pointer',
        minWidth: '60px',
        minHeight: '60px',
      }}
    >
      <div className={`memory-card-inner ${faceUp ? 'face-up' : ''}`}>
        {/* Back face */}
        <div
          className="memory-card-face"
          style={{
            background: 'linear-gradient(135deg, #263D30, #17291F)',
            border: '2px solid rgba(198,161,91,0.4)',
            fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
          }}
        >
          <span style={{ opacity: 0.6, userSelect: 'none' }}>❓</span>
        </div>
        {/* Front face */}
        <div
          className="memory-card-back"
          style={{
            background: matched
              ? 'linear-gradient(135deg, #2A5C3A, #1A4A28)'
              : 'linear-gradient(135deg, #3A2E1A, #2A1F0F)',
            border: `2px solid ${matched ? '#4A7C59' : 'var(--color-gold)'}`,
            fontSize: 'clamp(1.4rem, 5vw, 2rem)',
            boxShadow: matched ? '0 0 12px rgba(74,124,89,0.5)' : 'none',
          }}
        >
          <span style={{ userSelect: 'none' }}>{card.symbol}</span>
        </div>
      </div>
    </div>
  );
}
