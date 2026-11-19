# The Fellowship of Seven 💍✨
### A 7th Monthsary Interactive Fantasy Adventure Puzzle Game

> *"A Journey Through Seven Trials, Made Just for You."*

---

## 🌟 Overview

**The Fellowship of Seven** is a fully responsive, mobile-first browser game built with React and Vite as a 7th monthsary gift. Inspired by the atmosphere of *The Lord of the Rings*, the charm of personal romantic storytelling, and playful pop culture references (including hip-hop rhyme battles), the player embarks on an epic journey across seven sequential checkpoints to unlock a romantic final surprise.

---

## 🗺️ The Seven Checkpoints & Trials

1. **The Shire — The Wordsmith's Trial** (*Word Detective*)
   - Guess the hidden 5-letter fantasy word within 6 attempts.
   - On-screen touch keyboard + physical keyboard support with color-coded feedback tiles (green, gold, gray).
   - **Award:** *THE TOKEN OF WISDOM*

2. **Rivendell — The Memory of the Elves** (*Memory Match*)
   - Flip cards to match 6 enchanted pairs (`💍`, `⭐`, `🍃`, `⚔️`, `👑`, `💎`).
   - Move counter, live timer, and 3D flip card animations.
   - **Award:** *THE TOKEN OF MEMORY*

3. **Moria — The Dwarven Logic Trial** (*Mini Sudoku*)
   - Fill a 6×6 rune grid so each row, column, and 2×3 dwarven chamber contains numbers 1–6 without repetition.
   - Cell selection, row/column/box highlighting, number pad, error detection, erase, and hints.
   - **Award:** *THE TOKEN OF LOGIC*

4. **The Ancient Forest — The Codebreaker's Trial** (*Code Breaker*)
   - Deduce the 4-color secret rune code from 6 mystical colors in 10 attempts.
   - Black pegs for exact match, white pegs for right color in the wrong position.
   - **Award:** *THE TOKEN OF DEDUCTION*

5. **Road to Rohan — The Pattern Master** (*Pattern Master*)
   - Solve 5 pattern and sequence puzzles selected randomly across numbers, squares, and Fibonacci sequences.
   - Immediate feedback and mathematical explanations.
   - **Award:** *THE TOKEN OF FORESIGHT*

6. **Mordor — The Rap Battle of Words** (*Rap Word Challenge*)
   - A fast-paced rhyme challenge with a 15-second countdown timer and volcanic animations.
   - Pick rhymes, complete bars, and test lyrical flow.
   - **Award:** *THE TOKEN OF RHYTHM*

7. **Mount Doom — The Final Trial** (*Final Word Hunt*)
   - 10×10 letter grid to find five sacred hidden words: `MAGIC`, `QUEST`, `HEART`, `DREAM`, `LOVE`.
   - Tap-to-select word builder or click-and-drag desktop support with hint assistance.
   - **Award:** *THE TOKEN OF DESTINY*

---

## 💌 The Companion Character & Romantic Ending

- **Companion Character:** An original illustrated male companion (dark hair, glasses, friendly smile, traveler's cloak and satchel) who encourages her before and after every trial with tailored messages.
- **Special Final Ending:** Once all 7 tokens are collected, the final destination at Mount Doom unlocks:
  - Atmospheric sunset, glowing One Ring, floating gold particles, and token celebration.
  - An interactive **"Open Your Surprise ❤️"** button that fires celebratory confetti and reveals an animated love letter.

---

## 🛠️ How to Customize

All messages, letters, and puzzle questions are clearly centralized in source files for easy customization:

| To Customize | File Path | What to Edit |
|---|---|---|
| **Love Letter & Ending Message** | `src/pages/FinalEnding.jsx` | `ROMANTIC_MESSAGE`, `LETTER_CONTENT`, `FINAL_FOOTER_MESSAGE` |
| **Checkpoints & Encouragements** | `src/data/checkpoints.js` | `CHECKPOINTS` array (name, subtitle, description, encouragement, token) |
| **Wordle Word Bank** | `src/data/wordLists.js` | `WORD_BANK` (5-letter words) |
| **Rap Challenge Questions** | `src/data/wordLists.js` | `RAP_QUESTIONS` array |
| **Pattern Sequence Questions** | `src/data/wordLists.js` | `PATTERN_QUESTIONS` array |
| **Sudoku & Word Search Puzzles** | `src/data/puzzles.js` | `SUDOKU_PUZZLES` & `WORD_SEARCH_PUZZLES` |
| **Companion Character Visuals** | `src/components/Companion.jsx` | Colors, clothing, skin tone, hair, and expressions |

---

## 💻 Running Locally

Ensure you have [Node.js](https://nodejs.org/) (v18+) installed:

```bash
# Navigate to the project directory
cd fellowship-of-seven

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🚀 Deploying to Render (Free Static Site)

1. **Push your code to GitHub / GitLab:**
   ```bash
   git init
   git add .
   git commit -m "The Fellowship of Seven - 7th Monthsary App"
   git remote add origin https://github.com/<your-username>/fellowship-of-seven.git
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Log in to [Render Dashboard](https://dashboard.render.com/).
   - Click **New +** > **Static Site**.
   - Connect your repository.
   - Set the configuration:
     - **Name:** `fellowship-of-seven` (or your choice)
     - **Branch:** `main`
     - **Build Command:** `npm install && npm run build`
     - **Publish Directory:** `dist`
   - Under **Redirects/Rewrites**:
     - **Type:** `Rewrite`
     - **Source:** `/*`
     - **Destination:** `/index.html`
     *(This ensures page refreshes on `/map`, `/game/0`, `/ending` work without 404s; `render.yaml` is also included in the repository).*
   - Click **Create Static Site**!
