"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ─── Demo track data ──────────────────────────────────────────────────────────
// Replace `src` with real audio paths; waveformSeed drives the visual pattern.
const TRACKS = [
  {
    id: 1,
    title: "Destroy",
    artist: "Savened",
    album: "Demo Sessions",
    duration: "3:42",
    waveformSeed: 1,
    src: "/song/song1.mp3",
  },
  {
    id: 2,
    title: "NadeKing Colab",
    artist: "Savened",
    album: "Demo Sessions",
    duration: "4:11",
    waveformSeed: 2,
    src: "/audio/nadeking-colab.mp3",
  },
  {
    id: 3,
    title: "Affirmative",
    artist: "Savened",
    album: "Demo Sessions",
    duration: "3:28",
    waveformSeed: 3,
    src: "/audio/affirmative.mp3",
  },
  {
    id: 4,
    title: "Slaphouse",
    artist: "Savened",
    album: "Demo Sessions",
    duration: "5:05",
    waveformSeed: 4,
    src: "/audio/slaphouse.mp3",
  },
  {
    id: 5,
    title: "80s",
    artist: "Savened",
    album: "Demo Sessions",
    duration: "3:55",
    waveformSeed: 5,
    src: "/audio/80s.mp3",
  },
  {
    id: 6,
    title: "Digitalmusic",
    artist: "Savened",
    album: "Demo Sessions",
    duration: "4:22",
    waveformSeed: 6,
    src: "/audio/digitalmusic.mp3",
  },
  {
    id: 7,
    title: "Ye – 125bpm",
    artist: "Savened",
    album: "Demo Sessions",
    duration: "2:58",
    waveformSeed: 7,
    src: "/audio/ye-125bpm.mp3",
  },
];

// ─── Seeded pseudo-random waveform generator ──────────────────────────────────
function generateWaveform(seed, bars = 120) {
  let s = seed * 9301 + 49297;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const raw = Array.from({ length: bars }, () => 0.15 + rand() * 0.85);
  // Smooth pass
  return raw.map((v, i) => {
    const l = raw[i - 1] ?? v;
    const r = raw[i + 1] ?? v;
    return l * 0.25 + v * 0.5 + r * 0.25;
  });
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M6 19h4V5H6zm8-14v14h4V5z" />
  </svg>
);
const PrevIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
  </svg>
);
const NextIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M6 18l8.5-6L6 6v12zm2.5-6 6-4.35V16.35L8.5 12zM16 6h2v12h-2z" />
  </svg>
);
const VolumeIcon = ({ muted }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    {muted ? (
      <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
    ) : (
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    )}
  </svg>
);

