import type { NextFunction, Request, Response } from "express";

type AsyncRouteHandler<TRequest extends Request = Request> = (
  request: TRequest,
  response: Response,
  next: NextFunction,
) => Promise<void>;

export const asyncHandler =
  <TRequest extends Request>(handler: AsyncRouteHandler<TRequest>) =>
  (request: TRequest, response: Response, next: NextFunction) => {
    handler(request, response, next).catch(next);
  };
