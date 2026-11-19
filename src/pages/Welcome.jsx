import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Companion from '../components/Companion';

const PARTICLE_COUNT = 40;

function FloatingParticles() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 12;
        const duration = Math.random() * 8 + 8;
        const opacity = Math.random() * 0.5 + 0.2;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${left}%`,
              bottom: '-10px',
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              background: `rgba(198,161,91,${opacity})`,
              boxShadow: `0 0 ${size * 2}px rgba(198,161,91,0.6)`,
              animation: `particle-float ${duration}s ${delay}s infinite linear`,
            }}
          />
        );
      })}
    </div>
  );
}

function StarField() {
  const stars = Array.from({ length: 80 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 60}%`,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            background: 'white',
            opacity: 0.7,
            animation: `sparkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

function MoonAndTrees() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Moon */}
      <div style={{
        position: 'absolute',
        top: '8%',
        right: '12%',
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #FFF9E0, #E8C97A)',
        boxShadow: '0 0 40px rgba(232,201,122,0.5), 0 0 80px rgba(232,201,122,0.2)',
        animation: 'float 6s ease-in-out infinite',
      }} />
      {/* Tree silhouettes left */}
      {[0, 1, 2, 3, 4].map((i) => {
        const h = 120 + i * 30;
        const w = 50 + i * 10;
        return (
          <div key={`tl-${i}`} style={{
            position: 'absolute',
            bottom: 0,
            left: `${i * 7}%`,
            width: `${w}px`,
            height: `${h}px`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            background: `rgba(13, 24, 16, ${0.6 + i * 0.08})`,
          }} />
        );
      })}
      {/* Tree silhouettes right */}
      {[0, 1, 2, 3].map((i) => {
        const h = 100 + i * 25;
        const w = 45 + i * 8;
        return (
          <div key={`tr-${i}`} style={{
            position: 'absolute',
            bottom: 0,
            right: `${i * 8}%`,
            width: `${w}px`,
            height: `${h}px`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            background: `rgba(13, 24, 16, ${0.5 + i * 0.1})`,
          }} />
        );
      })}
      {/* Ground fog */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: 'linear-gradient(transparent, rgba(23,41,31,0.8))',
      }} />
    </div>
  );
}

function DecorativeRing() {
  return (
    <div style={{
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      border: '3px solid var(--color-gold)',
      boxShadow: '0 0 20px rgba(198,161,91,0.6), inset 0 0 10px rgba(198,161,91,0.2)',
      animation: 'pulse-glow 2s ease-in-out infinite, spin 20s linear infinite',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'var(--color-gold)',
        boxShadow: '0 0 10px var(--color-gold)',
      }} />
    </div>
  );
}

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0A1A0E 0%, #17291F 40%, #263D30 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem 1rem',
    }}>
      {/* Background art */}
      <StarField />
      <MoonAndTrees />
      <FloatingParticles />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        maxWidth: '700px',
        width: '100%',
        textAlign: 'center',
        animation: 'fadeInUp 0.8s ease forwards',
      }}>
        {/* Ring */}
        <DecorativeRing />

        {/* Title */}
        <div>
          <h1 style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            background: 'linear-gradient(90deg, #C6A15B, #F5ECD9, #E8C97A, #C6A15B, #F5ECD9)',
            backgroundSize: '300% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 4s linear infinite',
            textShadow: 'none',
            letterSpacing: '0.08em',
            marginBottom: '0.5rem',
          }}>
            THE FELLOWSHIP
          </h1>
          <h1 style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            background: 'linear-gradient(90deg, #C6A15B, #F5ECD9, #E8C97A, #C6A15B, #F5ECD9)',
            backgroundSize: '300% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 4s linear infinite',
            textShadow: 'none',
            letterSpacing: '0.08em',
          }}>
            OF SEVEN
          </h1>
        </div>

        {/* Companion character */}
        <div style={{ animation: 'float 4s ease-in-out infinite' }}>
          <Companion expression="excited" size="lg" />
        </div>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          color: 'var(--color-parchment)',
          lineHeight: 1.6,
          fontStyle: 'italic',
          maxWidth: '480px',
          opacity: 0.9,
        }}>
          A Journey Through Seven Trials, Made Just for You.
        </p>

        {/* Decorative divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          width: '100%',
          maxWidth: '340px',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--color-gold))' }} />
          <span style={{ color: 'var(--color-gold)', fontSize: '1.2rem' }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, var(--color-gold))' }} />
        </div>

        {/* CTA Button */}
        <button
          className="btn btn-primary"
          onClick={() => navigate('/map')}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            padding: '1rem 2.5rem',
            borderRadius: '50px',
            fontFamily: 'var(--font-title)',
            letterSpacing: '0.05em',
            animation: 'pulse-glow 2s ease-in-out infinite',
            cursor: 'pointer',
            minWidth: '240px',
          }}
        >
          Begin the Journey ✨
        </button>

        {/* Footer hint */}
        <p style={{
          color: 'var(--color-mist)',
          fontSize: '0.85rem',
          opacity: 0.6,
          marginTop: '0.5rem',
        }}>
          Seven trials • Seven tokens • One fellowship
        </p>
      </div>
    </div>
  );
}
