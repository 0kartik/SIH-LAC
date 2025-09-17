import { LogEntry } from '../types';

let logs: LogEntry[] = [];

export const addLog = (entry: LogEntry): void => {
  logs.push(entry);
};

export const downloadLogs = (): void => {
  const headers = ['Timestamp', 'Question', 'Answer'];
  const csvContent = [
    headers.join(','),
    ...logs.map(log => [
      log.timestamp,
      `"${log.question.replace(/"/g, '""')}"`,
      `"${log.answer.replace(/"/g, '""')}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `verbo_logs_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getLogs = (): LogEntry[] => logs;