import { useMemo } from "react";

import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { ProjectEndpointsPanel } from "@/features/projects/components/ProjectEndpointsPanel";
import { ProjectsEmptyState } from "@/features/projects/components/ProjectsEmptyState";
import type { EnrichedProject } from "@/types/projects-page";

type ProjectsGridProps = {
  projects: EnrichedProject[];
  selectedProjectId: string | null;
  onOpenProject: (projectId: string) => void;
  onEditProject: (project: EnrichedProject) => void;
  onDeleteProject: (project: EnrichedProject) => void;
};

export function ProjectsGrid({
  projects,
  selectedProjectId,
  onOpenProject,
  onEditProject,
  onDeleteProject,
}: ProjectsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isSelected={selectedProjectId === project.id}
          onOpen={() => onOpenProject(project.id)}
          onEdit={() => onEditProject(project)}
          onDelete={() => onDeleteProject(project)}
        />
      ))}
    </div>
  );
}

type ProjectsContentProps = {
  projects: EnrichedProject[];
  searchQuery: string;
  selectedProjectId: string | null;
  onSelectProject: (projectId: string) => void;
  onCreateProject: () => void;
  onEditProject: (project: EnrichedProject) => void;
  onDeleteProject: (project: EnrichedProject) => void;
  onCreateEndpoint: (project: EnrichedProject) => void;
  onEditEndpoint: (endpointId: string) => void;
  onDeleteEndpoint: (endpointId: string, endpointName: string) => void;
  onRunHealthCheck: (endpointId: string) => void;
  onRunSecurityScan: (endpointId: string) => void;
  pendingHealthCheckId?: string | null;
  pendingSecurityScanId?: string | null;
};

export function ProjectsContent({
  projects,
  searchQuery,
  selectedProjectId,
  onSelectProject,
  onCreateProject,
  onEditProject,
  onDeleteProject,
  onCreateEndpoint,
  onEditEndpoint,
  onDeleteEndpoint,
  onRunHealthCheck,
  onRunSecurityScan,
  pendingHealthCheckId,
  pendingSecurityScanId,
}: ProjectsContentProps) {
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        (project.description?.toLowerCase().includes(query) ?? false)
    );
  }, [projects, searchQuery]);

  const selectedProject = useMemo(
    () =>
      projects.find((project) => project.id === selectedProjectId) ?? null,
    [projects, selectedProjectId]
  );

  if (filteredProjects.length === 0) {
    return (
      <ProjectsEmptyState
        hasSearchQuery={Boolean(searchQuery.trim())}
        onCreateProject={onCreateProject}
      />
    );
  }

  return (
    <div className="space-y-6">
      <ProjectsGrid
        projects={filteredProjects}
        selectedProjectId={selectedProjectId}
        onOpenProject={onSelectProject}
        onEditProject={onEditProject}
        onDeleteProject={onDeleteProject}
      />

      {selectedProject ? (
        <ProjectEndpointsPanel
          project={selectedProject}
          onCreateEndpoint={() => onCreateEndpoint(selectedProject)}
          onEditEndpoint={onEditEndpoint}
          onDeleteEndpoint={(endpointId) => {
            const endpoint = selectedProject.endpoints.find(
              (item) => item.id === endpointId
            );
            onDeleteEndpoint(endpointId, endpoint?.name ?? "this endpoint");
          }}
          onRunHealthCheck={onRunHealthCheck}
          onRunSecurityScan={onRunSecurityScan}
          pendingHealthCheckId={pendingHealthCheckId}
          pendingSecurityScanId={pendingSecurityScanId}
        />
      ) : null}
    </div>
  );
}
