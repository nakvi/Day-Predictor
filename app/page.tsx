"use client";

import { useState, useEffect } from "react";

const developerPredictions = {
  Monday: [
    "You will fix one bug and create two new ones. Net progress: -1 bug 😄",
    "You'll spend 47 minutes finding a missing semicolon. Worth it.",
    "Standup will run 3x longer than planned. Nobody will know why.",
  ],
  Tuesday: [
    "A client will say 'just a small change'... it will take 3 days 😅",
    "Your API will finally return 200 after 2 weeks. You won't know why.",
    "You'll rewrite the same function 4 times and use the first version.",
  ],
  Wednesday: [
    "The bug was in the config file. It always is. 😐",
    "You'll open 23 Stack Overflow tabs and close them all unsolved.",
    "Git blame reveals the bug author is... past you. Classic.",
  ],
  Thursday: [
    "You'll push to main and forget to pull first. Panic ensues. 😬",
    "Your local environment will mysteriously stop working at 4:58 PM.",
    "You'll finally understand recursion. Then immediately forget.",
  ],
  Friday: [
    "Your deploy will work on first try. You won't trust it. 😎",
    "You'll say 'one more feature' at 4 PM. It's now Monday.",
    "Production bug at 4:55 PM. Classic Friday energy.",
  ],
  Saturday: [
    "You'll open VS Code... and watch YouTube instead 😂",
    "Side project day! You'll rename variables for 3 hours.",
    "You'll redesign your portfolio for the 8th time this year.",
  ],
  Sunday: [
    "You'll plan a brilliant side project and not start it 🚀",
    "Todo list grows by 12 items. Zero get done. Productive Sunday.",
    "You'll read 5 blog posts about productivity instead of coding.",
  ],
};

const aiTools = [
  { name: "GPT-5", icon: "🤖", color: "#10a37f" },
  { name: "Claude", icon: "🧠", color: "#cc785c" },
  { name: "Gemini", icon: "✨", color: "#4285f4" },
  { name: "Grok", icon: "⚡", color: "#1da1f2" },
  { name: "Mistral", icon: "🌀", color: "#ff6b35" },
  { name: "Llama", icon: "🦙", color: "#7c3aed" },
  { name: "DeepSeek", icon: "🔍", color: "#06b6d4" },
  { name: "Perplexity", icon: "🌐", color: "#20b2aa" },
];

const dayEmojis = {
  Monday: "😩",
  Tuesday: "🌿",
  Wednesday: "⚡",
  Thursday: "🔥",
  Friday: "🎉",
  Saturday: "😴",
  Sunday: "☕",
};

const dayColors = {
  Monday:   { from: "#1a1a2e", accent: "#e94560" },
  Tuesday:  { from: "#0f2027", accent: "#43e97b" },
  Wednesday:{ from: "#1a1a2e", accent: "#f7971e" },
  Thursday: { from: "#16213e", accent: "#f953c6" },
  Friday:   { from: "#0f2027", accent: "#00d2ff" },
  Saturday: { from: "#1a1a2e", accent: "#a18cd1" },
  Sunday:   { from: "#16213e", accent: "#ffd700" },
};

