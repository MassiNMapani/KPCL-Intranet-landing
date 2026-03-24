# Application Launcher Flow

```mermaid
sequenceDiagram
  participant User as Employee
  participant Page as Home or Applications Page
  participant FE as intranet-service
  participant API as intranet-api
  participant Route as GET /api/applications
  participant Controller as applications-controller
  participant Service as applications-service
  participant Repo as applications-repository
  participant Data as mock-data / future PostgreSQL

  User->>Page: Open launcher view
  Page->>FE: request applications
  FE->>API: getApplications()
  API->>Route: GET /api/applications
  Route->>Controller: list
  Controller->>Service: listApplications()
  Service->>Repo: getApplications()
  Repo->>Data: read application catalog
  Data-->>Repo: application rows
  Repo-->>Service: application records
  Service-->>Controller: filtered API-safe data
  Controller-->>API: { data, meta }
  API-->>FE: ApplicationRecord[]
  FE-->>Page: render launcher cards
```

The application launcher is a direct catalog flow with thin HTTP handling and repository-backed data retrieval. This keeps card rendering separate from catalog ownership, while allowing later RBAC filtering and PostgreSQL-backed queries inside the service or repository layer.
