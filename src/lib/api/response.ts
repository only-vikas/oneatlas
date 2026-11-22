import { NextResponse } from "next/server";
import { ZodError } from "zod";

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export function apiSuccess<T>(data: T, status = 200, headers?: HeadersInit): NextResponse<T> {
  return NextResponse.json(data, {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

export function apiError(
  message: string,
  code = "BAD_REQUEST",
  status = 400,
  details?: unknown
): NextResponse<ApiErrorBody> {
  const body: ApiErrorBody = {
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  };
  return NextResponse.json(body, { status });
}

export function handleApiError(err: unknown): NextResponse<ApiErrorBody> {
  // Let Next.js internal signals (like prerender bailouts) propagate
  if (
    typeof err === "object" &&
    err !== null &&
    "digest" in err &&
    typeof (err as { digest: unknown }).digest === "string" &&
    (err as { digest: string }).digest.startsWith("NEXT_")
  ) {
    throw err;
  }

  if (err instanceof ZodError) {
    const formatted = err.issues
      .map((i) => `${i.path.join(".") || "param"}: ${i.message}`)
      .join("; ");
    return apiError(formatted || "Validation error", "VALIDATION_ERROR", 400, err.issues);
  }

  const errorObj = err as { code?: string; message?: string };
  if (
    errorObj?.code === "P2025" ||
    errorObj?.message?.toLowerCase().includes("not found")
  ) {
    return apiError("Resource not found", "NOT_FOUND", 404);
  }

  console.error("[API_ERROR]", err);
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : errorObj?.message || "Internal server error";

  return apiError(message, "INTERNAL_SERVER_ERROR", 500);
}
