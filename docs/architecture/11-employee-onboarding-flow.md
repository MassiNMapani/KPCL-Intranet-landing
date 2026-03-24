# Employee Onboarding Flow

```mermaid
sequenceDiagram
  participant User as Employee
  participant Page as Onboarding Page
  participant FE as intranet-service
  participant API as intranet-api
  participant Route as GET /api/onboarding
  participant Controller as content-controller
  participant Service as content-service
  participant OnboardingRepo as content-repository
  participant ResourceSvc as resources-service
  participant ResourceRepo as resources-repository

  User->>Page: Open onboarding
  Page->>FE: request onboarding content
  FE->>API: getOnboarding()
  API->>Route: GET /api/onboarding
  Route->>Controller: onboarding
  Controller->>Service: getOnboardingContent()
  Service->>OnboardingRepo: getOnboardingItems()
  Service->>ResourceSvc: listResources(onboarding-related filters)
  ResourceSvc->>ResourceRepo: getResources(filters)
  OnboardingRepo-->>Service: checklist items
  ResourceRepo-->>ResourceSvc: related resources
  ResourceSvc-->>Service: resource records
  Service-->>Controller: checklist + resources
  Controller-->>API: structured onboarding payload
  API-->>FE: onboarding response
  FE-->>Page: render checklist and links
```

The onboarding page combines ordered onboarding items with reusable knowledge-hub resources through backend composition. This keeps onboarding-specific orchestration in the service layer and allows future personalization, department-specific onboarding, or role-based filtering without moving logic into React components.
