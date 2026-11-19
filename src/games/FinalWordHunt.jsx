import { useState, useCallback, useRef, useEffect } from 'react';
import { WORD_SEARCH_PUZZLES } from '../data/puzzles';

const DOOM_STYLES = `
  .fwh-container {
    min-height: 100vh;
    background: linear-gradient(160deg, #060402 0%, #0E0905 40%, #1A0F08 70%, #261408 100%);
    padding: 1rem 1rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  .fwh-lava-glow {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    height: 160px;
    background: linear-gradient(to top, rgba(220,80,0,0.4), transparent);
    pointer-events: none;
    z-index: 0;
    animation: lava-pulse 2.5s ease-in-out infinite;
  }
  .fwh-header {
    text-align: center;
    margin-bottom: 1rem;
    position: relative; z-index: 1;
    animation: fadeInUp 0.6s ease;
  }
  .fwh-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.3rem, 3.5vw, 2rem);
    color: #FF4500;
    text-shadow: 0 0 20px rgba(255,69,0,0.7), 0 0 40px rgba(255,69,0,0.3);
    margin-bottom: 0.2rem;
  }
  .fwh-subtitle {
    color: #E9D9B7;
    font-size: 0.85rem;
    opacity: 0.75;
  }
  .fwh-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    max-width: 600px;
    position: relative; z-index: 1;
  }
  @media (min-width: 700px) {
    .fwh-layout {
      flex-direction: row;
      align-items: flex-start;
      max-width: 820px;
    }
  }
  .fwh-grid-wrap {
    flex-shrink: 0;
    background: rgba(10,5,2,0.9);
    border: 2px solid rgba(255,69,0,0.4);
    border-radius: 16px;
    padding: 1rem;
    box-shadow: 0 0 30px rgba(255,69,0,0.15), 0 8px 40px rgba(0,0,0,0.8);
  }
  .fwh-grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 3px;
    touch-action: none;
  }
  .fwh-cell {
    width: clamp(32px, 8vw, 42px);
    height: clamp(32px, 8vw, 42px);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    border: 1px solid rgba(255,69,0,0.15);
    background: rgba(30,15,5,0.8);
    color: #E9D9B7;
    font-size: clamp(0.7rem, 2.2vw, 0.95rem);
    font-weight: 700;
    cursor: pointer;
    transition: all 0.12s ease;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    font-family: 'Cinzel', serif;
  }
  .fwh-cell:hover { background: rgba(255,69,0,0.2); border-color: rgba(255,69,0,0.5); }
  .fwh-cell.selected {
    background: rgba(255,140,0,0.4);
    border-color: #FFD700;
    color: #FFD700;
    box-shadow: 0 0 8px rgba(255,215,0,0.5);
    transform: scale(1.08);
  }
  .fwh-cell.found {
    background: rgba(198,161,91,0.3);
    border-color: #C6A15B;
    color: #FFD700;
    box-shadow: 0 0 10px rgba(198,161,91,0.4);
    cursor: default;
  }
  .fwh-cell.hint {
    background: rgba(255,200,0,0.25);
    border-color: #FFD700;
    animation: hint-pulse 1s ease-in-out 3;
  }
  @keyframes hint-pulse {
    0%,100% { box-shadow: 0 0 5px rgba(255,215,0,0.3); }
    50% { box-shadow: 0 0 20px rgba(255,215,0,0.9); }
  }
  .fwh-sidebar {
    flex: 1;
    min-width: 180px;
  }
  .fwh-word-panel {
    background: rgba(10,5,2,0.85);
    border: 2px solid rgba(255,69,0,0.3);
    border-radius: 16px;
    padding: 1.25rem;
    margin-bottom: 1rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.6);
  }
  .fwh-panel-title {
    font-family: 'Cinzel', serif;
    color: #FF4500;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255,69,0,0.3);
    padding-bottom: 0.5rem;
  }
  .fwh-word-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .fwh-word-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #E9D9B7;
    font-weight: 600;
    font-size: 1rem;
    padding: 0.4rem 0.75rem;
    border-radius: 8px;
    background: rgba(30,15,5,0.6);
    border: 1px solid rgba(255,69,0,0.2);
    transition: all 0.3s ease;
  }
  .fwh-word-item.found {
    color: #FFD700;
    background: rgba(198,161,91,0.15);
    border-color: rgba(198,161,91,0.4);
    text-decoration: line-through;
    text-decoration-color: #FFD700;
  }
  .fwh-progress-panel {
    background: rgba(10,5,2,0.85);
    border: 2px solid rgba(255,69,0,0.3);
    border-radius: 16px;
    padding: 1rem 1.25rem;
    text-align: center;
  }
  .fwh-progress-label {
    font-family: 'Cinzel', serif;
    color: #FF4500;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.5rem;
  }
  .fwh-progress-track {
    width: 100%;
    height: 8px;
    background: rgba(0,0,0,0.5);
    border-radius: 50px;
    overflow: hidden;
    margin-bottom: 0.5rem;
    border: 1px solid rgba(255,69,0,0.3);
  }
  .fwh-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #C0392B, #FFD700);
    border-radius: 50px;
    transition: width 0.5s ease;
    box-shadow: 0 0 8px rgba(255,215,0,0.5);
  }
  .fwh-progress-count {
    font-family: 'Cinzel', serif;
    color: #FFD700;
    font-size: 1.1rem;
    font-weight: 700;
  }
  .fwh-controls {
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    position: relative; z-index: 1;
  }
  .fwh-btn {
    padding: 0.7rem 1.4rem;
    border-radius: 10px;
    border: none;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 44px;
    -webkit-tap-highlight-color: transparent;
  }
  .fwh-btn-submit {
    background: linear-gradient(135deg, #C0392B, #FF4500);
    color: #fff;
    box-shadow: 0 4px 15px rgba(255,69,0,0.4);
  }
  .fwh-btn-submit:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,69,0,0.6); }
  .fwh-btn-submit:disabled { opacity: 0.4; cursor: default; transform: none; }
  .fwh-btn-clear {
    background: rgba(60,20,5,0.8);
    border: 1px solid rgba(255,69,0,0.4);
    color: #E9D9B7;
  }
  .fwh-btn-clear:hover { background: rgba(255,69,0,0.2); }
  .fwh-btn-hint {
    background: rgba(198,161,91,0.15);
    border: 1px solid rgba(198,161,91,0.5);
    color: #FFD700;
  }
  .fwh-btn-hint:hover { background: rgba(198,161,91,0.3); }
  .fwh-sel-preview {
    position: relative; z-index: 1;
    color: #FFD700;
    font-family: 'Cinzel', serif;
    font-size: 1.2rem;
    min-height: 1.8rem;
    text-align: center;
    letter-spacing: 3px;
    text-shadow: 0 0 10px rgba(255,215,0,0.5);
  }
  .fwh-flash {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    pointer-events: none;
    animation: flash-word 1.4s ease forwards;
    font-family: 'Cinzel', serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: #FFD700;
    text-shadow: 0 0 30px rgba(255,215,0,0.9);
    white-space: nowrap;
  }
  @keyframes flash-word {
    0% { opacity: 0; transform: translate(-50%,-50%) scale(0.5); }
    20% { opacity: 1; transform: translate(-50%,-50%) scale(1.1); }
    70% { opacity: 1; transform: translate(-50%,-50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%,-50%) scale(0.8) translateY(-40px); }
  }
  .fwh-complete-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
    animation: fadeIn 0.5s ease;
  }
  .fwh-complete-card {
    background: rgba(10,5,2,0.95);
    border: 2px solid rgba(198,161,91,0.6);
    border-radius: 20px;
    padding: 2.5rem 2rem;
    text-align: center;
    max-width: 400px;
    animation: slideUp 0.5s ease;
  }
  .fwh-complete-icon { font-size: 4rem; margin-bottom: 0.5rem; }
  .fwh-complete-title {
    font-family: 'Cinzel', serif;
    font-size: 1.8rem;
    color: #FFD700;
    margin-bottom: 0.75rem;
    text-shadow: 0 0 20px rgba(255,215,0,0.5);
  }
  .fwh-complete-msg { color: #E9D9B7; margin-bottom: 1.5rem; line-height: 1.6; }
  .fwh-btn-claim {
    padding: 0.9rem 2rem;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #C6A15B, #FFD700);
    color: #2C1A00;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Cinzel', serif;
    transition: all 0.2s;
  }
  .fwh-btn-claim:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,215,0,0.4); }
`;

