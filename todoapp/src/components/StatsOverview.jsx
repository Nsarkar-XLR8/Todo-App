import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

export default function StatsOverview({ stats }) {
  const { totalCount, completedCount, overdueCount, totalEffort, completionRate } = stats;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem'
    }}>
      {/* Metric 1: Completion Rate */}
      <div className="card" style={{ padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          background: 'var(--success-bg)',
          color: 'var(--success)',
          padding: '0.75rem',
          borderRadius: 'var(--radius-md)',
          display: 'flex'
        }}>
          <CheckCircle2 size={24} />
        </div>
        <div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Completion Rate</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{completionRate}%</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{completedCount} of {totalCount} completed</p>
        </div>
      </div>

      {/* Metric 2: Estimated Effort */}
      <div className="card" style={{ padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          background: 'var(--accent-light)',
          color: 'var(--accent-primary)',
          padding: '0.75rem',
          borderRadius: 'var(--radius-md)',
          display: 'flex'
        }}>
          <Clock size={24} />
        </div>
        <div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Total Effort</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{totalEffort} hrs</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Estimated active work</p>
        </div>
      </div>

      {/* Metric 3: SLA & Overdue Warning */}
      <div className="card" style={{ padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          background: overdueCount > 0 ? 'var(--danger-bg)' : 'var(--success-bg)',
          color: overdueCount > 0 ? 'var(--danger)' : 'var(--success)',
          padding: '0.75rem',
          borderRadius: 'var(--radius-md)',
          display: 'flex'
        }}>
          <AlertTriangle size={24} />
        </div>
        <div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>SLA Alerts</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: overdueCount > 0 ? 'var(--danger)' : 'var(--text-primary)' }}>
            {overdueCount} {overdueCount === 1 ? 'Overdue' : 'Overdue'}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {overdueCount > 0 ? 'Requires immediate action' : 'All tasks on schedule'}
          </p>
        </div>
      </div>

      {/* Metric 4: Productivity Velocity */}
      <div className="card" style={{ padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          background: 'var(--info-bg)',
          color: 'var(--info)',
          padding: '0.75rem',
          borderRadius: 'var(--radius-md)',
          display: 'flex'
        }}>
          <TrendingUp size={24} />
        </div>
        <div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Velocity Streak</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>5 Days 🔥</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Consistent daily progress</p>
        </div>
      </div>
    </div>
  );
}
