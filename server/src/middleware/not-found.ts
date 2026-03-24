import type { Request, Response } from "express";

export const notFoundHandler = (request: Request, response: Response) => {
  response.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: `Route not found: ${request.path}`,
      requestId: response.getHeader("x-request-id"),
    },
  });
};
