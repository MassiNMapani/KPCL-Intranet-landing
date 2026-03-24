import type { ResourceFilters } from "@shared/models/intranet";
import { intranetApi } from "../api/intranet-api";

export const intranetService = {
  getHomePage: intranetApi.getHome,
  getHomeWidgets: intranetApi.getHomeWidgets,
  getApplications: intranetApi.getApplications,
  getStaffDirectory: intranetApi.getStaffDirectory,
  getOrganizationChart: intranetApi.getOrganizationChart,
  getDepartments: intranetApi.getDepartments,
  getLeadership: intranetApi.getLeadership,
  getOnboarding: intranetApi.getOnboarding,
  getNewsAnnouncements: intranetApi.getNewsAnnouncements,
  getResources: (filters: ResourceFilters = {}) => intranetApi.getResources(filters),
};