function injectStyles(id, css) {
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }
}

const TARGET_WORDS = ['MAGIC', 'QUEST', 'HEART', 'DREAM', 'LOVE'];

// Generate a 10x10 word-search grid with the target words placed
function buildGrid(puzzle) {
  // If the puzzle already has a grid, use it
  if (puzzle && puzzle.grid && puzzle.grid.length >= 10) {
    return puzzle.grid.slice(0, 10).map(row => (typeof row === 'string' ? row.split('') : row).slice(0, 10));
  }
  // Build our own 10x10 grid with words placed
  const size = 10;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const grid = Array.from({ length: size }, () => Array(size).fill(''));

  const directions = [
    [0, 1], [1, 0], [1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1], [-1, 1]
  ];

  const placeWord = (word) => {
    for (let attempt = 0; attempt < 200; attempt++) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      let r = row, c = col;
      let fits = true;
      for (let i = 0; i < word.length; i++) {
        if (r < 0 || r >= size || c < 0 || c >= size) { fits = false; break; }
        if (grid[r][c] !== '' && grid[r][c] !== word[i]) { fits = false; break; }
        r += dir[0]; c += dir[1];
      }
      if (fits) {
        r = row; c = col;
        for (let i = 0; i < word.length; i++) {
          grid[r][c] = word[i];
          r += dir[0]; c += dir[1];
        }
        return true;
      }
    }
    return false;
  };

  TARGET_WORDS.forEach(w => placeWord(w));
  // Fill remaining with random letters
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (grid[r][c] === '')
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];

  return grid;
}

