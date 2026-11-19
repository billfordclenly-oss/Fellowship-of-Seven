import { useState, useEffect, useCallback, useRef } from 'react';
import { RAP_QUESTIONS } from '../data/wordLists';

const MORDOR_STYLES = `
  .rap-container {
    min-height: 100vh;
    background: linear-gradient(160deg, #0A0000 0%, #1A0500 40%, #2D0A00 70%, #450E00 100%);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  .rap-lava-glow {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    height: 120px;
    background: linear-gradient(to top, rgba(200,50,0,0.35), transparent);
    pointer-events: none;
    z-index: 0;
    animation: lava-pulse 3s ease-in-out infinite;
  }
  @keyframes lava-pulse {
    0%,100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  .rap-header {
    text-align: center;
    margin-bottom: 1.25rem;
    animation: fadeInUp 0.6s ease;
    position: relative; z-index: 1;
  }
  .rap-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.5rem, 4vw, 2.2rem);
    color: #FF4500;
    text-shadow: 0 0 20px rgba(255,69,0,0.7), 0 0 40px rgba(255,69,0,0.3);
    margin-bottom: 0.2rem;
  }
  .rap-subtitle {
    color: #E9D9B7;
    font-size: 0.9rem;
    opacity: 0.8;
  }
  .rap-round-banner {
    width: 100%;
    max-width: 540px;
    text-align: center;
    padding: 0.6rem 1.5rem;
    background: rgba(255,69,0,0.15);
    border: 1px solid rgba(255,69,0,0.4);
    border-radius: 50px;
    margin-bottom: 1rem;
    font-family: 'Cinzel', serif;
    color: #FF8C00;
    font-size: 0.95rem;
    letter-spacing: 1px;
    position: relative; z-index: 1;
  }
  .rap-score-row {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: 1rem;
    color: #FF8C00;
    font-weight: 700;
    font-size: 1rem;
    position: relative; z-index: 1;
  }
  .rap-mute-btn {
    background: none;
    border: 1px solid rgba(255,69,0,0.4);
    border-radius: 8px;
    color: #FF8C00;
    cursor: pointer;
    padding: 0.3rem 0.6rem;
    font-size: 1.1rem;
    transition: all 0.2s;
  }
  .rap-mute-btn:hover { background: rgba(255,69,0,0.2); }
  .rap-timer-track {
    width: 100%;
    max-width: 540px;
    height: 10px;
    background: rgba(0,0,0,0.5);
    border-radius: 50px;
    overflow: hidden;
    margin-bottom: 1.25rem;
    border: 1px solid rgba(255,69,0,0.3);
    position: relative; z-index: 1;
  }
  .rap-timer-fill {
    height: 100%;
    border-radius: 50px;
    transition: width 1s linear, background 1s linear;
    box-shadow: 0 0 10px currentColor;
  }
  .rap-card {
    width: 100%;
    max-width: 540px;
    background: rgba(10,0,0,0.85);
    border: 2px solid rgba(255,69,0,0.4);
    border-radius: 20px;
    padding: 1.75rem;
    box-shadow: 0 8px 40px rgba(0,0,0,0.8), 0 0 30px rgba(255,69,0,0.1);
    animation: slideUp 0.4s ease;
    position: relative; z-index: 1;
  }
  .rap-flavor {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  .rap-flavor-text {
    text-align: center;
    color: #FF8C00;
    font-weight: 700;
    font-size: 0.95rem;
    margin-bottom: 1rem;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .rap-prompt {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.1rem, 3vw, 1.5rem);
    color: #FFD700;
    text-align: center;
    padding: 1rem 1.25rem;
    background: rgba(255,69,0,0.1);
    border-radius: 12px;
    border: 1px solid rgba(255,69,0,0.3);
    margin-bottom: 1.5rem;
    line-height: 1.4;
  }
  .rap-answers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 480px) {
    .rap-answers { grid-template-columns: 1fr; }
    .rap-answer-btn { min-height: 60px; font-size: 1.05rem; }
  }
  .rap-answer-btn {
    padding: 1rem;
    border-radius: 12px;
    border: 2px solid rgba(255,69,0,0.35);
    background: rgba(60,10,0,0.8);
    color: #E9D9B7;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 56px;
    text-align: center;
    -webkit-tap-highlight-color: transparent;
  }
  .rap-answer-btn:hover:not(:disabled) {
    background: rgba(255,69,0,0.25);
    border-color: #FF4500;
    color: #FFD700;
    transform: translateY(-2px);
  }
  .rap-answer-btn.correct {
    background: rgba(34,139,34,0.6);
    border-color: #2ECC71;
    color: #fff;
    box-shadow: 0 0 16px rgba(46,204,113,0.5);
  }
  .rap-answer-btn.wrong {
    background: rgba(180,30,30,0.6);
    border-color: #E74C3C;
    color: #fff;
  }
  .rap-answer-btn.reveal-correct {
    background: rgba(34,139,34,0.4);
    border-color: #2ECC71;
    color: #2ECC71;
  }
  .rap-answer-btn:disabled { cursor: default; }
  .rap-feedback {
    text-align: center;
    padding: 0.9rem;
    border-radius: 12px;
    margin-bottom: 0.75rem;
    animation: fadeIn 0.3s ease;
  }
  .rap-feedback.correct { background: rgba(46,204,113,0.15); border: 1px solid rgba(46,204,113,0.4); }
  .rap-feedback.wrong { background: rgba(231,76,60,0.15); border: 1px solid rgba(231,76,60,0.4); }
  .rap-feedback-icon { font-size: 1.6rem; margin-bottom: 0.3rem; }
  .rap-feedback-text { color: #E9D9B7; font-size: 0.9rem; line-height: 1.4; }
  .rap-timeout-msg {
    text-align: center;
    padding: 0.9rem;
    border-radius: 12px;
    background: rgba(255,140,0,0.15);
    border: 1px solid rgba(255,140,0,0.4);
    color: #FF8C00;
    font-weight: 700;
    margin-bottom: 0.75rem;
    animation: fadeIn 0.3s ease;
  }
  .rap-result-card {
    width: 100%;
    max-width: 540px;
    text-align: center;
    background: rgba(10,0,0,0.9);
    border: 2px solid rgba(255,69,0,0.5);
    border-radius: 20px;
    padding: 2.5rem 2rem;
    animation: fadeInUp 0.6s ease;
    position: relative; z-index: 1;
  }
  .rap-result-icon { font-size: 4rem; margin-bottom: 0.5rem; }
  .rap-result-title {
    font-family: 'Cinzel', serif;
    font-size: 1.8rem;
    color: #FF4500;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 15px rgba(255,69,0,0.5);
  }
  .rap-result-score {
    font-size: 3rem;
    font-family: 'Cinzel', serif;
    color: #FFD700;
    margin: 0.5rem 0;
  }
  .rap-result-msg { color: #E9D9B7; margin-bottom: 1.5rem; line-height: 1.6; }
  .rap-next-btn {
    width: 100%;
    padding: 1rem;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #C0392B, #FF4500);
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Cinzel', serif;
    letter-spacing: 1px;
  }
  .rap-next-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,69,0,0.5); }
  .rap-timer-label {
    text-align: right;
    font-size: 0.85rem;
    color: #FF8C00;
    margin-bottom: 0.25rem;
    position: relative; z-index: 1;
    width: 100%;
    max-width: 540px;
  }
`;

