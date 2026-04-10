import type { Server } from "node:http";
import { createApp } from "./app";
import { env } from "./config/env";
import { waitForDatabase } from "./db/postgres";

const app = createApp();
let server: Server | undefined;
let shuttingDown = false;

const shutdown = async (signal: string) => {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  // logging here: emit structured shutdown events with signal and in-flight request counts.
  console.log(`Received ${signal}. Shutting down KPCL intranet API.`);

  await Promise.race([
    new Promise<void>((resolve) => {
      if (!server) {
        resolve();
        return;
      }

      server.close(() => {
        resolve();
      });
    }),
    new Promise<void>((resolve) => {
      setTimeout(resolve, env.shutdownGraceMs);
    }),
  ]);

  process.exit(0);
};

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception in KPCL intranet API", {
    message: error.message,
  });
  void shutdown("uncaughtException");
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection in KPCL intranet API", {
    message: reason instanceof Error ? reason.message : "Unknown rejection",
  });
  void shutdown("unhandledRejection");
});

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

try {
  // auth here: startup dependency checks should remain infrastructure-only and not rely on request identity.
  // metrics here: register startup dependency timing once monitoring is wired in.
  if (env.requireDatabaseOnStartup) {
    await waitForDatabase(env.dbRetryAttempts, env.dbRetryDelayMs);
  } else {
    try {
      await waitForDatabase(1, env.dbRetryDelayMs);
    } catch (error) {
      console.warn("Starting KPCL intranet API without a ready database", {
        message: error instanceof Error ? error.message : "Unknown database error",
      });
    }
  }

  server = app.listen(env.port, () => {
    // Future structured logging hook: emit service-start logs here.
    // Future monitoring hook: register startup metrics and health transitions here.
    console.log(`KPCL intranet API listening on port ${env.port}`);
  });

  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
} catch (error) {
  console.error("Failed to initialize KPCL intranet API", {
    message: error instanceof Error ? error.message : "Unknown startup failure",
  });
  process.exit(1);
}
