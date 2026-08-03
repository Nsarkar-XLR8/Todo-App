import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Clock } from 'lucide-react';

const COLUMNS = [
  { id: 'BACKLOG', title: 'Backlog', color: 'var(--text-muted)' },
  { id: 'IN_PROGRESS', title: 'In Progress', color: 'var(--info)' },
  { id: 'IN_REVIEW', title: 'In Review', color: 'var(--warning)' },
  { id: 'COMPLETED', title: 'Completed', color: 'var(--success)' }
];

export default function KanbanBoard({ tasks, onUpdateTask, onToggleComplete }) {
  const moveTaskStatus = (task, direction) => {
    const currentIndex = COLUMNS.findIndex((c) => c.id === task.status || (task.status === 'BACKLOG' && c.id === 'BACKLOG'));
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= COLUMNS.length) newIndex = COLUMNS.length - 1;

    const newStatus = COLUMNS[newIndex].id;
    onUpdateTask({
      ...task,
      status: newStatus,
      completedAt: newStatus === 'COMPLETED' ? new Date().toISOString() : null
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem', alignItems: 'start' }}>
      {COLUMNS.map((col, colIdx) => {
        const colTasks = tasks.filter((t) => {
          if (col.id === 'BACKLOG') return t.status === 'BACKLOG';
          if (col.id === 'IN_PROGRESS') return t.status === 'IN_PROGRESS';
          if (col.id === 'IN_REVIEW') return t.status === 'IN_REVIEW';
          if (col.id === 'COMPLETED') return t.status === 'COMPLETED';
          return false;
        });

        return (
          <div key={col.id} className="card" style={{ padding: '1.25rem', borderTop: `4px solid ${col.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{col.title}</h3>
              <span className="badge" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                {colTasks.length}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: '200px', maxHeight: '500px', overflowY: 'auto' }}>
              {colTasks.length === 0 ? (
                <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  No tasks
                </div>
              ) : (
                colTasks.map((task) => (
                  <div 
                    key={task.id}
                    style={{
                      background: 'var(--bg-tertiary)',
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'monospace', marginBottom: '0.2rem' }}>
                      {task.id} • {task.category}
                    </div>

                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                      {task.title}
                    </div>

                    {/* Column Movement Actions */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border-color)' }}>
                      <button
                        type="button"
                        className="btn btn-icon"
                        style={{ padding: '0.2rem', minWidth: 'auto', minHeight: 'auto', visibility: colIdx === 0 ? 'hidden' : 'visible' }}
                        onClick={() => moveTaskStatus(task, -1)}
                        title="Move to previous column"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {task.effortHours ? `${task.effortHours} hrs` : ''}
                      </span>

                      <button
                        type="button"
                        className="btn btn-icon"
                        style={{ padding: '0.2rem', minWidth: 'auto', minHeight: 'auto', visibility: colIdx === COLUMNS.length - 1 ? 'hidden' : 'visible' }}
                        onClick={() => moveTaskStatus(task, 1)}
                        title="Move to next column"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
