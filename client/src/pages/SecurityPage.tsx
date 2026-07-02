import {
  LayoutDashboard,
  LogOut,
  RefreshCw,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { SecurityContent } from "@/features/security/components/SecurityContent";
import { SecurityErrorState } from "@/features/security/components/SecurityErrorState";
import { SecuritySkeleton } from "@/features/security/components/SecuritySkeleton";
import { useSecurityDashboard } from "@/features/security/hooks/useSecurityDashboard";
import { useLogout } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/stores/auth.store";

export function SecurityPage() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();
  const { data, isLoading, isError, error, refetch, isFetching } =
    useSecurityDashboard();

  return (
    <div className="min-h-svh bg-background">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-left">
            <div className="mb-1 flex items-center gap-2">
              <Shield className="size-5 text-primary" />
              <h1 className="font-heading text-2xl font-semibold tracking-tight">
                Security
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Security posture, findings, and AI-assisted remediation
              {user ? ` · ${user.name}` : ""}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <LayoutDashboard />
                Dashboard
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/projects">Projects</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw className={isFetching ? "animate-spin" : undefined} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut />
              Sign out
            </Button>
          </div>
        </header>

        {isLoading ? <SecuritySkeleton /> : null}

        {isError ? (
          <SecurityErrorState
            error={error}
            onRetry={() => refetch()}
            isRetrying={isFetching}
          />
        ) : null}

        {!isLoading && !isError && data ? (
          <SecurityContent data={data} />
        ) : null}
      </div>
    </div>
  );
}
