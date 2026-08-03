// Enterprise Activity Audit Log Service

const AUDIT_STORAGE_KEY = 'taskpulse_audit_log';

export const logActivity = (action, details, taskId = null) => {
  try {
    const logs = getAuditLogs();
    const newEntry = {
      id: 'aud-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString(),
      action,
      details,
      taskId
    };
    const updated = [newEntry, ...logs].slice(0, 100); // keep last 100 entries
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(updated));
    return newEntry;
  } catch (error) {
    console.error('Failed to log audit activity', error);
  }
};

export const getAuditLogs = () => {
  try {
    const data = localStorage.getItem(AUDIT_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const clearAuditLogs = () => {
  try {
    localStorage.removeItem(AUDIT_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear audit logs', error);
  }
};
