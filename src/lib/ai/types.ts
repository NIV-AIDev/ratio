export type AiMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type AiRequest = {
  messages: AiMessage[];
  temperature?: number;
};

export type AiResponse = {
  content: string;
};
