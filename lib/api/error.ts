export function getErrorMessageFromPayload(
  payload: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (!payload || typeof payload !== "object") {
    return fallback;
  }

  const data = payload as Record<string, unknown>;
  const detail = data.detail;

  if (typeof detail === "string" && detail.trim()) {
    return detail;
  }

  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0];
    if (typeof first === "string") {
      return first;
    }
    if (first && typeof first === "object") {
      const err = first as Record<string, unknown>;
      const msg =
        typeof err.msg === "string" && err.msg.trim()
          ? err.msg
          : "Validation failed";
      const loc = Array.isArray(err.loc) ? err.loc : [];
      const locPath = loc
        .filter((part) => typeof part === "string" || typeof part === "number")
        .map((part) => String(part))
        .filter((part) => part !== "body" && part !== "query" && part !== "path")
        .join(".");
      return locPath ? `${locPath}: ${msg}` : msg;
    }
  }

  if (typeof data.message === "string" && data.message.trim()) {
    return data.message;
  }

  return fallback;
}
