import { FolderKanban, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/features/endpoint-details/components/EmptyState";

type ProjectsEmptyStateProps = {
  hasSearchQuery: boolean;
  onCreateProject: () => void;
};

export function ProjectsEmptyState({
  hasSearchQuery,
  onCreateProject,
}: ProjectsEmptyStateProps) {
  return (
    <div className="space-y-4">
      <EmptyState
        icon={FolderKanban}
        title={hasSearchQuery ? "No projects found" : "No projects yet"}
        description={
          hasSearchQuery
            ? "Try a different search term or create a new project."
            : "Create your first project to start organizing API endpoints."
        }
        className="h-56"
      />
      {!hasSearchQuery ? (
        <div className="flex justify-center">
          <Button onClick={onCreateProject}>
            <Plus />
            Create project
          </Button>
        </div>
      ) : null}
    </div>
  );
}
