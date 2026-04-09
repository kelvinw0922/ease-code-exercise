"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { AnalyzeResponse } from "@/lib/types";

interface AnalyzeInputFormProps {
  onResult: (result: AnalyzeResponse) => void;
  editValues: { action: string; guideline: string } | null;
  onEditConsumed: () => void;
}

export function AnalyzeInputForm({
  onResult,
  editValues,
  onEditConsumed,
}: AnalyzeInputFormProps) {
  const [action, setAction] = useState("");
  const [guideline, setGuideline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (editValues) {
      setAction(editValues.action);
      setGuideline(editValues.guideline);
      onEditConsumed();
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editValues, onEditConsumed]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: action.trim(),
            guideline: guideline.trim(),
          }),
        });

        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.error ?? `Request failed (${res.status})`);
        }

        const data: AnalyzeResponse = await res.json();
        onResult(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred",
        );
      } finally {
        setLoading(false);
      }
    },
    [action, guideline, onResult],
  );

  const isDisabled = loading || !action.trim() || !guideline.trim();

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="action" className="text-lg font-medium leading-none">
          Action
        </label>
        <Textarea
          id="action"
          placeholder='e.g. "Closed ticket #48219 and sent confirmation email"'
          value={action}
          onChange={(e) => setAction(e.target.value)}
          disabled={loading}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="guideline" className="text-lg font-medium leading-none">
          Guideline
        </label>
        <Textarea
          id="guideline"
          placeholder='e.g. "All closed tickets must include a confirmation email"'
          value={guideline}
          onChange={(e) => setGuideline(e.target.value)}
          disabled={loading}
          rows={3}
        />
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" disabled={isDisabled} size="lg" className="w-full">
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            Analyzing…
          </>
        ) : (
          "Analyze Compliance"
        )}
      </Button>
    </form>
  );
}
