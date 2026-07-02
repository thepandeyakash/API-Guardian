import { ChevronRight, Globe } from "lucide-react";
import { Link } from "react-router-dom";

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
import { SecurityScoreBadge } from "@/features/security/components/SecurityScoreBadge";
import type { EndpointSecurityOverview } from "@/types/security-dashboard";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { SecurityScanStatus } from "@/types/report";

type EndpointSecurityOverviewTableProps = {
  endpoints: EndpointSecurityOverview[];
};

function scanStatusVariant(status: SecurityScanStatus | null) {
  switch (status) {
    case "COMPLETED":
      return "outline" as const;
    case "PENDING":
      return "secondary" as const;
    case "FAILED":
      return "destructive" as const;
    default:
      return "secondary" as const;
  }
}

function scanStatusClassName(status: SecurityScanStatus | null) {
  switch (status) {
    case "COMPLETED":
      return "border-emerald-500/30 text-emerald-400";
    case "PENDING":
      return "text-amber-400";
    case "FAILED":
      return undefined;
    default:
      return "text-muted-foreground";
  }
}

export function EndpointSecurityOverviewTable({
  endpoints,
}: EndpointSecurityOverviewTableProps) {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <CardTitle>Endpoint Security Overview</CardTitle>
        <CardDescription>
          Latest scan status and scores per endpoint
        </CardDescription>
      </CardHeader>
      <CardContent>
        {endpoints.length === 0 ? (
          <EmptyState
            icon={Globe}
            title="No endpoints configured"
            description="Create an endpoint to start running security scans."
            className="h-48"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Endpoint</TableHead>
                <TableHead>Security Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Last Scan</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {endpoints.map((endpoint) => (
                <TableRow key={endpoint.endpointId} className="group">
                  <TableCell>
                    <Link
                      to={`/endpoints/${endpoint.endpointId}`}
                      className="block font-medium transition-colors hover:text-primary"
                    >
                      {endpoint.endpointName}
                    </Link>
                    <p className="mt-0.5 max-w-[320px] truncate font-mono text-xs text-muted-foreground">
                      {endpoint.url}
                    </p>
                  </TableCell>
                  <TableCell>
                    <SecurityScoreBadge score={endpoint.securityScore} />
                  </TableCell>
                  <TableCell>
                    {endpoint.scanStatus ? (
                      <Badge
                        variant={scanStatusVariant(endpoint.scanStatus)}
                        className={cn(
                          scanStatusClassName(endpoint.scanStatus)
                        )}
                      >
                        {endpoint.scanStatus}
                      </Badge>
                    ) : (
                      <Badge variant="secondary">NOT SCANNED</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatDateTime(endpoint.scannedAt)}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/endpoints/${endpoint.endpointId}`}
                      className="inline-flex text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={`View details for ${endpoint.endpointName}`}
                    >
                      <ChevronRight className="size-4" />
                    </Link>
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

export function EndpointSecurityOverviewTableSkeleton() {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <Skeleton className="h-5 w-52" />
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
