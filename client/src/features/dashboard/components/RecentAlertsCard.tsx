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
import type { Alert, AlertType } from "@/types/alert";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

type RecentAlertsCardProps = {
  alerts: Alert[];
};

function alertVariant(type: AlertType) {
  switch (type) {
    case "DOWN":
      return "destructive" as const;
    case "SECURITY":
      return "secondary" as const;
    case "RECOVERED":
      return "outline" as const;
  }
}

export function RecentAlertsCard({ alerts }: RecentAlertsCardProps) {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>
          Unread alerts from the dashboard channel
        </CardDescription>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/10">
            <p className="text-sm text-muted-foreground">
              No unread alerts. You&apos;re all caught up.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="max-w-[220px]">
                    <div className="truncate font-medium">{alert.title}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {alert.message}
                    </div>
                  </TableCell>
                  <TableCell>{alert.endpoint.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={alertVariant(alert.type)}
                      className={cn(
                        alert.type === "RECOVERED" &&
                          "border-emerald-500/30 text-emerald-400"
                      )}
                    >
                      {alert.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatDateTime(alert.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export function RecentAlertsCardSkeleton() {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-56" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
