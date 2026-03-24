type ServerEnvironment = "local" | "development" | "staging" | "production";

const parseNumber = (value: string | undefined, fallback: number): number => {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const parseEnvironment = (value: string | undefined): ServerEnvironment => {
  if (
    value === "local" ||
    value === "development" ||
    value === "staging" ||
    value === "production"
  ) {
    return value;
  }

  return "local";
};

export const env = {
  nodeEnv: parseEnvironment(process.env.APP_ENV),
  port: parseNumber(process.env.API_PORT ?? process.env.PORT, 8080),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:4173",
  dbHost: process.env.DB_HOST ?? "localhost",
  dbPort: parseNumber(process.env.DB_PORT, 5432),
  dbUser: process.env.DB_USER ?? process.env.POSTGRES_USER ?? "postgres",
  dbPassword: process.env.DB_PASSWORD ?? process.env.POSTGRES_PASSWORD ?? "postgres",
  dbName: process.env.DB_NAME ?? process.env.POSTGRES_DB ?? "kpcl_intranet",
  dbRetryAttempts: parseNumber(process.env.DB_RETRY_ATTEMPTS, 30),
  dbRetryDelayMs: parseNumber(process.env.DB_RETRY_DELAY_MS, 2000),
  shutdownGraceMs: parseNumber(process.env.SHUTDOWN_GRACE_MS, 10000),
  databaseUrl:
    process.env.DATABASE_URL ??
    `postgresql://${encodeURIComponent(
      process.env.DB_USER ?? process.env.POSTGRES_USER ?? "postgres",
    )}:${encodeURIComponent(
      process.env.DB_PASSWORD ?? process.env.POSTGRES_PASSWORD ?? "postgres",
    )}@${process.env.DB_HOST ?? "localhost"}:${process.env.DB_PORT ?? "5432"}/${
      process.env.DB_NAME ?? process.env.POSTGRES_DB ?? "kpcl_intranet"
    }`,
};
