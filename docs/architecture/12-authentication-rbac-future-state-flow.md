# Authentication And RBAC Future-State Flow

```mermaid
flowchart LR
  User[Employee Browser]
  FE[React Frontend]
  IdP[SSO Provider<br/>future]
  AuthMW[Authentication Middleware<br/>future API layer]
  RBACMW[RBAC Middleware<br/>future API layer]
  Controllers[Controllers]
  Services[Services]
  Repos[Repositories]
  Policy[(Role / Permission / Visibility Data<br/>future PostgreSQL tables)]
  Data[(Domain Data)]

  User --> FE
  FE -. authenticate .-> IdP
  FE -->|authorized API request| AuthMW
  IdP -. token / session validation .-> AuthMW
  AuthMW --> RBACMW
  RBACMW --> Controllers
  RBACMW --> Policy
  Controllers --> Services
  Services --> Repos
  Repos --> Data
  Services -. field/record filtering .-> Policy
```

The current codebase already marks middleware hooks in `server/src/routes/api.ts` for future authentication and route-level RBAC. The intended model is to validate identity at the API boundary, then apply role- and department-aware filtering in middleware and service layers so unauthorized records are never sent to the frontend.
