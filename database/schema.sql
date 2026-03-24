-- KPCL Intranet PostgreSQL schema starter.
-- Future migrations: move this into a formal migration tool such as Prisma Migrate, Knex, or dbmate.

create table if not exists departments (
  id text primary key,
  code text not null unique,
  name text not null unique,
  summary text not null,
  leader_employee_id text,
  parent_department_id text references departments(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists employees (
  id text primary key,
  department_id text not null references departments(id),
  full_name text not null,
  title text not null,
  email text not null unique,
  location text not null,
  employee_number text not null unique,
  manager_employee_id text references employees(id),
  is_leadership boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists leadership_profiles (
  id text primary key,
  employee_id text not null unique references employees(id),
  role_name text not null,
  summary text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists applications (
  id text primary key,
  name text not null unique,
  summary text not null,
  launch_url text not null,
  category text not null,
  status text not null check (status in ('active', 'planned', 'archived')),
  owner_department_id text not null references departments(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists application_audiences (
  application_id text not null references applications(id) on delete cascade,
  audience_name text not null,
  primary key (application_id, audience_name)
);

create table if not exists announcements (
  id text primary key,
  title text not null,
  summary text not null,
  category text not null check (category in ('Announcement', 'News')),
  department_id text references departments(id),
  published_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id text primary key,
  title text not null,
  summary text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  location text not null,
  owner_department_id text not null references departments(id),
  delivery_mode text not null check (delivery_mode in ('In-person', 'Virtual', 'Hybrid')),
  created_at timestamptz not null default now()
);

create table if not exists onboarding_items (
  id text primary key,
  title text not null,
  summary text not null,
  owner_name text not null,
  owner_department_id text not null references departments(id),
  sequence_number integer not null,
  created_at timestamptz not null default now()
);

create table if not exists resources (
  id text primary key,
  department_id text not null references departments(id),
  category text not null,
  title text not null,
  description text not null,
  resource_type text not null check (resource_type in ('Form', 'Template', 'Guide')),
  source_system text not null check (source_system in ('Intranet', 'SharePoint', 'Microsoft Graph', 'HR System')),
  target_url text not null,
  last_updated timestamptz not null,
  owner_name text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- SharePoint integration here: map synced document libraries or list items into resource catalog rows.
-- Graph API integration here: resolve Microsoft 365 metadata or permissions for resource references.
-- Cache layer here: optionally add materialized views or cache invalidation support for high-read catalogs.
-- Permission check here: introduce role-to-resource visibility tables for governed access.
-- Audit log here: persist append-only access and modification events for governed resources.
-- Repository/migration here: formalize this schema in a migration tool with foreign keys and indexes.

-- Future RBAC: add role, permission, and role_resource_visibility tables.
-- Future audit trail: add append-only audit_events table with actor, action, target, correlation_id.
-- Future caching support: materialized views or summary tables can be introduced for homepage aggregates.
-- Organization chart can be derived from departments, employees, and reporting relationships without a dedicated table,
-- but a snapshot table can be introduced later if hierarchy versioning or denormalized reads become necessary.
