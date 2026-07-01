import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { EndpointStatusOverview } from "@/types/dashboard";
import { cn } from "@/lib/utils";

type EndpointStatusOverviewProps = {
  overview: EndpointStatusOverview;
  total: number;
};

const statusConfig = [
  {
    key: "up" as const,
    label: "Up",
    color: "bg-emerald-500",
    textColor: "text-emerald-400",
  },
  {
    key: "down" as const,
    label: "Down",
    color: "bg-red-500",
    textColor: "text-red-400",
  },
  {
    key: "unknown" as const,
    label: "Unknown",
    color: "bg-zinc-500",
    textColor: "text-zinc-400",
  },
];

export function EndpointStatusOverviewCard({
  overview,
  total,
}: EndpointStatusOverviewProps) {
  const isEmpty = total === 0;

  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <CardTitle>Endpoint Status</CardTitle>
        <CardDescription>Current health across all endpoints</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 text-left">
        {isEmpty ? (
          <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/10">
            <p className="text-sm text-muted-foreground">
              No endpoints configured yet.
            </p>
          </div>
        ) : (
          <>
            <div className="flex h-3 overflow-hidden rounded-full bg-muted/40">
              {statusConfig.map((status) => {
                const count = overview[status.key];
                const width = total ? (count / total) * 100 : 0;

                if (width === 0) {
                  return null;
                }

                return (
                  <div
                    key={status.key}
                    className={cn(status.color, "transition-all")}
                    style={{ width: `${width}%` }}
                  />
                );
              })}
            </div>

            <div className="grid gap-3">
              {statusConfig.map((status) => {
                const count = overview[status.key];
                const percentage = total
                  ? Math.round((count / total) * 100)
                  : 0;

                return (
                  <div
                    key={status.key}
                    className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/10 px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn("size-2 rounded-full", status.color)}
                      />
                      <span className="text-sm font-medium">{status.label}</span>
                    </div>
                    <div className="text-right">
                      <span className={cn("text-sm font-semibold", status.textColor)}>
                        {count}
                      </span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function EndpointStatusOverviewSkeleton() {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-4 w-52" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
