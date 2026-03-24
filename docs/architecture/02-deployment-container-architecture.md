# Deployment And Container Architecture

```mermaid
flowchart TB
  User[Browser]

  subgraph DockerHost[Docker Host]
    subgraph FrontendContainer[frontend container]
      Nginx[nginx<br/>serves React build]
      FrontendHealth[/GET /healthz/]
    end

    subgraph BackendContainer[backend container]
      Express[Express API<br/>Node.js runtime]
      BackendHealth[/GET /health/]
      Graceful[Graceful shutdown<br/>SIGTERM/SIGINT handling]
      Retry[DB retry logic<br/>startup wait loop]
    end

    subgraph PostgresContainer[postgres container]
      PG[(PostgreSQL 16)]
      PGHealth[pg_isready]
      Volume[(postgres_data volume)]
    end
  end

  User -->|HTTP 4173| Nginx
  Nginx -->|/api proxy| Express
  Express --> PG
  PG --> Volume
  FrontendHealth -. healthcheck .- Nginx
  BackendHealth -. healthcheck .- Express
  PGHealth -. healthcheck .- PG
  Graceful -. runtime reliability .- Express
  Retry -. dependency handling .- Express
```

The deployed stack uses three containers defined in `docker-compose.yml`: frontend, backend, and postgres. Each service has `restart: always`, health checks, and clear separation of responsibilities, while PostgreSQL state is persisted via the `postgres_data` named volume.
