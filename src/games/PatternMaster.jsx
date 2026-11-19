import { useState, useCallback } from 'react';
import { PATTERN_QUESTIONS } from '../data/wordLists';

const ROHAN_STYLES = `
  .pm-container {
    min-height: 100vh;
    background: linear-gradient(160deg, #2C1A00 0%, #4A2F00 30%, #7A5C1E 60%, #C6A15B 100%);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pm-header {
    text-align: center;
    margin-bottom: 1.5rem;
    animation: fadeInUp 0.6s ease;
  }
  .pm-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    color: #FFD700;
    text-shadow: 0 0 20px rgba(255,215,0,0.5), 2px 2px 4px rgba(0,0,0,0.8);
    margin-bottom: 0.25rem;
  }
  .pm-subtitle {
    color: #E9D9B7;
    font-size: 0.95rem;
    opacity: 0.85;
  }
  .pm-score-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(0,0,0,0.4);
    border: 1px solid rgba(198,161,91,0.4);
    border-radius: 50px;
    padding: 0.5rem 1.25rem;
    margin-bottom: 1.5rem;
    font-family: 'Cinzel', serif;
    color: #FFD700;
    font-size: 1rem;
    font-weight: 600;
  }
  .pm-progress-track {
    width: 100%;
    max-width: 540px;
    height: 8px;
    background: rgba(0,0,0,0.4);
    border-radius: 50px;
    overflow: hidden;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(198,161,91,0.3);
  }
  .pm-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #C6A15B, #FFD700);
    border-radius: 50px;
    transition: width 0.5s ease;
    box-shadow: 0 0 10px rgba(255,215,0,0.6);
  }
  .pm-card {
    width: 100%;
    max-width: 540px;
    background: rgba(20, 10, 0, 0.75);
    border: 2px solid rgba(198,161,91,0.5);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,215,0,0.1);
    animation: slideUp 0.4s ease;
  }
  .pm-round-label {
    font-family: 'Cinzel', serif;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #C6A15B;
    margin-bottom: 0.75rem;
  }
  .pm-sequence {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.3rem, 3.5vw, 1.9rem);
    color: #FFD700;
    text-align: center;
    padding: 1.25rem;
    background: rgba(198,161,91,0.1);
    border-radius: 12px;
    border: 1px solid rgba(198,161,91,0.3);
    margin-bottom: 1.5rem;
    letter-spacing: 1px;
    text-shadow: 0 0 10px rgba(255,215,0,0.4);
  }
  .pm-answers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }
  @media (max-width: 480px) {
    .pm-answers { grid-template-columns: 1fr; }
  }
  .pm-answer-btn {
    padding: 0.9rem 1rem;
    border-radius: 12px;
    border: 2px solid rgba(198,161,91,0.4);
    background: rgba(60,35,0,0.7);
    color: #E9D9B7;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 52px;
    text-align: center;
    -webkit-tap-highlight-color: transparent;
  }
  .pm-answer-btn:hover:not(:disabled) {
    background: rgba(198,161,91,0.25);
    border-color: #FFD700;
    color: #FFD700;
    transform: translateY(-2px);
  }
  .pm-answer-btn.correct {
    background: rgba(34,139,34,0.6);
    border-color: #2ECC71;
    color: #fff;
    box-shadow: 0 0 16px rgba(46,204,113,0.5);
  }
  .pm-answer-btn.wrong {
    background: rgba(180,30,30,0.6);
    border-color: #E74C3C;
    color: #fff;
  }
  .pm-answer-btn.reveal-correct {
    background: rgba(34,139,34,0.4);
    border-color: #2ECC71;
    color: #2ECC71;
  }
  .pm-answer-btn:disabled { cursor: default; }
  .pm-feedback {
    text-align: center;
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 1rem;
    animation: fadeIn 0.3s ease;
  }
  .pm-feedback.correct { background: rgba(46,204,113,0.15); border: 1px solid rgba(46,204,113,0.4); }
  .pm-feedback.wrong { background: rgba(231,76,60,0.15); border: 1px solid rgba(231,76,60,0.4); }
  .pm-feedback-icon { font-size: 1.8rem; margin-bottom: 0.4rem; }
  .pm-feedback-text { color: #E9D9B7; font-size: 0.95rem; line-height: 1.5; }
  .pm-next-btn {
    width: 100%;
    padding: 0.9rem;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #C6A15B, #FFD700);
    color: #2C1A00;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Cinzel', serif;
    letter-spacing: 1px;
  }
  .pm-next-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,215,0,0.4); }
  .pm-result-card {
    width: 100%;
    max-width: 540px;
    text-align: center;
    background: rgba(20,10,0,0.8);
    border: 2px solid rgba(198,161,91,0.6);
    border-radius: 20px;
    padding: 2.5rem 2rem;
    animation: fadeInUp 0.6s ease;
  }
  .pm-result-icon { font-size: 4rem; margin-bottom: 0.75rem; }
  .pm-result-title {
    font-family: 'Cinzel', serif;
    font-size: 1.8rem;
    color: #FFD700;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 15px rgba(255,215,0,0.5);
  }
  .pm-result-score {
    font-size: 3rem;
    font-family: 'Cinzel', serif;
    color: #FFD700;
    margin: 0.5rem 0;
  }
  .pm-result-msg { color: #E9D9B7; margin-bottom: 1.5rem; line-height: 1.6; }
  .pm-stars { font-size: 2rem; margin-bottom: 1rem; letter-spacing: 4px; }
`;

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

