import type { Request, Response } from "express";
import { env } from "../config/env";
import { sendSuccess } from "../utils/response";
import { checkDatabaseHealth } from "../db/postgres";

export const healthController = {
  live(request: Request, response: Response) {
    sendSuccess(
      response,
      {
        status: "ok",
        service: "kpcl-intranet-api",
      },
      request.context.requestId,
    );
  },
  async ready(request: Request, response: Response) {
    const database = await checkDatabaseHealth();
    const statusCode = database.ready ? 200 : 503;

    sendSuccess(
      response,
      {
        status: database.ready ? "ready" : "degraded",
        databaseConfigured: Boolean(env.databaseUrl),
        database,
      },
      request.context.requestId,
      statusCode,
    );
  },
};
