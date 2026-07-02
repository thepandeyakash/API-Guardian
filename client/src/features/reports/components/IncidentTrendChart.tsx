import {
  Bar,
  BarChart,
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
import type { IncidentChartPoint } from "@/types/reports-page";

type IncidentTrendChartProps = {
  data: IncidentChartPoint[];
};

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: IncidentChartPoint }>;
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
        {point.count} incident{point.count === 1 ? "" : "s"}
      </p>
    </div>
  );
}

export function IncidentTrendChart({ data }: IncidentTrendChartProps) {
  const totalIncidents = data.reduce(
    (sum, point) => sum + point.count,
    0
  );
  const isEmpty = totalIncidents === 0;

  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <CardTitle>Incident Trend</CardTitle>
        <CardDescription>
          Downtime events over time across all endpoints
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="flex h-72 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/10">
            <p className="text-sm text-muted-foreground">
              No incidents recorded yet.
            </p>
          </div>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
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
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "oklch(0.708 0 0)", fontSize: 11 }}
                  width={32}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar
                  dataKey="count"
                  fill="oklch(0.65 0.22 25)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function IncidentTrendChartSkeleton() {
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
