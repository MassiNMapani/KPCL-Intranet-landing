export type EntityStatus = "active" | "planned" | "archived";

export type ApplicationRecord = {
  id: string;
  name: string;
  summary: string;
  launchUrl: string;
  category: string;
  status: EntityStatus;
  audience: string[];
  ownerDepartmentId: string;
  ownerDepartmentName: string;
};

export type AnnouncementRecord = {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
  category: "Announcement" | "News";
  departmentId?: string;
  departmentName?: string;
};

export type EventRecord = {
  id: string;
  title: string;
  summary: string;
  startsAt: string;
  endsAt: string;
  location: string;
  ownerDepartmentId: string;
  ownerDepartmentName: string;
  format: "In-person" | "Virtual" | "Hybrid";
};

export type StaffMemberRecord = {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  departmentName: string;
  email: string;
  location: string;
  managerId?: string;
  managerName?: string;
  employeeNumber: string;
};

export type DepartmentRecord = {
  id: string;
  code: string;
  name: string;
  summary: string;
  leaderId: string;
  leaderName: string;
  focusAreas: string[];
  parentDepartmentId?: string;
};

export type LeadershipRecord = {
  id: string;
  employeeId: string;
  name: string;
  role: string;
  summary: string;
  departmentId?: string;
  departmentName?: string;
  executiveFunction: string;
  sortOrder: number;
};

export type OnboardingItemRecord = {
  id: string;
  title: string;
  summary: string;
  owner: string;
  sequence: number;
  ownerDepartmentId: string;
  ownerDepartmentName: string;
};

export type ResourceType = "Form" | "Template" | "Guide";
export type ResourceSourceSystem = "Intranet" | "SharePoint" | "Microsoft Graph" | "HR System";

export type ResourceRecord = {
  id: string;
  departmentId: string;
  departmentName: string;
  category: string;
  title: string;
  description: string;
  resourceType: ResourceType;
  sourceSystem: ResourceSourceSystem;
  targetUrl: string;
  lastUpdated: string;
  owner: string;
  isActive: boolean;
};

export type OrganizationNodeRecord = {
  id: string;
  departmentId?: string;
  team: string;
  leaderName: string;
  leaderEmployeeId: string;
  reportsTo?: string;
  reportsToNodeId?: string;
};

export type HomeWelcomeContent = {
  title: string;
  message: string;
  operationalNote: string;
};

export type HomeUpdatesContent = {
  announcements: AnnouncementRecord[];
  events: EventRecord[];
};

export type HomePreviewContent = {
  staff: StaffMemberRecord[];
  departments: DepartmentRecord[];
  onboarding: OnboardingItemRecord[];
  leadership: LeadershipRecord[];
};

export type HomePageData = {
  welcome: HomeWelcomeContent;
  quickActions: ApplicationRecord[];
  applicationLauncher: ApplicationRecord[];
  resourceHub: ResourceRecord[];
  updates: HomeUpdatesContent;
  previews: HomePreviewContent;
};

export type ResourceFilters = {
  departmentId?: string;
  resourceType?: ResourceType;
};

export type PendingApprovalWidgetItem = {
  id: string;
  title: string;
  requestType: string;
  submittedBy: string;
  submittedAt: string;
  status: "Pending";
};

export type UpcomingTravelWidgetItem = {
  id: string;
  travelerName: string;
  destination: string;
  departureDate: string;
  status: "Approved" | "Ticketed";
};

export type RecentExpenseSubmissionWidgetItem = {
  id: string;
  employeeName: string;
  amountLabel: string;
  submittedAt: string;
  status: "Submitted" | "Under Review" | "Returned";
};

export type OpenProjectItemWidgetItem = {
  id: string;
  projectName: string;
  taskName: string;
  ownerName: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
};

export type UnreadAnnouncementWidgetItem = {
  id: string;
  title: string;
  category: "Announcement" | "News";
  publishedAt: string;
};

export type OnboardingTaskWidgetItem = {
  id: string;
  employeeName: string;
  taskTitle: string;
  dueDate: string;
  ownerDepartmentName: string;
  status: "Not Started" | "In Progress";
};

export type HomeWidgetsData = {
  pendingApprovals: PendingApprovalWidgetItem[];
  upcomingTravel: UpcomingTravelWidgetItem[];
  recentExpenseSubmissions: RecentExpenseSubmissionWidgetItem[];
  openProjectItems: OpenProjectItemWidgetItem[];
  unreadAnnouncements: UnreadAnnouncementWidgetItem[];
  onboardingTasks: OnboardingTaskWidgetItem[];
};
