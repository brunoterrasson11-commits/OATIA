'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'oatia_ai_reports';

/**
 * Hook partagé pour la persistence des rapports IA entre les pages
 * Analyse IA et Rapports via localStorage.
 */
export function useReports() {
  const [reports, setReports] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setReports(JSON.parse(stored));
    } catch (e) {
      // ignore parse error
    }
    setLoaded(true);
  }, []);

  function persist(updated) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      // ignore storage error
    }
  }

  const saveReport = useCallback((report) => {
    const newReport = {
      ...report,
      id: report.id || Date.now(),
      savedAt: report.savedAt || new Date().toISOString(),
    };
    setReports(prev => {
      const updated = [newReport, ...prev.filter(r => r.id !== newReport.id)];
      persist(updated);
      return updated;
    });
    return newReport;
  }, []);

  const deleteReport = useCallback((id) => {
    setReports(prev => {
      const updated = prev.filter(r => r.id !== id);
      persist(updated);
      return updated;
    });
  }, []);

  const updateReport = useCallback((id, changes) => {
    setReports(prev => {
      const updated = prev.map(r =>
        r.id === id ? { ...r, ...changes, updatedAt: new Date().toISOString() } : r
      );
      persist(updated);
      return updated;
    });
  }, []);

  return { reports, saveReport, deleteReport, updateReport, loaded };
}
