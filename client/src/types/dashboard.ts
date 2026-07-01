import type { Alert } from "@/types/alert";
import type { EndpointSummary } from "@/types/endpoint";
import type { UptimeChartPoint } from "@/types/monitoring";
import type { Project } from "@/types/project";
import type { IncidentWithEndpoint } from "@/types/report";

export type EndpointStatusOverview = {
  up: number;
  down: number;
  unknown: number;
};

export type DashboardStats = {
  totalProjects: number;
  totalEndpoints: number;
  uptimePercentage: number;
  activeIncidents: number;
  averageSecurityScore: number | null;
};

export type DashboardData = {
  projects: Project[];
  endpoints: EndpointSummary[];
  alerts: Alert[];
  stats: DashboardStats;
  recentAlerts: Alert[];
  recentIncidents: IncidentWithEndpoint[];
  endpointStatusOverview: EndpointStatusOverview;
  uptimeChartData: UptimeChartPoint[];
};
