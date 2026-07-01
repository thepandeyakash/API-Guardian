export type AlertType = "DOWN" | "RECOVERED" | "SECURITY";
export type AlertChannel = "EMAIL" | "DASHBOARD";
export type AlertStatus = "PENDING" | "SENT" | "FAILED";

export type Alert = {
  id: string;
  endpointId: string;
  incidentId: string | null;
  securityScanId: string | null;
  type: AlertType;
  channel: AlertChannel;
  status: AlertStatus;
  title: string;
  message: string;
  sentAt: string | null;
  readAt: string | null;
  createdAt: string;
  endpoint: {
    name: string;
  };
};
