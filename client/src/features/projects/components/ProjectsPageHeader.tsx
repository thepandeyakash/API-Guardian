import { LayoutDashboard, Plus, RefreshCw, Search } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ProjectsPageHeaderProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onCreateProject: () => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
};

export function ProjectsPageHeader({
  searchQuery,
  onSearchChange,
  onCreateProject,
  onRefresh,
  isRefreshing = false,
}: ProjectsPageHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 border-b border-border/60 pb-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="text-left">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Projects
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage projects, endpoints, and monitoring configuration
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search projects..."
            className="pl-8"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/">
              <LayoutDashboard />
              Dashboard
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={isRefreshing ? "animate-spin" : undefined} />
            Refresh
          </Button>
          <Button size="sm" onClick={onCreateProject}>
            <Plus />
            Create project
          </Button>
        </div>
      </div>
    </header>
  );
}
