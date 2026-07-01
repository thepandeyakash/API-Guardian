import {
  EndpointDetailsHeaderSkeleton,
} from "@/features/endpoint-details/components/EndpointDetailsHeader";
import {
  EndpointDetailsStatsGridSkeleton,
} from "@/features/endpoint-details/components/EndpointDetailsStatsGrid";
import {
  EndpointMonitoringSectionSkeleton,
} from "@/features/endpoint-details/components/EndpointMonitoringSection";
import {
  EndpointIncidentsSectionSkeleton,
} from "@/features/endpoint-details/components/EndpointIncidentsSection";
import {
  EndpointSecuritySectionSkeleton,
} from "@/features/endpoint-details/components/EndpointSecuritySection";
import {
  EndpointAlertsSectionSkeleton,
} from "@/features/endpoint-details/components/EndpointAlertsSection";
import { Skeleton } from "@/components/ui/skeleton";

export function EndpointDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-24" />
      </div>

      <EndpointDetailsHeaderSkeleton />
      <EndpointDetailsStatsGridSkeleton />
      <EndpointMonitoringSectionSkeleton />

      <div className="grid gap-6 xl:grid-cols-2">
        <EndpointIncidentsSectionSkeleton />
        <EndpointAlertsSectionSkeleton />
      </div>

      <EndpointSecuritySectionSkeleton />
    </div>
  );
}
