# Staff Directory Flow

```mermaid
sequenceDiagram
  participant User as Employee
  participant Page as Staff Directory Page
  participant FE as intranet-service
  participant API as intranet-api
  participant Route as GET /api/staff-directory
  participant Controller as directory-controller
  participant Service as directory-service
  participant Repo as directory-repository
  participant Data as mock-data / future HR + PostgreSQL

  User->>Page: Open staff directory
  Page->>FE: request staff data
  FE->>API: getStaffDirectory()
  API->>Route: GET /api/staff-directory
  Route->>Controller: staff
  Controller->>Service: listStaff()
  Service->>Repo: getStaffMembers()
  Repo->>Data: read staff records
  Data-->>Repo: employee rows
  Repo-->>Service: staff models
  Service-->>Controller: bounded directory payload
  Controller-->>API: { data, meta }
  API-->>FE: StaffMemberRecord[]
  FE-->>Page: render directory list
```

The staff directory flow is already isolated behind the directory domain, which makes future HR system enrichment straightforward. The backend is the place to add employee filtering, RBAC-based visibility, and Graph-backed directory augmentation without exposing raw source-system details to the frontend.
