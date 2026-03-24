import type {
  AnnouncementRecord,
  ApplicationRecord,
  DepartmentRecord,
  EventRecord,
  HomePageData,
  HomeWidgetsData,
  LeadershipRecord,
  OnboardingItemRecord,
  OrganizationNodeRecord,
  ResourceFilters,
  ResourceRecord,
  StaffMemberRecord,
} from "../models/intranet";

export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    requestId?: string;
    details?: Record<string, string | number | boolean>;
  };
};

export type ApiSuccessResponse<T> = {
  data: T;
  meta?: {
    requestId?: string;
    generatedAt?: string;
  };
};

export type ApplicationsResponse = ApiSuccessResponse<ApplicationRecord[]>;
export type StaffDirectoryResponse = ApiSuccessResponse<StaffMemberRecord[]>;
export type OrganizationChartResponse = ApiSuccessResponse<OrganizationNodeRecord[]>;
export type DepartmentsResponse = ApiSuccessResponse<DepartmentRecord[]>;
export type LeadershipResponse = ApiSuccessResponse<LeadershipRecord[]>;
export type ResourcesResponse = ApiSuccessResponse<{
  filters: ResourceFilters;
  items: ResourceRecord[];
}>;
export type OnboardingResponse = ApiSuccessResponse<{
  checklist: OnboardingItemRecord[];
  resources: ResourceRecord[];
}>;
export type NewsAnnouncementsResponse = ApiSuccessResponse<{
  announcements: AnnouncementRecord[];
  events: EventRecord[];
}>;
export type HomeResponse = ApiSuccessResponse<HomePageData>;
export type HomeWidgetsResponse = ApiSuccessResponse<HomeWidgetsData>;
