import { useState } from "react";

import { CreateEndpointDialog } from "@/features/projects/components/CreateEndpointDialog";
import { CreateProjectDialog } from "@/features/projects/components/CreateProjectDialog";
import { DeleteConfirmDialog } from "@/features/projects/components/DeleteConfirmDialog";
import { EditEndpointDialog } from "@/features/projects/components/EditEndpointDialog";
import { EditProjectDialog } from "@/features/projects/components/EditProjectDialog";
import { ProjectsContent } from "@/features/projects/components/ProjectsContent";
import { ProjectsErrorState } from "@/features/projects/components/ProjectsErrorState";
import { ProjectsPageHeader } from "@/features/projects/components/ProjectsPageHeader";
import { ProjectsSkeleton } from "@/features/projects/components/ProjectsSkeleton";
import {
  useDeleteEndpoint,
  useRunHealthCheck,
  useRunSecurityScan,
} from "@/features/projects/hooks/useEndpoints";
import { useDeleteProject } from "@/features/projects/hooks/useProjects";
import { useProjectsPage } from "@/features/projects/hooks/useProjectsPage";
import type { EnrichedProject } from "@/types/projects-page";
import type { Project } from "@/types/project";

export function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [createEndpointOpen, setCreateEndpointOpen] = useState(false);
  const [editEndpointOpen, setEditEndpointOpen] = useState(false);

  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [endpointProjectId, setEndpointProjectId] = useState<string | null>(
    null
  );
  const [endpointProjectName, setEndpointProjectName] = useState<
    string | undefined
  >();
  const [endpointToEditId, setEndpointToEditId] = useState<string | null>(
    null
  );

  const [deleteDialog, setDeleteDialog] = useState<{
    type: "project" | "endpoint";
    id: string;
    name: string;
  } | null>(null);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useProjectsPage();

  const deleteProject = useDeleteProject();
  const deleteEndpoint = useDeleteEndpoint();
  const runHealthCheck = useRunHealthCheck();
  const runSecurityScan = useRunSecurityScan();

  function handleOpenProject(projectId: string) {
    setSelectedProjectId((current) =>
      current === projectId ? null : projectId
    );
  }

  function handleEditProject(project: EnrichedProject) {
    setProjectToEdit(project);
    setEditProjectOpen(true);
  }

  function handleDeleteProject(project: EnrichedProject) {
    setDeleteDialog({
      type: "project",
      id: project.id,
      name: project.name,
    });
  }

  function handleCreateEndpoint(project: EnrichedProject) {
    setEndpointProjectId(project.id);
    setEndpointProjectName(project.name);
    setCreateEndpointOpen(true);
  }

  function handleEditEndpoint(endpointId: string) {
    setEndpointToEditId(endpointId);
    setEditEndpointOpen(true);
  }

  function handleDeleteEndpoint(endpointId: string, endpointName: string) {
    setDeleteDialog({
      type: "endpoint",
      id: endpointId,
      name: endpointName,
    });
  }

  function handleConfirmDelete() {
    if (!deleteDialog) {
      return;
    }

    if (deleteDialog.type === "project") {
      deleteProject.mutate(deleteDialog.id, {
        onSuccess: () => {
          if (selectedProjectId === deleteDialog.id) {
            setSelectedProjectId(null);
          }
          setDeleteDialog(null);
        },
      });
      return;
    }

    deleteEndpoint.mutate(deleteDialog.id, {
      onSuccess: () => {
        setDeleteDialog(null);
      },
    });
  }

  const isDeletePending =
    deleteProject.isPending || deleteEndpoint.isPending;

  return (
    <div className="min-h-svh bg-background">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ProjectsPageHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCreateProject={() => setCreateProjectOpen(true)}
          onRefresh={() => refetch()}
          isRefreshing={isFetching}
        />

        {isLoading ? <ProjectsSkeleton /> : null}

        {isError ? (
          <ProjectsErrorState
            error={error}
            onRetry={() => refetch()}
            isRetrying={isFetching}
          />
        ) : null}

        {!isLoading && !isError && data ? (
          <ProjectsContent
            projects={data.projects}
            searchQuery={searchQuery}
            selectedProjectId={selectedProjectId}
            onSelectProject={handleOpenProject}
            onCreateProject={() => setCreateProjectOpen(true)}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
            onCreateEndpoint={handleCreateEndpoint}
            onEditEndpoint={handleEditEndpoint}
            onDeleteEndpoint={handleDeleteEndpoint}
            onRunHealthCheck={(endpointId) =>
              runHealthCheck.mutate(endpointId)
            }
            onRunSecurityScan={(endpointId) =>
              runSecurityScan.mutate(endpointId)
            }
            pendingHealthCheckId={
              runHealthCheck.isPending ? runHealthCheck.variables : null
            }
            pendingSecurityScanId={
              runSecurityScan.isPending ? runSecurityScan.variables : null
            }
          />
        ) : null}
      </div>

      <CreateProjectDialog
        open={createProjectOpen}
        onOpenChange={setCreateProjectOpen}
      />

      <EditProjectDialog
        open={editProjectOpen}
        onOpenChange={setEditProjectOpen}
        project={projectToEdit}
      />

      <CreateEndpointDialog
        open={createEndpointOpen}
        onOpenChange={setCreateEndpointOpen}
        projectId={endpointProjectId}
        projectName={endpointProjectName}
      />

      <EditEndpointDialog
        open={editEndpointOpen}
        onOpenChange={setEditEndpointOpen}
        endpointId={endpointToEditId}
      />

      <DeleteConfirmDialog
        open={Boolean(deleteDialog)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteDialog(null);
          }
        }}
        title={
          deleteDialog?.type === "project"
            ? "Delete project"
            : "Delete endpoint"
        }
        description={
          deleteDialog?.type === "project"
            ? `Delete "${deleteDialog.name}" and all of its endpoints? This action cannot be undone.`
            : `Delete "${deleteDialog?.name}"? This action cannot be undone.`
        }
        onConfirm={handleConfirmDelete}
        isPending={isDeletePending}
      />
    </div>
  );
}
