import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/features/endpoint-details/components/EmptyState";
import type { Incident } from "@/types/report";
import { formatDateTime, formatDuration } from "@/lib/format";
import { AlertTriangle } from "lucide-react";

type EndpointIncidentsSectionProps = {
  incidents: Incident[];
};

export function EndpointIncidentsSection({
  incidents,
}: EndpointIncidentsSectionProps) {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <CardTitle>Incidents</CardTitle>
        <CardDescription>
          Downtime history with duration and error details
        </CardDescription>
      </CardHeader>
      <CardContent>
        {incidents.length === 0 ? (
          <EmptyState
            icon={AlertTriangle}
            title="No incidents recorded"
            description="This endpoint has no downtime events in its history."
            className="h-48"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Started</TableHead>
                <TableHead>Ended</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Failures</TableHead>
                <TableHead>Error</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell>
                    <Badge
                      variant={
                        incident.status === "OPEN"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {incident.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDateTime(incident.startedAt)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDateTime(incident.endedAt)}
                  </TableCell>
                  <TableCell>{formatDuration(incident.duration)}</TableCell>
                  <TableCell>{incident.failureCount}</TableCell>
                  <TableCell className="max-w-[280px] truncate text-muted-foreground">
                    {incident.lastErrorMessage ?? "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export function EndpointIncidentsSectionSkeleton() {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
