import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <span className="navbar__brand">Electricity Board</span>
        <nav className="navbar__links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "navbar__link" + (isActive ? " navbar__link--active" : "")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              "navbar__link" + (isActive ? " navbar__link--active" : "")
            }
          >
            Dashboard Statistics
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
