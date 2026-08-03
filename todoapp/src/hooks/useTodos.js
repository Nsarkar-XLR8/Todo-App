import { useState, useEffect, useReducer, useCallback } from 'react';
import { loadTasks, saveTasks, loadWorkspace, saveWorkspace } from '../services/storageService';
import { logActivity } from '../services/auditService';

const ACTIONS = {
  SET_TASKS: 'SET_TASKS',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  TOGGLE_COMPLETE: 'TOGGLE_COMPLETE',
  TOGGLE_PIN: 'TOGGLE_PIN',
  ADD_SUBTASK: 'ADD_SUBTASK',
  TOGGLE_SUBTASK: 'TOGGLE_SUBTASK',
  DELETE_SUBTASK: 'DELETE_SUBTASK',
  BULK_COMPLETE: 'BULK_COMPLETE',
  BULK_DELETE: 'BULK_DELETE',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  RESTORE_STATE: 'RESTORE_STATE'
};

function todosReducer(state, action) {
  let nextState;
  switch (action.type) {
    case ACTIONS.SET_TASKS:
      return { ...state, tasks: action.payload };

    case ACTIONS.ADD_TASK:
      nextState = {
        ...state,
        tasks: [action.payload, ...state.tasks],
        history: [state.tasks, ...state.history].slice(0, 10)
      };
      break;

    case ACTIONS.UPDATE_TASK:
      nextState = {
        ...state,
        tasks: state.tasks.map((t) => (t.id === action.payload.id ? { ...t, ...action.payload, updatedAt: new Date().toISOString() } : t)),
        history: [state.tasks, ...state.history].slice(0, 10)
      };
      break;

    case ACTIONS.DELETE_TASK:
      nextState = {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
        history: [state.tasks, ...state.history].slice(0, 10)
      };
      break;

    case ACTIONS.TOGGLE_COMPLETE:
      nextState = {
        ...state,
        tasks: state.tasks.map((t) => {
          if (t.id === action.payload) {
            const isCompleted = t.status === 'COMPLETED';
            return {
              ...t,
              status: isCompleted ? 'IN_PROGRESS' : 'COMPLETED',
              completedAt: isCompleted ? null : new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
          }
          return t;
        }),
        history: [state.tasks, ...state.history].slice(0, 10)
      };
      break;

    case ACTIONS.TOGGLE_PIN:
      nextState = {
        ...state,
        tasks: state.tasks.map((t) => (t.id === action.payload ? { ...t, pinned: !t.pinned } : t))
      };
      break;

    case ACTIONS.ADD_SUBTASK:
      nextState = {
        ...state,
        tasks: state.tasks.map((t) => {
          if (t.id === action.payload.taskId) {
            const subtasks = t.subtasks || [];
            return {
              ...t,
              subtasks: [...subtasks, { id: 'sub-' + Date.now(), title: action.payload.title, completed: false }]
            };
          }
          return t;
        })
      };
      break;

    case ACTIONS.TOGGLE_SUBTASK:
      nextState = {
        ...state,
        tasks: state.tasks.map((t) => {
          if (t.id === action.payload.taskId) {
            const subtasks = (t.subtasks || []).map((sub) =>
              sub.id === action.payload.subtaskId ? { ...sub, completed: !sub.completed } : sub
            );
            return { ...t, subtasks };
          }
          return t;
        })
      };
      break;

    case ACTIONS.DELETE_SUBTASK:
      nextState = {
        ...state,
        tasks: state.tasks.map((t) => {
          if (t.id === action.payload.taskId) {
            const subtasks = (t.subtasks || []).filter((sub) => sub.id !== action.payload.subtaskId);
            return { ...t, subtasks };
          }
          return t;
        })
      };
      break;

    case ACTIONS.BULK_COMPLETE:
      nextState = {
        ...state,
        tasks: state.tasks.map((t) => (action.payload.includes(t.id) ? { ...t, status: 'COMPLETED', completedAt: new Date().toISOString() } : t)),
        history: [state.tasks, ...state.history].slice(0, 10)
      };
      break;

    case ACTIONS.BULK_DELETE:
      nextState = {
        ...state,
        tasks: state.tasks.filter((t) => !action.payload.includes(t.id)),
        history: [state.tasks, ...state.history].slice(0, 10)
      };
      break;

    case ACTIONS.CLEAR_COMPLETED:
      nextState = {
        ...state,
        tasks: state.tasks.filter((t) => t.status !== 'COMPLETED'),
        history: [state.tasks, ...state.history].slice(0, 10)
      };
      break;

    case ACTIONS.RESTORE_STATE:
      if (state.history.length === 0) return state;
      nextState = {
        ...state,
        tasks: state.history[0],
        history: state.history.slice(1)
      };
      break;

    default:
      return state;
  }

  saveTasks(nextState.tasks);
  return nextState;
}

export function useTodos() {
  const [activeWorkspace, setActiveWorkspaceState] = useState(() => loadWorkspace());
  const [viewMode, setViewMode] = useState('LIST'); // 'LIST' | 'GRID' | 'KANBAN'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterView, setFilterView] = useState('ALL'); // ALL, TODAY, UPCOMING, OVERDUE, EISENHOWER, COMPLETED
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('DUE_DATE'); // DUE_DATE, PRIORITY, CREATED, TITLE
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const [state, dispatch] = useReducer(todosReducer, {
    tasks: [],
    history: []
  });

  useEffect(() => {
    const initialTasks = loadTasks();
    dispatch({ type: ACTIONS.SET_TASKS, payload: initialTasks });
  }, []);

  const setActiveWorkspace = (wsId) => {
    setActiveWorkspaceState(wsId);
    saveWorkspace(wsId);
    logActivity('WORKSPACE_SWITCH', `Switched to workspace ${wsId}`);
  };

  const showToast = (message, canUndo = false) => {
    setToastMessage({ message, canUndo, id: Date.now() });
    setTimeout(() => {
      setToastMessage((current) => (current && current.id === message.id ? null : current));
    }, 4000);
  };

  const addTask = useCallback((taskData) => {
    const targetWs = activeWorkspace === 'ws-all' ? 'ws-engineering' : activeWorkspace;

    const newTask = {
      id: 'TASK-' + Math.floor(100 + Math.random() * 900),
      workspaceId: targetWs,
      title: taskData.title,
      description: taskData.description || '',
      status: taskData.status || 'IN_PROGRESS',
      priority: taskData.priority || 'P3_MEDIUM',
      category: taskData.category || 'General',
      effortHours: taskData.effortHours ? Number(taskData.effortHours) : 1,
      dueDate: taskData.dueDate || new Date().toISOString().slice(0, 10),
      pinned: false,
      subtasks: taskData.subtasks || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dispatch({ type: ACTIONS.ADD_TASK, payload: newTask });
    logActivity('CREATED', `Created task "${newTask.title}" (${newTask.id})`, newTask.id);
    showToast(`Task "${newTask.title}" created!`);
  }, [activeWorkspace]);

  const addFromTemplate = useCallback((template) => {
    addTask({
      title: template.title,
      description: template.description,
      priority: template.priority,
      category: template.category,
      effortHours: template.effortHours,
      subtasks: template.subtasks
    });
  }, [addTask]);

  const updateTask = useCallback((task) => {
    dispatch({ type: ACTIONS.UPDATE_TASK, payload: task });
    logActivity('UPDATED', `Updated task "${task.title}"`, task.id);
  }, []);

  const deleteTask = useCallback((taskId) => {
    const taskToDelete = state.tasks.find((t) => t.id === taskId);
    dispatch({ type: ACTIONS.DELETE_TASK, payload: taskId });
    setSelectedTaskIds((prev) => prev.filter((id) => id !== taskId));
    logActivity('DELETED', `Deleted task "${taskToDelete ? taskToDelete.title : taskId}"`, taskId);
    showToast(`Task deleted`, true);
  }, [state.tasks]);

  const toggleComplete = useCallback((taskId) => {
    dispatch({ type: ACTIONS.TOGGLE_COMPLETE, payload: taskId });
    const t = state.tasks.find((task) => task.id === taskId);
    logActivity('TOGGLED_STATUS', `Toggled status for "${t ? t.title : taskId}"`, taskId);
  }, [state.tasks]);

  const togglePin = useCallback((taskId) => {
    dispatch({ type: ACTIONS.TOGGLE_PIN, payload: taskId });
  }, []);

  const addSubtask = useCallback((taskId, title) => {
    dispatch({ type: ACTIONS.ADD_SUBTASK, payload: { taskId, title } });
  }, []);

  const toggleSubtask = useCallback((taskId, subtaskId) => {
    dispatch({ type: ACTIONS.TOGGLE_SUBTASK, payload: { taskId, subtaskId } });
  }, []);

  const deleteSubtask = useCallback((taskId, subtaskId) => {
    dispatch({ type: ACTIONS.DELETE_SUBTASK, payload: { taskId, subtaskId } });
  }, []);

  const undoLastAction = useCallback(() => {
    dispatch({ type: ACTIONS.RESTORE_STATE });
    logActivity('RESTORED', 'Restored previous state');
    setToastMessage(null);
  }, []);

  const bulkComplete = useCallback(() => {
    if (selectedTaskIds.length === 0) return;
    dispatch({ type: ACTIONS.BULK_COMPLETE, payload: selectedTaskIds });
    setSelectedTaskIds([]);
    showToast(`Completed ${selectedTaskIds.length} tasks`, true);
  }, [selectedTaskIds]);

  const bulkDelete = useCallback(() => {
    if (selectedTaskIds.length === 0) return;
    dispatch({ type: ACTIONS.BULK_DELETE, payload: selectedTaskIds });
    setSelectedTaskIds([]);
    showToast(`Deleted ${selectedTaskIds.length} tasks`, true);
  }, [selectedTaskIds]);

  const clearCompleted = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_COMPLETED });
    showToast(`Cleared completed tasks`, true);
  }, []);

  // Filter tasks based on Workspace, View, Category, and Search
  const workspaceTasks = activeWorkspace === 'ws-all'
    ? state.tasks
    : state.tasks.filter((t) => t.workspaceId === activeWorkspace);

  const categories = Array.from(new Set(workspaceTasks.map((t) => t.category))).filter(Boolean);

  const todayStr = new Date().toISOString().slice(0, 10);

  const filteredTasks = workspaceTasks.filter((task) => {
    // Search Query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchDesc = (task.description || '').toLowerCase().includes(q);
      const matchId = task.id.toLowerCase().includes(q);
      const matchCategory = (task.category || '').toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchId && !matchCategory) return false;
    }

    // Category filter
    if (selectedCategory !== 'ALL' && task.category !== selectedCategory) {
      return false;
    }

    // View filter
    if (filterView === 'TODAY') {
      return task.dueDate === todayStr;
    } else if (filterView === 'UPCOMING') {
      return task.dueDate > todayStr && task.status !== 'COMPLETED';
    } else if (filterView === 'OVERDUE') {
      return task.dueDate < todayStr && task.status !== 'COMPLETED';
    } else if (filterView === 'COMPLETED') {
      return task.status === 'COMPLETED';
    } else if (filterView === 'EISENHOWER') {
      return task.priority === 'P1_URGENT' || task.priority === 'P2_HIGH';
    }

    return true; // ALL
  });

  // Sorting
  const priorityWeight = { P1_URGENT: 1, P2_HIGH: 2, P3_MEDIUM: 3, P4_LOW: 4 };

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;

    if (sortBy === 'PRIORITY') {
      return priorityWeight[a.priority] - priorityWeight[b.priority];
    } else if (sortBy === 'DUE_DATE') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    } else if (sortBy === 'CREATED') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'TITLE') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Statistics
  const totalCount = workspaceTasks.length;
  const completedCount = workspaceTasks.filter((t) => t.status === 'COMPLETED').length;
  const overdueCount = workspaceTasks.filter((t) => t.dueDate < todayStr && t.status !== 'COMPLETED').length;
  const totalEffort = workspaceTasks.reduce((acc, t) => acc + (t.effortHours || 0), 0);
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return {
    tasks: sortedTasks,
    allWorkspaceTasks: workspaceTasks,
    activeWorkspace,
    setActiveWorkspace,
    viewMode,
    setViewMode,
    addTask,
    addFromTemplate,
    updateTask,
    deleteTask,
    toggleComplete,
    togglePin,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    undoLastAction,
    bulkComplete,
    bulkDelete,
    clearCompleted,
    selectedTaskIds,
    setSelectedTaskIds,
    searchQuery,
    setSearchQuery,
    filterView,
    setFilterView,
    selectedCategory,
    setSelectedCategory,
    categories,
    sortBy,
    setSortBy,
    toastMessage,
    stats: {
      totalCount,
      completedCount,
      overdueCount,
      totalEffort,
      completionRate
    }
  };
}
