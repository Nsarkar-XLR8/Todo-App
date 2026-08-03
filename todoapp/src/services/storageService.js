// LocalStorage & Data Persistence Service

const TASKS_STORAGE_KEY = 'taskpulse_enterprise_todos';
const WORKSPACE_KEY = 'taskpulse_active_workspace';

export const INITIAL_WORKSPACES = [
  { id: 'ws-all', name: '🌐 All Workspaces', icon: 'Globe' },
  { id: 'ws-engineering', name: '💻 Engineering Workspace', icon: 'Code' },
  { id: 'ws-personal', name: '👤 Personal & Growth', icon: 'User' },
  { id: 'ws-operations', name: '💼 Operations & Product', icon: 'Briefcase' }
];

export const DEMO_TASKS = [
  {
    id: 'TASK-101',
    workspaceId: 'ws-engineering',
    title: 'Migrate API Gateway to GraphQL Subscriptions',
    description: 'Refactor real-time websocket endpoint to handle high throughput event streams.',
    status: 'IN_PROGRESS',
    priority: 'P1_URGENT',
    category: 'Engineering',
    effortHours: 12,
    dueDate: '2026-08-05',
    pinned: true,
    subtasks: [
      { id: 'sub-1', title: 'Define GraphQL schema directives', completed: true },
      { id: 'sub-2', title: 'Setup Redis pub/sub broker', completed: true },
      { id: 'sub-3', title: 'Write load test script using k6', completed: false }
    ],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'TASK-102',
    workspaceId: 'ws-engineering',
    title: 'Security Audit & Dependency Vulnerability Scan',
    description: 'Review npm packages, update React dependencies, and patch CVE vulnerabilities.',
    status: 'BACKLOG',
    priority: 'P2_HIGH',
    category: 'Security',
    effortHours: 6,
    dueDate: '2026-08-10',
    pinned: false,
    subtasks: [
      { id: 'sub-4', title: 'Run npm audit fix', completed: true },
      { id: 'sub-5', title: 'Update Vite & Tailwind configurations', completed: false }
    ],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'TASK-103',
    workspaceId: 'ws-operations',
    title: 'Q3 Enterprise Product Roadmap Alignment',
    description: 'Synthesize customer feedback and align engineering velocity for Q3 launch.',
    status: 'IN_PROGRESS',
    priority: 'P1_URGENT',
    category: 'Product',
    effortHours: 8,
    dueDate: '2026-08-04',
    pinned: true,
    subtasks: [
      { id: 'sub-6', title: 'Gather feedback from Customer Success', completed: true },
      { id: 'sub-7', title: 'Draft feature priority matrix', completed: false }
    ],
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'TASK-104',
    workspaceId: 'ws-personal',
    title: 'System Design Architecture Deep Dive',
    description: 'Study distributed consensus algorithms (Raft, Paxos) and event-driven patterns.',
    status: 'COMPLETED',
    priority: 'P3_MEDIUM',
    category: 'Learning',
    effortHours: 5,
    dueDate: '2026-08-02',
    pinned: false,
    subtasks: [
      { id: 'sub-8', title: 'Read Raft paper section 3', completed: true },
      { id: 'sub-9', title: 'Summarize key takeaways in Obsidian', completed: true }
    ],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: new Date(Date.now() - 86400000).toISOString()
  }
];

export const loadTasks = () => {
  try {
    const data = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(DEMO_TASKS));
      return DEMO_TASKS;
    }
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(DEMO_TASKS));
      return DEMO_TASKS;
    }

    // Normalize tasks to guarantee all properties exist
    return parsed.map((task, index) => ({
      id: task.id || 'TASK-' + (100 + index),
      workspaceId: task.workspaceId || 'ws-engineering',
      title: task.title || task.name || 'Untitled Task',
      description: task.description || '',
      status: task.status || (task.done ? 'COMPLETED' : 'IN_PROGRESS'),
      priority: task.priority || 'P3_MEDIUM',
      category: task.category || 'General',
      effortHours: task.effortHours || 1,
      dueDate: task.dueDate || new Date().toISOString().slice(0, 10),
      pinned: !!task.pinned,
      subtasks: Array.isArray(task.subtasks) ? task.subtasks : [],
      createdAt: task.createdAt || new Date().toISOString(),
      updatedAt: task.updatedAt || new Date().toISOString()
    }));
  } catch (error) {
    console.error('Failed to load tasks from localStorage', error);
    return DEMO_TASKS;
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage', error);
  }
};

export const loadWorkspace = () => {
  try {
    return localStorage.getItem(WORKSPACE_KEY) || 'ws-all';
  } catch {
    return 'ws-all';
  }
};

export const saveWorkspace = (workspaceId) => {
  try {
    localStorage.setItem(WORKSPACE_KEY, workspaceId);
  } catch (error) {
    console.error('Failed to save workspace', error);
  }
};

export const exportTasksJSON = (tasks) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `taskpulse_export_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

export const exportTasksCSV = (tasks) => {
  const headers = ['ID', 'Workspace', 'Title', 'Description', 'Status', 'Priority', 'Category', 'Effort (Hours)', 'Due Date', 'Created At'];
  const rows = tasks.map(t => [
    `"${t.id}"`,
    `"${t.workspaceId}"`,
    `"${t.title.replace(/"/g, '""')}"`,
    `"${(t.description || '').replace(/"/g, '""')}"`,
    `"${t.status}"`,
    `"${t.priority}"`,
    `"${t.category}"`,
    t.effortHours || 0,
    `"${t.dueDate || ''}"`,
    `"${t.createdAt || ''}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", encodeURI(csvContent));
  downloadAnchor.setAttribute("download", `taskpulse_export_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};
