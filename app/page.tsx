"use client";

import { AnalyzeInputForm } from "@/components/analyze-input-form";
import { AnalysisRecord } from "@/lib/types";
import { useCallback, useState } from "react";

export default function Home() {
  const [editValues, setEditValues] = useState<{
    action: string;
    guideline: string;
  } | null>(null);

  const handleResult = useCallback((record: AnalysisRecord) => {}, []);

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
            onEditConsumed={() => {}}
          />
        </section>
      </main>
    </div>
  );
}
