import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressContext } from '../contexts/ProgressContext';
import { CHECKPOINTS } from '../data/checkpoints';
import Companion from '../components/Companion';
import ProgressBar from '../components/ProgressBar';
import SettingsModal from '../components/SettingsModal';
import CheckpointMarker from '../components/CheckpointMarker';

export default function AdventureMap() {
  const navigate = useNavigate();
  const { progress, isUnlocked, isCompleted, isAllCompleted } = useProgressContext();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState(null);

  const completedCount = progress.completedCheckpoints.length;
  const totalCount = CHECKPOINTS.length;

  const handleCheckpointClick = (checkpoint, state) => {
    if (state === 'locked') return;
    navigate(`/game/${checkpoint.id}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #1E382B 0%, #17291F 50%, #0F1D15 100%)',
      color: 'var(--color-cream)',
      position: 'relative',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top Header / Nav Bar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(15, 29, 21, 0.88)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(198,161,91,0.3)',
        padding: '0.8rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.4rem' }}>💍</span>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(1rem, 3vw, 1.4rem)',
                color: 'var(--color-gold)',
                letterSpacing: '0.06em',
                lineHeight: 1.1,
                margin: 0,
              }}>
                THE FELLOWSHIP OF SEVEN
              </h1>
              <p style={{
                color: 'var(--color-parchment)',
                fontSize: '0.72rem',
                margin: 0,
                opacity: 0.8,
              }}>
                Interactive 7th Monthsary Journey
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {isAllCompleted && (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate('/ending')}
                style={{
                  animation: 'pulse-glow 1.8s infinite',
                  fontSize: '0.82rem',
                  padding: '0.45rem 0.9rem',
                }}
              >
                🌟 Final Surprise! 🌟
              </button>
            )}
            <button
              onClick={() => setIsSettingsOpen(true)}
              aria-label="Settings"
              style={{
                background: 'rgba(38,61,48,0.7)',
                border: '1px solid rgba(198,161,91,0.35)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                cursor: 'pointer',
                color: 'var(--color-gold)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'rotate(30deg)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg)'}
            >
              ⚙️
            </button>
          </div>
        </div>

        {/* Journey Progress */}
        <div style={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'center' }}>
          <ProgressBar current={completedCount} total={totalCount} />
        </div>
      </header>

      {/* Tokens Bar */}
      <section style={{
        background: 'rgba(23,41,31,0.6)',
        borderBottom: '1px solid rgba(198,161,91,0.15)',
        padding: '0.6rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.8rem',
        flexWrap: 'wrap',
      }}>
        <span style={{
          fontFamily: 'var(--font-title)',
          fontSize: '0.8rem',
          color: 'var(--color-gold)',
          letterSpacing: '0.04em',
        }}>
          🏆 Tokens Earned ({progress.collectedTokens.length}/7):
        </span>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {CHECKPOINTS.map((cp) => {
            const earned = isCompleted(cp.id);
            return (
              <div
                key={cp.id}
                title={earned ? `${cp.name}: ${cp.token}` : `${cp.name} (Locked)`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '3px 8px',
                  borderRadius: '16px',
                  background: earned
                    ? 'linear-gradient(135deg, rgba(198,161,91,0.3), rgba(232,201,122,0.15))'
                    : 'rgba(0,0,0,0.3)',
                  border: `1px solid ${earned ? 'var(--color-gold)' : 'rgba(198,161,91,0.15)'}`,
                  fontSize: '0.72rem',
                  color: earned ? 'var(--color-gold)' : 'rgba(185,198,183,0.35)',
                  filter: earned ? 'none' : 'grayscale(1)',
                  transition: 'all 0.3s ease',
                }}
              >
                <span>{earned ? '💍' : '🔒'}</span>
                <span>{cp.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Roadmap Area */}
      <main style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.5rem 1rem 3rem',
      }}>
        {/* Companion Encouragement Banner */}
        <div style={{
          width: '100%',
          maxWidth: '800px',
          background: 'rgba(38,61,48,0.7)',
          border: '1px solid rgba(198,161,91,0.35)',
          borderRadius: '18px',
          padding: '0.9rem 1.25rem',
          marginBottom: '1.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}>
          <div style={{ flexShrink: 0 }}>
            <Companion expression={isAllCompleted ? 'excited' : completedCount > 3 ? 'proud' : 'encouraging'} size="sm" />
          </div>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-title)',
              color: 'var(--color-gold)',
              fontSize: '0.95rem',
              marginBottom: '0.2rem',
            }}>
              Your Traveler Companion:
            </h3>
            <p style={{
              color: 'var(--color-parchment)',
              fontSize: '0.88rem',
              lineHeight: 1.5,
              margin: 0,
            }}>
              {isAllCompleted
                ? "Sweetheart, you've conquered all seven trials! Mount Doom's summit is glowing... click the Final Surprise button above! ❤️"
                : completedCount === 0
                ? "Welcome to Middle-earth, my love! Our journey begins in the Shire. Click Checkpoint 1 below to take your first trial! ✨"
                : `Trial ${completedCount} completed! Ready for the next checkpoint? I'm right here beside you all the way! 💚`}
            </p>
          </div>
        </div>

        {/* DESKTOP MAP VIEW (>768px) */}
        <div className="desktop-map-container" style={{
          display: 'none',
          width: '100%',
          maxWidth: '1020px',
          position: 'relative',
          background: 'radial-gradient(circle at 50% 50%, #2A4736 0%, #1A3024 60%, #122219 100%)',
          borderRadius: '24px',
          border: '3px solid rgba(198,161,91,0.5)',
          padding: '30px',
          boxShadow: '0 12px 50px rgba(0,0,0,0.6), inset 0 0 60px rgba(0,0,0,0.5)',
          minHeight: '620px',
        }}>
          {/* Decorative Map SVG Elements */}
          <svg
            viewBox="0 0 1000 580"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            <defs>
              <linearGradient id="goldPath" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C6A15B" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#E8C97A" stopOpacity="1" />
                <stop offset="100%" stopColor="#FF4500" stopOpacity="0.8" />
              </linearGradient>
              <filter id="pathGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Mountains & Hills */}
            {/* Shire Hills */}
            <path d="M 0 580 Q 80 460 180 500 T 300 580 Z" fill="#1C3826" opacity="0.6" />
            <path d="M 80 580 Q 180 490 280 540 T 400 580 Z" fill="#244430" opacity="0.5" />

            {/* Misty Mountains (Moria) */}
            <polygon points="380,580 440,240 500,580" fill="#1A1F26" opacity="0.7" />
            <polygon points="430,580 480,210 540,580" fill="#242B35" opacity="0.6" />
            <polygon points="470,580 520,260 580,580" fill="#1A1F26" opacity="0.7" />

            {/* River */}
            <path
              d="M 280 0 Q 320 200 310 320 T 360 580"
              fill="none"
              stroke="#2A5C75"
              strokeWidth="14"
              opacity="0.45"
            />

            {/* Mordor / Mount Doom Volcanic Crags */}
            <polygon points="760,580 840,280 920,580" fill="#2B0E09" opacity="0.9" />
            <polygon points="820,580 880,240 960,580" fill="#3D120B" opacity="0.8" />
            <circle cx="880" cy="240" r="14" fill="#FF4500" opacity="0.7" filter="url(#pathGlow)" />

            {/* Continuous Winding Road connecting all 7 checkpoints */}
            <path
              d="M 120 450 C 180 430, 210 340, 260 300 C 310 260, 350 240, 410 240 C 470 240, 500 310, 560 310 C 620 310, 650 250, 710 250 C 760 250, 780 340, 830 350 C 870 360, 890 410, 910 440"
              fill="none"
              stroke="#3A2D1F"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray="6 6"
            />
            <path
              d="M 120 450 C 180 430, 210 340, 260 300 C 310 260, 350 240, 410 240 C 470 240, 500 310, 560 310 C 620 310, 650 250, 710 250 C 760 250, 780 340, 830 350 C 870 360, 890 410, 910 440"
              fill="none"
              stroke="url(#goldPath)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#pathGlow)"
            />
          </svg>

          {/* Desktop Checkpoint Markers Overlay */}
          {/* Coordinate Map positions (% based) */}
          {[
            { id: 0, left: '12%', top: '74%' }, // Shire
            { id: 1, left: '26%', top: '48%' }, // Rivendell
            { id: 2, left: '41%', top: '38%' }, // Moria
            { id: 3, left: '56%', top: '50%' }, // Ancient Forest
            { id: 4, left: '71%', top: '40%' }, // Rohan
            { id: 5, left: '83%', top: '56%' }, // Mordor
            { id: 6, left: '91%', top: '72%' }, // Mount Doom
          ].map((pos) => {
            const cp = CHECKPOINTS[pos.id];
            const unlocked = isUnlocked(cp.id);
            const completed = isCompleted(cp.id);
            const state = completed ? 'completed' : unlocked ? 'unlocked' : 'locked';

            return (
              <div
                key={cp.id}
                style={{
                  position: 'absolute',
                  left: pos.left,
                  top: pos.top,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20,
                }}
              >
                <CheckpointMarker
                  checkpoint={cp}
                  state={state}
                  token={cp.token}
                  onClick={() => handleCheckpointClick(cp, state)}
                />
              </div>
            );
          })}
        </div>

        {/* MOBILE & TABLET VERTICAL ROADMAP (<= 768px) */}
        <div className="mobile-map-container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '520px',
          position: 'relative',
        }}>
          {/* Vertical Winding Path Line */}
          <div style={{
            position: 'absolute',
            left: '32px',
            top: '30px',
            bottom: '40px',
            width: '6px',
            background: 'linear-gradient(to bottom, #C6A15B 0%, #E8C97A 50%, #FF4500 100%)',
            borderRadius: '3px',
            boxShadow: '0 0 10px rgba(198,161,91,0.5)',
            zIndex: 1,
          }} />

          {/* Vertical Checkpoint Cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            width: '100%',
            position: 'relative',
            zIndex: 5,
          }}>
            {CHECKPOINTS.map((cp, idx) => {
              const unlocked = isUnlocked(cp.id);
              const completed = isCompleted(cp.id);
              const state = completed ? 'completed' : unlocked ? 'unlocked' : 'locked';

              return (
                <div
                  key={cp.id}
                  onClick={() => handleCheckpointClick(cp, state)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    background: completed
                      ? 'linear-gradient(135deg, rgba(38,61,48,0.95), rgba(42,92,58,0.9))'
                      : unlocked
                      ? 'linear-gradient(135deg, rgba(23,41,31,0.95), rgba(38,61,48,0.95))'
                      : 'rgba(23,41,31,0.7)',
                    border: completed
                      ? '2px solid #E8C97A'
                      : unlocked
                      ? '2px solid var(--color-gold)'
                      : '1px solid rgba(198,161,91,0.2)',
                    borderRadius: '16px',
                    padding: '1rem',
                    cursor: unlocked ? 'pointer' : 'not-allowed',
                    boxShadow: unlocked
                      ? '0 0 20px rgba(198,161,91,0.25)'
                      : '0 4px 15px rgba(0,0,0,0.3)',
                    animation: unlocked && !completed ? 'pulse-glow 2.5s infinite' : 'none',
                    opacity: state === 'locked' ? 0.6 : 1,
                    transition: 'all 0.2s ease',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  {/* Step Marker Badge */}
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: completed
                      ? 'linear-gradient(135deg, #C6A15B, #E8C97A)'
                      : unlocked
                      ? 'rgba(38,61,48,1)'
                      : 'rgba(15,25,18,0.9)',
                    border: `2px solid ${completed ? '#E8C97A' : unlocked ? 'var(--color-gold)' : 'rgba(198,161,91,0.3)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    flexShrink: 0,
                    boxShadow: completed ? '0 0 15px rgba(198,161,91,0.6)' : 'none',
                  }}>
                    {completed ? '✅' : unlocked ? cp.icon : '🔒'}
                  </div>

                  {/* Card Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2px' }}>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: 'var(--color-gold)',
                        fontFamily: 'var(--font-title)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>
                        Trial {idx + 1}
                      </span>
                      {completed && (
                        <span style={{
                          fontSize: '0.65rem',
                          background: 'rgba(198,161,91,0.2)',
                          color: 'var(--color-gold-light)',
                          padding: '1px 6px',
                          borderRadius: '10px',
                        }}>
                          Completed
                        </span>
                      )}
                      {unlocked && !completed && (
                        <span style={{
                          fontSize: '0.65rem',
                          background: 'rgba(46,204,113,0.2)',
                          color: '#2ECC71',
                          padding: '1px 6px',
                          borderRadius: '10px',
                        }}>
                          Ready!
                        </span>
                      )}
                    </div>

                    <h4 style={{
                      fontFamily: 'var(--font-title)',
                      fontSize: '1.05rem',
                      color: unlocked ? 'var(--color-gold-light)' : 'var(--color-mist)',
                      margin: '0 0 2px 0',
                    }}>
                      {cp.name}
                    </h4>

                    <p style={{
                      fontSize: '0.78rem',
                      color: 'var(--color-parchment)',
                      margin: '0 0 4px 0',
                      opacity: 0.85,
                    }}>
                      {cp.subtitle}
                    </p>

                    {completed ? (
                      <div style={{
                        fontSize: '0.7rem',
                        color: 'var(--color-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}>
                        <span>🏅</span>
                        <span>{cp.token}</span>
                      </div>
                    ) : (
                      <div style={{
                        fontSize: '0.72rem',
                        color: unlocked ? '#2ECC71' : 'var(--color-mist)',
                        opacity: 0.75,
                      }}>
                        {unlocked ? 'Tap to start trial →' : 'Complete previous trial to unlock'}
                      </div>
                    )}
                  </div>

                  {/* Right Arrow / Lock Icon */}
                  <div style={{
                    fontSize: '1.2rem',
                    color: unlocked ? 'var(--color-gold)' : 'var(--color-mist)',
                    opacity: 0.6,
                    paddingRight: '0.2rem',
                  }}>
                    {unlocked ? '➔' : '🔒'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Responsive Styles Injection */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-map-container {
            display: block !important;
          }
          .mobile-map-container {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .desktop-map-container {
            display: none !important;
          }
          .mobile-map-container {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
