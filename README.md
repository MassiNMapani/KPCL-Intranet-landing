# KPCL-Intranet-landing

Developer README for the KPCL intranet implementation.

## Stack

- Frontend: ReactJS + Vite + TypeScript
- Backend: Node.js + Express + TypeScript
- Data design direction: PostgreSQL

## Architecture

The repository is split into four main areas:

- `client/`: React application
- `server/`: Node.js API
- `shared/`: shared TypeScript contracts and domain models
- `database/`: PostgreSQL schema direction

Separation of concerns:

- UI components render data only and do not own business data.
- Frontend pages consume a service/API layer instead of calling backend endpoints directly in arbitrary components.
- Backend route handlers stay thin and delegate to controllers, services, and repositories.
- Repository logic is the boundary where mock data today can later be replaced by PostgreSQL queries, SharePoint sync, Microsoft Graph lookups, or other integrations.

## Frontend Structure

Main frontend areas under [`client/src`](/Users/massi/softwareprojects/KPCL-Intranet-landing/client/src):

- `app/`: router, app shell, error boundaries
- `pages/`: route entry points
- `features/`: domain-specific UI composition such as homepage widgets and resource hub
- `components/`: reusable presentation components
- `api/`: low-level HTTP client and endpoint bindings
- `services/`: frontend service layer used by pages/features
- `hooks/`: reusable hooks for async state and data loading
- `config/`: environment config, site config, navigation, feature flags
- `styles/`: shared CSS tokens and global styles

Page structure:

- Home
- Applications
- Staff Directory
- Organization Chart
- Onboarding
- Departments
- Leadership
- News & Announcements

Routing:

- Uses `react-router-dom`
- Shared shell layout wraps all pages
- Route modules are lazy-loaded for predictable code splitting

Component structure:

- Shared presentational primitives such as cards, feedback states, section headers, and navigation live in `components/`
- Feature-specific UI such as the homepage resource hub and widgets live in `features/`
- Presentational components do not fetch data directly unless the component itself is a feature container by design

Service/API layer:

- [`client/src/api/http.ts`](/Users/massi/softwareprojects/KPCL-Intranet-landing/client/src/api/http.ts): fetch wrapper
- [`client/src/api/intranet-api.ts`](/Users/massi/softwareprojects/KPCL-Intranet-landing/client/src/api/intranet-api.ts): endpoint bindings
- [`client/src/services/intranet-service.ts`](/Users/massi/softwareprojects/KPCL-Intranet-landing/client/src/services/intranet-service.ts): frontend-facing service layer

Config layer:

- [`client/src/config/env.ts`](/Users/massi/softwareprojects/KPCL-Intranet-landing/client/src/config/env.ts): frontend environment values
- [`client/src/config/navigation.ts`](/Users/massi/softwareprojects/KPCL-Intranet-landing/client/src/config/navigation.ts): global nav structure
- [`client/src/config/site.ts`](/Users/massi/softwareprojects/KPCL-Intranet-landing/client/src/config/site.ts): site copy and layout-level metadata
- [`client/src/config/feature-flags.ts`](/Users/massi/softwareprojects/KPCL-Intranet-landing/client/src/config/feature-flags.ts): future-facing frontend flags

Mock data strategy:

- Mock data does not live in UI components
- Mock data currently lives on the backend in repository-backed modules
- Frontend consumes mock-backed API responses through the same service layer it will use against real data

## Backend Structure

Main backend areas under [`server/src`](/Users/massi/softwareprojects/KPCL-Intranet-landing/server/src):

- `routes/`: Express route registration
- `controllers/`: request parsing and response handling
- `services/`: business orchestration and aggregation
- `repositories/`: data access boundary
- `validation/`: request and record validation
- `middleware/`: request context, error handling, not-found handling
- `config/`: server environment config
- `utils/`: shared server utilities

Current backend structure follows:

- Routes -> Controllers -> Services -> Repositories

This is the required extension pattern. Avoid placing business logic directly in route definitions.

Environment config usage:

- [`server/src/config/env.ts`](/Users/massi/softwareprojects/KPCL-Intranet-landing/server/src/config/env.ts) reads `PORT`, `CORS_ORIGIN`, and `DATABASE_URL`
- Environment access should remain centralized here rather than spreading through services or controllers

Validation:

- Uses `zod`
- Query and record validation live under `server/src/validation/`

Structured response model:

- Success responses use `{ data, meta }`
- Error responses use `{ error }`
- Request correlation is supported via request IDs in middleware

## PostgreSQL Direction

The PostgreSQL schema direction is captured in [`database/schema.sql`](/Users/massi/softwareprojects/KPCL-Intranet-landing/database/schema.sql).

