import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProgressContext } from '../contexts/ProgressContext';
import { CHECKPOINTS } from '../data/checkpoints';
import GameCompletion from '../components/GameCompletion';
import WordDetective from '../games/WordDetective';
import MemoryMatch from '../games/MemoryMatch';
import MiniSudoku from '../games/MiniSudoku';
import CodeBreaker from '../games/CodeBreaker';
import PatternMaster from '../games/PatternMaster';
import RapWordChallenge from '../games/RapWordChallenge';
import FinalWordHunt from '../games/FinalWordHunt';

const GAME_COMPONENTS = {
  WordDetective,
  MemoryMatch,
  MiniSudoku,
  CodeBreaker,
  PatternMaster,
  RapWordChallenge,
  FinalWordHunt,
};

const THEME_GRADIENTS = {
  shire: 'linear-gradient(160deg, #1A3323 0%, #17291F 100%)',
  rivendell: 'linear-gradient(160deg, #1B3B4B 0%, #17291F 100%)',
  moria: 'linear-gradient(160deg, #2A2218 0%, #17291F 100%)',
  forest: 'linear-gradient(160deg, #132E20 0%, #0F1E16 100%)',
  rohan: 'linear-gradient(160deg, #3B2E10 0%, #1E1B10 100%)',
  mordor: 'linear-gradient(160deg, #3A0F0A 0%, #1A0500 100%)',
  mountdoom: 'linear-gradient(160deg, #4A1005 0%, #150502 100%)',
};

export default function GamePage() {
  const { checkpointId } = useParams();
  const navigate = useNavigate();
  const { completeCheckpoint } = useProgressContext();

  const id = parseInt(checkpointId, 10);
  const checkpoint = CHECKPOINTS.find(c => c.id === id);

  const [phase, setPhase] = useState('intro'); // 'intro' | 'game' | 'completion'
  const [won, setWon] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [phase]);

  if (!checkpoint) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Checkpoint not found.</h2>
        <button className="btn btn-primary" onClick={() => navigate('/map')}>← Back to Map</button>
      </div>
    );
  }

  const GameComponent = GAME_COMPONENTS[checkpoint.game] || (() => (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-gold)' }}>
      <h3>Game coming soon…</h3>
    </div>
  ));

  const bg = THEME_GRADIENTS[checkpoint.theme] || 'linear-gradient(160deg, #263D30 0%, #17291F 100%)';

  function handleGameComplete(result) {
    setWon(result);
    if (result) {
      completeCheckpoint(id);
    }
    setPhase('completion');
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: bg,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.8rem 1.2rem',
        background: 'rgba(0,0,0,0.35)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(198,161,91,0.25)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigate('/map')}
          style={{ gap: '0.4rem', padding: '0.5rem 0.9rem' }}
        >
          ← Back to Map
        </button>
        <div style={{ textAlign: 'center', flex: 1, padding: '0 0.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-title)',
            color: 'var(--color-gold)',
            fontSize: 'clamp(0.95rem, 3.5vw, 1.3rem)',
            margin: 0,
            letterSpacing: '0.04em',
          }}>
            {checkpoint.name}
          </h2>
          <p style={{ color: 'var(--color-mist)', fontSize: '0.75rem', margin: 0, opacity: 0.85 }}>
            {checkpoint.subtitle}
          </p>
        </div>
        <div style={{ width: '80px', display: 'flex', justifyContent: 'flex-end', fontSize: '1.4rem' }}>
          {checkpoint.icon}
        </div>
      </header>

      {/* Body */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 0.8rem 2.5rem' }}>
        {phase === 'intro' && (
          <IntroScreen checkpoint={checkpoint} onStart={() => setPhase('game')} />
        )}
        {phase === 'game' && (
          <GameComponent onComplete={handleGameComplete} checkpoint={checkpoint} />
        )}
        {phase === 'completion' && (
          <GameCompletion
            checkpoint={checkpoint}
            won={won}
            onContinue={() => navigate('/map')}
          />
        )}
      </main>
    </div>
  );
}

function IntroScreen({ checkpoint, onStart }) {
  return (
    <div className="card animate-fadeInUp" style={{
      maxWidth: '520px',
      width: '100%',
      marginTop: '1.5rem',
      textAlign: 'center',
      border: '2px solid rgba(198,161,91,0.4)',
    }}>
      <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>{checkpoint.icon || '⚔️'}</div>
      <h1 style={{
        fontFamily: 'var(--font-title)',
        color: 'var(--color-gold)',
        fontSize: 'clamp(1.4rem, 5vw, 2.1rem)',
        marginBottom: '0.3rem',
      }}>
        {checkpoint.name}
      </h1>
      <p style={{
        color: 'var(--color-gold-light)',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: '1.25rem',
        fontFamily: 'var(--font-title)',
        opacity: 0.9,
      }}>
        — {checkpoint.subtitle} —
      </p>

      <p style={{
        color: 'var(--color-cream)',
        lineHeight: 1.7,
        marginBottom: '1.75rem',
        fontSize: '1rem',
      }}>
        {checkpoint.description || 'A trial awaits the worthy. Prove your skills to advance along the fellowship road.'}
      </p>

      {/* Reward Preview */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(198,161,91,0.12)',
        border: '1px solid rgba(198,161,91,0.3)',
        borderRadius: '30px',
        padding: '0.5rem 1.25rem',
        marginBottom: '1.75rem',
      }}>
        <span>🏅 Reward:</span>
        <strong style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-title)', fontSize: '0.85rem' }}>
          {checkpoint.token}
        </strong>
      </div>

      <div>
        <button
          className="btn btn-primary"
          onClick={onStart}
          style={{
            fontSize: '1.1rem',
            padding: '0.9rem 2.8rem',
            borderRadius: '50px',
            fontFamily: 'var(--font-title)',
            letterSpacing: '0.05em',
            boxShadow: 'var(--shadow-gold)',
            width: '100%',
            maxWidth: '300px',
          }}
        >
          Begin Trial ⚔️
        </button>
      </div>
    </div>
  );
}
