import type { AiRequest, AiResponse } from "./types";

// TODO: Initialize the AI provider SDK here (OpenAI, Anthropic, etc.).
// Keep the request/response shape stable so UI integrations remain unchanged.
export const generateAiResponse = async (
  request: AiRequest,
): Promise<AiResponse> => {
  void request;
  // TODO: Swap for real provider call and return structured output.
  throw new Error("AI provider not configured.");
};
