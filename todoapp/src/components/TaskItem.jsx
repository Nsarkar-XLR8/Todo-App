import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Pin, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Calendar, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  AlertCircle,
  Copy
} from 'lucide-react';

const priorityBadgeMap = {
  P1_URGENT: { label: 'P1 Urgent', class: 'badge-p1' },
  P2_HIGH: { label: 'P2 High', class: 'badge-p2' },
  P3_MEDIUM: { label: 'P3 Medium', class: 'badge-p3' },
  P4_LOW: { label: 'P4 Low', class: 'badge-p4' }
};

export default function TaskItem({
  task,
  isSelected,
  onSelectToggle,
  onToggleComplete,
  onTogglePin,
  onDelete,
  onUpdateTask,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [copied, setCopied] = useState(false);

  const isCompleted = task.status === 'COMPLETED';
  const subtasks = task.subtasks || [];
  const completedSubtasks = subtasks.filter((s) => s.completed).length;
  const subtaskProgress = subtasks.length > 0 ? Math.round((completedSubtasks / subtasks.length) * 100) : 0;

  const todayStr = new Date().toISOString().slice(0, 10);
  const isOverdue = task.dueDate && task.dueDate < todayStr && !isCompleted;
  const isDueToday = task.dueDate === todayStr && !isCompleted;

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;
    onUpdateTask({ ...task, title: editTitle.trim(), description: editDescription.trim() });
    setIsEditing(false);
  };

  const handleSubtaskAdd = (e) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    onAddSubtask(task.id, newSubtaskTitle.trim());
    setNewSubtaskTitle('');
  };

  const copyAsMarkdown = (e) => {
    e.stopPropagation();
    let md = `- [${isCompleted ? 'x' : ' '}] **${task.id}**: ${task.title}\n`;
    if (task.description) md += `  - *Description*: ${task.description}\n`;
    if (task.priority) md += `  - *Priority*: ${task.priority}\n`;
    if (task.dueDate) md += `  - *Due Date*: ${task.dueDate}\n`;
    if (subtasks.length > 0) {
      md += `  - *Subtasks*:\n`;
      subtasks.forEach((sub) => {
        md += `    - [${sub.completed ? 'x' : ' '}] ${sub.title}\n`;
      });
    }

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pConfig = priorityBadgeMap[task.priority] || priorityBadgeMap.P3_MEDIUM;

  return (
    <div 
      className="card animate-fade-in task-item-card" 
      style={{
        padding: '1.2rem 1.4rem',
        marginBottom: '0.75rem',
        borderLeft: `4px solid ${
          task.pinned ? 'var(--accent-primary)' : isCompleted ? 'var(--success)' : isOverdue ? 'var(--danger)' : 'var(--border-color)'
        }`,
        opacity: isCompleted ? 0.75 : 1,
        background: task.pinned ? 'var(--accent-light)' : 'var(--bg-secondary)'
      }}
    >
      
      {/* Main Task Header Row */}
      <div className="task-item-main-row" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        
        {/* Selection Checkbox */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelectToggle(task.id)}
          style={{ marginTop: '0.35rem', cursor: 'pointer', minWidth: '18px', minHeight: '18px' }}
        />

        {/* Completion Toggle Icon */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete(task.id);
          }}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            marginTop: '0.15rem',
            color: isCompleted ? 'var(--success)' : 'var(--text-muted)',
            transition: 'color var(--transition-fast)'
          }}
          title={isCompleted ? 'Mark as Active' : 'Mark as Complete'}
        >
          {isCompleted ? <CheckCircle2 size={22} /> : <Circle size={22} />}
        </button>

        {/* Task Details / Edit Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          
          {/* ID & Badges Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
            
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'monospace' }}>
              {task.id}
            </span>

            <span className={`badge ${pConfig.class}`}>
              {pConfig.label}
            </span>

            {task.category && (
              <span className="badge" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                {task.category}
              </span>
            )}

            {isOverdue && (
              <span className="badge" style={{ background: 'var(--danger-bg)', color: 'var(--danger)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                <AlertCircle size={12} /> Overdue
              </span>
            )}

            {isDueToday && (
              <span className="badge" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}>
                Due Today
              </span>
            )}

          </div>

          {/* Title Text or Inline Edit Input */}
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0.4rem 0' }}>
              <input
                type="text"
                className="input-field"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSaveEdit();
                  }
                }}
                autoFocus
              />
              <textarea
                className="input-field"
                rows={2}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description..."
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="button" className="btn btn-primary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }} onClick={handleSaveEdit}>
                  <Check size={14} /> Save
                </button>
                <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }} onClick={() => setIsEditing(false)}>
                  <X size={14} /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h4 
                onClick={() => onToggleComplete(task.id)}
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textDecoration: isCompleted ? 'line-through' : 'none',
                  lineHeight: 1.3,
                  wordBreak: 'break-word',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
                title="Click to toggle completion status"
              >
                {task.title}
              </h4>

              {task.description && (
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.25rem',
                  lineHeight: 1.4,
                  wordBreak: 'break-word'
                }}>
                  {task.description}
                </p>
              )}
            </div>
          )}

          {/* Meta Info Row: Due Date & Effort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            
            {task.dueDate && (
              <span style={{ fontSize: '0.75rem', color: isOverdue ? 'var(--danger)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Calendar size={13} /> {task.dueDate}
              </span>
            )}

            {task.effortHours > 0 && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={13} /> {task.effortHours} hrs
              </span>
            )}

            {/* Subtasks Progress Bar Trigger */}
            {subtasks.length > 0 && (
              <button
                type="button"
                onClick={() => setShowSubtasks(!showSubtasks)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                {completedSubtasks}/{subtasks.length} Subtasks ({subtaskProgress}%)
                {showSubtasks ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            )}

          </div>

        </div>

        {/* Action Controls Column */}
        <div className="task-item-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          
          {/* Copy Markdown Button */}
          <button 
            type="button"
            className="btn btn-icon"
            onClick={copyAsMarkdown}
            title={copied ? 'Copied as Markdown!' : 'Copy Task as Markdown'}
            style={{ color: copied ? 'var(--success)' : 'var(--text-muted)' }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>

          {/* Pin Button */}
          <button 
            type="button"
            className="btn btn-icon"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(task.id);
            }}
            title={task.pinned ? 'Unpin task' : 'Pin task to top'}
            style={{ color: task.pinned ? 'var(--accent-primary)' : 'var(--text-muted)' }}
          >
            <Pin size={16} />
          </button>

          {/* Edit Button */}
          <button 
            type="button"
            className="btn btn-icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(!isEditing);
            }}
            title="Edit Task"
          >
            <Edit3 size={16} />
          </button>

          {/* Delete Button */}
          <button 
            type="button"
            className="btn btn-icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            title="Delete Task"
            style={{ color: 'var(--danger)' }}
          >
            <Trash2 size={16} />
          </button>

        </div>

      </div>

      {/* Expandable Subtask Checklist Panel */}
      {(showSubtasks || (subtasks.length === 0 && isEditing)) && (
        <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-color)' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.5rem' }}>
            {subtasks.map((sub) => (
              <div key={sub.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={sub.completed}
                  onChange={() => onToggleSubtask(task.id, sub.id)}
                  style={{ cursor: 'pointer', minWidth: '16px', minHeight: '16px' }}
                />
                <span 
                  onClick={() => onToggleSubtask(task.id, sub.id)}
                  style={{
                    fontSize: '0.85rem',
                    color: sub.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                    textDecoration: sub.completed ? 'line-through' : 'none',
                    flex: 1,
                    wordBreak: 'break-word',
                    cursor: 'pointer'
                  }}
                >
                  {sub.title}
                </span>
                <X 
                  size={14} 
                  style={{ cursor: 'pointer', color: 'var(--text-muted)' }} 
                  onClick={() => onDeleteSubtask(task.id, sub.id)}
                />
              </div>
            ))}
          </div>

          {/* Add Subtask Input */}
          <div style={{ display: 'flex', gap: '0.4rem', maxWidth: '400px' }}>
            <input
              type="text"
              className="input-field"
              placeholder="Add subtask step..."
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubtaskAdd(e);
                }
              }}
              style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
            />
            <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }} onClick={handleSubtaskAdd}>
              <Plus size={14} /> Add
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
