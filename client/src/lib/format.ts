export function formatDateTime(value: string | null): string {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatDate(value: string | null): string {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function formatPercentage(value: number | null): string {
  if (value === null) {
    return "—";
  }

  return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;
}

export function formatScore(value: number | null): string {
  if (value === null) {
    return "—";
  }

  return `${value.toFixed(value % 1 === 0 ? 0 : 1)}/100`;
}

export function formatDuration(seconds: number | null): string {
  if (seconds === null) {
    return "—";
  }

  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes < 60) {
    return remainingSeconds ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return remainingMinutes ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export function formatLatency(value: number | null): string {
  if (value === null) {
    return "—";
  }

  return `${value}ms`;
}
