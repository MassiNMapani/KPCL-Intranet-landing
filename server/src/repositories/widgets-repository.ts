import type { HomeWidgetsData } from "@shared/models/intranet";

const widgetsData: HomeWidgetsData = {
  pendingApprovals: [
    {
      id: "approval-travel-00041",
      title: "Travel request to Johannesburg",
      requestType: "Travel Request",
      submittedBy: "Tendai Ndlovu",
      submittedAt: "2026-03-23T09:20:00Z",
      status: "Pending",
    },
    {
      id: "approval-expense-00052",
      title: "Expense requisition for site visit logistics",
      requestType: "Expense Requisition",
      submittedBy: "Daniel Mutale",
      submittedAt: "2026-03-22T15:45:00Z",
      status: "Pending",
    },
    {
      id: "approval-access-00009",
      title: "Application access for vendor portal testing",
      requestType: "Access Request",
      submittedBy: "Alice Banda",
      submittedAt: "2026-03-21T11:05:00Z",
      status: "Pending",
    },
  ],
  upcomingTravel: [
    {
      id: "travel-1001",
      travelerName: "Grace Tembo",
      destination: "Johannesburg",
      departureDate: "2026-03-29T06:30:00Z",
      status: "Ticketed",
    },
    {
      id: "travel-1002",
      travelerName: "Martha Nyambe",
      destination: "Ndola",
      departureDate: "2026-04-01T08:00:00Z",
      status: "Approved",
    },
  ],
  recentExpenseSubmissions: [
    {
      id: "expense-2001",
      employeeName: "Simon Lungu",
      amountLabel: "ZMW 18,450",
      submittedAt: "2026-03-23T14:10:00Z",
      status: "Under Review",
    },
    {
      id: "expense-2002",
      employeeName: "Chanda Mbewe",
      amountLabel: "ZMW 3,980",
      submittedAt: "2026-03-22T10:25:00Z",
      status: "Submitted",
    },
    {
      id: "expense-2003",
      employeeName: "Linda Kapungwe",
      amountLabel: "ZMW 7,240",
      submittedAt: "2026-03-21T16:05:00Z",
      status: "Returned",
    },
  ],
  openProjectItems: [
    {
      id: "project-item-301",
      projectName: "Intranet Modernization",
      taskName: "Validate homepage production readiness checklist",
      ownerName: "Alice Banda",
      dueDate: "2026-03-26",
      priority: "High",
    },
    {
      id: "project-item-302",
      projectName: "Quarter Close Readiness",
      taskName: "Confirm department approval backlog",
      ownerName: "Simon Lungu",
      dueDate: "2026-03-28",
      priority: "Medium",
    },
    {
      id: "project-item-303",
      projectName: "April Onboarding Cohort",
      taskName: "Publish manager orientation packs",
      ownerName: "Pauline Katongo",
      dueDate: "2026-03-30",
      priority: "High",
    },
  ],
  unreadAnnouncements: [
    {
      id: "announcement-network-maintenance-2026-03",
      title: "Scheduled network maintenance on Saturday evening",
      category: "Announcement",
      publishedAt: "2026-03-22T07:15:00Z",
    },
    {
      id: "announcement-brand-guidelines-2026-03",
      title: "Updated corporate brand and media guidance available",
      category: "Announcement",
      publishedAt: "2026-03-16T09:20:00Z",
    },
    {
      id: "news-onboarding-cohort-2026-03",
      title: "April onboarding cohort schedule published",
      category: "News",
      publishedAt: "2026-03-21T11:45:00Z",
    },
  ],
  onboardingTasks: [
    {
      id: "onboarding-task-401",
      employeeName: "New starter: Brian Phiri",
      taskTitle: "Complete identity and device access setup",
      dueDate: "2026-03-25",
      ownerDepartmentName: "Technology",
      status: "In Progress",
    },
    {
      id: "onboarding-task-402",
      employeeName: "New starter: Martha Chilekwa",
      taskTitle: "Submit payroll and statutory documents",
      dueDate: "2026-03-26",
      ownerDepartmentName: "Finance",
      status: "Not Started",
    },
    {
      id: "onboarding-task-403",
      employeeName: "New starter: Kelvin Zulu",
      taskTitle: "Attend manager introduction and role alignment",
      dueDate: "2026-03-27",
      ownerDepartmentName: "Operations",
      status: "In Progress",
    },
  ],
};

export const widgetsRepository = {
  async getHomeWidgets(): Promise<HomeWidgetsData> {
    // API here: this repository will later read from PostgreSQL-backed workflow and activity sources.
    // cache here: cache the aggregated widget snapshot behind bounded TTLs because the homepage is high-read.
    // metrics here: record query timing and row counts for each derived widget query here.
    // logging here: emit correlation-friendly repository diagnostics for slow or failed widget reads here.
    // auth here: apply caller-specific visibility constraints before returning task and approval data here.
    // repository/query here: replace mock values with parameterized PostgreSQL queries or materialized views.
    return widgetsData;
  },
};
