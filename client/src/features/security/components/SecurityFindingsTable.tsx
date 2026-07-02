import { Fragment, useState } from "react";
import { Bot, ChevronDown, ChevronRight, ShieldAlert, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/features/endpoint-details/components/EmptyState";
import type { SecurityFindingWithContext } from "@/types/security-dashboard";
import {
  AI_PANEL_CLASS,
  AI_TEXT_CLASS,
  severityClassName,
  severityVariant,
  sortBySeverity,
} from "@/lib/security";
import { cn } from "@/lib/utils";

type SecurityFindingsTableProps = {
  findings: SecurityFindingWithContext[];
};

function AiAnalysisPanel({
  finding,
}: {
  finding: SecurityFindingWithContext;
}) {
  const hasAiContent =
    Boolean(finding.aiExplanation) || Boolean(finding.aiSuggestedFix);

  if (!hasAiContent) {
    return (
      <p className="text-sm text-muted-foreground">
        No AI analysis available for this finding.
      </p>
    );
  }

  return (
    <div className="grid min-w-0 gap-3 md:grid-cols-2">
      {finding.aiExplanation ? (
        <div className={AI_PANEL_CLASS}>
          <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Bot className="size-3.5 shrink-0" />
            AI Explanation
          </div>
          <p className={AI_TEXT_CLASS}>{finding.aiExplanation}</p>
        </div>
      ) : null}

      {finding.aiSuggestedFix ? (
        <div className={AI_PANEL_CLASS}>
          <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Wrench className="size-3.5 shrink-0" />
            AI Suggested Fix
          </div>
          <p className={AI_TEXT_CLASS}>{finding.aiSuggestedFix}</p>
        </div>
      ) : null}
    </div>
  );
}

export function SecurityFindingsTable({
  findings,
}: SecurityFindingsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const sortedFindings = sortBySeverity(findings);

  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <CardTitle>Security Findings</CardTitle>
        <CardDescription>
          Vulnerabilities from latest scans with AI-assisted remediation
        </CardDescription>
      </CardHeader>
      <CardContent>
        {sortedFindings.length === 0 ? (
          <EmptyState
            icon={ShieldAlert}
            title="No security findings"
            description="Run security scans on your endpoints to detect vulnerabilities."
            className="h-48"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8" />
                <TableHead>Title</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Recommendation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedFindings.map((finding) => {
                const isExpanded = expandedId === finding.id;

                return (
                  <Fragment key={finding.id}>
                    <TableRow
                      className="cursor-pointer"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : finding.id)
                      }
                    >
                      <TableCell>
                        {isExpanded ? (
                          <ChevronDown className="size-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="size-4 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell className="max-w-[180px]">
                        <div className="font-medium">{finding.title}</div>
                        <Badge
                          variant="outline"
                          className="mt-1 font-mono text-[10px]"
                        >
                          {finding.code}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/endpoints/${finding.endpointId}`}
                          className="text-sm transition-colors hover:text-primary"
                          onClick={(event) => event.stopPropagation()}
                        >
                          {finding.endpointName}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={severityVariant(finding.severity)}
                          className={cn(
                            severityClassName(finding.severity)
                          )}
                        >
                          {finding.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[240px] text-sm text-muted-foreground">
                        {finding.description}
                      </TableCell>
                      <TableCell className="max-w-[240px] text-sm">
                        {finding.recommendation}
                      </TableCell>
                    </TableRow>
                    {isExpanded ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="max-w-0 bg-muted/10 whitespace-normal"
                        >
                          <div className="min-w-0 space-y-2 py-2 text-left">
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                              AI Analysis
                            </p>
                            <AiAnalysisPanel finding={finding} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export function SecurityFindingsTableSkeleton() {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-4 w-72" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
