import type { ApiErrorResponse, ApiSuccessResponse } from "@shared/contracts/api";
import { env } from "../config/env";

export const http = {
  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${env.apiBaseUrl}${path}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as ApiErrorResponse | null;
      throw new Error(payload?.error.message ?? "Request failed.");
    }

    const payload = (await response.json()) as ApiSuccessResponse<T>;
    return payload.data;
  },
};
