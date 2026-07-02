import {
  Download,
  FileJson,
  FileSpreadsheet,
  LayoutDashboard,
  LogOut,
  RefreshCw,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReportsContent } from "@/features/reports/components/ReportsContent";
import { ReportsErrorState } from "@/features/reports/components/ReportsErrorState";
import { ReportsSkeleton } from "@/features/reports/components/ReportsSkeleton";
import { useReportsPage } from "@/features/reports/hooks/useReportsPage";
import { useLogout } from "@/features/auth/hooks/useAuth";
import {
  exportEndpointRowsAsCsv,
  exportReportAsJson,
} from "@/lib/export-report";
import { useAuthStore } from "@/stores/auth.store";

export function ReportsPage() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();
  const { data, isLoading, isError, error, refetch, isFetching } =
    useReportsPage();

  return (
    <div className="min-h-svh bg-background">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-left">
            <div className="mb-1 flex items-center gap-2">
              <Download className="size-5 text-primary" />
              <h1 className="font-heading text-2xl font-semibold tracking-tight">
                Reports
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Monitoring analytics, incidents, and security across all endpoints
              {user ? ` · ${user.name}` : ""}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!data}
                >
                  <Download />
                  Export report
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Export format</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={!data}
                  onClick={() => data && exportReportAsJson(data)}
                >
                  <FileJson />
                  Full report (JSON)
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={!data}
                  onClick={() => data && exportEndpointRowsAsCsv(data)}
                >
                  <FileSpreadsheet />
                  Endpoint table (CSV)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <LayoutDashboard />
                Dashboard
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/security">
                <Shield />
                Security
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

        {isLoading ? <ReportsSkeleton /> : null}

        {isError ? (
          <ReportsErrorState
            error={error}
            onRetry={() => refetch()}
            isRetrying={isFetching}
          />
        ) : null}

        {!isLoading && !isError && data ? (
          <ReportsContent data={data} />
        ) : null}
      </div>
    </div>
  );
}
