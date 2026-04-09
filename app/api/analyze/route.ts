import { NextResponse } from "next/server";
import { analyzeCompliance } from "@/lib/huggingface";
import type { AnalyzeRequest, AnalyzeResponse } from "@/lib/types";

export async function POST(request: Request) {
  let body: AnalyzeRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { action, guideline } = body;

  if (!action?.trim() || !guideline?.trim()) {
    return NextResponse.json(
      { error: "Both 'action' and 'guideline' fields are required" },
      { status: 400 },
    );
  }

  try {
    const compliance = await analyzeCompliance(action, guideline);

    const response: AnalyzeResponse = {
      id: crypto.randomUUID(),
      action,
      guideline,
      ...compliance,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
