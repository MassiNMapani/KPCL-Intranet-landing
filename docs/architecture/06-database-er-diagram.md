# Database ER Diagram

```mermaid
erDiagram
  DEPARTMENTS ||--o{ EMPLOYEES : contains
  DEPARTMENTS ||--o{ APPLICATIONS : owns
  DEPARTMENTS ||--o{ ANNOUNCEMENTS : publishes
  DEPARTMENTS ||--o{ EVENTS : owns
  DEPARTMENTS ||--o{ ONBOARDING_ITEMS : owns
  DEPARTMENTS ||--o{ RESOURCES : owns
  DEPARTMENTS ||--o| DEPARTMENTS : parent_of
  EMPLOYEES ||--o| EMPLOYEES : manages
  EMPLOYEES ||--|| LEADERSHIP_PROFILES : has
  APPLICATIONS ||--o{ APPLICATION_AUDIENCES : targets

  DEPARTMENTS {
    text id PK
    text code UK
    text name UK
    text leader_employee_id FK
    text parent_department_id FK
  }

  EMPLOYEES {
    text id PK
    text department_id FK
    text manager_employee_id FK
    text employee_number UK
    text email UK
  }

  LEADERSHIP_PROFILES {
    text id PK
    text employee_id FK
    text role_name
  }

  APPLICATIONS {
    text id PK
    text owner_department_id FK
    text launch_url
    text status
  }

  APPLICATION_AUDIENCES {
    text application_id FK
    text audience_name
  }

  ANNOUNCEMENTS {
    text id PK
    text department_id FK
    text category
    timestamptz published_at
  }

  EVENTS {
    text id PK
    text owner_department_id FK
    timestamptz starts_at
    timestamptz ends_at
    text delivery_mode
  }

  ONBOARDING_ITEMS {
    text id PK
    text owner_department_id FK
    integer sequence_number
  }

  RESOURCES {
    text id PK
    text department_id FK
    text resource_type
    text source_system
    boolean is_active
  }
```

The current schema direction is relational and normalized around departments, employees, and domain-specific content tables. It supports referential integrity for ownership, department alignment, and staff relationships while leaving room for future RBAC, audit, and caching structures.
