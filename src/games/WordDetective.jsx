import { useState, useEffect, useCallback, useRef } from 'react';
import { getRandomWord, VALID_GUESSES } from '../data/wordLists';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

const KEYBOARD_ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['ENTER','Z','X','C','V','B','N','M','⌫'],
];

const COLOR_CORRECT  = '#4A7C59';
const COLOR_PRESENT  = '#C6A15B';
const COLOR_ABSENT   = '#49382C';
const COLOR_EMPTY    = 'rgba(38,61,48,0.5)';

function evaluateGuess(guess, secret) {
  const result = Array(WORD_LENGTH).fill('absent');
  const secretArr = secret.split('');
  const guessArr  = guess.split('');
  const used = Array(WORD_LENGTH).fill(false);

  // First pass: correct
  guessArr.forEach((ch, i) => {
    if (ch === secretArr[i]) {
      result[i] = 'correct';
      used[i] = true;
    }
  });
  // Second pass: present
  guessArr.forEach((ch, i) => {
    if (result[i] === 'correct') return;
    const j = secretArr.findIndex((s, idx) => s === ch && !used[idx]);
    if (j !== -1) {
      result[i] = 'present';
      used[j] = true;
    }
  });
  return result;
}

function tileColor(status) {
  if (status === 'correct') return COLOR_CORRECT;
  if (status === 'present') return COLOR_PRESENT;
  if (status === 'absent')  return COLOR_ABSENT;
  return COLOR_EMPTY;
}