export default function FinalWordHunt({ onComplete }) {
  injectStyles('fwh-styles', DOOM_STYLES);

  const puzzleData = WORD_SEARCH_PUZZLES[0];
  const [grid] = useState(() => buildGrid(puzzleData));
  const [selectedCells, setSelectedCells] = useState([]); // array of [r,c]
  const [foundWords, setFoundWords] = useState(new Set());
  const [foundCells, setFoundCells] = useState(new Set()); // "r,c" strings
  const [hintCell, setHintCell] = useState(null);
  const [flashWord, setFlashWord] = useState(null);
  const [complete, setComplete] = useState(false);
  const isDragging = useRef(false);

  const cellKey = (r, c) => `${r},${c}`;
  const isSelected = (r, c) => selectedCells.some(([sr, sc]) => sr === r && sc === c);
  const isFound = (r, c) => foundCells.has(cellKey(r, c));
  const isHint = (r, c) => hintCell && hintCell[0] === r && hintCell[1] === c;

  const toggleCell = useCallback((r, c) => {
    if (isFound(r, c)) return;
    setSelectedCells(prev => {
      const idx = prev.findIndex(([sr, sc]) => sr === r && sc === c);
      if (idx !== -1) {
        // deselect
        return prev.filter((_, i) => i !== idx);
      }
      return [...prev, [r, c]];
    });
  }, [foundCells]); // eslint-disable-line react-hooks/exhaustive-deps

  const submitSelection = useCallback(() => {
    if (selectedCells.length === 0) return;
    const word = selectedCells.map(([r, c]) => grid[r][c]).join('');
    const wordRev = word.split('').reverse().join('');
    const matched = TARGET_WORDS.find(w => !foundWords.has(w) && (w === word || w === wordRev));
    if (matched) {
      const newFoundCells = new Set(foundCells);
      selectedCells.forEach(([r, c]) => newFoundCells.add(cellKey(r, c)));
      setFoundCells(newFoundCells);
      const newFoundWords = new Set(foundWords);
      newFoundWords.add(matched);
      setFoundWords(newFoundWords);
      setFlashWord(`✨ ${matched}! ✨`);
      setTimeout(() => setFlashWord(null), 1400);
      if (newFoundWords.size === TARGET_WORDS.length) {
        setTimeout(() => setComplete(true), 1800);
      }
    }
    setSelectedCells([]);
  }, [selectedCells, grid, foundWords, foundCells]);

  // Desktop drag support
  const handleMouseDown = useCallback((r, c, e) => {
    e.preventDefault();
    isDragging.current = true;
    if (!isFound(r, c)) {
      setSelectedCells([[r, c]]);
    }
  }, [foundCells]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMouseEnter = useCallback((r, c) => {
    if (!isDragging.current || isFound(r, c)) return;
    setSelectedCells(prev => {
      if (prev.some(([sr, sc]) => sr === r && sc === c)) return prev;
      return [...prev, [r, c]];
    });
  }, [foundCells]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMouseUp = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      submitSelection();
    }
  }, [submitSelection]);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  const handleHint = useCallback(() => {
    const unfound = TARGET_WORDS.filter(w => !foundWords.has(w));
    if (unfound.length === 0) return;
    const target = unfound[0];
    // Find first cell of target in grid
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === target[0] && !foundCells.has(cellKey(r, c))) {
          setHintCell([r, c]);
          setTimeout(() => setHintCell(null), 3000);
          return;
        }
      }
    }
  }, [foundWords, grid, foundCells]);

  const selWord = selectedCells.map(([r, c]) => grid[r][c]).join('');

  return (
    <div className="fwh-container">
      <div className="fwh-lava-glow" />

      <div className="fwh-header">
        <div className="fwh-title">🔥 Final Word Hunt 🔥</div>
        <div className="fwh-subtitle">The Last Trial of Mount Doom</div>
      </div>

      {flashWord && <div className="fwh-flash">{flashWord}</div>}

      {complete && (
        <div className="fwh-complete-overlay">
          <div className="fwh-complete-card">
            <div className="fwh-complete-icon">🏆</div>
            <div className="fwh-complete-title">All Words Found!</div>
            <p className="fwh-complete-msg">
              You have conquered the Final Word Hunt! The fires of Mount Doom bow before your mastery. All 5 sacred words have been uncovered!
            </p>
            <button className="fwh-btn-claim" onClick={() => onComplete(true)}>
              Claim the Final Token 🏅
            </button>
          </div>
        </div>
      )}

      <div className="fwh-sel-preview">{selWord || '—'}</div>

      <div className="fwh-layout">
        <div className="fwh-grid-wrap">
          <div
            className="fwh-grid"
            onMouseLeave={() => { if (isDragging.current) { isDragging.current = false; submitSelection(); } }}
          >
            {grid.map((row, r) =>
              row.map((letter, c) => {
                let cls = 'fwh-cell';
                if (isFound(r, c)) cls += ' found';
                else if (isSelected(r, c)) cls += ' selected';
                else if (isHint(r, c)) cls += ' hint';
                return (
                  <div
                    key={cellKey(r, c)}
                    className={cls}
                    onClick={() => !isFound(r, c) && toggleCell(r, c)}
                    onMouseDown={(e) => handleMouseDown(r, c, e)}
                    onMouseEnter={() => handleMouseEnter(r, c)}
                  >
                    {letter}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="fwh-sidebar">
          <div className="fwh-word-panel">
            <div className="fwh-panel-title">🗡️ Words to Find</div>
            <div className="fwh-word-list">
              {TARGET_WORDS.map(w => (
                <div key={w} className={`fwh-word-item ${foundWords.has(w) ? 'found' : ''}`}>
                  {foundWords.has(w) ? '✅' : '🔍'} {w}
                </div>
              ))}
            </div>
          </div>

          <div className="fwh-progress-panel">
            <div className="fwh-progress-label">Progress</div>
            <div className="fwh-progress-track">
              <div className="fwh-progress-fill" style={{ width: `${(foundWords.size / TARGET_WORDS.length) * 100}%` }} />
            </div>
            <div className="fwh-progress-count">{foundWords.size} / {TARGET_WORDS.length}</div>
          </div>
        </div>
      </div>

      <div className="fwh-controls">
        <button
          className="fwh-btn fwh-btn-submit"
          onClick={submitSelection}
          disabled={selectedCells.length === 0}
        >
          ✔ Submit ({selWord || '…'})
        </button>
        <button
          className="fwh-btn fwh-btn-clear"
          onClick={() => setSelectedCells([])}
          disabled={selectedCells.length === 0}
        >
          ✕ Clear
        </button>
        <button className="fwh-btn fwh-btn-hint" onClick={handleHint}>
          💡 Hint
        </button>
      </div>
    </div>
  );
}
