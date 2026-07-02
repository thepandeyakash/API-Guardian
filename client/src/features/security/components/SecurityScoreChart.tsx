import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
import type { SecurityScoreChartPoint } from "@/types/security-dashboard";
import { scoreChartColor } from "@/lib/security";

type SecurityScoreChartProps = {
  data: SecurityScoreChartPoint[];
};

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: SecurityScoreChartPoint }>;
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
      <p className="font-medium text-foreground">{point.endpointName}</p>
      <p className="text-muted-foreground">Score: {point.score}/100</p>
    </div>
  );
}

export function SecurityScoreChart({ data }: SecurityScoreChartProps) {
  const isEmpty = data.length === 0;

  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <CardTitle>Security Score by Endpoint</CardTitle>
        <CardDescription>
          Latest completed scan scores across your endpoints
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="flex h-72 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/10">
            <p className="text-sm text-muted-foreground">
              No completed security scans yet. Run a scan from an endpoint to
              populate this chart.
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
                  dataKey="endpointName"
                  tickLine={false}
                  axisLine={false}
                  minTickGap={16}
                  tick={{ fill: "oklch(0.708 0 0)", fontSize: 11 }}
                />
                <YAxis
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                  tick={{ fill: "oklch(0.708 0 0)", fontSize: 11 }}
                  width={32}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {data.map((entry) => (
                    <Cell
                      key={entry.endpointName}
                      fill={scoreChartColor(entry.score)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function SecurityScoreChartSkeleton() {
  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="text-left">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-72" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-72 w-full" />
      </CardContent>
    </Card>
  );
}
