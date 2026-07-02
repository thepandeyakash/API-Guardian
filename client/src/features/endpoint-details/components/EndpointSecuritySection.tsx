import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/features/endpoint-details/components/EmptyState";
import { SecurityScoreBadge } from "@/features/security/components/SecurityScoreBadge";
import type { SecurityIssue, SecurityScan } from "@/types/report";
import { formatDateTime } from "@/lib/format";
import {
  AI_PANEL_CLASS,
  AI_TEXT_CLASS,
  severityClassName,
  severityVariant,
  sortBySeverity,
} from "@/lib/security";
import { cn } from "@/lib/utils";
import { Bot, ShieldAlert, Wrench } from "lucide-react";

type EndpointSecuritySectionProps = {
  latestSecurityScan: SecurityScan | null;
};

function SecurityIssueCard({ issue }: { issue: SecurityIssue }) {
  return (
    <div className="min-w-0 rounded-lg border border-border/50 bg-muted/10 p-4 text-left">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-medium break-words">{issue.title}</h4>
            <Badge variant="outline" className="font-mono text-[11px]">
              {issue.code}
            </Badge>
          </div>
          <p className="text-sm break-words text-muted-foreground">
            {issue.description}
          </p>
        </div>
        <Badge
          variant={severityVariant(issue.severity)}
          className={cn(severityClassName(issue.severity))}
        >
          {issue.severity}
        </Badge>
      </div>

      <div className="mt-4 space-y-3 border-t border-border/40 pt-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Recommendation
          </p>
          <p className="mt-1 text-sm break-words">{issue.recommendation}</p>
        </div>

        {issue.aiExplanation ? (
          <div className={AI_PANEL_CLASS}>
            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Bot className="size-3.5 shrink-0" />
              AI Explanation
            </div>
            <p className={AI_TEXT_CLASS}>{issue.aiExplanation}</p>
          </div>
        ) : null}

        {issue.aiSuggestedFix ? (
          <div className={AI_PANEL_CLASS}>
            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Wrench className="size-3.5 shrink-0" />
              AI Suggested Fix
            </div>
            <p className={AI_TEXT_CLASS}>{issue.aiSuggestedFix}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function EndpointSecuritySection({
  latestSecurityScan,
}: EndpointSecuritySectionProps) {
  if (!latestSecurityScan) {
    return (
      <Card className="border-border/60 bg-card/70">
        <CardHeader className="text-left">
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Latest scan results and identified issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={ShieldAlert}
            title="No security scan yet"
            description="Run a security scan to see vulnerabilities and AI-assisted remediation guidance."
            className="h-48"
          />
        </CardContent>
      </Card>
    );
  }

  const issues = sortBySeverity(latestSecurityScan.securityIssues);

  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Latest scan results and identified issues
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Badge variant="outline">{latestSecurityScan.status}</Badge>
            <SecurityScoreBadge score={latestSecurityScan.score} />
            <span className="text-muted-foreground">
              {formatDateTime(latestSecurityScan.scannedAt)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {issues.length === 0 ? (
          <EmptyState
            icon={ShieldAlert}
            title="No security issues found"
            description="The latest scan completed without reporting any vulnerabilities."
            className="h-40"
          />
        ) : (
          <div className="space-y-4">
            {issues.map((issue) => (
              <SecurityIssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function EndpointSecuritySectionSkeleton() {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-56" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </CardContent>
    </Card>
  );
}
