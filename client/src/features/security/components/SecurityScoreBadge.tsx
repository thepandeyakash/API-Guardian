import { Badge } from "@/components/ui/badge";
import { formatScore } from "@/lib/format";
import { scoreBadgeClassName } from "@/lib/security";
import { cn } from "@/lib/utils";

type SecurityScoreBadgeProps = {
  score: number | null;
  className?: string;
};

export function SecurityScoreBadge({
  score,
  className,
}: SecurityScoreBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium tabular-nums",
        scoreBadgeClassName(score),
        className
      )}
    >
      {formatScore(score)}
    </Badge>
  );
}
