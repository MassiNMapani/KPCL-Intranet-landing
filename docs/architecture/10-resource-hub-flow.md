# Resource Hub Flow

```mermaid
sequenceDiagram
  participant User as Employee
  participant Panel as ResourceHubPanel
  participant FE as intranet-service
  participant API as intranet-api
  participant Route as GET /api/resources
  participant Controller as resources-controller
  participant Validation as resources validation
  participant Service as resources-service
  participant Repo as resources-repository
  participant Sources as mock-data / future SharePoint / Graph / PostgreSQL

  User->>Panel: Open page or change filters
  Panel->>FE: getResources(filters)
  FE->>API: getResources(filters)
  API->>Route: GET /api/resources?departmentId&resourceType
  Route->>Controller: list
  Controller->>Validation: validate query params
  Validation-->>Controller: sanitized filters
  Controller->>Service: listResources(filters)
  Service->>Repo: getResources(filters)
  Repo->>Sources: load matching resource records
  Sources-->>Repo: resource rows
  Repo-->>Service: ResourceRecord[]
  Service-->>Controller: filtered response
  Controller-->>API: { data: { filters, items }, meta }
  API-->>FE: resources response
  FE-->>Panel: render resource cards safely
```

The resource hub is implemented as a dedicated domain with explicit filtering by department and resource type. That matches the current API contract and gives the backend a clean place to add SharePoint synchronization, Graph metadata enrichment, permission checks, and caching later.
