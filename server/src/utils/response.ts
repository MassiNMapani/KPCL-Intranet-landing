import type { Response } from "express";

export const sendSuccess = <T,>(
  response: Response,
  data: T,
  requestId?: string,
  statusCode = 200,
) => {
  response.status(statusCode).json({
    data,
    meta: {
      requestId,
      generatedAt: new Date().toISOString(),
    },
  });
};
