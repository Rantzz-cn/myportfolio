import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Button } from './Button';

const RANIER_WPM = 91;

const TRIVIA_QUOTES = [
  {
    text: "Clean code always looks like it was written by someone who cares.",
    author: "Robert C. Martin",
    category: "Software Craftsmanship",
  },
  {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
    category: "Computer Science",
  },
  {
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    category: "Open Source",
  },
  {
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
    category: "XP & TDD",
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
    category: "Code Readability",
  },
];

export function TypingChallenge() {
  const sectionRef = useScrollReveal(
    '.typing__hud, .typing__box, .typing__result',
    { translateY: [18, 0], duration: 800, easing: 'easeOutQuad' },
    { threshold: 0.15 }
  );

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef(null);

  const currentQuote = TRIVIA_QUOTES[quoteIndex].text;
  const currentAuthor = TRIVIA_QUOTES[quoteIndex].author;
  const currentCategory = TRIVIA_QUOTES[quoteIndex].category;

  // Live timer tick
  useEffect(() => {
    let timer = null;
    if (startTime && !isCompleted) {
      timer = setInterval(() => {
        const seconds = (Date.now() - startTime) / 1000;
        setElapsedSeconds(seconds);

        // Calculate live WPM
        if (seconds > 0.5) {
          const wordsTyped = userInput.length / 5;
          const calculatedWpm = Math.round((wordsTyped / seconds) * 60);
          setWpm(calculatedWpm);
        }
      }, 100);
    }
    return () => clearInterval(timer);
  }, [startTime, isCompleted, userInput.length]);

  // Handle typing input
  function handleInputChange(e) {
    const val = e.target.value;
    if (isCompleted) return;

    if (!startTime) {
      setStartTime(Date.now());
    }

    setUserInput(val);

    // Calculate accuracy
    let correctCount = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === currentQuote[i]) {
        correctCount++;
      }
    }
    const acc = val.length > 0 ? Math.round((correctCount / val.length) * 100) : 100;
    setAccuracy(acc);

    // Completion check
    if (val.length >= currentQuote.length) {
      setIsCompleted(true);
      const totalTimeSec = (Date.now() - (startTime || Date.now())) / 1000;
      setElapsedSeconds(totalTimeSec);
      const finalWords = currentQuote.length / 5;
      const finalWpm = Math.round((finalWords / Math.max(totalTimeSec, 0.5)) * 60);
      setWpm(finalWpm);
    }
  }

  function resetTest() {
    setUserInput('');
    setStartTime(null);
    setElapsedSeconds(0);
    setIsCompleted(false);
    setWpm(0);
    setAccuracy(100);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function nextQuote() {
    setQuoteIndex((prev) => (prev + 1) % TRIVIA_QUOTES.length);
    resetTest();
  }

  function focusInput() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  // Calculate comparative feedback vs Ranier's 91 WPM
  function getComparisonVerdict() {
    if (wpm > RANIER_WPM) {
      return {
        badge: '🚀 HIGHER THAN RANIER',
        text: `Incredible typing speed! You beat Ranier's benchmark of ${RANIER_WPM} WPM by +${wpm - RANIER_WPM} WPM.`,
        variant: 'success',
      };
    } else if (wpm === RANIER_WPM) {
      return {
        badge: '🎯 PERFECT MATCH',
        text: `Matched Ranier's exact benchmark of ${RANIER_WPM} WPM! Outstanding precision.`,
        variant: 'match',
      };
    } else {
      const diff = RANIER_WPM - wpm;
      return {
        badge: '⚡ CHALLENGER MODE',
        text: `Great effort! Ranier's benchmark is ${RANIER_WPM} WPM (+${diff} WPM ahead). Give it another shot!`,
        variant: 'challenger',
      };
    }
  }

  const verdict = isCompleted ? getComparisonVerdict() : null;

  return (
    <section id="typing-test" className="section" aria-label="Typing Speed Challenge">
      <div className="container" ref={sectionRef}>
        <div className="section__header">
          <span className="section__eyebrow">Interactive Speed Test</span>
          <h2 className="section__title">Typing Challenge vs Ranier</h2>
          <p className="section__subtitle">
            Ranier's average typing speed is <strong style={{ color: 'var(--color-accent)' }}>91 WPM</strong>.
            Type the developer trivia quote below to test your typing speed against his benchmark.
          </p>
        </div>

        {/* Live HUD Stats */}
        <div className="typing__hud" aria-label="Live Typing Metrics">
          <div className="typing__stat">
            <span className="typing__stat-label">Ranier's Speed</span>
            <span className="typing__stat-value typing__stat-value--benchmark">
              91 <small>WPM</small>
            </span>
          </div>
          <div className="typing__stat">
            <span className="typing__stat-label">Your Speed</span>
            <span className="typing__stat-value">
              {wpm} <small>WPM</small>
            </span>
          </div>
          <div className="typing__stat">
            <span className="typing__stat-label">Accuracy</span>
            <span className="typing__stat-value">{accuracy}%</span>
          </div>
          <div className="typing__stat">
            <span className="typing__stat-label">Time</span>
            <span className="typing__stat-value">{elapsedSeconds.toFixed(1)}s</span>
          </div>
        </div>

        {/* Interactive Typing Box */}
        <div className="typing__box" onClick={focusInput} role="region" aria-label="Quote typing area">
          <div className="typing__box-header">
            <span className="typing__box-tag">TRIVIA / {currentCategory.toUpperCase()}</span>
            <span className="typing__box-author">— {currentAuthor}</span>
          </div>

          <div className="typing__quote-display" tabIndex="0" onKeyDown={focusInput}>
            {currentQuote.split('').map((char, index) => {
              let charClass = '';
              if (index < userInput.length) {
                charClass = userInput[index] === char ? 'is-correct' : 'is-incorrect';
              } else if (index === userInput.length) {
                charClass = 'is-current';
              }
              return (
                <span key={index} className={`typing__char ${charClass}`}>
                  {char}
                </span>
              );
            })}
          </div>

          <input
            ref={inputRef}
            type="text"
            className="typing__hidden-input"
            value={userInput}
            onChange={handleInputChange}
            disabled={isCompleted}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            aria-label="Type quote here"
          />
        </div>

        {/* Action Toolbar */}
        <div className="typing__actions">
          <Button variant="outline" onClick={resetTest}>
            Reset Test
          </Button>
          <Button variant="outline" onClick={nextQuote} icon="→">
            Next Quote
          </Button>
        </div>

        {/* Completion Result Card */}
        {isCompleted && verdict && (
          <div className={`typing__result typing__result--${verdict.variant}`}>
            <div className="typing__result-badge">{verdict.badge}</div>
            <p className="typing__result-text">{verdict.text}</p>
            <div className="typing__result-stats">
              <span>Your Result: <strong>{wpm} WPM</strong></span>
              <span>Ranier's Benchmark: <strong>{RANIER_WPM} WPM</strong></span>
              <span>Accuracy: <strong>{accuracy}%</strong></span>
            </div>
            <Button variant="primary" onClick={nextQuote} className="typing__result-btn">
              Try Another Quote
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
