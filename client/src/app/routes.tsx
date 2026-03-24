import { lazy } from "react";

const HomePage = lazy(() => import("../pages/home/HomePage"));
const ApplicationsPage = lazy(() => import("../pages/applications/ApplicationsPage"));
const StaffDirectoryPage = lazy(() => import("../pages/staff-directory/StaffDirectoryPage"));
const OrganizationChartPage = lazy(
  () => import("../pages/organization/OrganizationChartPage"),
);
const OnboardingPage = lazy(() => import("../pages/onboarding/OnboardingPage"));
const DepartmentsPage = lazy(() => import("../pages/departments/DepartmentsPage"));
const LeadershipPage = lazy(() => import("../pages/leadership/LeadershipPage"));
const NewsAnnouncementsPage = lazy(() => import("../pages/news/NewsAnnouncementsPage"));

export const routeModules = {
  HomePage,
  ApplicationsPage,
  StaffDirectoryPage,
  OrganizationChartPage,
  OnboardingPage,
  DepartmentsPage,
  LeadershipPage,
  NewsAnnouncementsPage,
};
