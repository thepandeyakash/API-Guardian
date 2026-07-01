import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: "positive" | "negative" | "neutral";
};

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend = "neutral",
}: StatCardProps) {
  const trendColor =
    trend === "positive"
      ? "text-emerald-400"
      : trend === "negative"
        ? "text-red-400"
        : "text-muted-foreground";

  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-lg bg-muted/60 p-2 ring-1 ring-border/60">
          <Icon className={cn("size-4", trendColor)} />
        </div>
      </CardHeader>
      <CardContent className="text-left">
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        {description ? (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function StatCardSkeleton() {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent className="space-y-2 text-left">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  );
}
