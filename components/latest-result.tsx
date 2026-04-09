"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AnalysisRecord, ComplianceResult } from "@/lib/types";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";

const resultConfig: Record<
  ComplianceResult,
  { className: string; icon: React.ElementType; label: string }
> = {
  COMPLIES: {
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    icon: CheckCircle,
    label: "COMPLIES",
  },
  DEVIATES: {
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    icon: XCircle,
    label: "DEVIATES",
  },
  UNCLEAR: {
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    icon: HelpCircle,
    label: "UNCLEAR",
  },
};

interface LatestResultProps {
  record: AnalysisRecord | null;
}

export function LatestResult({ record }: LatestResultProps) {
  if (!record) return null;

  const config = resultConfig[record.result];
  const Icon = config.icon;

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 py-2">
        <div className="flex items-center gap-2">
          <Icon className="size-5" />
          <Badge
            className={`${config.className} border-0 px-3 py-1 text-sm font-semibold`}
          >
            {config.label}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          Confidence:{" "}
          <span className="font-semibold text-foreground">
            {(record.confidence * 100).toFixed(0)}%
          </span>
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date(record.timestamp).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
