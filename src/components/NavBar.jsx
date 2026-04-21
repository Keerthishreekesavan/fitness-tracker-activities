import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-links">
        <NavLink to="/activities" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Activities
        </NavLink>
        <NavLink to="/filter" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Filter
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Stats
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
