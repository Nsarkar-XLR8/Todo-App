import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, Calendar, Clock, Tag, Flag, ListPlus, X } from 'lucide-react';

export default function TaskForm({ onAddTask, categories }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('P3_MEDIUM');
  const [category, setCategory] = useState('Engineering');
  const [newCategory, setNewCategory] = useState('');
  const [dueDate, setDueDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [effortHours, setEffortHours] = useState('2');
  const [subtasks, setSubtasks] = useState([]);
  const [currentSubtask, setCurrentSubtask] = useState('');

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!currentSubtask.trim()) return;
    setSubtasks([...subtasks, { id: 'sub-' + Date.now(), title: currentSubtask.trim(), completed: false }]);
    setCurrentSubtask('');
  };

  const handleRemoveSubtask = (id) => {
    setSubtasks(subtasks.filter((s) => s.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const finalCategory = category === 'NEW' ? newCategory.trim() || 'General' : category;

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      category: finalCategory,
      dueDate,
      effortHours,
      subtasks
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setPriority('P3_MEDIUM');
    setSubtasks([]);
    setCurrentSubtask('');
    setIsExpanded(false);
  };

  return (
    <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
      <form onSubmit={handleSubmit}>
        
        {/* Main Input Row */}
        <div className="task-form-main-row" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Add new enterprise task or press 'N'..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            style={{ fontSize: '1rem', fontWeight: 500 }}
          />

          <div className="btn-group" style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setIsExpanded(!isExpanded)}
              title="Toggle Detailed Options"
            >
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              <span style={{ fontSize: '0.85rem' }}>Details</span>
            </button>

            <button type="submit" className="btn btn-primary">
              <Plus size={18} />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Expandable Advanced Options */}
        {isExpanded && (
          <div className="animate-fade-in" style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', display: 'grid', gap: '1rem' }}>
            
            {/* Description Textarea */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                Task Description
              </label>
              <textarea
                className="input-field"
                rows={2}
                placeholder="Provide task context, requirements, or acceptance criteria..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Grid Row: Priority, Category, Due Date, Effort */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
              
              {/* Priority Selector */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.3rem' }}>
                  <Flag size={14} /> Priority Level
                </label>
                <select
                  className="input-field"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="P1_URGENT">🔴 P1 - Urgent</option>
                  <option value="P2_HIGH">🟠 P2 - High</option>
                  <option value="P3_MEDIUM">🔵 P3 - Medium</option>
                  <option value="P4_LOW">⚪ P4 - Low</option>
                </select>
              </div>

              {/* Category Selector */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.3rem' }}>
                  <Tag size={14} /> Category / Project
                </label>
                <select
                  className="input-field"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="Engineering">Engineering</option>
                  <option value="Product">Product</option>
                  <option value="Design">Design</option>
                  <option value="Security">Security</option>
                  <option value="NEW">+ Add New Category...</option>
                </select>

                {category === 'NEW' && (
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Category name..."
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    style={{ marginTop: '0.5rem' }}
                  />
                )}
              </div>

              {/* Due Date */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.3rem' }}>
                  <Calendar size={14} /> Target Due Date
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              {/* Effort Hours */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.3rem' }}>
                  <Clock size={14} /> Effort Estimate (Hrs)
                </label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  className="input-field"
                  value={effortHours}
                  onChange={(e) => setEffortHours(e.target.value)}
                />
              </div>

            </div>

            {/* Subtask Inline Builder */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.4rem' }}>
                <ListPlus size={14} /> Subtask Checklist ({subtasks.length})
              </label>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Add a subtask step..."
                  value={currentSubtask}
                  onChange={(e) => setCurrentSubtask(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSubtask(e);
                    }
                  }}
                />
                <button type="button" className="btn btn-secondary" onClick={handleAddSubtask}>
                  Add
                </button>
              </div>

              {/* Subtask list pills */}
              {subtasks.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {subtasks.map((sub) => (
                    <span 
                      key={sub.id} 
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.4rem',
                        background: 'var(--bg-tertiary)',
                        padding: '0.3rem 0.6rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {sub.title}
                      <X 
                        size={14} 
                        style={{ cursor: 'pointer', color: 'var(--text-muted)' }} 
                        onClick={() => handleRemoveSubtask(sub.id)}
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </form>
    </div>
  );
}
