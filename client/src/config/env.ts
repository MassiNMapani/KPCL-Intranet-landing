type AppEnvironment = "local" | "development" | "staging" | "production";

const fallbackEnvironment: AppEnvironment = "local";

const parseEnvironment = (value: string | undefined): AppEnvironment => {
  if (
    value === "local" ||
    value === "development" ||
    value === "staging" ||
    value === "production"
  ) {
    return value;
  }

  return fallbackEnvironment;
};

export const env = {
  appName: import.meta.env.VITE_APP_NAME ?? "Power Company Portal",
  environment: parseEnvironment(import.meta.env.VITE_APP_ENV),
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL ?? "helpdesk@kpcl.example",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "/api",
};
