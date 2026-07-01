import {
  Activity,
  ChevronRight,
  Globe,
  MoreHorizontal,
  Pencil,
  Plus,
  Shield,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EndpointStatusBadge } from "@/features/projects/components/StatusBadges";
import { EmptyState } from "@/features/endpoint-details/components/EmptyState";
import type { EnrichedProject } from "@/types/projects-page";
import { formatLatency, formatScore } from "@/lib/format";

type ProjectEndpointsPanelProps = {
  project: EnrichedProject;
  onCreateEndpoint: () => void;
  onEditEndpoint: (endpointId: string) => void;
  onDeleteEndpoint: (endpointId: string) => void;
  onRunHealthCheck: (endpointId: string) => void;
  onRunSecurityScan: (endpointId: string) => void;
  pendingHealthCheckId?: string | null;
  pendingSecurityScanId?: string | null;
};

export function ProjectEndpointsPanel({
  project,
  onCreateEndpoint,
  onEditEndpoint,
  onDeleteEndpoint,
  onRunHealthCheck,
  onRunSecurityScan,
  pendingHealthCheckId,
  pendingSecurityScanId,
}: ProjectEndpointsPanelProps) {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="flex flex-row items-start justify-between gap-4 text-left">
        <div>
          <CardTitle>{project.name} endpoints</CardTitle>
          <CardDescription>
            {project.endpointCount} endpoint
            {project.endpointCount === 1 ? "" : "s"} in this project
          </CardDescription>
        </div>
        <Button size="sm" onClick={onCreateEndpoint}>
          <Plus />
          Add endpoint
        </Button>
      </CardHeader>

      <CardContent>
        {project.endpoints.length === 0 ? (
          <EmptyState
            icon={Globe}
            title="No endpoints yet"
            description="Add an endpoint to start monitoring this project."
            className="h-48"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Endpoint</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Latency</TableHead>
                <TableHead>Security</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.endpoints.map((endpoint) => {
                const isHealthCheckPending =
                  pendingHealthCheckId === endpoint.id;
                const isSecurityScanPending =
                  pendingSecurityScanId === endpoint.id;

                return (
                  <TableRow key={endpoint.id}>
                    <TableCell>
                      <Link
                        to={`/endpoints/${endpoint.id}`}
                        className="block font-medium transition-colors hover:text-primary"
                      >
                        {endpoint.name}
                      </Link>
                      <p className="mt-0.5 max-w-[280px] truncate font-mono text-xs text-muted-foreground">
                        {endpoint.url}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{endpoint.method}</Badge>
                    </TableCell>
                    <TableCell>
                      <EndpointStatusBadge status={endpoint.lastStatus} />
                    </TableCell>
                    <TableCell className="tabular-nums text-muted-foreground">
                      {formatLatency(endpoint.lastLatency)}
                    </TableCell>
                    <TableCell className="tabular-nums">
                      {formatScore(endpoint.securityScore)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Actions for ${endpoint.name}`}
                          >
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/endpoints/${endpoint.id}`}>
                              <ChevronRight />
                              Open details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onRunHealthCheck(endpoint.id)}
                            disabled={isHealthCheckPending}
                          >
                            <Activity />
                            {isHealthCheckPending
                              ? "Running check..."
                              : "Run health check"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onRunSecurityScan(endpoint.id)}
                            disabled={isSecurityScanPending}
                          >
                            <Shield />
                            {isSecurityScanPending
                              ? "Starting scan..."
                              : "Run security scan"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onEditEndpoint(endpoint.id)}
                          >
                            <Pencil />
                            Edit endpoint
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => onDeleteEndpoint(endpoint.id)}
                          >
                            <Trash2 />
                            Delete endpoint
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
