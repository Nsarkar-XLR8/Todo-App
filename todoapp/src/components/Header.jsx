import React from 'react';
import { 
  CheckSquare, 
  Sun, 
  Moon, 
  Search, 
  Download, 
  Briefcase, 
  Code, 
  User,
  History,
  Timer,
  FileSpreadsheet
} from 'lucide-react';
import { INITIAL_WORKSPACES, exportTasksJSON, exportTasksCSV } from '../services/storageService';

export default function Header({ 
  theme, 
  toggleTheme, 
  activeWorkspace, 
  setActiveWorkspace, 
  allTasks, 
  onOpenCommandPalette,
  onOpenAuditLog,
  onOpenPomodoro
}) {
  return (
    <header className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
      <div className="header-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            background: 'var(--accent-primary)', 
            color: '#fff', 
            padding: '0.5rem', 
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CheckSquare size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '700', lineHeight: 1.2 }}>
              TaskPulse <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-primary)', background: 'var(--accent-light)', padding: '0.1rem 0.5rem', borderRadius: 'var(--radius-full)', textTransform: 'uppercase' }}>Enterprise</span>
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>High-velocity Task Engine</p>
          </div>
        </div>

        {/* Workspace Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-tertiary)', padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Workspace:</span>
          <select
            value={activeWorkspace}
            onChange={(e) => setActiveWorkspace(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {INITIAL_WORKSPACES.map((ws) => (
              <option key={ws.id} value={ws.id} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                {ws.name}
              </option>
            ))}
          </select>
        </div>

        {/* Action Controls */}
        <div className="header-controls" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          
          {/* Quick Search Button (Command Palette) */}
          <button 
            className="btn btn-secondary" 
            onClick={onOpenCommandPalette} 
            title="Open Command Palette (Ctrl+K)"
            style={{ fontSize: '0.85rem' }}
          >
            <Search size={16} />
            <span style={{ display: 'inline-block' }}>Search</span>
            <kbd style={{ 
              background: 'var(--bg-primary)', 
              padding: '0.1rem 0.4rem', 
              borderRadius: '4px', 
              fontSize: '0.7rem',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)'
            }}>Ctrl K</kbd>
          </button>

          {/* Pomodoro Focus Timer */}
          <button 
            className="btn btn-secondary" 
            onClick={onOpenPomodoro}
            title="Pomodoro Focus Timer"
            style={{ fontSize: '0.85rem' }}
          >
            <Timer size={16} style={{ color: 'var(--accent-primary)' }} />
            <span>Focus Timer</span>
          </button>

          {/* Audit Log Drawer Trigger */}
          <button 
            className="btn btn-icon" 
            onClick={onOpenAuditLog}
            title="Activity Audit Log"
          >
            <History size={18} />
          </button>

          {/* Export CSV */}
          <button 
            className="btn btn-icon" 
            onClick={() => exportTasksCSV(allTasks)} 
            title="Export Tasks CSV (Excel/Sheets)"
          >
            <FileSpreadsheet size={18} />
          </button>

          {/* Export JSON */}
          <button 
            className="btn btn-icon" 
            onClick={() => exportTasksJSON(allTasks)} 
            title="Export Tasks JSON"
          >
            <Download size={18} />
          </button>

          {/* Theme Toggler */}
          <button 
            className="btn btn-icon" 
            onClick={toggleTheme} 
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

        </div>

      </div>
    </header>
  );
}
