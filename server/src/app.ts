import express from "express";
import { apiRouter } from "./routes/api";
import { healthRouter } from "./routes/health";
import { requestContextMiddleware } from "./middleware/request-context";
import { errorHandler } from "./middleware/error-handler";
import { notFoundHandler } from "./middleware/not-found";
import { env } from "./config/env";

export const createApp = () => {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json({ limit: "1mb" }));
  app.use(requestContextMiddleware);

  app.use((request, response, next) => {
    response.setHeader("access-control-allow-origin", env.corsOrigin);
    response.setHeader("access-control-allow-methods", "GET,OPTIONS");
    response.setHeader("access-control-allow-headers", "content-type,authorization");

    if (request.method === "OPTIONS") {
      response.status(204).end();
      return;
    }

    next();
  });

  // Future feature flag hook: route selective handlers or toggles from centralized config here.
  app.use("/health", healthRouter);
  app.use("/api", apiRouter);

  // Future audit trail hook: emit access events for sensitive route reads here.
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
