import React, { useState, useEffect } from 'react';
import { X, History, Trash2 } from 'lucide-react';
import { getAuditLogs, clearAuditLogs } from '../services/auditService';

export default function ActivityLog({ isOpen, onClose }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setLogs(getAuditLogs());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClear = () => {
    clearAuditLogs();
    setLogs([]);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--modal-backdrop)',
        backdropFilter: 'blur(3px)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={onClose}
    >
      <div 
        className="card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100vh',
          borderRadius: 0,
          borderRight: 'none',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            <History size={20} style={{ color: 'var(--accent-primary)' }} />
            Activity Audit Trail
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {logs.length > 0 && (
              <button className="btn btn-icon" onClick={handleClear} title="Clear audit log">
                <Trash2 size={16} style={{ color: 'var(--danger)' }} />
              </button>
            )}
            <X size={20} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={onClose} />
          </div>
        </div>

        {/* Drawer Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {logs.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', marginTop: '2rem' }}>
              No audit logs recorded yet.
            </p>
          ) : (
            logs.map((log) => (
              <div 
                key={log.id} 
                style={{ 
                  padding: '0.75rem 0', 
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--accent-primary)', fontSize: '0.75rem' }}>
                    {log.action}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p style={{ color: 'var(--text-primary)' }}>{log.details}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
