# Backend Architecture

```mermaid
flowchart TD
  Server[server.ts]
  App[app.ts]
  Middleware[Middleware<br/>request-context, not-found, error-handler]
  HealthRoutes[routes/health.ts]
  ApiRoutes[routes/api.ts]
  Controllers[controllers/*]
  Services[services/*]
  Repositories[repositories/*]
  MockData[mock/mock-data.ts]
  Validation[validation/*]
  Utils[utils/*]
  DB[db/postgres.ts]
  Env[config/env.ts]

  Server --> Env
  Server --> DB
  Server --> App
  App --> Middleware
  App --> HealthRoutes
  App --> ApiRoutes
  ApiRoutes --> Controllers
  Controllers --> Validation
  Controllers --> Services
  Services --> Repositories
  Repositories --> MockData
  Controllers --> Utils
  Services --> Utils
```

The backend follows a thin-route, layered service architecture. Express routes delegate to controllers, controllers validate and shape requests, services orchestrate domain logic, and repositories own data access so mock data can later be replaced by PostgreSQL queries or external integration adapters.
