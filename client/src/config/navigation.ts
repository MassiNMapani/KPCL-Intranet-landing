type NavItem = {
  label: string;
  path: string;
  description: string;
};

export const navigationItems: NavItem[] = [
  { label: "Home", path: "/", description: "Overview and quick actions." },
  {
    label: "Applications",
    path: "/applications",
    description: "Launch approved internal systems.",
  },
  {
    label: "Staff Directory",
    path: "/staff-directory",
    description: "Find people and teams.",
  },
  {
    label: "Organization Chart",
    path: "/organization-chart",
    description: "Review reporting structure.",
  },
  {
    label: "Onboarding",
    path: "/onboarding",
    description: "Get new starters productive quickly.",
  },
  {
    label: "Departments",
    path: "/departments",
    description: "Explore business functions.",
  },
  {
    label: "Leadership",
    path: "/leadership",
    description: "See company leadership.",
  },
  {
    label: "News & Announcements",
    path: "/news-announcements",
    description: "Company updates and events.",
  },
];
