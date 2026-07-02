import { ChevronRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
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
import { SecurityScoreBadge } from "@/features/security/components/SecurityScoreBadge";
import type { EndpointReportRow } from "@/types/reports-page";
import {
  formatLatency,
  formatPercentage,
} from "@/lib/format";

type EndpointReportsTableProps = {
  rows: EndpointReportRow[];
};

export function EndpointReportsTable({
  rows,
}: EndpointReportsTableProps) {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <CardTitle>Endpoint Reports</CardTitle>
        <CardDescription>
          Per-endpoint monitoring and security metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No endpoints configured"
            description="Create an endpoint to generate monitoring reports."
            className="h-48"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Endpoint</TableHead>
                <TableHead className="text-right">Uptime</TableHead>
                <TableHead className="text-right">Health</TableHead>
                <TableHead className="text-right">Latency</TableHead>
                <TableHead className="text-right">Security</TableHead>
                <TableHead className="text-right">Incidents</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.endpointId}>
                  <TableCell className="font-medium">
                    {row.endpointName}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatPercentage(row.uptimePercentage)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatPercentage(row.healthPercentage)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground">
                    {formatLatency(row.averageLatency)}
                  </TableCell>
                  <TableCell className="text-right">
                    <SecurityScoreBadge score={row.securityScore} />
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.totalIncidents}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/endpoints/${row.endpointId}`}>
                        View report
                        <ChevronRight />
                      </Link>
                    </Button>
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

export function EndpointReportsTableSkeleton() {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <Skeleton className="h-5 w-40" />
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
