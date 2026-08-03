import React from 'react';
import { Info, RotateCcw } from 'lucide-react';

export default function Toast({ toastMessage, onUndo }) {
  if (!toastMessage) return null;

  return (
    <div 
      className="card animate-fade-in toast-container"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 99999,
        padding: '0.85rem 1.2rem',
        background: 'var(--text-primary)',
        color: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
        borderRadius: 'var(--radius-md)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Info size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
        <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{toastMessage.message}</span>
      </div>

      {toastMessage.canUndo && (
        <button
          onClick={onUndo}
          style={{
            background: 'var(--accent-primary)',
            color: '#ffffff',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            padding: '0.3rem 0.6rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            flexShrink: 0
          }}
        >
          <RotateCcw size={14} /> Undo
        </button>
      )}
    </div>
  );
}
