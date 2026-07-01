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
