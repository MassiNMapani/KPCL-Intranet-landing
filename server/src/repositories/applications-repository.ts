import type { ApplicationRecord } from "@shared/models/intranet";
import { applications } from "./mock/mock-data";

export const applicationsRepository = {
  async list(): Promise<ApplicationRecord[]> {
    // Future PostgreSQL integration: replace with parameterized SQL via a DB client.
    // Future logging hook: emit repository-level dependency diagnostics here.
    // Future caching hook: cache the approved application catalog with bounded TTL here.
    return applications;
  },
};
