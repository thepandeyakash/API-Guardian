import { ArrowLeft, RefreshCw } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { EndpointDetailsContent } from "@/features/endpoint-details/components/EndpointDetailsContent";
import { EndpointDetailsErrorState } from "@/features/endpoint-details/components/EndpointDetailsErrorState";
import { EndpointDetailsSkeleton } from "@/features/endpoint-details/components/EndpointDetailsSkeleton";
import { useEndpointDetails } from "@/features/endpoint-details/hooks/useEndpointDetails";

export function EndpointDetailsPage() {
  const { endpointId = "" } = useParams<{ endpointId: string }>();
  const { data, isLoading, isError, error, refetch, isFetching } =
    useEndpointDetails(endpointId);

  return (
    <div className="min-h-svh bg-background">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="ghost" size="sm" asChild className="w-fit">
            <Link to="/">
              <ArrowLeft />
              Back to Dashboard
            </Link>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCw className={isFetching ? "animate-spin" : undefined} />
            Refresh
          </Button>
        </div>

        {isLoading ? <EndpointDetailsSkeleton /> : null}

        {isError ? (
          <EndpointDetailsErrorState
            error={error}
            onRetry={() => refetch()}
            isRetrying={isFetching}
          />
        ) : null}

        {!isLoading && !isError && data ? (
          <EndpointDetailsContent data={data} />
        ) : null}
      </div>
    </div>
  );
}