export default function DevDayPredictor() {
  type Particle = { id: number; x: number; y: number; size: number; speed: number; delay: number };

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentAI, setCurrentAI] = useState<number>(0);
  const [aiProgress, setAiProgress] = useState<number>(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [glitchActive, setGlitchActive] = useState<boolean>(false);

  useEffect(() => {
    const pts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(pts);
  }, []);

  const handleClick = (day) => {
    if (loading) return;
    setSelectedDay(day);
    setPrediction("");
    setLoading(true);
    setCurrentAI(0);
    setAiProgress(0);
    setGlitchActive(true);

    setTimeout(() => setGlitchActive(false), 300);

    const list = developerPredictions[day];
    const random = list[Math.floor(Math.random() * list.length)];

    let i = 0;
    let prog = 0;

    const aiInterval = setInterval(() => {
      i++;
      setCurrentAI(i % aiTools.length);
    }, 400);

    const progInterval = setInterval(() => {
      prog += Math.random() * 15 + 5;
      if (prog > 95) prog = 95;
      setAiProgress(Math.floor(prog));
    }, 200);

    setTimeout(() => {
      clearInterval(aiInterval);
      clearInterval(progInterval);
      setAiProgress(100);
      setTimeout(() => {
        setPrediction(random);
        setLoading(false);
      }, 300);
    }, 2400);
  };

  const days = Object.keys(developerPredictions);
  const activeAccent = selectedDay ? dayColors[selectedDay].accent : "#00d2ff";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #080c14;
          font-family: 'Space Mono', monospace;
          overflow-x: hidden;
        }

        .app {
          min-height: 100vh;
          background: #080c14;
          color: #e0e8f0;
          padding: 24px 16px 60px;
          position: relative;
          overflow: hidden;
        }

        .grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,210,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,210,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        .scanline {
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.05) 2px,
            rgba(0,0,0,0.05) 4px
          );
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: fixed;
          border-radius: 50%;
          background: rgba(0,210,255,0.4);
          pointer-events: none;
          z-index: 0;
          animation: float linear infinite;
        }

        @keyframes float {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-10vh) scale(1); opacity: 0; }
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
        }

        .badge {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #00d2ff;
          border: 1px solid rgba(0,210,255,0.3);
          padding: 4px 12px;
          border-radius: 2px;
          margin-bottom: 16px;
          background: rgba(0,210,255,0.05);
        }

        .title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 6vw, 56px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1px;
          background: linear-gradient(135deg, #ffffff 0%, #00d2ff 50%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
        }

        .subtitle {
          font-size: 13px;
          color: rgba(224,232,240,0.5);
          letter-spacing: 1px;
        }

        .days-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
          margin-bottom: 32px;
        }

        @media (max-width: 480px) {
          .days-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
        }

        .day-card {
          position: relative;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 18px 16px;
          cursor: pointer;
          background: rgba(255,255,255,0.03);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          text-align: left;
          outline: none;
        }

        .day-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: 12px;
        }

        .day-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.06);
        }

        .day-card:hover::before { opacity: 1; }

        .day-card.active {
          border-color: var(--accent);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 0 1px var(--accent), 0 8px 32px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,255,255,0.02);
        }

        .day-card.active::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent);
          border-radius: 12px 12px 0 0;
        }

        .day-emoji {
          font-size: 28px;
          margin-bottom: 8px;
          display: block;
          line-height: 1;
        }

        .day-name {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.5px;
        }

        .day-label {
          font-size: 10px;
          color: rgba(224,232,240,0.35);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 3px;
        }

        .active-indicator {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px var(--accent);
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }

        .result-area {
          margin-top: 8px;
        }

        /* Loading Card */
        .loading-card {
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 28px 24px;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .loading-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .loading-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }

        .spinner-ring {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.1);
          border-top-color: var(--accent);
          animation: spin 0.8s linear infinite;
          flex-shrink: 0;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-ai-name {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          transition: all 0.2s;
        }

        .loading-ai-sub {
          font-size: 11px;
          color: rgba(224,232,240,0.4);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-top: 2px;
        }

        .ai-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .ai-chip {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: rgba(224,232,240,0.5);
          transition: all 0.2s;
          white-space: nowrap;
        }

        .ai-chip.active-chip {
          border-color: var(--accent);
          color: var(--accent);
          background: rgba(255,255,255,0.08);
          box-shadow: 0 0 8px rgba(0,210,255,0.2);
        }

        .progress-bar-wrap {
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
          overflow: hidden;
          height: 6px;
          margin-bottom: 8px;
        }

        .progress-bar-fill {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, var(--accent), #a855f7);
          transition: width 0.3s ease;
          box-shadow: 0 0 8px var(--accent);
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: rgba(224,232,240,0.35);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* Result Card */
        .result-card {
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          overflow: hidden;
          animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }

        .result-header {
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .result-day-emoji {
          font-size: 36px;
          line-height: 1;
        }

        .result-day-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
        }

        .result-day-meta {
          font-size: 11px;
          color: rgba(224,232,240,0.4);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 2px;
        }

        .result-body {
          padding: 24px;
        }

        .result-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--accent);
          background: rgba(0,210,255,0.08);
          border: 1px solid rgba(0,210,255,0.2);
          padding: 4px 10px;
          border-radius: 4px;
          margin-bottom: 14px;
        }

        .result-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 6px var(--accent);
          animation: pulse 1.5s infinite;
        }

        .result-text {
          font-size: clamp(14px, 3vw, 17px);
          line-height: 1.7;
          color: rgba(224,232,240,0.9);
          font-style: italic;
          border-left: 2px solid var(--accent);
          padding-left: 16px;
        }

        .result-footer {
          padding: 14px 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: gap;
          gap: 8px;
        }

        .result-footer-text {
          font-size: 10px;
          color: rgba(224,232,240,0.3);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .accuracy-badge {
          font-size: 11px;
          color: #43e97b;
          background: rgba(67,233,123,0.1);
          border: 1px solid rgba(67,233,123,0.2);
          padding: 3px 10px;
          border-radius: 20px;
        }

        .glitch {
          animation: glitch 0.3s steps(2) forwards;
        }

        @keyframes glitch {
          0% { transform: translate(0); filter: none; }
          20% { transform: translate(-4px, 2px); filter: hue-rotate(90deg); }
          40% { transform: translate(4px, -2px); filter: hue-rotate(180deg); }
          60% { transform: translate(-2px, 4px); filter: hue-rotate(270deg); }
          80% { transform: translate(2px, -4px); filter: hue-rotate(360deg); }
          100% { transform: translate(0); filter: none; }
        }

        .instructions {
          text-align: center;
          font-size: 11px;
          color: rgba(224,232,240,0.25);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .terminal-cursor {
          display: inline-block;
          width: 8px;
          height: 14px;
          background: #00d2ff;
          margin-left: 4px;
          animation: blink 1s step-end infinite;
          vertical-align: middle;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <div className="app" style={{ "--accent": activeAccent }}>
        <div className="grid-bg" />
        <div className="scanline" />

        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.speed}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        <div className="container">
          {/* Header */}
          <div className="header">
            <div className="badge">v2.0 · 8 AI Models · 100% Fake™</div>
            <h1 className={`title ${glitchActive ? "glitch" : ""}`}>
              Developer Day<br />Predictor<span className="terminal-cursor" />
            </h1>
            <p className="subtitle">
              Select your day. Our fake AI council will analyze your fate.
            </p>
          </div>

          <p className="instructions">▾ choose a day below ▾</p>

          {/* Days Grid */}
          <div className="days-grid">
            {days.map((day) => {
              const isActive = selectedDay === day;
              const accent = dayColors[day].accent;
              return (
                <button
                  key={day}
                  className={`day-card ${isActive ? "active" : ""}`}
                  style={{ "--accent": accent }}
                  onClick={() => handleClick(day)}
                >
                  {isActive && <div className="active-indicator" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />}
                  <span className="day-emoji">{dayEmojis[day]}</span>
                  <div className="day-name">{day}</div>
                  <div className="day-label">{isActive ? "● selected" : "click to predict"}</div>
                </button>
              );
            })}
          </div>

          {/* Result Area */}
          <div className="result-area">
            {/* Loading */}
            {loading && (
              <div className="loading-card" style={{ "--accent": activeAccent }}>
                <div className="loading-header">
                  <div className="spinner-ring" />
                  <div>
                    <div className="loading-ai-name">
                      {aiTools[currentAI].icon} {aiTools[currentAI].name} analyzing...
                    </div>
                    <div className="loading-ai-sub">Very advanced AI logic running</div>
                  </div>
                </div>

                <div className="ai-chips">
                  {aiTools.map((ai, idx) => (
                    <div key={ai.name} className={`ai-chip ${idx === currentAI ? "active-chip" : ""}`}
                      style={idx === currentAI ? { "--accent": ai.color, borderColor: ai.color, color: ai.color } : {}}>
                      {ai.icon} {ai.name}
                    </div>
                  ))}
                </div>

                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill" style={{ width: `${aiProgress}%` }} />
                </div>
                <div className="progress-label">
                  <span>Neural analysis</span>
                  <span>{aiProgress}%</span>
                </div>
              </div>
            )}

            {/* Result */}
            {!loading && prediction && selectedDay && (
              <div className="result-card" style={{
                "--accent": dayColors[selectedDay].accent,
                background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
                borderColor: `rgba(${hexToRgb(dayColors[selectedDay].accent)}, 0.3)`,
              }}>
                <div className="result-header" style={{
                  background: `linear-gradient(135deg, ${dayColors[selectedDay].accent}15, transparent)`,
                }}>
                  <div className="result-day-emoji">{dayEmojis[selectedDay]}</div>
                  <div>
                    <div className="result-day-title">{selectedDay}</div>
                    <div className="result-day-meta">AI prediction unlocked</div>
                  </div>
                </div>
                <div className="result-body">
                  <div className="result-tag">
                    <div className="result-dot" />
                    Prediction confirmed
                  </div>
                  <p className="result-text">{prediction}</p>
                </div>
                <div className="result-footer">
                  <span className="result-footer-text">Powered by 8 AI models · 0.001s</span>
                  <span className="accuracy-badge">✓ 99.9% accurate*</span>
                </div>
              </div>
            )}
          </div>

          {!loading && prediction && (
            <p style={{ textAlign: "center", fontSize: "10px", color: "rgba(224,232,240,0.2)", marginTop: "12px", letterSpacing: "1px" }}>
              *accuracy not real. predictions may vary. not liable for Monday feelings.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}