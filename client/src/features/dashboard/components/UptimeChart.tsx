import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { UptimeChartPoint } from "@/types/monitoring";

type UptimeChartProps = {
  data: UptimeChartPoint[];
};

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: UptimeChartPoint }>;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0]?.payload;

  if (!point) {
    return null;
  }

  return (
    <div className="rounded-lg border border-border/60 bg-popover px-3 py-2 text-xs shadow-lg">
      <p className="font-medium text-foreground">{point.label}</p>
      <p className="text-muted-foreground">
        Uptime: {point.uptime.toFixed(1)}%
      </p>
      <p className="text-muted-foreground">Checks: {point.checks}</p>
    </div>
  );
}

export function UptimeChart({ data }: UptimeChartProps) {
  const isEmpty = data.length === 0;

  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <CardTitle>Uptime Trend</CardTitle>
        <CardDescription>
          Hourly uptime aggregated across all monitored endpoints
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="flex h-72 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/10">
            <p className="text-sm text-muted-foreground">
              No monitoring data yet. Health checks will populate this chart.
            </p>
          </div>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="uptimeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.7 0.15 145)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="oklch(0.7 0.15 145)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke="oklch(1 0 0 / 8%)"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  minTickGap={24}
                  tick={{ fill: "oklch(0.708 0 0)", fontSize: 11 }}
                />
                <YAxis
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fill: "oklch(0.708 0 0)", fontSize: 11 }}
                  width={42}
                />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="uptime"
                  stroke="oklch(0.72 0.17 145)"
                  strokeWidth={2}
                  fill="url(#uptimeFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function UptimeChartSkeleton() {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-72 w-full" />
      </CardContent>
    </Card>
  );
}
