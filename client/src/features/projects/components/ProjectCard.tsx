import {
  Activity,
  Calendar,
  FolderOpen,
  Globe,
  MoreHorizontal,
  Pencil,
  Shield,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectMonitoringStatusBadge } from "@/features/projects/components/StatusBadges";
import type { EnrichedProject } from "@/types/projects-page";
import { formatDate, formatPercentage, formatScore } from "@/lib/format";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: EnrichedProject;
  isSelected: boolean;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function ProjectCard({
  project,
  isSelected,
  onOpen,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "border-border/60 bg-card/70 transition-colors hover:border-border",
        isSelected && "border-primary/40 ring-1 ring-primary/20"
      )}
    >
      <CardHeader className="pb-3 text-left">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle className="truncate text-base">{project.name}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {project.description || "No description"}
            </CardDescription>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Project actions">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onOpen}>
                <FolderOpen />
                Open project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Pencil />
                Edit project
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={onDelete}>
                <Trash2 />
                Delete project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-left">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Globe className="size-3.5" />
              Endpoints
            </div>
            <p className="mt-1 font-medium tabular-nums">
              {project.endpointCount}
            </p>
          </div>

          <div className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="size-3.5" />
              Created
            </div>
            <p className="mt-1 font-medium">{formatDate(project.createdAt)}</p>
          </div>

          <div className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Activity className="size-3.5" />
              Avg uptime
            </div>
            <p className="mt-1 font-medium tabular-nums">
              {formatPercentage(project.averageUptime)}
            </p>
          </div>

          <div className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="size-3.5" />
              Security score
            </div>
            <p className="mt-1 font-medium tabular-nums">
              {formatScore(project.averageSecurityScore)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <ProjectMonitoringStatusBadge status={project.monitoringStatus} />
          {isSelected ? (
            <Badge variant="secondary">Selected</Badge>
          ) : null}
        </div>

        <Button className="w-full" variant="outline" onClick={onOpen}>
          <FolderOpen />
          Open project
        </Button>
      </CardContent>
    </Card>
  );
}
