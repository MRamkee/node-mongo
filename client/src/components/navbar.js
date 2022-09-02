import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/create">
          <img
            style={{ width: 25 + "%" }}
            alt="logo"
            src="data:image/png;base64,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"
          ></img>
        </NavLink>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                <h2> Ramkee Cloud Operations </h2>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
