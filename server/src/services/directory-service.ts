import { directoryRepository } from "../repositories/directory-repository";

export const directoryService = {
  async listStaff(limit?: number) {
    // Future HR integration hook: compose HR and Microsoft Graph attributes here.
    // Future permission filtering hook: remove sensitive directory fields before response mapping.
    return directoryRepository.listStaff(limit);
  },
  async listDepartments(limit?: number) {
    // Future PostgreSQL repository hook: resolve departments from normalized tables here.
    return directoryRepository.listDepartments(limit);
  },
  async listLeadership(limit?: number) {
    // Future role filtering hook: include only authorized leadership records here.
    return directoryRepository.listLeadership(limit);
  },
  async getOrganizationChart() {
    // Future monitoring hook: track organization-chart dependency freshness here.
    return directoryRepository.listOrganization();
  },
};