The current design aims for normalized core entities:

- departments
- employees
- leadership_profiles
- applications
- application_audiences
- announcements
- events
- onboarding_items
- resources

Shared contracts in [`shared/src/models/intranet.ts`](/Users/massi/softwareprojects/KPCL-Intranet-landing/shared/src/models/intranet.ts) are intentionally shaped to stay close to a relational backend model:

- foreign-key-like fields such as `departmentId`, `employeeId`, `managerId`
- bounded enums for resource types and source systems
- clear ownership and department references for applications, events, resources, and onboarding tasks

## Domain Areas

Application catalog:

- Backend-owned catalog of approved internal systems
- URLs are validated server-side before reaching the UI
- Designed to later support RBAC visibility

Resources / forms / templates / how-tos:

- Modeled as a dedicated `resources` domain
- Supports department and resource-type filtering
- Designed for future SharePoint and Graph-backed synchronization

Staff directory:

- Employee records reference departments and managers
- Intended for future HR and Microsoft Graph enrichment

Departments:

- Departments have codes, leaders, summaries, and optional parent relationships

Leadership:

- Leadership profiles reference employee records and departments or executive functions

Onboarding:

- Checklist items have ordering and owner department references

Announcements / events:

- Announcements can be department-owned
- Events have owner departments and formats

## Future Integration Points

SharePoint integration plan:

- Keep SharePoint access on the backend only
- Use repository or service adapters to sync or proxy documents, announcement content, and knowledge hub metadata
- Resource records should remain the stable contract returned to the frontend

Microsoft Graph integration plan:

- Use Graph on the backend for employee, org, or document metadata enrichment
- Keep Graph-specific logic behind services/repositories, not in controllers or frontend components

SSO integration plan:

- Add authentication middleware at the API layer
- Use request context to attach identity claims to downstream services
- Keep UI dependent on authorized API responses, not token inspection inside random components

RBAC and authorization plan:

- Enforce route-level authentication first
- Then apply service/repository-level filtering for department- and role-scoped data
- Avoid sending unauthorized records and filtering them only in the UI

Logging plan:

- Replace `console` with structured logging at server middleware/service boundaries
- Include request ID, route, domain, and latency context

Monitoring / observability plan:

- Add metrics at API and repository boundaries
- Add tracing spans around homepage and widget aggregation
- Use `/health/live` and `/health/ready` for platform checks

Feature flags plan:

- Keep flags in centralized config first
- Move to backend-driven or provider-driven flags if behavior becomes role- or environment-dependent

Environment config plan:

- Validate environment config at startup
- Keep secret and non-secret config separated
- Never read raw environment variables throughout the codebase

Migrations / schema plan:

- Move `database/schema.sql` into a proper migration tool
- Treat schema updates as versioned, reviewed changes
- Keep repository contracts stable while evolving persistence underneath

## Operational Guidance

### Local development

```bash
npm install
npm run dev:server
npm run dev:client
```

Local endpoints:

- Frontend: `http://localhost:4173`
- Backend API: `http://localhost:8080`

Local startup behavior:

- The API starts without PostgreSQL by default so mock-backed routes such as the application catalog remain available during frontend development.
- Set `REQUIRE_DATABASE_ON_STARTUP=true` when you want local startup to block until PostgreSQL is reachable.
- The frontend should call the API through same-origin `/api`; the Vite dev server proxies that path to `http://localhost:8080`.

### Run with Docker

This repository includes a production-style Docker deployment with three services:

- `frontend`: nginx serving the built React app
- `backend`: Node.js API
- `postgres`: PostgreSQL database with persistent storage

Docker files:

- [`client/Dockerfile`](/Users/massi/softwareprojects/KPCL-Intranet-landing/client/Dockerfile)
- [`server/Dockerfile`](/Users/massi/softwareprojects/KPCL-Intranet-landing/server/Dockerfile)
- [`docker-compose.yml`](/Users/massi/softwareprojects/KPCL-Intranet-landing/docker-compose.yml)
- [`.env.example`](/Users/massi/softwareprojects/KPCL-Intranet-landing/.env.example)

Setup:

1. Copy the environment template:

```bash
cp .env.example .env
```

2. Update the values in `.env`, especially:

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `API_PORT`
- `FRONTEND_PORT`

3. Build and start the full stack:

```bash
docker compose --env-file .env up -d --build
```

4. Check service status:

```bash
docker compose ps
```

5. Stop the stack:

```bash
docker compose down
```

If you want to stop the stack and remove the database volume as well:

```bash
docker compose down -v
```

