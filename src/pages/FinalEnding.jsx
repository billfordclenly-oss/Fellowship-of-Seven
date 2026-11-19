import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useProgressContext } from '../contexts/ProgressContext';
import { CHECKPOINTS } from '../data/checkpoints';
import Companion from '../components/Companion';

// =========================================================================
// CUSTOMIZABLE ROMANTIC MESSAGES — EDIT THESE TO PERSONALIZE FOR YOUR LOVE
// =========================================================================
export const ROMANTIC_MESSAGE = `Happy 7th Monthsary, my love! ❤️

I made this little adventure just for you. Every checkpoint represents a little challenge, but the real reward was getting to make something that I hope makes you smile.

Thank you for being part of my journey. Here's to more adventures, more laughter, more memories, and many more months together.

I love you!`;

export const LETTER_CONTENT = `My dearest love,

You've made it through seven trials — just like you've been making every single day feel like an adventure worth taking.

I created this little world for you because you deserve magic. Real magic — the kind that happens every time you smile, every time you laugh, and every time you're just... you.

Seven months together, and every chapter has been my favorite one yet. From the quiet mornings to the wildest dreams, there's no fellowship in all of Middle-earth or the universe I would rather be part of.

Thank you for being my adventure, my comfort, and my greatest blessing. Here's to forever and always.

With all my heart and all my love,
Mark 💚`;

export const FINAL_FOOTER_MESSAGE = "THE END... OF THIS ADVENTURE. NOT OURS. ❤️";

