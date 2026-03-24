# Homepage Request Flow

```mermaid
sequenceDiagram
  participant User as Browser User
  participant FE as React Home Route
  participant HomeHook as useHomePage
  participant WidgetsHook as useHomeWidgets
  participant API as intranet-service / intranet-api
  participant BE as Express API
  participant HomeSvc as home-service
  participant WidgetSvc as widgets-service
  participant Repos as repositories

  User->>FE: Open /
  FE->>HomeHook: mount
  FE->>WidgetsHook: mount
  HomeHook->>API: getHome()
  WidgetsHook->>API: getHomeWidgets()
  API->>BE: GET /api/home
  API->>BE: GET /api/home/widgets
  BE->>HomeSvc: homeController.show
  BE->>WidgetSvc: widgetsController.home
  HomeSvc->>Repos: aggregate homepage sections
  WidgetSvc->>Repos: load bounded widget data
  Repos-->>HomeSvc: domain slices
  Repos-->>WidgetSvc: widget summaries
  HomeSvc-->>BE: HomePageData
  WidgetSvc-->>BE: HomeWidgetsData
  BE-->>API: structured success responses
  API-->>HomeHook: homepage data
  API-->>WidgetsHook: widget data
  HomeHook-->>FE: render core sections
  WidgetsHook-->>FE: render non-critical widgets
```

The homepage uses two independent API calls: one for the main page content and one for lightweight widgets. This keeps the critical path smaller, preserves fallback behavior for non-critical sections, and aligns with the existing `HomePageView` and `HomeWidgetsPanel` implementation.
