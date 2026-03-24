# Frontend Architecture

```mermaid
flowchart TD
  Main[main.tsx]
  App[app/App.tsx]
  Router[app/router.tsx]
  Routes[app/routes.tsx<br/>lazy route modules]
  Shell[components/layout/AppShell.tsx]
  Nav[components/navigation/GlobalNav.tsx]
  Pages[pages/*]
  Features[features/home and features/resources]
  Services[services/intranet-service.ts]
  Api[api/intranet-api.ts]
  Http[api/http.ts]
  Config[config/*]
  SharedFeedback[components/feedback/*]
  SharedUI[components/cards, sections, links]

  Main --> App
  App --> Router
  Router --> Shell
  Router --> Routes
  Shell --> Nav
  Routes --> Pages
  Pages --> Features
  Pages --> SharedFeedback
  Pages --> SharedUI
  Features --> Services
  Services --> Api
  Api --> Http
  Pages --> Config
  Features --> Config
```

The frontend is organized around route entry pages, feature-level composition, and shared presentation components. Data access is centralized through the API and service layer, keeping presentational components focused on rendering and preserving a clean separation between UI, configuration, and remote data loading.
