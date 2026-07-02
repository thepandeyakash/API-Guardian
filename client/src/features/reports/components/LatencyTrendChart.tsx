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
import type { LatencyChartPoint } from "@/types/reports-page";

type LatencyTrendChartProps = {
  data: LatencyChartPoint[];
};

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: LatencyChartPoint }>;
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
        Latency: {point.latency}ms
      </p>
      <p className="text-muted-foreground">Checks: {point.checks}</p>
    </div>
  );
}

export function LatencyTrendChart({ data }: LatencyTrendChartProps) {
  const isEmpty = data.length === 0;

  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <CardTitle>Latency Trend</CardTitle>
        <CardDescription>
          Hourly average response time across all endpoints
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="flex h-72 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/10">
            <p className="text-sm text-muted-foreground">
              No latency data yet. Health checks will populate this chart.
            </p>
          </div>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="latencyFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="oklch(0.65 0.18 250)"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(0.65 0.18 250)"
                      stopOpacity={0}
                    />
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
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}ms`}
                  tick={{ fill: "oklch(0.708 0 0)", fontSize: 11 }}
                  width={48}
                />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="latency"
                  stroke="oklch(0.65 0.18 250)"
                  strokeWidth={2}
                  fill="url(#latencyFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function LatencyTrendChartSkeleton() {
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
