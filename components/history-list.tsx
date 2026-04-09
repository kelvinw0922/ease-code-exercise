"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { AnalysisRecord, ComplianceResult } from "@/lib/types";
import { Pencil, Trash2 } from "lucide-react";

const badgeClass: Record<ComplianceResult, string> = {
  COMPLIES:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  DEVIATES: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  UNCLEAR:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
};

interface HistoryListProps {
  history: AnalysisRecord[];
  onEdit: (record: AnalysisRecord) => void;
  onClear: () => void;
}

export function HistoryList({ history, onEdit, onClear }: HistoryListProps) {
  if (history.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground py-8">
        No analyses yet. Submit an action and guideline above to get started.
      </p>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>History</CardTitle>
        <Button
          variant="destructive"
          size="sm"
          onClick={onClear}
          aria-label="Clear history"
        >
          <Trash2 />
          Clear
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {history.map((record, idx) => (
          <div key={record.id}>
            {idx > 0 && <Separator className="mb-3" />}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    className={`${badgeClass[record.result]} border-0 text-xs font-semibold`}
                  >
                    {record.result}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {(record.confidence * 100).toFixed(0)}% &middot;{" "}
                    {new Date(record.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm truncate" title={record.action}>
                  <span className="font-medium">Action:</span> {record.action}
                </p>
                <p
                  className="text-sm text-muted-foreground truncate"
                  title={record.guideline}
                >
                  <span className="font-medium text-foreground">
                    Guideline:
                  </span>{" "}
                  {record.guideline}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onEdit(record)}
                aria-label="Edit and resubmit"
              >
                <Pencil />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
