import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

export const requestContextMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  request.context = {
    requestId: randomUUID(),
  };

  response.setHeader("x-request-id", request.context.requestId);
  next();
};
