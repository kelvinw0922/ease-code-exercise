export interface AnalyzeRequest {
  action: string;
  guideline: string;
}

export type ComplianceResult = "COMPLIES" | "DEVIATES" | "UNCLEAR";

export interface AnalyzeComplianceResult {
  result: ComplianceResult;
  confidence: number;
}

export interface AnalysisRecord extends AnalyzeComplianceResult {
  id: string;
  action: string;
  guideline: string;
  timestamp: string;
}

export type AnalyzeResponse = AnalysisRecord;

export interface HuggingFaceLabelScore {
  label: string;
  score: number;
}

export type HuggingFaceRawResponse = HuggingFaceLabelScore[];
