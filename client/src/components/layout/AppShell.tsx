import { Outlet } from "react-router-dom";
import { siteConfig } from "../../config/site";
import { GlobalNav } from "../navigation/GlobalNav";

export const AppShell = () => {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-brand">
          <p className="eyebrow">Enterprise Intranet</p>
          <h1>{siteConfig.title}</h1>
        </div>
        <p className="topbar-copy">{siteConfig.tagline}</p>
      </header>
      <GlobalNav />
      <main className="page-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>{siteConfig.footerText}</p>
        <p>
          {/* Future audit hook: footer actions can emit page access audit events here. */}
          {/* Future monitoring hook: add client-side web vitals and API failure indicators here. */}
          Support, incident routing, and backend origins should stay environment-driven.
        </p>
      </footer>
    </div>
  );
};
