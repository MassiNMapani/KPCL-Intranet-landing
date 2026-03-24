import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { AppShell } from "../components/layout/AppShell";
import { routeModules } from "./routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <AppShell />,
        children: [
          { index: true, element: <routeModules.HomePage /> },
          { path: "applications", element: <routeModules.ApplicationsPage /> },
          { path: "staff-directory", element: <routeModules.StaffDirectoryPage /> },
          { path: "organization-chart", element: <routeModules.OrganizationChartPage /> },
          { path: "onboarding", element: <routeModules.OnboardingPage /> },
          { path: "departments", element: <routeModules.DepartmentsPage /> },
          { path: "leadership", element: <routeModules.LeadershipPage /> },
          {
            path: "news-announcements",
            element: <routeModules.NewsAnnouncementsPage />,
          },
        ],
      },
    ],
  },
]);
