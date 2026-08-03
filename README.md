# ⚡ TaskPulse Enterprise - Task & Workspace Suite

[![React Version](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-4.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Design System](https://img.shields.io/badge/Design_System-CSS_Tokens-00C7B7)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)](#)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**TaskPulse Enterprise** is an enterprise-grade, high-velocity task and operations management platform. Engineered for teams and power users, it combines a responsive design system with keyboard-driven controls, real-time analytics, multi-workspace switching, and offline persistence.

---

## 🌟 Key Features

### 🏢 Multi-Workspace Contexts
- Switch between **Engineering**, **Personal & Growth**, and **Operations & Product** workspaces seamlessly.
- State, metrics, and categories isolate automatically per workspace.

### 🎯 Priority Matrix & SLA Tracking
- **Eisenhower Priority System**: Assign tasks to **🔴 P1 Urgent**, **🟠 P2 High**, **🔵 P3 Medium**, or **⚪ P4 Low**.
- **Overdue SLA Alerts**: Automatic calculation of target due dates and real-time SLA breach indicators.
- **Effort Estimation**: Track estimated story hours per task and sum active work across projects.

### 🚀 Command Palette & Keyboard Hub (`Ctrl + K`)
- Instant search modal triggered by `Ctrl + K` or search bar.
- Rapidly query tasks by title, category, or task ID (`TASK-101`).

### 📊 Real-Time Productivity Analytics
- KPI cards monitoring **Completion Rate %**, **Total Active Effort (Hours)**, **SLA Breach Count**, and **Velocity Streak**.

### 📋 Interactive Subtask Checklists
- Break tasks into actionable subtask steps.
- Visual subtask progress percentage bar (`2/3 completed (67%)`).

### 🎨 Design System & Theme Engine
- **Dark Mode / Light Mode**: Dynamic CSS Custom Properties (`data-theme="dark"` or `"light"`) with system preference fallback.
- **Responsive Layout**: Mobile-first responsive layout tailored for mobile phones, tablets, and desktop workstations.

### 🛡️ Data Integrity & Resilience
- **Offline LocalStorage Sync**: Safe automatic persistence without backend lock-in.
- **Undo Engine**: 1-click restoration for accidental deletions or bulk actions.
- **Activity Audit Trail**: History of task creations, updates, completions, and deletions recorded in an audit drawer.
- **JSON Export & Import**: Backup task datasets instantly.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **UI Library** | React 18 | Declarative component hierarchy and hooks architecture |
| **Build System** | Vite 4.5 | Lightning-fast HMR and optimized production bundle |
| **Icons** | Lucide React | High-grade SVG iconography |
| **Styling** | CSS Variables | Dynamic theme tokens, glassmorphism, and responsive breakpoints |
| **State** | React Reducer + Hooks | Centralized action dispatching and undo stack management |
| **Typography** | Plus Jakarta Sans | Modern enterprise sans-serif font |

---

## ⚡ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + K` / `Cmd + K` | Open Command Palette |
| `Esc` | Close Command Palette or Audit Log Drawer |
| `Enter` | Submit Task or Subtask |
| `Space` / `Click` | Toggle Task Completion |

---

## 📦 Getting Started

### Prerequisites
- **Node.js**: `v16.0.0` or higher
- **npm**: `v8.0.0` or higher

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/todo-app.git

# 2. Navigate to project directory
cd todoapp

# 3. Install dependencies
npm install

# 4. Launch development server
npm run dev
```

The application will launch at `http://localhost:5173`.

### Production Build

```bash
# Bundle for production deployment
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Architecture

```
todoapp/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Top navbar, workspace switcher & controls
│   │   ├── StatsOverview.jsx   # Metrics, velocity & SLA cards
│   │   ├── TaskForm.jsx        # Rich task & subtask builder
│   │   ├── TaskFilters.jsx     # View tabs, search & category chips
│   │   ├── TaskList.jsx        # Grouped task container & bulk actions
│   │   ├── TaskItem.jsx        # Enterprise task card & subtask panel
│   │   ├── CommandPalette.jsx  # Ctrl+K modal overlay
│   │   ├── ActivityLog.jsx     # Audit log drawer
│   │   └── Toast.jsx           # Action alerts with 1-click Undo
│   ├── hooks/
│   │   ├── useTodos.js         # Reducer state container & business logic
│   │   ├── useTheme.js         # Theme switcher hook
│   │   └── useKeyboard.js      # Global hotkey mapping hook
│   ├── services/
│   │   ├── storageService.js   # LocalStorage & demo seed data
│   │   └── auditService.js     # Enterprise activity logger
│   ├── styles/
│   │   ├── variables.css       # Design tokens & themes
│   │   └── index.css           # Base reset & mobile responsive layout
│   ├── App.jsx                 # Root application wrapper
│   └── main.jsx                # DOM entrypoint
├── package.json
├── vite.config.js
└── index.html
```

---

## 🔒 Data Privacy & Offline First

TaskPulse Enterprise stores all workspace data locally using `localStorage`. No external network requests are made for data storage, ensuring full privacy and zero cloud latency.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
