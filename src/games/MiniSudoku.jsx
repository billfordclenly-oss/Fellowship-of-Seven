import { useState, useEffect, useCallback } from 'react';
import { SUDOKU_PUZZLES } from '../data/puzzles';

function deepCopy(grid) {
  return grid.map(r => [...r]);
}

// 2×3 box index for a cell
function boxOf(r, c) {
  return Math.floor(r / 2) * 2 + Math.floor(c / 3);
}

function isValid(grid, r, c, val) {
  for (let i = 0; i < 6; i++) {
    if (i !== c && grid[r][i] === val) return false;
    if (i !== r && grid[i][c] === val) return false;
  }
  const br = Math.floor(r / 2) * 2;
  const bc = Math.floor(c / 3) * 3;
  for (let dr = 0; dr < 2; dr++) {
    for (let dc = 0; dc < 3; dc++) {
      const nr = br + dr, nc = bc + dc;
      if ((nr !== r || nc !== c) && grid[nr][nc] === val) return false;
    }
  }
  return true;
}

export default function MiniSudoku({ onComplete }) {
  const [puzzleIdx] = useState(() => Math.floor(Math.random() * SUDOKU_PUZZLES.length));
  const puzzle = SUDOKU_PUZZLES[puzzleIdx] || SUDOKU_PUZZLES[0];

  const [grid, setGrid]       = useState(() => deepCopy(puzzle.puzzle));
  const [selected, setSelected] = useState(null); // [r, c]
  const [errors, setErrors]   = useState({}); // key "r,c" => true
  const [hints, setHints]     = useState(0);
  const [won, setWon]         = useState(false);

  const prefilled = puzzle.puzzle;

  function isPrefilled(r, c) {
    return prefilled[r][c] !== 0;
  }

  function cellKey(r, c) { return `${r},${c}`; }

  function checkWin(g) {
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 6; c++) {
        if (g[r][c] === 0) return false;
        if (g[r][c] !== puzzle.solution[r][c]) return false;
      }
    }
    return true;
  }

  function enterNumber(val) {
    if (!selected) return;
    const [r, c] = selected;
    if (isPrefilled(r, c)) return;

    const newGrid = deepCopy(grid);
    newGrid[r][c] = val;
    setGrid(newGrid);

    // Validate
    const newErrors = { ...errors };
    const key = cellKey(r, c);
    if (val !== 0 && !isValid(newGrid, r, c, val)) {
      newErrors[key] = true;
    } else {
      delete newErrors[key];
    }
    setErrors(newErrors);

    if (checkWin(newGrid)) {
      setWon(true);
      setTimeout(() => onComplete(true), 800);
    }
  }

  function eraseCell() {
    if (!selected) return;
    const [r, c] = selected;
    if (isPrefilled(r, c)) return;
    const newGrid = deepCopy(grid);
    newGrid[r][c] = 0;
    setGrid(newGrid);
    const newErrors = { ...errors };
    delete newErrors[cellKey(r, c)];
    setErrors(newErrors);
  }

  function giveHint() {
    if (!selected) return;
    const [r, c] = selected;
    if (isPrefilled(r, c)) return;
    const ans = puzzle.solution[r][c];
    const newGrid = deepCopy(grid);
    newGrid[r][c] = ans;
    setGrid(newGrid);
    const newErrors = { ...errors };
    delete newErrors[cellKey(r, c)];
    setErrors(newErrors);
    setHints(h => h + 1);
    if (checkWin(newGrid)) {
      setWon(true);
      setTimeout(() => onComplete(true), 800);
    }
  }

  function resetPuzzle() {
    setGrid(deepCopy(puzzle.puzzle));
    setSelected(null);
    setErrors({});
    setHints(0);
    setWon(false);
  }

  const isSel = (r, c) => selected && selected[0] === r && selected[1] === c;
  const isSameRow = (r) => selected && selected[0] === r;
  const isSameCol = (c) => selected && selected[1] === c;
  const isSameBox = (r, c) => selected && boxOf(r, c) === boxOf(selected[0], selected[1]);

  function cellBg(r, c) {
    if (isSel(r, c)) return 'rgba(74,124,89,0.5)';
    if (isSameRow(r) || isSameCol(c) || isSameBox(r, c)) return 'rgba(38,61,48,0.6)';
    if (isPrefilled(r, c)) return 'rgba(23,41,31,0.9)';
    return 'rgba(38,61,48,0.4)';
  }

  function thickBorderStyle(r, c) {
    // Thick borders at box boundaries
    return {
      borderTop:    r % 2 === 0 ? '2px solid rgba(198,161,91,0.7)' : '1px solid rgba(198,161,91,0.25)',
      borderLeft:   c % 3 === 0 ? '2px solid rgba(198,161,91,0.7)' : '1px solid rgba(198,161,91,0.25)',
      borderBottom: r === 5     ? '2px solid rgba(198,161,91,0.7)' : 'none',
      borderRight:  c === 5     ? '2px solid rgba(198,161,91,0.7)' : 'none',
    };
  }

  return (
    <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <h2 style={{
        fontFamily: 'var(--font-title)',
        color: 'var(--color-gold)',
        fontSize: 'clamp(1.1rem,4vw,1.5rem)',
        textAlign: 'center',
        margin: 0,
      }}>
        🔢 The Rune Grid Trial
      </h2>
      <p style={{ color: 'var(--color-mist)', fontSize: '0.8rem', margin: 0 }}>
        Fill each row, column, and 2×3 box with 1-6
      </p>

      {/* Sudoku Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        width: '100%',
        maxWidth: '360px',
        border: '2px solid rgba(198,161,91,0.7)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        {Array.from({ length: 6 }, (_, r) =>
          Array.from({ length: 6 }, (_, c) => {
            const val = grid[r][c];
            const pre = isPrefilled(r, c);
            const err = errors[cellKey(r, c)];
            return (
              <div
                key={`${r}-${c}`}
                onClick={() => !pre && setSelected([r, c])}
                style={{
                  minWidth: '44px',
                  minHeight: '44px',
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: cellBg(r, c),
                  ...thickBorderStyle(r, c),
                  cursor: pre ? 'default' : 'pointer',
                  fontFamily: pre ? 'var(--font-title)' : 'var(--font-body)',
                  fontWeight: pre ? 700 : 500,
                  fontSize: 'clamp(1rem, 3.5vw, 1.3rem)',
                  color: pre ? 'var(--color-gold)' : err ? '#E74C3C' : 'var(--color-cream)',
                  transition: 'background 0.15s',
                  boxSizing: 'border-box',
                }}
              >
                {val !== 0 ? val : ''}
              </div>
            );
          })
        )}
      </div>

      {/* Number pad */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[1,2,3,4,5,6].map(n => (
          <button
            key={n}
            onClick={() => enterNumber(n)}
            className="btn btn-secondary"
            style={{ minWidth: '48px', minHeight: '48px', fontSize: '1.1rem', fontWeight: 700, padding: '0' }}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={eraseCell}>⌫ Erase</button>
        <button className="btn btn-secondary btn-sm" onClick={giveHint}>💡 Hint ({hints})</button>
        <button className="btn btn-secondary btn-sm" onClick={resetPuzzle}>🔄 Reset</button>
      </div>

      {won && (
        <div className="card animate-fadeInUp" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-title)', fontSize: '1.1rem' }}>
            🏆 The runes align! Puzzle complete!
          </p>
        </div>
      )}
    </div>
  );
}
