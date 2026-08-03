import React from 'react';
import { 
  ListFilter, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Grid, 
  CheckCircle2, 
  ArrowUpDown,
  Search,
  X,
  Columns,
  List,
  Layers
} from 'lucide-react';

export default function TaskFilters({
  filterView,
  setFilterView,
  selectedCategory,
  setSelectedCategory,
  categories,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
  overdueCount,
  viewMode,
  setViewMode,
  onOpenTemplates
}) {
  const views = [
    { id: 'ALL', label: 'All Tasks', icon: <ListFilter size={15} /> },
    { id: 'TODAY', label: 'Today', icon: <Calendar size={15} /> },
    { id: 'UPCOMING', label: 'Upcoming', icon: <Clock size={15} /> },
    { id: 'OVERDUE', label: `Overdue ${overdueCount > 0 ? `(${overdueCount})` : ''}`, icon: <AlertTriangle size={15} />, count: overdueCount },
    { id: 'EISENHOWER', label: 'Eisenhower Priority', icon: <Grid size={15} /> },
    { id: 'COMPLETED', label: 'Completed', icon: <CheckCircle2 size={15} /> }
  ];

  return (
    <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      
      {/* Top Bar: View Mode Switcher, Tab Pills & Sort Control */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Layout View Mode Switcher (List / Grid / Kanban) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-secondary)', padding: '0.3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <button
            type="button"
            onClick={() => setViewMode('LIST')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              fontWeight: viewMode === 'LIST' ? 700 : 500,
              border: 'none',
              background: viewMode === 'LIST' ? 'var(--accent-primary)' : 'transparent',
              color: viewMode === 'LIST' ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            <List size={14} /> List
          </button>

          <button
            type="button"
            onClick={() => setViewMode('GRID')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              fontWeight: viewMode === 'GRID' ? 700 : 500,
              border: 'none',
              background: viewMode === 'GRID' ? 'var(--accent-primary)' : 'transparent',
              color: viewMode === 'GRID' ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            <Grid size={14} /> 2x2 Grid
          </button>

          <button
            type="button"
            onClick={() => setViewMode('KANBAN')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              fontWeight: viewMode === 'KANBAN' ? 700 : 500,
              border: 'none',
              background: viewMode === 'KANBAN' ? 'var(--accent-primary)' : 'transparent',
              color: viewMode === 'KANBAN' ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            <Columns size={14} /> Kanban
          </button>
        </div>

        {/* Workflow Templates Modal Trigger */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onOpenTemplates}
          style={{ fontSize: '0.85rem' }}
        >
          <Layers size={16} style={{ color: 'var(--accent-primary)' }} />
          <span>Workflow Templates</span>
        </button>

        {/* Sort selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-secondary)', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <ArrowUpDown size={15} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="DUE_DATE" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Target Due Date</option>
            <option value="PRIORITY" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Priority Matrix (P1-P4)</option>
            <option value="CREATED" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Creation Date</option>
            <option value="TITLE" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Alphabetical Title</option>
          </select>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
        {views.map((v) => {
          const isActive = filterView === v.id;
          const isOverdueAlert = v.id === 'OVERDUE' && overdueCount > 0;

          return (
            <button
              key={v.id}
              onClick={() => setFilterView(v.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-color)',
                background: isActive ? 'var(--accent-light)' : 'var(--bg-secondary)',
                color: isOverdueAlert ? 'var(--danger)' : isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)'
              }}
            >
              {v.icon}
              <span>{v.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Bar: Live Search & Category Chips */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Search Bar */}
        <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input-field"
            placeholder="Search tasks by title, ID, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.4rem', paddingRight: searchQuery ? '2rem' : '1rem' }}
          />
          {searchQuery && (
            <X 
              size={16} 
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', cursor: 'pointer' }} 
            />
          )}
        </div>

        {/* Category Chips */}
        {categories.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Category:</span>
            
            <button
              onClick={() => setSelectedCategory('ALL')}
              style={{
                padding: '0.25rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: selectedCategory === 'ALL' ? 700 : 500,
                border: '1px solid var(--border-color)',
                background: selectedCategory === 'ALL' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                color: selectedCategory === 'ALL' ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              All Categories
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.25rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  border: '1px solid var(--border-color)',
                  background: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
