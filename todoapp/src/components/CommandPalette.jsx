import React, { useState, useEffect } from 'react';
import { Search, X, CheckSquare, CornerDownLeft } from 'lucide-react';
import { useKeyboard } from '../hooks/useKeyboard';

export default function CommandPalette({ isOpen, onClose, tasks, onToggleComplete, onSelectTask }) {
  const [query, setQuery] = useState('');

  // Close on Escape key
  useKeyboard({ key: 'Escape' }, () => {
    if (isOpen) onClose();
  });

  if (!isOpen) return null;

  const filtered = tasks.filter((t) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return t.title.toLowerCase().includes(q) || t.id.toLowerCase().includes(q) || (t.category && t.category.toLowerCase().includes(q));
  }).slice(0, 8);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--modal-backdrop)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '5vh',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}
      onClick={onClose}
    >
      <div 
        className="card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '640px',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-color)', gap: '0.75rem' }}>
          <Search size={20} style={{ color: 'var(--accent-primary)' }} />
          <input
            type="text"
            placeholder="Type a command or search tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '1.05rem',
              color: 'var(--text-primary)',
              fontFamily: 'inherit'
            }}
          />
          <X size={18} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} onClick={onClose} />
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '0.5rem' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No matching tasks or commands found
            </div>
          ) : (
            filtered.map((task) => (
              <div
                key={task.id}
                onClick={() => {
                  onSelectTask(task.id);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'background var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckSquare size={16} style={{ color: task.status === 'COMPLETED' ? 'var(--success)' : 'var(--text-muted)' }} />
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.5rem', fontFamily: 'monospace' }}>
                      {task.id}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {task.title}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
                    {task.category || 'Task'}
                  </span>
                  <CornerDownLeft size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Keyboard Hints Footer */}
        <div style={{ padding: '0.6rem 1.25rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>Navigate tasks with live search</span>
          <span>Press <strong>Esc</strong> to close</span>
        </div>

      </div>
    </div>
  );
}
