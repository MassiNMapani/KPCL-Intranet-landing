# Domain And Module Architecture

```mermaid
flowchart LR
  Home[Home]
  Widgets[Homepage Widgets]
  Apps[Applications Catalog]
  Directory[Staff Directory]
  Org[Organization Chart]
  Departments[Departments]
  Leadership[Leadership]
  Onboarding[Onboarding]
  News[Announcements and Events]
  Resources[Knowledge Hub Resources]

  Departments --- Directory
  Departments --- Leadership
  Departments --- Apps
  Departments --- Resources
  Departments --- Onboarding
  Departments --- News
  Directory --- Org
  Directory --- Leadership
  Home --> Apps
  Home --> News
  Home --> Resources
  Home --> Directory
  Home --> Departments
  Home --> Onboarding
  Home --> Leadership
  Home --> Widgets
  Widgets -. derived, bounded summaries .-> News
  Widgets -. derived, bounded summaries .-> Onboarding
```

The platform is organized around business domains rather than page-only concerns. The homepage aggregates selected slices from the applications, resources, directory, departments, onboarding, leadership, and news domains, while widgets remain a separate lightweight aggregation path to avoid coupling non-critical content to the main homepage payload.
