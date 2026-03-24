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
    return http.get<HomeResponse["data"]>("/api/home");
  },
  getHomeWidgets() {
    return http.get<HomeWidgetsResponse["data"]>("/api/home/widgets");
  },
  getApplications() {
    return http.get<ApplicationsResponse["data"]>("/api/applications");
  },
  getStaffDirectory() {
    return http.get<StaffDirectoryResponse["data"]>("/api/staff-directory");
  },
  getOrganizationChart() {
    return http.get<OrganizationChartResponse["data"]>("/api/organization-chart");
  },
  getDepartments() {
    return http.get<DepartmentsResponse["data"]>("/api/departments");
  },
  getLeadership() {
    return http.get<LeadershipResponse["data"]>("/api/leadership");
  },
  getOnboarding() {
    return http.get<OnboardingResponse["data"]>("/api/onboarding");
  },
  getNewsAnnouncements() {
    return http.get<NewsAnnouncementsResponse["data"]>("/api/news-announcements");
  },
  getResources(filters: ResourceFilters = {}) {
    return http.get<ResourcesResponse["data"]>(
      `/api/resources${buildQueryString({
        departmentId: filters.departmentId,
        resourceType: filters.resourceType,
      })}`,
    );
  },
};
