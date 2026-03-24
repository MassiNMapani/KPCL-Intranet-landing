# Operational Reliability And Docker Restart Flow

```mermaid
flowchart TD
  Start[Docker daemon starts or restarts]
  Compose[Compose-managed services]
  PG[postgres service<br/>restart: always]
  PGHealth[pg_isready healthy]
  BE[backend service<br/>restart: always]
  BERetry[waitForDatabase retry loop]
  BEHealth[/health healthy]
  FE[frontend service<br/>restart: always]
  FEHealth[/healthz healthy]
  Traffic[Browser traffic served]
  Signal[SIGTERM / container stop]
  Shutdown[Graceful backend shutdown]

  Start --> Compose
  Compose --> PG
  PG --> PGHealth
  PGHealth --> BE
  BE --> BERetry
  BERetry --> BEHealth
  BEHealth --> FE
  FE --> FEHealth
  FEHealth --> Traffic
  Signal --> Shutdown
  Shutdown --> Compose
```

The runtime is designed to tolerate restarts and startup delays with `restart: always`, service health checks, backend database retry logic, and backend graceful shutdown handling. The dependency order in `docker-compose.yml` plus the backend startup wait loop helps the system recover cleanly from container crashes, Docker restarts, and host reboots.
