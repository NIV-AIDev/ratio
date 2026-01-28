import type { ReactNode } from "react";
import { isAuthenticated } from "@/lib/auth";
import type { AuthSession } from "@/lib/auth";

type ProtectedRouteProps = {
  session: AuthSession | null;
  children: ReactNode;
  fallback?: ReactNode;
};

export default function ProtectedRoute({
  session,
  children,
  fallback = null,
}: ProtectedRouteProps) {
  if (!isAuthenticated(session)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
