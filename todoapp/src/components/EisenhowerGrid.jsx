import React from 'react';
import { Flag, CheckCircle2, Circle, ArrowRight } from 'lucide-react';

export default function EisenhowerGrid({ tasks, onToggleComplete, onUpdateTask }) {
  const q1Tasks = tasks.filter((t) => t.priority === 'P1_URGENT' && t.status !== 'COMPLETED');
  const q2Tasks = tasks.filter((t) => t.priority === 'P2_HIGH' && t.status !== 'COMPLETED');
  const q3Tasks = tasks.filter((t) => t.priority === 'P3_MEDIUM' && t.status !== 'COMPLETED');
  const q4Tasks = tasks.filter((t) => (t.priority === 'P4_LOW' || !t.priority) && t.status !== 'COMPLETED');

  const shiftPriority = (task, newPriority) => {
    onUpdateTask({ ...task, priority: newPriority });
  };

  const renderQuadrant = (title, subtitle, color, bg, taskList, nextPriority, nextLabel) => (
    <div className="card" style={{ padding: '1.25rem', borderTop: `4px solid ${color}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{subtitle}</p>
        </div>
        <span className="badge" style={{ background: bg, color: color }}>
          {taskList.length} Tasks
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '350px', overflowY: 'auto' }}>
        {taskList.length === 0 ? (
          <div style={{ padding: '1.5rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            No active tasks in this quadrant
          </div>
        ) : (
          taskList.map((task) => (
            <div 
              key={task.id} 
              style={{ 
                background: 'var(--bg-tertiary)', 
                padding: '0.75rem', 
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', flex: 1 }}>
                <button
                  type="button"
                  onClick={() => onToggleComplete(task.id)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, marginTop: '0.1rem' }}
                >
                  <Circle size={18} style={{ color: 'var(--text-muted)' }} />
                </button>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {task.title}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                    {task.id} • {task.category}
                  </span>
                </div>
              </div>

              {nextPriority && (
                <button
                  type="button"
                  className="btn btn-icon"
                  style={{ padding: '0.2rem', minWidth: 'auto', minHeight: 'auto' }}
                  onClick={() => shiftPriority(task, nextPriority)}
                  title={`Move to ${nextLabel}`}
                >
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
      {renderQuadrant('🔴 Quadrant I: Do First', 'Urgent & Critical (P1)', 'var(--p1-color)', 'var(--p1-bg)', q1Tasks, 'P2_HIGH', 'Quadrant II')}
      {renderQuadrant('🟠 Quadrant II: Schedule', 'Important & Strategic (P2)', 'var(--p2-color)', 'var(--p2-bg)', q2Tasks, 'P3_MEDIUM', 'Quadrant III')}
      {renderQuadrant('🔵 Quadrant III: Quick Wins', 'Medium Priority (P3)', 'var(--p3-color)', 'var(--p3-bg)', q3Tasks, 'P4_LOW', 'Quadrant IV')}
      {renderQuadrant('⚪ Quadrant IV: Backlog', 'Low Priority (P4)', 'var(--p4-color)', 'var(--p4-bg)', q4Tasks, 'P1_URGENT', 'Quadrant I')}
    </div>
  );
}
