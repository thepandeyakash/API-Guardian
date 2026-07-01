import { ChevronRight } from "lucide-react";
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
import type { EndpointSummary } from "@/types/endpoint";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

type EndpointsListCardProps = {
  endpoints: EndpointSummary[];
};

function statusVariant(status: EndpointSummary["lastStatus"]) {
  switch (status) {
    case "UP":
      return "outline" as const;
    case "DOWN":
      return "destructive" as const;
    case "UNKNOWN":
      return "secondary" as const;
  }
}

function statusClassName(status: EndpointSummary["lastStatus"]) {
  switch (status) {
    case "UP":
      return "border-emerald-500/30 text-emerald-400";
    case "DOWN":
      return undefined;
    case "UNKNOWN":
      return "text-muted-foreground";
  }
}

export function EndpointsListCard({ endpoints }: EndpointsListCardProps) {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <CardTitle>Endpoints</CardTitle>
        <CardDescription>
          Select an endpoint to view monitoring, incidents, and security details
        </CardDescription>
      </CardHeader>
      <CardContent>
        {endpoints.length === 0 ? (
          <EmptyState
            icon={Globe}
            title="No endpoints configured"
            description="Create an endpoint to start monitoring your APIs."
            className="h-48"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Last checked</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {endpoints.map((endpoint) => (
                <TableRow key={endpoint.id} className="group">
                  <TableCell>
                    <Link
                      to={`/endpoints/${endpoint.id}`}
                      className="block font-medium transition-colors hover:text-primary"
                    >
                      {endpoint.name}
                    </Link>
                    <p className="mt-0.5 max-w-[320px] truncate font-mono text-xs text-muted-foreground">
                      {endpoint.url}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{endpoint.method}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={statusVariant(endpoint.lastStatus)}
                      className={cn(statusClassName(endpoint.lastStatus))}
                    >
                      {endpoint.lastStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatDateTime(endpoint.lastCheckedAt)}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/endpoints/${endpoint.id}`}
                      className="inline-flex text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={`View details for ${endpoint.name}`}
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

export function EndpointsListCardSkeleton() {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-72" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
