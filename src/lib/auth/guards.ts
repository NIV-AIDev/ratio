import type { AuthSession } from "./types";

export const isAuthenticated = (
  session: AuthSession | null,
): session is AuthSession => Boolean(session?.user?.id);

// TODO: Replace with redirect or error handling once auth is wired.
export const requireAuth = (session: AuthSession | null) => {
  if (!isAuthenticated(session)) {
    throw new Error("Authentication required.");
  }

  return session;
};
