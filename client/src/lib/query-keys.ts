export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

export const projectKeys = {
  all: ["projects"] as const,
  list: () => [...projectKeys.all, "list"] as const,
  detail: (id: string) => [...projectKeys.all, "detail", id] as const,
};

export const endpointKeys = {
  all: ["endpoints"] as const,
  list: () => [...endpointKeys.all, "list"] as const,
  detail: (id: string) => [...endpointKeys.all, "detail", id] as const,
};

export const projectsPageKeys = {
  all: ["projects-page"] as const,
  overview: () => [...projectsPageKeys.all, "overview"] as const,
};

export const reportKeys = {
  all: ["reports"] as const,
  detail: (endpointId: string) =>
    [...reportKeys.all, endpointId] as const,
};

export const monitoringKeys = {
  all: ["monitoring"] as const,
  logs: (endpointId: string, limit?: number) =>
    [...monitoringKeys.all, "logs", endpointId, limit] as const,
  analytics: (endpointId: string) =>
    [...monitoringKeys.all, "analytics", endpointId] as const,
};

export const alertKeys = {
  all: ["alerts"] as const,
  list: () => [...alertKeys.all, "list"] as const,
};

export const dashboardKeys = {
  all: ["dashboard"] as const,
  overview: () => [...dashboardKeys.all, "overview"] as const,
};

export const endpointDetailsKeys = {
  all: ["endpoint-details"] as const,
  detail: (endpointId: string) =>
    [...endpointDetailsKeys.all, endpointId] as const,
};

export const securityKeys = {
  all: ["security"] as const,
  overview: () => [...securityKeys.all, "overview"] as const,
};

export const reportsPageKeys = {
  all: ["reports-page"] as const,
  overview: () => [...reportsPageKeys.all, "overview"] as const,
};
