import type { ResourceFilters, ResourceRecord } from "@shared/models/intranet";
import { resources } from "./mock/mock-data";
import { resourceRecordSchema } from "../validation/resources";

export const resourcesRepository = {
  async list(filters: ResourceFilters = {}): Promise<ResourceRecord[]> {
    // SharePoint integration here: sync or proxy governed resource metadata from SharePoint libraries.
    // Graph API integration here: resolve Microsoft Graph-backed file and site references when required.
    // Cache layer here: store frequently accessed resource catalogs with filter-aware cache keys.
    // Permission check here: filter returned resources by caller role/department policy before response mapping.
    // Audit log here: record reads of sensitive resource catalogs where policy requires it.
    // Repository/migration here: replace mock filtering with PostgreSQL queries and formal migrations.
    const validatedResources = resources
      .map((resource) => resourceRecordSchema.parse(resource))
      .filter((resource) => resource.isActive);

    return validatedResources.filter((resource) => {
      if (filters.departmentId && resource.departmentId !== filters.departmentId) {
        return false;
      }

      if (filters.resourceType && resource.resourceType !== filters.resourceType) {
        return false;
      }

      return true;
    });
  },
};
