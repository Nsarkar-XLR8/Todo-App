import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useTodos } from './hooks/useTodos';
import { useKeyboard } from './hooks/useKeyboard';
import Header from './components/Header';
import StatsOverview from './components/StatsOverview';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import EisenhowerGrid from './components/EisenhowerGrid';
import KanbanBoard from './components/KanbanBoard';
import CommandPalette from './components/CommandPalette';
import ActivityLog from './components/ActivityLog';
import PomodoroTimer from './components/PomodoroTimer';
import TaskTemplates from './components/TaskTemplates';
import Toast from './components/Toast';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const todoState = useTodos();

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAuditLogOpen, setIsAuditLogOpen] = useState(false);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);

  // Global Ctrl+K trigger for Command Palette
  useKeyboard({ key: 'k', ctrl: true }, () => {
    setIsCommandPaletteOpen((prev) => !prev);
  });

  return (
    <div className="app-container">
      
      {/* Navbar Header */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        activeWorkspace={todoState.activeWorkspace}
        setActiveWorkspace={todoState.setActiveWorkspace}
        allTasks={todoState.allWorkspaceTasks}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenAuditLog={() => setIsAuditLogOpen(true)}
        onOpenPomodoro={() => setIsPomodoroOpen(true)}
      />

      {/* Metrics & Velocity Stats Dashboard */}
      <StatsOverview stats={todoState.stats} />

      {/* Main Task Input Card */}
      <TaskForm
        onAddTask={todoState.addTask}
        categories={todoState.categories}
      />

      {/* Filters, View Switcher & Live Search Controls */}
      <TaskFilters
        filterView={todoState.filterView}
        setFilterView={todoState.setFilterView}
        selectedCategory={todoState.selectedCategory}
        setSelectedCategory={todoState.setSelectedCategory}
        categories={todoState.categories}
        sortBy={todoState.sortBy}
        setSortBy={todoState.setSortBy}
        searchQuery={todoState.searchQuery}
        setSearchQuery={todoState.setSearchQuery}
        overdueCount={todoState.stats.overdueCount}
        viewMode={todoState.viewMode}
        setViewMode={todoState.setViewMode}
        onOpenTemplates={() => setIsTemplatesOpen(true)}
      />

      {/* Dynamic View Layout Rendering */}
      {todoState.viewMode === 'GRID' && (
        <EisenhowerGrid
          tasks={todoState.tasks}
          onToggleComplete={todoState.toggleComplete}
          onUpdateTask={todoState.updateTask}
        />
      )}

      {todoState.viewMode === 'KANBAN' && (
        <KanbanBoard
          tasks={todoState.tasks}
          onUpdateTask={todoState.updateTask}
          onToggleComplete={todoState.toggleComplete}
        />
      )}

      {todoState.viewMode === 'LIST' && (
        <TaskList
          tasks={todoState.tasks}
          allWorkspaceTasks={todoState.allWorkspaceTasks}
          selectedTaskIds={todoState.selectedTaskIds}
          setSelectedTaskIds={todoState.setSelectedTaskIds}
          onToggleComplete={todoState.toggleComplete}
          onTogglePin={todoState.togglePin}
          onDelete={todoState.deleteTask}
          onUpdateTask={todoState.updateTask}
          onAddSubtask={todoState.addSubtask}
          onToggleSubtask={todoState.toggleSubtask}
          onDeleteSubtask={todoState.deleteSubtask}
          onBulkComplete={todoState.bulkComplete}
          onBulkDelete={todoState.bulkDelete}
          onClearCompleted={todoState.clearCompleted}
        />
      )}

      {/* Global Command Palette Dialog */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        tasks={todoState.allWorkspaceTasks}
        onToggleComplete={todoState.toggleComplete}
        onSelectTask={(id) => {
          todoState.setSelectedTaskIds([id]);
        }}
      />

      {/* Activity Audit Log Drawer */}
      <ActivityLog
        isOpen={isAuditLogOpen}
        onClose={() => setIsAuditLogOpen(false)}
      />

      {/* Pomodoro Focus Timer Modal */}
      <PomodoroTimer
        isOpen={isPomodoroOpen}
        onClose={() => setIsPomodoroOpen(false)}
      />

      {/* Workflow Templates Modal */}
      <TaskTemplates
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelectTemplate={todoState.addFromTemplate}
      />

      {/* Action Notification Toast */}
      <Toast
        toastMessage={todoState.toastMessage}
        onUndo={todoState.undoLastAction}
      />

      {/* Enterprise Footer */}
      <footer style={{ marginTop: '3rem', textTransform: 'uppercase', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
        TaskPulse Enterprise v2.5 • Offline Resilient • Hotkeys: <kbd style={{ background: 'var(--bg-tertiary)', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>Ctrl + K</kbd> Command Hub
      </footer>

    </div>
  );
}
