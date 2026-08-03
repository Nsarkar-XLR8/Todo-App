import React from 'react';
import { Layers, X, Code, Rocket, BarChart2, ShieldCheck, Check } from 'lucide-react';

export const WORKFLOW_TEMPLATES = [
  {
    id: 'tpl-code-review',
    title: '🛠️ Sprint Code Review & QA Gate',
    description: 'Comprehensive code review checklist including linting, security scans, and regression testing.',
    priority: 'P1_URGENT',
    category: 'Engineering',
    effortHours: 4,
    subtasks: [
      { id: 'st-1', title: 'Verify unit test coverage >= 85%', completed: false },
      { id: 'st-2', title: 'Run static security analysis (SonarQube/npm audit)', completed: false },
      { id: 'st-3', title: 'Verify PR diff against design system specs', completed: false }
    ]
  },
  {
    id: 'tpl-feature-launch',
    title: '🚀 Product Feature Launch Checklist',
    description: 'End-to-end production deployment checklist for new enterprise modules.',
    priority: 'P2_HIGH',
    category: 'Product',
    effortHours: 6,
    subtasks: [
      { id: 'st-4', title: 'Update API documentation & OpenAPI schemas', completed: false },
      { id: 'st-5', title: 'Deploy database migration to Staging', completed: false },
      { id: 'st-6', title: 'Notify Product Marketing & Customer Success', completed: false }
    ]
  },
  {
    id: 'tpl-weekly-retrospective',
    title: '📊 Weekly Team Retrospective & Velocity Sync',
    description: 'Weekly team alignment covering SLA adherence, roadblocks, and sprint goals.',
    priority: 'P3_MEDIUM',
    category: 'Operations',
    effortHours: 3,
    subtasks: [
      { id: 'st-7', title: 'Review completed task velocity charts', completed: false },
      { id: 'st-8', title: 'Identify top 3 engineering bottlenecks', completed: false },
      { id: 'st-9', title: 'Draft action items for next sprint', completed: false }
    ]
  }
];

export default function TaskTemplates({ isOpen, onClose, onSelectTemplate }) {
  if (!isOpen) return null;

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
          maxWidth: '560px',
          padding: '1.5rem'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
            <Layers size={20} style={{ color: 'var(--accent-primary)' }} />
            Workflow Task Templates
          </div>
          <X size={20} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={onClose} />
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Instantiate pre-configured enterprise task blueprints with preset subtask checklists.
        </p>

        {/* Template Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '420px', overflowY: 'auto' }}>
          {WORKFLOW_TEMPLATES.map((tpl) => (
            <div 
              key={tpl.id}
              className="card"
              style={{
                padding: '1rem 1.25rem',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'border-color var(--transition-fast)'
              }}
              onClick={() => {
                onSelectTemplate(tpl);
                onClose();
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {tpl.title}
                </h4>
                <span className="badge" style={{ background: 'var(--accent-light)', color: 'var(--accent-primary)' }}>
                  {tpl.category}
                </span>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                {tpl.description}
              </p>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Includes <strong>{tpl.subtasks.length} pre-configured subtasks</strong> • {tpl.effortHours} hrs effort
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
