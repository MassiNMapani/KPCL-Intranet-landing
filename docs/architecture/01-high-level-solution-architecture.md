# High-Level Solution Architecture

```mermaid
flowchart LR
  Employee[Employee Browser]
  Frontend[React Frontend<br/>Vite-built SPA served by nginx]
  Backend[Node.js Backend<br/>Express API]
  Shared[Shared Contracts and Models<br/>shared/src]
  MockData[Mock Repository Data<br/>server/src/repositories/mock]
  Postgres[(PostgreSQL<br/>target system of record)]
  SharePoint[Future SharePoint Integration]
  Graph[Future Microsoft Graph Integration]
  SSO[Future SSO / Identity Provider]
  RBAC[Future RBAC / Authorization Layer]

  Employee --> Frontend
  Frontend -->|/api| Backend
  Frontend -. types .- Shared
  Backend -. types .- Shared
  Backend --> MockData
  Backend -. future persistence .-> Postgres
  Backend -. future content sync/proxy .-> SharePoint
  Backend -. future directory/document enrichment .-> Graph
  SSO -. future authentication .-> Backend
  RBAC -. future policy enforcement .-> Backend
```

This solution is structured as a browser-based React application consuming a Node.js API, with shared TypeScript contracts coordinating data shapes across the stack. The backend currently reads from mock repository data, but its service and repository boundaries are already positioned to move to PostgreSQL and future SharePoint, Graph, SSO, and RBAC integrations without changing the frontend contract.
