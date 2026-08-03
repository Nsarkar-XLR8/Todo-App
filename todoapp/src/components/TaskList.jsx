import React from 'react';
import TaskItem from './TaskItem';
import { CheckSquare, Trash2, CheckCircle2, Pin, Inbox } from 'lucide-react';

export default function TaskList({
  tasks,
  allWorkspaceTasks,
  selectedTaskIds,
  setSelectedTaskIds,
  onToggleComplete,
  onTogglePin,
  onDelete,
  onUpdateTask,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  onBulkComplete,
  onBulkDelete,
  onClearCompleted
}) {
  const pinnedTasks = tasks.filter((t) => t.pinned);
  const unpinnedTasks = tasks.filter((t) => !t.pinned);

  const allSelected = tasks.length > 0 && selectedTaskIds.length === tasks.length;

  const handleSelectAllToggle = () => {
    if (allSelected) {
      setSelectedTaskIds([]);
    } else {
      setSelectedTaskIds(tasks.map((t) => t.id));
    }
  };

  const handleSelectToggle = (id) => {
    if (selectedTaskIds.includes(id)) {
      setSelectedTaskIds(selectedTaskIds.filter((item) => item !== id));
    } else {
      setSelectedTaskIds([...selectedTaskIds, id]);
    }
  };

  const hasCompleted = allWorkspaceTasks.some((t) => t.status === 'COMPLETED');

  if (tasks.length === 0) {
    return (
      <div className="card" style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <Inbox size={48} style={{ opacity: 0.4, marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
          No tasks found matching criteria
        </h3>
        <p style={{ fontSize: '0.85rem' }}>
          Try clearing filters, searching for a different term, or adding a new enterprise task above.
        </p>
      </div>
    );
  }

  return (
    <div>
      
      {/* Bulk Controls Action Bar */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justify: 'space-between', 
          background: 'var(--bg-secondary)', 
          padding: '0.6rem 1rem', 
          borderRadius: 'var(--radius-md)', 
          border: '1px solid var(--border-color)',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleSelectAllToggle}
            style={{ cursor: 'pointer' }}
          />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Select All ({selectedTaskIds.length} selected)
          </span>
        </div>

        {/* Action Buttons for selected items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {selectedTaskIds.length > 0 && (
            <>
              <button className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }} onClick={onBulkComplete}>
                <CheckCircle2 size={14} /> Complete Selected
              </button>
              <button className="btn btn-danger" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }} onClick={onBulkDelete}>
                <Trash2 size={14} /> Delete Selected
              </button>
            </>
          )}

          {hasCompleted && (
            <button className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }} onClick={onClearCompleted}>
              Clear Completed
            </button>
          )}
        </div>
      </div>

      {/* Pinned Tasks Section */}
      {pinnedTasks.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem', color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 700 }}>
            <Pin size={15} /> PINNED TASKS ({pinnedTasks.length})
          </div>
          {pinnedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isSelected={selectedTaskIds.includes(task.id)}
              onSelectToggle={handleSelectToggle}
              onToggleComplete={onToggleComplete}
              onTogglePin={onTogglePin}
              onDelete={onDelete}
              onUpdateTask={onUpdateTask}
              onAddSubtask={onAddSubtask}
              onToggleSubtask={onToggleSubtask}
              onDeleteSubtask={onDeleteSubtask}
            />
          ))}
        </div>
      )}

      {/* Regular Tasks Section */}
      <div>
        {pinnedTasks.length > 0 && unpinnedTasks.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700 }}>
            OTHER TASKS ({unpinnedTasks.length})
          </div>
        )}

        {unpinnedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            isSelected={selectedTaskIds.includes(task.id)}
            onSelectToggle={handleSelectToggle}
            onToggleComplete={onToggleComplete}
            onTogglePin={onTogglePin}
            onDelete={onDelete}
            onUpdateTask={onUpdateTask}
            onAddSubtask={onAddSubtask}
            onToggleSubtask={onToggleSubtask}
            onDeleteSubtask={onDeleteSubtask}
          />
        ))}
      </div>

    </div>
  );
}
