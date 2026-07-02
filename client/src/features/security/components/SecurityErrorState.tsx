import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getApiErrorMessage } from "@/lib/api-error";

type SecurityErrorStateProps = {
  error: unknown;
  onRetry: () => void;
  isRetrying?: boolean;
};

export function SecurityErrorState({
  error,
  onRetry,
  isRetrying = false,
}: SecurityErrorStateProps) {
  return (
    <Card className="border-destructive/30 bg-card/70">
      <CardHeader className="text-left">
        <div className="flex items-center gap-2">
          <AlertCircle className="size-5 text-destructive" />
          <CardTitle>Failed to load security dashboard</CardTitle>
        </div>
        <CardDescription>
          {getApiErrorMessage(error)}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-left">
        <Button
          variant="outline"
          onClick={onRetry}
          disabled={isRetrying}
        >
          <RefreshCw className={isRetrying ? "animate-spin" : undefined} />
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}
