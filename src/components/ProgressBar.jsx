// ProgressBar.jsx
// Props: { current, total }

export default function ProgressBar({ current, total }) {
  const pct = total > 0 ? Math.min(100, (current / total) * 100) : 0;

  return (
    <div style={{ width: '100%', maxWidth: '480px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: 'var(--color-parchment)',
          fontWeight: 600,
        }}>
          Your Journey: {current}/{total} Trials Completed
        </span>
        <span style={{
          color: 'var(--color-gold)',
          fontSize: '0.85rem',
          fontWeight: 700,
        }}>
          {Math.round(pct)}%
        </span>
      </div>

      {/* Track */}
      <div style={{
        height: '14px',
        borderRadius: '7px',
        background: 'rgba(23,41,31,0.8)',
        border: '1px solid rgba(198,161,91,0.3)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Fill */}
        <div style={{
          height: '100%',
          width: `${pct}%`,
          borderRadius: '7px',
          background: 'linear-gradient(90deg, #C6A15B, #E8C97A, #C6A15B)',
          backgroundSize: '200% auto',
          boxShadow: '0 0 10px rgba(198,161,91,0.5)',
          transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: pct > 0 ? 'shimmer 2s linear infinite' : 'none',
        }} />

        {/* Segment markers */}
        {Array.from({ length: total - 1 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${((i + 1) / total) * 100}%`,
              width: '1px',
              background: 'rgba(23,41,31,0.5)',
            }}
          />
        ))}
      </div>

      {/* Token dots */}
      <div style={{
        display: 'flex',
        gap: '6px',
        marginTop: '8px',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: i < current
                ? 'var(--color-gold)'
                : 'rgba(198,161,91,0.2)',
              border: `1px solid ${i < current ? 'var(--color-gold)' : 'rgba(198,161,91,0.3)'}`,
              boxShadow: i < current ? '0 0 6px rgba(198,161,91,0.6)' : 'none',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
