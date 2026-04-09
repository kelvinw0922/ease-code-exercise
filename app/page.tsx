"use client";

import { AnalyzeInputForm } from "@/components/analyze-input-form";
import { HistoryList } from "@/components/history-list";
import { LatestResult } from "@/components/latest-result";
import { Separator } from "@/components/ui/separator";
import { AnalysisRecord } from "@/lib/types";
import { useHistory } from "@/lib/use-history";
import { useCallback, useState } from "react";

export default function Home() {
  const [editValues, setEditValues] = useState<{
    action: string;
    guideline: string;
  } | null>(null);
  const [latestResult, setLatestResult] = useState<AnalysisRecord | null>(null);
  const { history, addRecord, clearHistory } = useHistory();

  const handleResult = useCallback(
    (record: AnalysisRecord) => {
      setLatestResult(record);
      addRecord(record);
    },
    [addRecord],
  );

  const handleEdit = useCallback((record: AnalysisRecord) => {
    setEditValues({ action: record.action, guideline: record.guideline });
  }, []);

  const handleEditConsumed = useCallback(() => {
    setEditValues(null);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center bg-muted/30">
      <main className="w-full max-w-2xl px-4 py-12 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Kelvin&apos;s Compliance Evaluator
          </h1>
          <p className="text-muted-foreground">
            Check whether an action complies with a guideline using AI-powered
            zero-shot classification.
          </p>
        </header>

        <section aria-label="Analysis form">
          <AnalyzeInputForm
            onResult={handleResult}
            editValues={editValues}
            onEditConsumed={handleEditConsumed}
          />
        </section>

        <LatestResult record={latestResult} />

        <Separator />

        <section aria-label="Analysis history">
          <HistoryList
            history={history}
            onEdit={handleEdit}
            onClear={clearHistory}
          />
        </section>
      </main>
    </div>
  );
}
