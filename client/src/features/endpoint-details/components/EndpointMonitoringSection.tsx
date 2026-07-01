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
import { UptimeChart } from "@/features/dashboard/components/UptimeChart";
import type { MonitoringLog, UptimeChartPoint } from "@/types/monitoring";
import { formatDateTime, formatLatency } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ScrollText } from "lucide-react";

type EndpointMonitoringSectionProps = {
  logs: MonitoringLog[];
  uptimeChartData: UptimeChartPoint[];
};

export function EndpointMonitoringSection({
  logs,
  uptimeChartData,
}: EndpointMonitoringSectionProps) {
  return (
    <div className="space-y-6">
      <UptimeChart
        data={uptimeChartData}
        title="Uptime Trend"
        description="Hourly uptime for this endpoint"
      />

      <Card className="border-border/60 bg-card/70">
        <CardHeader className="text-left">
          <CardTitle>Monitoring Logs</CardTitle>
          <CardDescription>
            Recent health check results for this endpoint
          </CardDescription>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <EmptyState
              icon={ScrollText}
              title="No monitoring logs yet"
              description="Health checks will appear here once monitoring runs."
              className="h-48"
            />
          ) : (
            <div className="max-h-[420px] overflow-auto rounded-lg border border-border/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Latency</TableHead>
                    <TableHead>Healthy</TableHead>
                    <TableHead>Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {formatDateTime(log.checkedAt)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={log.isUp ? "outline" : "destructive"}
                          className={cn(
                            log.isUp &&
                              "border-emerald-500/30 text-emerald-400"
                          )}
                        >
                          {log.isUp ? "UP" : "DOWN"}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.statusCode ?? "—"}</TableCell>
                      <TableCell>{formatLatency(log.latency)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={log.isHealthy ? "outline" : "secondary"}
                          className={cn(
                            log.isHealthy &&
                              "border-emerald-500/30 text-emerald-400"
                          )}
                        >
                          {log.isHealthy ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[240px] truncate text-muted-foreground">
                        {log.errorMessage ?? "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function EndpointMonitoringSectionSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="border-border/60 bg-card/70">
        <CardHeader className="text-left">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-72 w-full" />
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/70">
        <CardHeader className="text-left">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