export default function WordDetective({ onComplete }) {
  const [secret]       = useState(() => getRandomWord().toUpperCase());
  const [guesses, setGuesses]     = useState([]);        // [{word, result}]
  const [current, setCurrent]     = useState('');
  const [gameOver, setGameOver]   = useState(false);
  const [message, setMessage]     = useState('');
  const [shake, setShake]         = useState(false);
  const [revealRow, setRevealRow] = useState(-1);
  const inputRef = useRef(null);

  // Key state for keyboard colouring
  const keyColors = {};
  guesses.forEach(({ word, result }) => {
    word.split('').forEach((ch, i) => {
      const st = result[i];
      if (!keyColors[ch] || st === 'correct') keyColors[ch] = st;
      else if (st === 'present' && keyColors[ch] === 'absent') keyColors[ch] = st;
    });
  });

  const submitGuess = useCallback(() => {
    if (current.length !== WORD_LENGTH) {
      setMessage('Type a 5-letter word!');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    // Validate (allow any 5-letter entry if VALID_GUESSES not populated)
    if (VALID_GUESSES && VALID_GUESSES.size > 50 && !VALID_GUESSES.has(current.toUpperCase())) {
      setMessage('Not a valid word — try again!');
      setShake(true);
      setTimeout(() => { setShake(false); setMessage(''); }, 800);
      return;
    }

    const result  = evaluateGuess(current, secret);
    const newRow  = guesses.length;
    const newGuesses = [...guesses, { word: current, result }];
    setGuesses(newGuesses);
    setCurrent('');
    setRevealRow(newRow);
    setMessage('');

    const won = result.every(r => r === 'correct');
    setTimeout(() => {
      if (won) {
        setGameOver(true);
        setMessage('⚔️ The Wordsmith bows before you! You solved it!');
        setTimeout(() => onComplete(true), 1600);
      } else if (newGuesses.length === MAX_GUESSES) {
        setGameOver(true);
        setMessage(`💔 The word was "${secret}". The runes grow silent.`);
        setTimeout(() => onComplete(false), 2000);
      }
    }, WORD_LENGTH * 200 + 200);
  }, [current, guesses, secret, onComplete]);

  const handleKey = useCallback((key) => {
    if (gameOver) return;
    if (key === 'ENTER') { submitGuess(); return; }
    if (key === '⌫' || key === 'BACKSPACE') {
      setCurrent(c => c.slice(0, -1));
      return;
    }
    if (/^[A-Z]$/.test(key) && current.length < WORD_LENGTH) {
      setCurrent(c => c + key);
    }
  }, [gameOver, submitGuess, current]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      handleKey(e.key.toUpperCase());
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKey]);

  // Build grid rows
  const rows = [];
  for (let r = 0; r < MAX_GUESSES; r++) {
    if (r < guesses.length) {
      rows.push({ type: 'submitted', ...guesses[r], revealed: r === revealRow });
    } else if (r === guesses.length) {
      rows.push({ type: 'current', word: current });
    } else {
      rows.push({ type: 'empty', word: '' });
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <h2 style={{
        fontFamily: 'var(--font-title)',
        color: 'var(--color-gold)',
        fontSize: 'clamp(1.1rem,4vw,1.5rem)',
        textAlign: 'center',
        marginBottom: '0',
      }}>
        🔤 The Wordsmith's Trial
      </h2>
      <p style={{ color: 'var(--color-mist)', fontSize: '0.8rem', textAlign: 'center', margin: 0 }}>
        Guess the 5-letter word in 6 tries
      </p>

      {/* Grid */}
      <div style={{ display: 'grid', gap: '6px' }}>
        {rows.map((row, ri) => (
          <div
            key={ri}
            style={{
              display: 'flex',
              gap: '6px',
              animation: ri === guesses.length && shake ? 'shake 0.4s ease' : undefined,
            }}
          >
            {Array.from({ length: WORD_LENGTH }).map((_, ci) => {
              const letter = row.word[ci] || '';
              const status = row.type === 'submitted' ? row.result[ci] : null;
              const delay  = row.revealed ? `${ci * 180}ms` : '0ms';
              const bg     = status ? tileColor(status) : (letter ? 'rgba(38,61,48,0.9)' : COLOR_EMPTY);
              return (
                <div
                  key={ci}
                  style={{
                    width: 'clamp(44px, 11vw, 60px)',
                    height: 'clamp(44px, 11vw, 60px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: bg,
                    border: `2px solid ${status ? 'transparent' : letter ? 'var(--color-gold)' : 'rgba(198,161,91,0.3)'}`,
                    borderRadius: '8px',
                    color: 'var(--color-cream)',
                    fontFamily: 'var(--font-title)',
                    fontSize: 'clamp(1.1rem, 3.5vw, 1.6rem)',
                    fontWeight: 700,
                    transition: `background ${delay}, transform ${delay}`,
                    transform: row.revealed && status ? 'rotateX(0deg)' : undefined,
                    animation: row.revealed && letter ? `flipIn 0.4s ease ${delay} both` : undefined,
                  }}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Message */}
      {message && (
        <div style={{
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid var(--color-gold)',
          borderRadius: '8px',
          padding: '0.5rem 1.25rem',
          color: 'var(--color-gold)',
          fontWeight: 700,
          fontSize: '0.95rem',
          textAlign: 'center',
          animation: 'fadeIn 0.3s ease',
        }}>
          {message}
        </div>
      )}

      {/* On-screen keyboard */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '0.5rem' }}>
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
            {row.map(key => {
              const st = keyColors[key];
              const bg = st ? tileColor(st) : 'rgba(38,61,48,0.7)';
              const isWide = key === 'ENTER' || key === '⌫';
              return (
                <button
                  key={key}
                  onClick={() => handleKey(key)}
                  style={{
                    minWidth: isWide ? '56px' : '36px',
                    minHeight: '44px',
                    padding: '0 4px',
                    background: bg,
                    border: '1px solid rgba(198,161,91,0.25)',
                    borderRadius: '6px',
                    color: 'var(--color-cream)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: isWide ? '0.65rem' : '0.9rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes flipIn {
          0% { transform: rotateX(90deg); }
          100% { transform: rotateX(0deg); }
        }
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-6px)}
          80%{transform:translateX(6px)}
        }
      `}</style>
    </div>
  );
}
