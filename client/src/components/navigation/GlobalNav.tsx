import { NavLink } from "react-router-dom";
import { navigationItems } from "../../config/navigation";

export const GlobalNav = () => {
  return (
    <nav className="global-nav" aria-label="Global">
      {navigationItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active" : "nav-link"
          }
        >
          <span className="nav-link-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