const TIMER_DURATION = 15;
const FLAVOR_TEXTS = ['🎤 Spit your answer, MC!', '🔥 Drop the right bar!', '🎧 Feel the beat — answer fast!', '🎤 Show what you know!', '🔥 The mic is YOURS — answer!'];

function injectStyles(id, css) {
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }
}

function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function getTimerColor(timeLeft) {
  if (timeLeft > 10) return '#2ECC71';
  if (timeLeft > 5) return '#FF8C00';
  return '#FF4500';
}

export default function RapWordChallenge({ onComplete }) {
  injectStyles('rap-styles', MORDOR_STYLES);

  const [questions] = useState(() => pickRandom(RAP_QUESTIONS, 5));
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [finished, setFinished] = useState(false);
  const [muted, setMuted] = useState(false);
  const timerRef = useRef(null);
  const autoAdvanceRef = useRef(null);

  const question = questions[currentQ];

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const advanceQuestion = useCallback(() => {
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setAnswered(false);
      setTimedOut(false);
      setTimeLeft(TIMER_DURATION);
    } else {
      setFinished(true);
    }
  }, [currentQ, questions.length]);

  const handleTimeout = useCallback(() => {
    stopTimer();
    setTimedOut(true);
    setAnswered(true);
    autoAdvanceRef.current = setTimeout(advanceQuestion, 2500);
  }, [stopTimer, advanceQuestion]);

  // Start timer for each question
  useEffect(() => {
    if (answered || finished) return;
    setTimeLeft(TIMER_DURATION);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentQ, finished]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAnswer = useCallback((choice) => {
    if (answered) return;
    stopTimer();
    setSelected(choice);
    setAnswered(true);
    if (choice === question.answer) setScore(s => s + 1);
    autoAdvanceRef.current = setTimeout(advanceQuestion, 2200);
  }, [answered, question, stopTimer, advanceQuestion]);

  const handleTryAgain = useCallback(() => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setTimedOut(false);
    setFinished(false);
    setTimeLeft(TIMER_DURATION);
  }, []);

  useEffect(() => () => {
    stopTimer();
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
  }, [stopTimer]);

  const timerPct = (timeLeft / TIMER_DURATION) * 100;
  const timerColor = getTimerColor(timeLeft);
  const flavorText = FLAVOR_TEXTS[currentQ % FLAVOR_TEXTS.length];

  if (finished) {
    const passed = score >= 4;
    return (
      <div className="rap-container">
        <div className="rap-lava-glow" />
        <div className="rap-result-card">
          <div className="rap-result-icon">{passed ? '🎤' : '🔥'}</div>
          <div className="rap-result-title">{passed ? 'Mic Dropped! 🔥' : 'Keep Spitting!'}</div>
          <div className="rap-result-score">{score}/5</div>
          <p className="rap-result-msg">
            {passed
              ? `${score}/5 right! You flow like the fires of Mordor — unstoppable and legendary!`
              : `${score}/5 — The rap battle rages on. Even the best MCs have to practice!`}
          </p>
          {passed ? (
            <button className="rap-next-btn" onClick={() => onComplete(true)}>
              Claim Your Token 🏅
            </button>
          ) : (
            <button className="rap-next-btn" onClick={handleTryAgain}>
              🎤 Battle Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rap-container">
      <div className="rap-lava-glow" />

      <div className="rap-header">
        <div className="rap-title">🎤 Rap Word Challenge 🎤</div>
        <div className="rap-subtitle">The Rhymes of Mount Doom</div>
      </div>

      <div className="rap-round-banner">
        🔥 Round {currentQ + 1} — Drop Your Best Answer! 🔥
      </div>

      <div className="rap-score-row">
        <span>🎧 Score: {score}/{questions.length}</span>
        <span style={{ opacity: 0.5 }}>|</span>
        <span>Q {currentQ + 1}/{questions.length}</span>
        <button className="rap-mute-btn" onClick={() => setMuted(m => !m)}>
          {muted ? '🔇' : '🔊'}
        </button>
      </div>

      <div className="rap-timer-label">{timeLeft}s remaining</div>
      <div className="rap-timer-track">
        <div
          className="rap-timer-fill"
          style={{
            width: `${timerPct}%`,
            background: `linear-gradient(90deg, #800000, ${timerColor})`,
            color: timerColor,
          }}
        />
      </div>

      <div className="rap-card">
        <div className="rap-flavor">🎤</div>
        <div className="rap-flavor-text">{flavorText}</div>
        <div className="rap-prompt">{question.prompt}</div>

        <div className="rap-answers">
          {(question.choices || question.options || []).map((choice) => {
            let cls = 'rap-answer-btn';
            if (answered) {
              if (choice === question.answer) cls += ' reveal-correct';
              if (choice === selected && choice !== question.answer) cls += ' wrong';
              if (choice === selected && choice === question.answer) cls = 'rap-answer-btn correct';
            }
            return (
              <button
                key={choice}
                className={cls}
                onClick={() => handleAnswer(choice)}
                disabled={answered}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {timedOut && (
          <div className="rap-timeout-msg">
            ⏰ Time's up! The answer was "{question.answer}"
          </div>
        )}

        {answered && !timedOut && (
          <div className={`rap-feedback ${selected === question.answer ? 'correct' : 'wrong'}`}>
            <div className="rap-feedback-icon">
              {selected === question.answer ? '🔥 Yes!' : '❌ Nah!'}
            </div>
            <div className="rap-feedback-text">
              {selected === question.answer
                ? question.explanation
                : `The answer is "${question.answer}". ${question.explanation}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
