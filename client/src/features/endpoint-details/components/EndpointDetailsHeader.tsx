import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { ReportEndpoint } from "@/types/report";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

type EndpointDetailsHeaderProps = {
  endpoint: ReportEndpoint;
};

function statusVariant(status: ReportEndpoint["lastStatus"]) {
  switch (status) {
    case "UP":
      return "outline" as const;
    case "DOWN":
      return "destructive" as const;
    case "UNKNOWN":
      return "secondary" as const;
  }
}

function statusClassName(status: ReportEndpoint["lastStatus"]) {
  switch (status) {
    case "UP":
      return "border-emerald-500/30 text-emerald-400";
    case "DOWN":
      return undefined;
    case "UNKNOWN":
      return "text-muted-foreground";
  }
}

export function EndpointDetailsHeader({
  endpoint,
}: EndpointDetailsHeaderProps) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-6 text-left">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              {endpoint.name}
            </h1>
            <Badge variant="outline">{endpoint.method}</Badge>
            <Badge
              variant={statusVariant(endpoint.lastStatus)}
              className={cn(statusClassName(endpoint.lastStatus))}
            >
              {endpoint.lastStatus}
            </Badge>
          </div>

          <p className="break-all font-mono text-sm text-muted-foreground">
            {endpoint.url}
          </p>
        </div>

        <div className="shrink-0 rounded-lg border border-border/50 bg-muted/10 px-4 py-3 text-sm">
          <p className="text-muted-foreground">Last checked</p>
          <p className="mt-1 font-medium">
            {formatDateTime(endpoint.lastCheckedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function EndpointDetailsHeaderSkeleton() {
  return (
    <div className="rounded-xl border border-border/60 bg-card/70 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-14" />
          </div>
          <Skeleton className="h-4 w-full max-w-lg" />
        </div>
        <Skeleton className="h-16 w-40" />
      </div>
    </div>
  );
}
