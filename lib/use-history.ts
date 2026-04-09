"use client";

import { useState, useCallback, useEffect } from "react";
import type { AnalysisRecord } from "./types";

const STORAGE_KEY = "compliance-evaluator-history";

function loadHistory(): AnalysisRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AnalysisRecord[]) : [];
  } catch {
    return [];
  }
}

export function useHistory() {
  const [history, setHistory] = useState<AnalysisRecord[]>([]);

  useEffect(() => {
    const historyInLocalStorage = loadHistory();
    setHistory(historyInLocalStorage);
  }, []);

  const addRecord = useCallback((record: AnalysisRecord) => {
    setHistory((prev) => {
      const savedRecords = [record, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedRecords));
      return savedRecords;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { history, addRecord, clearHistory };
}
