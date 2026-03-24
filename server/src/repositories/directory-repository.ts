import type {
  DepartmentRecord,
  LeadershipRecord,
  OrganizationNodeRecord,
  StaffMemberRecord,
} from "@shared/models/intranet";
import { departments, leadership, organizationNodes, staffMembers } from "./mock/mock-data";

export const directoryRepository = {
  async listStaff(limit?: number): Promise<StaffMemberRecord[]> {
    // Future Microsoft Graph / HR integration: merge governed identity and HR attributes here.
    // Future PostgreSQL repository implementation: load directory rows from employees and departments tables here.
    return typeof limit === "number" ? staffMembers.slice(0, limit) : staffMembers;
  },
  async listDepartments(limit?: number): Promise<DepartmentRecord[]> {
    // Future PostgreSQL repository implementation: hydrate department summaries and leaders from normalized tables here.
    return typeof limit === "number" ? departments.slice(0, limit) : departments;
  },
  async listLeadership(limit?: number): Promise<LeadershipRecord[]> {
    // Future PostgreSQL repository implementation: join leadership profiles to employee records here.
    return typeof limit === "number" ? leadership.slice(0, limit) : leadership;
  },
  async listOrganization(): Promise<OrganizationNodeRecord[]> {
    // Future HR integration hook: replace mock hierarchy with authoritative reporting relationships here.
    return organizationNodes;
  },
};
