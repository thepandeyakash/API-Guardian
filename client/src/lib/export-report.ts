import type { ReportsPageData } from "@/types/reports-page";

function downloadBlob(content: Blob, filename: string) {
  const url = URL.createObjectURL(content);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function exportReportAsJson(data: ReportsPageData) {
  const timestamp = new Date(data.generatedAt)
    .toISOString()
    .replace(/[:.]/g, "-");

  const payload = JSON.stringify(data, null, 2);
  const blob = new Blob([payload], {
    type: "application/json",
  });

  downloadBlob(blob, `api-guardian-report-${timestamp}.json`);
}

export function exportEndpointRowsAsCsv(data: ReportsPageData) {
  const headers = [
    "Endpoint",
    "Uptime %",
    "Health %",
    "Average Latency (ms)",
    "Security Score",
    "Total Incidents",
  ];

  const rows = data.endpointRows.map((row) => [
    row.endpointName,
    row.uptimePercentage.toFixed(2),
    row.healthPercentage.toFixed(2),
    String(row.averageLatency),
    row.securityScore !== null ? String(row.securityScore) : "",
    String(row.totalIncidents),
  ]);

  const csv = [headers, ...rows]
    .map((row) =>
      row
        .map((cell) => `"${cell.replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const timestamp = new Date(data.generatedAt)
    .toISOString()
    .replace(/[:.]/g, "-");
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  downloadBlob(blob, `api-guardian-endpoints-${timestamp}.csv`);
}
