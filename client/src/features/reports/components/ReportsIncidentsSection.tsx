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
import type { IncidentWithEndpoint } from "@/types/report";
import {
  formatDateTime,
  formatDuration,
} from "@/lib/format";

type ReportsIncidentsSectionProps = {
  incidents: IncidentWithEndpoint[];
};

export function ReportsIncidentsSection({
  incidents,
}: ReportsIncidentsSectionProps) {
  return (
    <section className="space-y-4">
      <div className="text-left">
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          Incidents
        </h2>
        <p className="text-sm text-muted-foreground">
          Recent downtime events across your endpoints
        </p>
      </div>

      <Card className="border-border/60 bg-card/70">
        <CardHeader className="text-left">
          <CardTitle>Recent Incidents</CardTitle>
          <CardDescription>
            Latest incidents with duration and error details
          </CardDescription>
        </CardHeader>
        <CardContent>
          {incidents.length === 0 ? (
            <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/10">
              <p className="text-sm text-muted-foreground">
                No incidents recorded yet.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Error</TableHead>
                  <TableHead className="text-right">Started</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell className="font-medium">
                      {incident.endpointName}
                    </TableCell>
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
                    <TableCell className="text-muted-foreground">
                      {formatDuration(incident.duration)}
                    </TableCell>
                    <TableCell className="max-w-[280px] truncate text-muted-foreground">
                      {incident.lastErrorMessage ?? "—"}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatDateTime(incident.startedAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

export function ReportsIncidentsSectionSkeleton() {
  return (
    <section className="space-y-4">
      <Card className="border-border/60 bg-card/70">
        <CardHeader className="text-left">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </section>
  );
}
