import { LayoutDashboard, LogOut, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { DashboardContent } from "@/features/dashboard/components/DashboardContent";
import { DashboardErrorState } from "@/features/dashboard/components/DashboardErrorState";
import { DashboardSkeleton } from "@/features/dashboard/components/DashboardSkeleton";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { useLogout } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/stores/auth.store";

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();
  const { data, isLoading, isError, error, refetch, isFetching } =
    useDashboard();

  return (
    <div className="min-h-svh bg-background">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-left">
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Overview of your API monitoring and security posture
              {user ? ` · ${user.name}` : ""}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/projects">
                <LayoutDashboard />
                Projects
              </Link>
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

        {isLoading ? <DashboardSkeleton /> : null}

        {isError ? (
          <DashboardErrorState
            error={error}
            onRetry={() => refetch()}
            isRetrying={isFetching}
          />
        ) : null}

        {!isLoading && !isError && data ? (
          <DashboardContent data={data} />
        ) : null}
      </div>
    </div>
  );
}