Docker endpoints:

- Frontend: `http://localhost:${FRONTEND_PORT}` and by default `http://localhost:4173`
- Backend API: `http://localhost:${API_PORT}` and by default `http://localhost:8080`
- Backend health: `http://localhost:${API_PORT}/health`

Container behavior:

- All services use `restart: always`
- PostgreSQL data persists in the named volume `postgres_data`
- The backend waits for PostgreSQL readiness before serving traffic
- The frontend depends on backend health and serves the built UI through nginx
- Health checks are configured for frontend, backend, and postgres

Health checks:

- Frontend container: `GET /healthz`
- Backend container: `GET /health`
- PostgreSQL container: `pg_isready`

Useful Docker commands:

```bash
docker compose logs -f
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f postgres
docker compose restart backend
```

Backend runtime note:

- The backend runtime uses `tsx` against `server/src/server.ts`, which keeps Docker and local `npm run start --workspace server` aligned with the development execution path.

Environment variables used by Docker:

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `DB_HOST`
- `DB_PORT`
- `API_PORT`
- `FRONTEND_PORT`
- `DB_RETRY_ATTEMPTS`
- `DB_RETRY_DELAY_MS`
- `SHUTDOWN_GRACE_MS`

Notes:

- Do not commit real secrets in `.env`
- The frontend proxies `/api` traffic to the backend container
- The backend uses PostgreSQL connection retry logic to tolerate temporary database startup delay
- The stack is designed to recover after `docker restart`, container crashes, and server reboot

### Production build

```bash
npm run build
```

## How To Extend Safely

General rules:

- Start from shared domain models when adding or changing a domain contract
- Update backend validation before exposing new fields
- Update repositories before services if data shape changes
- Keep pages thin and move reusable UI into `components/` or `features/`
- Do not place business data or environment values directly inside presentational components

How to add a new application card:

1. Add the application record in [`server/src/repositories/mock/mock-data.ts`](/Users/massi/softwareprojects/KPCL-Intranet-landing/server/src/repositories/mock/mock-data.ts)
2. Ensure `ownerDepartmentId` and `ownerDepartmentName` match an existing department
3. Ensure `launchUrl` passes server-side URL validation
4. The frontend application pages and homepage launcher will consume it automatically through the API

How to add a department:

1. Add the department record in [`server/src/repositories/mock/mock-data.ts`](/Users/massi/softwareprojects/KPCL-Intranet-landing/server/src/repositories/mock/mock-data.ts)
2. Keep `id`, `code`, and `leaderId` consistent with staff and leadership records
3. If needed, add matching org chart and staff relationships

How to add a resource:

1. Add the resource in [`server/src/repositories/mock/mock-data.ts`](/Users/massi/softwareprojects/KPCL-Intranet-landing/server/src/repositories/mock/mock-data.ts)
2. Ensure `departmentId` matches an existing department
3. Use the existing resource contract fields
4. Ensure `targetUrl` is validated by the server policy
5. The homepage resource hub and onboarding page will pick it up through the API

How to add a backend endpoint:

1. Add or extend a shared contract in `shared/src/`
2. Add validation in `server/src/validation/`
3. Add repository method
4. Add service method
5. Add controller
6. Register route in [`server/src/routes/api.ts`](/Users/massi/softwareprojects/KPCL-Intranet-landing/server/src/routes/api.ts)
7. Add a frontend API binding and service call if needed

How to evolve mock data into real API-backed data:

1. Keep the shared contract stable
2. Replace repository mock reads with PostgreSQL queries or integration adapters
3. Preserve controller and frontend service contracts
4. Add tests around repository and service behavior before removing mock paths

## Security And Reliability Guidance

Security rules:

- Do not hardcode secrets
- Do not expose internal-only fields to the UI unless needed
- Do not trust client input
- Validate request input at API boundaries
- Validate outbound resource URLs on the backend
- Keep auth and permission checks server-side

Reliability rules:

- Preserve loading, error, and empty states in the UI
- Keep homepage-critical data separate from non-critical widgets
- Keep route handlers thin and predictable
- Use bounded API responses for homepage and dashboard content
- Fail safely with structured backend errors

Validation rules:

- Every new request shape should have a corresponding `zod` schema
- Every mock or externally sourced record should be validated before use where practical
- Prefer enum-like constrained fields for statuses, categories, and source systems

No-secrets-in-code rule:

- No credentials, tokens, or private endpoints in source files
- Secrets must come from environment/config management only

Least privilege rule:

- Return only fields required by the UI
- Scope future SSO/RBAC responses to the authenticated employee
- Do not assume all employees can see all records
