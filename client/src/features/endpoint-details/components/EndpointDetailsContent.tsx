import type { EndpointDetailsData } from "@/types/endpoint-details";

import {
  EndpointDetailsHeader,
} from "@/features/endpoint-details/components/EndpointDetailsHeader";
import {
  EndpointDetailsStatsGrid,
} from "@/features/endpoint-details/components/EndpointDetailsStatsGrid";
import {
  EndpointMonitoringSection,
} from "@/features/endpoint-details/components/EndpointMonitoringSection";
import {
  EndpointIncidentsSection,
} from "@/features/endpoint-details/components/EndpointIncidentsSection";
import {
  EndpointSecuritySection,
} from "@/features/endpoint-details/components/EndpointSecuritySection";
import {
  EndpointAlertsSection,
} from "@/features/endpoint-details/components/EndpointAlertsSection";

type EndpointDetailsContentProps = {
  data: EndpointDetailsData;
};

export function EndpointDetailsContent({
  data,
}: EndpointDetailsContentProps) {
  const { report, logs, uptimeChartData, alerts } = data;

  return (
    <div className="space-y-6">
      <EndpointDetailsHeader endpoint={report.endpoint} />

      <EndpointDetailsStatsGrid
        analytics={report.analytics}
        latestSecurityScan={report.latestSecurityScan}
      />

      <EndpointMonitoringSection
        logs={logs}
        uptimeChartData={uptimeChartData}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <EndpointIncidentsSection incidents={report.incidents} />
        <EndpointAlertsSection alerts={alerts} />
      </div>

      <EndpointSecuritySection
        latestSecurityScan={report.latestSecurityScan}
      />
    </div>
  );
}
