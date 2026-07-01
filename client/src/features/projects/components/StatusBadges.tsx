import type { EndpointStatus } from "@/types/endpoint";
import type { ProjectMonitoringStatus } from "@/types/projects-page";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function EndpointStatusBadge({
  status,
}: {
  status: EndpointStatus;
}) {
  const variant =
    status === "UP"
      ? "outline"
      : status === "DOWN"
        ? "destructive"
        : "secondary";

  return (
    <Badge
      variant={variant}
      className={cn(
        status === "UP" && "border-emerald-500/30 text-emerald-400",
        status === "UNKNOWN" && "text-muted-foreground"
      )}
    >
      {status}
    </Badge>
  );
}

const monitoringStatusConfig: Record<
  ProjectMonitoringStatus,
  { label: string; className: string }
> = {
  healthy: {
    label: "Healthy",
    className: "border-emerald-500/30 text-emerald-400",
  },
  degraded: {
    label: "Degraded",
    className: "border-amber-500/30 text-amber-400",
  },
  down: {
    label: "Down",
    className: "",
  },
  unknown: {
    label: "Unknown",
    className: "text-muted-foreground",
  },
  empty: {
    label: "No endpoints",
    className: "text-muted-foreground",
  },
};

export function ProjectMonitoringStatusBadge({
  status,
}: {
  status: ProjectMonitoringStatus;
}) {
  const config = monitoringStatusConfig[status];

  return (
    <Badge
      variant={status === "down" ? "destructive" : "outline"}
      className={cn(config.className)}
    >
      {config.label}
    </Badge>
  );
}