// ─── Waveform Canvas ──────────────────────────────────────────────────────────
function WaveformCanvas({ waveform, progress, onSeek }) {
  const canvasRef = useRef(null);
  const [hoverX, setHoverX] = useState(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const bars = waveform.length;
    const gap = 2;
    const barW = (width - gap * (bars - 1)) / bars;
    const mid = height / 2;
    const played = progress;

    waveform.forEach((amp, i) => {
      const x = i * (barW + gap);
      const h = amp * (height * 0.88);
      const pct = (x + barW / 2) / width;

      const isPlayed = pct <= played;
      const isHovered =
        hoverX !== null && Math.abs(x + barW / 2 - hoverX * width) < barW * 3;

      let color;
      if (isPlayed) color = isHovered ? "#ffb347" : "#f97316";
      else if (isHovered) color = "rgba(249,115,22,0.45)";
      else color = "rgba(255,255,255,0.18)";

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x, mid - h / 2, Math.max(barW, 1), h, 1.5);
      ctx.fill();
    });
  }, [waveform, progress, hoverX]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      const ctx = canvas.getContext("2d");
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      draw();
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [draw]);

  const getRelX = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    return (e.clientX - r.left) / r.width;
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        cursor: "pointer",
        display: "block",
      }}
      onClick={(e) => onSeek(getRelX(e))}
      onMouseMove={(e) => setHoverX(getRelX(e))}
      onMouseLeave={() => setHoverX(null)}
    />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function MediaPlayer() {
  const [activeId, setActiveId] = useState(TRACKS[0].id);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0–1
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds (simulated)

  const audioRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null); // timestamp when play started
  const baseRef = useRef(0); // progress at last play start

  const track = TRACKS.find((t) => t.id === activeId);
  const waveform = generateWaveform(track.waveformSeed);

  // Parse "m:ss" → seconds
  const parseDur = (s) => {
    const [m, sec] = s.split(":").map(Number);
    return m * 60 + sec;
  };
  const totalSec = parseDur(track.duration);
  const fmtTime = (s) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  // RAF-based progress simulation (replace with real audio events when using <audio>)
  const tick = useCallback(
    (now) => {
      if (!startRef.current) return;
      const delta = (now - startRef.current) / 1000;
      const newProg = Math.min(baseRef.current + delta / totalSec, 1);
      setProgress(newProg);
      setElapsed(newProg * totalSec);
      if (newProg < 1) rafRef.current = requestAnimationFrame(tick);
      else setPlaying(false);
    },
    [totalSec]
  );

  useEffect(() => {
    if (playing) {
      startRef.current = performance.now();
      baseRef.current = progress;
      rafRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    }
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, tick]);

  // Wire up real <audio> if you want actual playback:
  // useEffect(() => { if (audioRef.current) { audioRef.current.volume = muted ? 0 : volume; } }, [volume, muted]);

  const selectTrack = (id) => {
    cancelAnimationFrame(rafRef.current);
    startRef.current = null;
    setActiveId(id);
    setProgress(0);
    setElapsed(0);
    setPlaying(true);
  };

  const togglePlay = () => setPlaying((p) => !p);

  const seek = (pct) => {
    baseRef.current = pct;
    startRef.current = playing ? performance.now() : null;
    setProgress(pct);
    setElapsed(pct * totalSec);
  };

  const prev = () => {
    const idx = TRACKS.findIndex((t) => t.id === activeId);
    selectTrack(TRACKS[(idx - 1 + TRACKS.length) % TRACKS.length].id);
  };
  const next = () => {
    const idx = TRACKS.findIndex((t) => t.id === activeId);
    selectTrack(TRACKS[(idx + 1) % TRACKS.length].id);
  };

  return (
    <>
      {/* ── Google Font import ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .mp-root *, .mp-root *::before, .mp-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .mp-root {
          --bg:       #0c0c0e;
          --surface:  #141416;
          --border:   rgba(255,255,255,0.07);
          --accent:   #f97316;
          --accent2:  #ffb347;
          --fg:       #f0ede8;
          --muted:    rgba(240,237,232,0.38);
          --radius:   14px;
          font-family: 'Syne', sans-serif;
          background: var(--bg);
          color: var(--fg);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .mp-card {
          width: 100%;
          max-width: 780px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset;
        }

        /* ── Player head ── */
        .mp-head {
          padding: 28px 28px 0;
        }
        .mp-now {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 22px;
        }
        .mp-art {
          width: 58px;
          height: 58px;
          border-radius: 8px;
          background: linear-gradient(135deg, #1a1a1c, #2a2014);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        .mp-art-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 40% 40%, rgba(249,115,22,0.25), transparent 60%);
        }
        .mp-meta { flex: 1; min-width: 0; }
        .mp-artist {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 4px;
        }
        .mp-title {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.1;
        }
        .mp-album {
          font-size: 11px;
          color: var(--muted);
          margin-top: 3px;
          font-weight: 400;
        }

        /* ── Waveform ── */
        .mp-wave-wrap {
          height: 80px;
          position: relative;
          margin-bottom: 6px;
        }

        /* ── Time bar ── */
        .mp-timebar {
          display: flex;
          justify-content: space-between;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: var(--muted);
          padding-bottom: 18px;
        }
        .mp-timebar span:first-child { color: var(--accent); }

        /* ── Controls ── */
        .mp-controls {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 18px 28px 22px;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: rgba(255,255,255,0.015);
        }
        .mp-btn {
          background: none;
          border: none;
          color: var(--muted);
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s, background 0.15s;
        }
        .mp-btn:hover { color: var(--fg); background: rgba(255,255,255,0.06); }
        .mp-play-btn {
          background: var(--accent);
          color: #fff;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 6px;
          transition: background 0.15s, transform 0.1s;
          box-shadow: 0 0 20px rgba(249,115,22,0.35);
        }
        .mp-play-btn:hover { background: var(--accent2); transform: scale(1.06); }
        .mp-play-btn:active { transform: scale(0.97); }

        .mp-spacer { flex: 1; }
        .mp-volume {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mp-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 80px;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(to right, var(--accent) calc(var(--val) * 100%), rgba(255,255,255,0.12) 0%);
          cursor: pointer;
          outline: none;
        }
        .mp-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--fg);
          box-shadow: 0 0 6px rgba(0,0,0,0.5);
        }

        /* ── Track list ── */
        .mp-list { padding: 8px 0 8px; }
        .mp-list-header {
          display: flex;
          align-items: center;
          padding: 10px 28px 6px;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          gap: 12px;
        }
        .mp-list-header .col-num  { width: 28px; }
        .mp-list-header .col-title { flex: 1; }
        .mp-list-header .col-dur  { width: 42px; text-align: right; }

        .mp-track {
          display: flex;
          align-items: center;
          padding: 10px 28px;
          gap: 12px;
          cursor: pointer;
          border-radius: 0;
          transition: background 0.12s;
          position: relative;
        }
        .mp-track::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: var(--accent);
          opacity: 0;
          transition: opacity 0.15s;
        }
        .mp-track:hover { background: rgba(255,255,255,0.04); }
        .mp-track:hover::before { opacity: 0.5; }
        .mp-track.active { background: rgba(249,115,22,0.07); }
        .mp-track.active::before { opacity: 1; }

        .mp-track-num {
          width: 28px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: var(--muted);
          text-align: center;
          flex-shrink: 0;
        }
        .mp-track.active .mp-track-num { color: var(--accent); }

        .mp-track-info { flex: 1; min-width: 0; }
        .mp-track-name {
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.12s;
        }
        .mp-track.active .mp-track-name { color: var(--accent); }
        .mp-track-artist {
          font-size: 11px;
          color: var(--muted);
          margin-top: 1px;
          font-weight: 400;
        }

        .mp-track-dur {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: var(--muted);
          width: 42px;
          text-align: right;
          flex-shrink: 0;
        }

        /* ── Playing bars animation ── */
        .mp-bars {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 14px;
        }
        .mp-bar {
          width: 3px;
          border-radius: 1px;
          background: var(--accent);
          animation: barBounce 0.6s ease-in-out infinite alternate;
        }
        .mp-bar:nth-child(2) { animation-delay: 0.2s; }
        .mp-bar:nth-child(3) { animation-delay: 0.1s; }
        @keyframes barBounce {
          from { height: 3px; }
          to   { height: 14px; }
        }
      `}</style>

      <div className="mp-root">
        <div className="mp-card">
          {/* ── Head / Now playing ── */}
          <div className="mp-head">
            <div className="mp-now">
              <div className="mp-art">
                <div className="mp-art-glow" />
                🔫
              </div>
              <div className="mp-meta">
                <div className="mp-artist">{track.artist}</div>
                <div className="mp-title">{track.title}</div>
                <div className="mp-album">{track.album}</div>
              </div>
            </div>

            {/* Waveform */}
            <div className="mp-wave-wrap">
              <WaveformCanvas
                waveform={waveform}
                progress={progress}
                onSeek={seek}
              />
            </div>

            <div className="mp-timebar">
              <span>{fmtTime(elapsed)}</span>
              <span>{track.duration}</span>
            </div>
          </div>

          {/* ── Transport controls ── */}
          <div className="mp-controls">
            <button className="mp-btn" onClick={prev} aria-label="Previous">
              <PrevIcon />
            </button>
            <button
              className="mp-play-btn"
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button className="mp-btn" onClick={next} aria-label="Next">
              <NextIcon />
            </button>

            <div className="mp-spacer" />

            <div className="mp-volume">
              <button
                className="mp-btn"
                onClick={() => setMuted((m) => !m)}
                aria-label="Toggle mute"
              >
                <VolumeIcon muted={muted} />
              </button>
              <input
                type="range"
                className="mp-slider"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                style={{ "--val": muted ? 0 : volume }}
                onChange={(e) => {
                  setVolume(+e.target.value);
                  setMuted(false);
                }}
              />
            </div>
          </div>

          {/* ── Track list ── */}
          <div className="mp-list">
            <div className="mp-list-header">
              <span className="col-num">#</span>
              <span className="col-title">Title</span>
              <span className="col-dur">Time</span>
            </div>

            {TRACKS.map((t, i) => {
              const isActive = t.id === activeId;
              return (
                <div
                  key={t.id}
                  className={`mp-track${isActive ? " active" : ""}`}
                  onClick={() => selectTrack(t.id)}
                >
                  <div className="mp-track-num">
                    {isActive && playing ? (
                      <div className="mp-bars">
                        <div className="mp-bar" />
                        <div className="mp-bar" />
                        <div className="mp-bar" />
                      </div>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <div className="mp-track-info">
                    <div className="mp-track-name">{t.title}</div>
                    <div className="mp-track-artist">{t.artist}</div>
                  </div>
                  <div className="mp-track-dur">{t.duration}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
