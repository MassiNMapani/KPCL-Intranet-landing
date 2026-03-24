import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/app-error";

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Request validation failed.",
        requestId: response.getHeader("x-request-id"),
        details: Object.fromEntries(
          error.issues.map((issue) => [issue.path.join("."), issue.message]),
        ),
      },
    });
    return;
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        requestId: response.getHeader("x-request-id"),
        details: error.details,
      },
    });
    return;
  }

  // Future logging hook: emit structured error logs with correlation identifiers here.
  // Future monitoring hook: increment API error counters and latency histograms here.
  console.error("Unhandled API error", {
    path: request.path,
    message: error.message,
    requestId: response.getHeader("x-request-id"),
  });

  response.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred.",
      requestId: response.getHeader("x-request-id"),
    },
  });
};
