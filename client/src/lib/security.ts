import type { Severity } from "@/types/report";

export const SEVERITY_ORDER: Record<Severity, number> = {
  CRITICAL: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

export const AI_PANEL_CLASS =
  "min-w-0 overflow-hidden rounded-md border border-border/40 bg-background/40 p-3 text-left";

export const AI_TEXT_CLASS =
  "text-sm whitespace-pre-wrap break-words [overflow-wrap:anywhere]";

export function severityVariant(severity: Severity) {
  switch (severity) {
    case "CRITICAL":
    case "HIGH":
      return "destructive" as const;
    case "MEDIUM":
    case "LOW":
      return "outline" as const;
  }
}

export function severityClassName(severity: Severity) {
  switch (severity) {
    case "CRITICAL":
      return "border-red-500/40 bg-red-500/10 text-red-400";
    case "HIGH":
      return "border-orange-500/40 bg-orange-500/10 text-orange-400";
    case "MEDIUM":
      return "border-yellow-500/40 bg-yellow-500/10 text-yellow-400";
    case "LOW":
      return "border-blue-500/40 bg-blue-500/10 text-blue-400";
  }
}

export function severityChartColor(severity: Severity) {
  switch (severity) {
    case "CRITICAL":
      return "oklch(0.65 0.22 25)";
    case "HIGH":
      return "oklch(0.72 0.18 55)";
    case "MEDIUM":
      return "oklch(0.85 0.16 95)";
    case "LOW":
      return "oklch(0.65 0.18 250)";
  }
}

export function scoreBadgeClassName(score: number | null) {
  if (score === null) {
    return "border-muted-foreground/30 bg-muted/20 text-muted-foreground";
  }

  if (score >= 90) {
    return "border-emerald-500/40 bg-emerald-500/10 text-emerald-400";
  }

  if (score >= 70) {
    return "border-yellow-500/40 bg-yellow-500/10 text-yellow-400";
  }

  return "border-red-500/40 bg-red-500/10 text-red-400";
}

export function scoreChartColor(score: number) {
  if (score >= 90) {
    return "oklch(0.72 0.17 145)";
  }

  if (score >= 70) {
    return "oklch(0.85 0.16 95)";
  }

  return "oklch(0.65 0.22 25)";
}

export function sortBySeverity<T extends { severity: Severity }>(items: T[]) {
  return [...items].sort(
    (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]
  );
}
