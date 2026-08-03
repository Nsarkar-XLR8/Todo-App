import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X, Timer, Coffee, Flame } from 'lucide-react';

export default function PomodoroTimer({ isOpen, onClose }) {
  const [mode, setMode] = useState('WORK'); // WORK (25m), BREAK (5m)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playChime();
      if (mode === 'WORK') {
        setCompletedSessions((prev) => prev + 1);
        setMode('BREAK');
        setTimeLeft(5 * 60);
      } else {
        setMode('WORK');
        setTimeLeft(25 * 60);
      }
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch {
      // Audio context fallback
    }
  };

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const setWorkMode = () => {
    setMode('WORK');
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  const setBreakMode = () => {
    setMode('BREAK');
    setTimeLeft(5 * 60);
    setIsRunning(false);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--modal-backdrop)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div 
        className="card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '1.5rem',
          textAlign: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
            <Timer size={20} style={{ color: 'var(--accent-primary)' }} />
            Pomodoro Focus Hub
          </div>
          <X size={20} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={onClose} />
        </div>

        {/* Mode Selector Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <button
            onClick={setWorkMode}
            className="btn"
            style={{
              padding: '0.4rem 1rem',
              fontSize: '0.85rem',
              background: mode === 'WORK' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
              color: mode === 'WORK' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            <Flame size={15} /> 25m Focus
          </button>
          <button
            onClick={setBreakMode}
            className="btn"
            style={{
              padding: '0.4rem 1rem',
              fontSize: '0.85rem',
              background: mode === 'BREAK' ? 'var(--success)' : 'var(--bg-tertiary)',
              color: mode === 'BREAK' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            <Coffee size={15} /> 5m Break
          </button>
        </div>

        {/* Big Digital Clock */}
        <div style={{
          fontSize: '3.5rem',
          fontWeight: 800,
          fontFamily: 'monospace',
          color: mode === 'WORK' ? 'var(--accent-primary)' : 'var(--success)',
          marginBottom: '1rem',
          letterSpacing: '0.05em'
        }}>
          {formattedTime}
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          {mode === 'WORK' ? 'Focus deeply on your top priority task' : 'Take a short break, stretch, or grab coffee'}
        </p>

        {/* Timer Control Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <button
            className="btn btn-primary"
            onClick={() => setIsRunning(!isRunning)}
            style={{ minWidth: '110px' }}
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
            <span>{isRunning ? 'Pause' : 'Start'}</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(mode === 'WORK' ? 25 * 60 : 5 * 60);
            }}
          >
            <RotateCcw size={18} />
          </button>
        </div>

        {/* Sessions Completed */}
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'var(--bg-tertiary)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
          Completed Focus Sessions Today: <strong>{completedSessions} 🔥</strong>
        </div>

      </div>
    </div>
  );
}