export default function FinalEnding() {
  const navigate = useNavigate();
  const { progress } = useProgressContext();
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [showSparkles, setShowSparkles] = useState(true);

  useEffect(() => {
    // Initial celebration fireworks / confetti
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#C6A15B', '#E8C97A', '#FF4500', '#2ECC71', '#F5ECD9'],
      });
    } catch {}
  }, []);

  const handleOpenSurprise = () => {
    setIsLetterOpen(true);
    try {
      // Fire multi-stage celebratory confetti
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        colors: ['#FFD700', '#FF69B4', '#FF4500', '#E8C97A', '#FFFFFF']
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    } catch {}
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at bottom, #3E1B0F 0%, #201017 40%, #0D1612 100%)',
      color: 'var(--color-cream)',
      position: 'relative',
      overflowX: 'hidden',
      padding: '2rem 1rem 4rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Background Starfield & Sunset Glow */}
      <div style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 100%, rgba(255, 110, 50, 0.25) 0%, rgba(198, 161, 91, 0.15) 30%, transparent 70%)',
        zIndex: 0,
      }} />

      {/* Floating Sparkles & Particles */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i * 13) % 100}%`,
              top: `${(i * 17) % 95}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              borderRadius: '50%',
              background: '#FFD700',
              opacity: 0.6,
              boxShadow: '0 0 8px #FFD700',
              animation: `sparkle ${(i % 4) + 2}s infinite ease-in-out ${(i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '750px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1.8rem',
      }}>
        {/* Glowing One Ring motif */}
        <div style={{
          width: '74px',
          height: '74px',
          borderRadius: '50%',
          border: '4px solid var(--color-gold)',
          boxShadow: '0 0 30px rgba(255, 215, 0, 0.8), inset 0 0 15px rgba(255, 215, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulse-glow 2s infinite, float 4s ease-in-out infinite',
        }}>
          <span style={{ fontSize: '1.6rem' }}>💎</span>
        </div>

        {/* Headings */}
        <div>
          <h1 style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(1.7rem, 5.5vw, 3rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            background: 'linear-gradient(90deg, #FFD700, #F5ECD9, #E8C97A, #FF4500, #FFD700)',
            backgroundSize: '300% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 4s linear infinite',
            letterSpacing: '0.06em',
            margin: '0 0 0.5rem 0',
          }}>
            YOU COMPLETED THE FELLOWSHIP OF SEVEN!
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.05rem, 3vw, 1.35rem)',
            color: 'var(--color-parchment)',
            fontStyle: 'italic',
            opacity: 0.95,
            margin: 0,
          }}>
            Seven trials. Seven tokens. One beautiful adventure.
          </p>
        </div>

        {/* Collected 7 Tokens Display */}
        <div className="card" style={{
          width: '100%',
          background: 'rgba(23,41,31,0.85)',
          border: '2px solid rgba(198,161,91,0.5)',
          borderRadius: '20px',
          padding: '1.25rem',
          boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-title)',
            color: 'var(--color-gold)',
            fontSize: '1rem',
            marginBottom: '0.8rem',
            letterSpacing: '0.06em',
          }}>
            ✦ YOUR SEVEN COLLECTED SACRED TOKENS ✦
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '0.6rem',
          }}>
            {CHECKPOINTS.map((cp, i) => (
              <div
                key={cp.id}
                style={{
                  background: 'linear-gradient(135deg, rgba(38,61,48,0.9), rgba(42,92,58,0.7))',
                  border: '1px solid rgba(198,161,91,0.4)',
                  borderRadius: '12px',
                  padding: '0.6rem 0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{cp.icon}</span>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: 'var(--color-gold-light)',
                  fontFamily: 'var(--font-title)',
                  lineHeight: 1.2,
                }}>
                  {cp.token}
                </span>
                <span style={{ fontSize: '0.62rem', color: 'var(--color-mist)', opacity: 0.8 }}>
                  Trial {i + 1}: {cp.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Companion Illustration */}
        <div style={{ animation: 'float 3.5s ease-in-out infinite', marginTop: '0.5rem' }}>
          <Companion expression="excited" size="lg" />
        </div>

        {/* Romantic Message Card */}
        <div className="card" style={{
          width: '100%',
          background: 'rgba(38,61,48,0.85)',
          border: '2px solid rgba(198,161,91,0.4)',
          borderRadius: '20px',
          padding: '1.75rem 1.5rem',
          textAlign: 'center',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2.8vw, 1.2rem)',
            color: 'var(--color-cream)',
            lineHeight: 1.8,
            whiteSpace: 'pre-line',
            margin: 0,
          }}>
            {ROMANTIC_MESSAGE}
          </p>
        </div>

        {/* Final Surprise Reveal Button */}
        {!isLetterOpen ? (
          <button
            className="btn btn-primary"
            onClick={handleOpenSurprise}
            style={{
              fontSize: 'clamp(1.1rem, 3.5vw, 1.35rem)',
              padding: '1.1rem 3rem',
              borderRadius: '50px',
              fontFamily: 'var(--font-title)',
              letterSpacing: '0.05em',
              animation: 'pulse-glow 1.8s infinite',
              cursor: 'pointer',
              boxShadow: '0 0 35px rgba(255, 215, 0, 0.7)',
            }}
          >
            Open Your Surprise ❤️
          </button>
        ) : (
          /* Animated Letter Container */
          <div className="animate-fadeInUp" style={{
            width: '100%',
            maxWidth: '620px',
            background: 'linear-gradient(135deg, #FBF6EB 0%, #E9D9B7 100%)',
            color: '#342314',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            border: '3px solid #C6A15B',
            boxShadow: '0 12px 50px rgba(0,0,0,0.8), 0 0 30px rgba(198,161,91,0.5)',
            textAlign: 'left',
            position: 'relative',
          }}>
            {/* Wax Seal Decoration */}
            <div style={{
              position: 'absolute',
              top: '-18px',
              right: '25px',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#962D24',
              border: '2px solid #5C1510',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFD700',
              fontSize: '1.2rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
            }}>
              ❤️
            </div>

            <h2 style={{
              fontFamily: 'var(--font-title)',
              color: '#49382C',
              fontSize: '1.5rem',
              marginBottom: '1.25rem',
              borderBottom: '2px dashed #C6A15B',
              paddingBottom: '0.6rem',
            }}>
              A Letter for You 📜
            </h2>

            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(0.95rem, 2.5vw, 1.12rem)',
              lineHeight: 1.85,
              whiteSpace: 'pre-line',
              color: '#2B1A0D',
              margin: 0,
            }}>
              {LETTER_CONTENT}
            </p>
          </div>
        )}

        {/* Final Footer Quote */}
        <div style={{ marginTop: '1.5rem' }}>
          <p style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(0.95rem, 2.8vw, 1.25rem)',
            color: 'var(--color-gold)',
            letterSpacing: '0.08em',
            margin: '0 0 1rem 0',
          }}>
            {FINAL_FOOTER_MESSAGE}
          </p>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/map')}
            style={{ padding: '0.6rem 1.6rem', borderRadius: '30px' }}
          >
            ← Back to Map & Replay Trials
          </button>
        </div>
      </div>
    </div>
  );
}