export default function PatternMaster({ onComplete }) {
  injectStyles('pm-styles', ROHAN_STYLES);

  const [questions] = useState(() => pickRandom(PATTERN_QUESTIONS, 5));
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQ];

  const handleAnswer = useCallback((choice) => {
    if (answered) return;
    setSelected(choice);
    setAnswered(true);
    if (choice === question.answer) {
      setScore(s => s + 1);
    }
  }, [answered, question]);

  const handleNext = useCallback(() => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  }, [currentQ, questions.length]);

  const handleTryAgain = useCallback(() => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setFinished(false);
  }, []);

  const progressPct = ((currentQ + (answered ? 1 : 0)) / questions.length) * 100;

  if (finished) {
    const passed = score >= 4;
    const stars = score >= 5 ? '⭐⭐⭐' : score >= 4 ? '⭐⭐' : '⭐';
    return (
      <div className="pm-container">
        <div className="pm-result-card">
          <div className="pm-result-icon">{passed ? '🏆' : '⚔️'}</div>
          <div className="pm-stars">{stars}</div>
          <div className="pm-result-title">{passed ? 'The Riddermark is Yours!' : 'The Plains Await You'}</div>
          <div className="pm-result-score">{score}/5</div>
          <p className="pm-result-msg">
            {passed
              ? `Éomer himself would approve! You answered ${score} out of 5 correctly. The riders of Rohan salute you!`
              : `A valiant effort! You answered ${score} out of 5. Even the greatest riders fell before they mastered the patterns.`}
          </p>
          {passed ? (
            <button className="pm-next-btn" onClick={() => onComplete(true)}>
              Claim Your Token 🏅
            </button>
          ) : (
            <button className="pm-next-btn" onClick={handleTryAgain}>
              ⚔️ Ride Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="pm-container">
      <div className="pm-header">
        <div className="pm-title">⚔️ Pattern Master ⚔️</div>
        <div className="pm-subtitle">The Riddles of the Riddermark</div>
      </div>

      <div className="pm-score-bar">
        <span>🏇 Score: {score}/{questions.length}</span>
        <span style={{ opacity: 0.6 }}>|</span>
        <span>Question {currentQ + 1} of {questions.length}</span>
      </div>

      <div className="pm-progress-track">
        <div className="pm-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="pm-card">
        <div className="pm-round-label">Complete the Sequence</div>
        <div className="pm-sequence">{question.sequence}</div>

        <div className="pm-answers">
          {(question.choices || question.options || []).map((choice) => {
            let cls = 'pm-answer-btn';
            if (answered) {
              if (choice === question.answer) cls += ' reveal-correct';
              if (choice === selected && choice !== question.answer) cls += ' wrong';
              if (choice === selected && choice === question.answer) cls = 'pm-answer-btn correct';
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

        {answered && (
          <div className={`pm-feedback ${selected === question.answer ? 'correct' : 'wrong'}`}>
            <div className="pm-feedback-icon">
              {selected === question.answer ? '✅' : '❌'}
            </div>
            <div className="pm-feedback-text">
              {selected === question.answer
                ? `Correct! ${question.explanation}`
                : `The answer is "${question.answer}". ${question.explanation}`}
            </div>
          </div>
        )}

        {answered && (
          <button className="pm-next-btn" onClick={handleNext}>
            {currentQ < questions.length - 1 ? 'Next Challenge →' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
}
