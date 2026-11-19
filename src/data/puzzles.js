// All sudoku puzzles use 0 for empty cells.
// Each row, column, and 2×3 box (2 rows × 3 cols) contains digits 1-6 exactly once.

export const SUDOKU_PUZZLES = [
  {
    // Puzzle 1 — difficulty: easy
    puzzle: [
      [1,2,3,4,5,6],
      [4,5,6,1,2,0],
      [2,1,0,3,6,5],
      [3,6,5,0,1,4],
      [5,3,1,6,4,2],
      [6,4,2,5,0,1],
    ],
    solution: [
      [1,2,3,4,5,6],
      [4,5,6,1,2,3],
      [2,1,4,3,6,5],
      [3,6,5,2,1,4],
      [5,3,1,6,4,2],
      [6,4,2,5,3,1],
    ],
  },
  {
    // Puzzle 2 — difficulty: medium
    puzzle: [
      [1,0,3,4,5,0],
      [4,5,0,1,0,3],
      [0,3,4,5,6,1],
      [5,6,1,0,3,4],
      [3,0,5,6,1,2],
      [6,1,2,0,4,5],
    ],
    solution: [
      [1,2,3,4,5,6],
      [4,5,6,1,2,3],
      [2,3,4,5,6,1],
      [5,6,1,2,3,4],
      [3,4,5,6,1,2],
      [6,1,2,3,4,5],
    ],
  },
  {
    // Puzzle 3 — difficulty: hard
    puzzle: [
      [6,1,4,5,3,0],
      [5,3,2,6,1,4],
      [1,2,0,4,6,3],
      [4,6,3,1,2,5],
      [2,0,6,3,4,1],
      [3,4,1,2,0,6],
    ],
    solution: [
      [6,1,4,5,3,2],
      [5,3,2,6,1,4],
      [1,2,5,4,6,3],
      [4,6,3,1,2,5],
      [2,5,6,3,4,1],
      [3,4,1,2,5,6],
    ],
  },
];

// Word search grid: 10×10 uppercase letters.
// Hidden words and their positions are listed in wordPositions.
// direction: 'H' = horizontal left-to-right, 'V' = vertical top-to-bottom,
//            'D' = diagonal (down-right), 'HR' = horizontal right-to-left

export const WORD_SEARCH_PUZZLES = [
  {
    grid: [
      // Col: 0    1    2    3    4    5    6    7    8    9
      ['M', 'A', 'G', 'I', 'C', 'B', 'R', 'K', 'V', 'H'], // row 0
      ['T', 'N', 'Z', 'P', 'F', 'W', 'X', 'D', 'S', 'E'], // row 1
      ['L', 'J', 'B', 'Q', 'U', 'E', 'S', 'T', 'Y', 'A'], // row 2
      ['K', 'R', 'V', 'N', 'Z', 'P', 'F', 'W', 'X', 'R'], // row 3
      ['G', 'D', 'S', 'T', 'L', 'J', 'B', 'Q', 'C', 'T'], // row 4
      ['N', 'Z', 'D', 'R', 'E', 'A', 'M', 'P', 'F', 'W'], // row 5
      ['X', 'B', 'K', 'V', 'N', 'Z', 'T', 'L', 'J', 'B'], // row 6
      ['Q', 'C', 'F', 'G', 'D', 'L', 'O', 'V', 'E', 'S'], // row 7
      ['T', 'W', 'P', 'X', 'B', 'K', 'V', 'N', 'Z', 'C'], // row 8
      ['J', 'R', 'B', 'Q', 'C', 'F', 'G', 'D', 'T', 'L'], // row 9
    ],
    words: ['MAGIC', 'QUEST', 'HEART', 'DREAM', 'LOVE'],
    wordPositions: [
      { word: 'MAGIC', startRow: 0, startCol: 0, direction: 'H' },
      { word: 'QUEST', startRow: 2, startCol: 3, direction: 'H' },
      { word: 'HEART', startRow: 0, startCol: 9, direction: 'V' },
      { word: 'DREAM', startRow: 5, startCol: 2, direction: 'H' },
      { word: 'LOVE',  startRow: 7, startCol: 5, direction: 'H' },
    ],
  },
];
