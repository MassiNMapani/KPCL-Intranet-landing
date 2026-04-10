import type {
  ApplicationsResponse,
  DepartmentsResponse,
  HomeResponse,
  HomeWidgetsResponse,
  LeadershipResponse,
  NewsAnnouncementsResponse,
  OnboardingResponse,
  OrganizationChartResponse,
  ResourcesResponse,
  StaffDirectoryResponse,
} from "@shared/contracts/api";
import type { ResourceFilters } from "@shared/models/intranet";
import { http } from "./http";

const buildQueryString = (filters: Record<string, string | undefined>) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
};

export const intranetApi = {
  getHome() {
    return http.get<HomeResponse["data"]>("/home");
  },
  getHomeWidgets() {
    return http.get<HomeWidgetsResponse["data"]>("/home/widgets");
  },
  getApplications() {
    return http.get<ApplicationsResponse["data"]>("/applications");
  },
  getStaffDirectory() {
    return http.get<StaffDirectoryResponse["data"]>("/staff-directory");
  },
  getOrganizationChart() {
    return http.get<OrganizationChartResponse["data"]>("/organization-chart");
  },
  getDepartments() {
    return http.get<DepartmentsResponse["data"]>("/departments");
  },
  getLeadership() {
    return http.get<LeadershipResponse["data"]>("/leadership");
  },
  getOnboarding() {
    return http.get<OnboardingResponse["data"]>("/onboarding");
  },
  getNewsAnnouncements() {
    return http.get<NewsAnnouncementsResponse["data"]>("/news-announcements");
  },
  getResources(filters: ResourceFilters = {}) {
    return http.get<ResourcesResponse["data"]>(
      `/resources${buildQueryString({
        departmentId: filters.departmentId,
        resourceType: filters.resourceType,
      })}`,
    );
  },
};
