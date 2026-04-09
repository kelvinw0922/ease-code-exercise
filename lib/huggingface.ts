import type {
  HuggingFaceRawResponse,
  AnalyzeComplianceResult,
  ComplianceResult,
} from "./types";

const HUGGING_FACE_API_URL =
  "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli";

const CANDIDATE_LABELS: [string, string, string] = [
  "complies",
  "deviates",
  "unclear",
];

function findHighestLabelAndScore(data: HuggingFaceRawResponse): {
  label: string;
  score: number;
} {
  return data.reduce(
    (max, current) => (current.score > max.score ? current : max),
    { label: "", score: 0 },
  );
}

export async function analyzeCompliance(
  action: string,
  guideline: string,
): Promise<AnalyzeComplianceResult> {
  const token = process.env.HUGGING_FACE_TOKEN;
  if (!token) {
    throw new Error("HUGGING_FACE_TOKEN environment variable is not set");
  }

  const response = await fetch(HUGGING_FACE_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: action,
      parameters: {
        candidate_labels: CANDIDATE_LABELS,
        hypothesis_template: `This action {} the guideline: ${guideline}`,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Hugging Face API error (${response.status}): ${errorBody}`,
    );
  }

  const data: HuggingFaceRawResponse = await response.json();

  const { label, score } = findHighestLabelAndScore(data);

  return {
    result: label.toUpperCase() as ComplianceResult,
    confidence: score,
  };
}
