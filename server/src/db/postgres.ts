import { Client } from "pg";
import { env } from "../config/env";

let lastDatabaseReadyAt: string | null = null;

const createClient = () =>
  new Client({
    connectionString: env.databaseUrl,
    host: env.dbHost,
    port: env.dbPort,
    user: env.dbUser,
    password: env.dbPassword,
    database: env.dbName,
  });

export const waitForDatabase = async (maxAttempts = 30, delayMs = 2000) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const client = createClient();

    try {
      // repository/query here: replace this startup probe with the real shared DB pool once persistence is implemented.
      await client.connect();
      await client.query("select 1");
      lastDatabaseReadyAt = new Date().toISOString();
      await client.end();
      return;
    } catch (error) {
      await client.end().catch(() => undefined);

      // logging here: emit structured startup retry logs with attempt counts and correlation metadata.
      console.error("Database connection attempt failed", {
        attempt,
        maxAttempts,
        message: error instanceof Error ? error.message : "Unknown database error",
        retryDelayMs: delayMs,
      });

      if (attempt === maxAttempts) {
        throw error;
      }

      await new Promise((resolve) => {
        setTimeout(resolve, delayMs);
      });
    }
  }
};

export const checkDatabaseHealth = async () => {
  const client = createClient();

  try {
    // API here: health/readiness should check actual dependencies, not just process liveness.
    await client.connect();
    await client.query("select 1");
    lastDatabaseReadyAt = new Date().toISOString();

    return {
      ready: true,
      lastDatabaseReadyAt,
    };
  } catch (error) {
    return {
      ready: false,
      lastDatabaseReadyAt,
      message: error instanceof Error ? error.message : "Unknown database error",
    };
  } finally {
    await client.end().catch(() => undefined);
  }
};
