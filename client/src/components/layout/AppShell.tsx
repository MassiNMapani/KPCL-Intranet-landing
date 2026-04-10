import { Outlet } from "react-router-dom";
import { siteConfig } from "../../config/site";
import { GlobalNav } from "../navigation/GlobalNav";

export const AppShell = () => {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-brand">
          <img
            className="topbar-logo"
            src="/branding/kanona-logo.png"
            alt="Kanona Power Company Limited"
          />
          <div className="topbar-brand-copy">
            <p className="topbar-kicker">Kanona</p>
            <h1>{siteConfig.title}</h1>
            <p className="topbar-subtitle">{siteConfig.companyName}</p>
          </div>
        </div>
        <div className="topbar-meta">
          <p className="topbar-user-label">Internal Access</p>
          <p className="topbar-copy">{siteConfig.tagline}</p>
        </div>
      </header>
      <GlobalNav />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
};
