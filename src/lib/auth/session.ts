import type { AuthSession } from "./types";

// TODO: Replace with Clerk auth() or NextAuth session() when enabled.
export const getSession = async (): Promise<AuthSession | null> => {
  return null;
};
