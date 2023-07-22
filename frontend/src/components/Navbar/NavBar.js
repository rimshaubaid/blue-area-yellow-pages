import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/js/src/collapse.js";

function NavBar() {
  //console.log(localStorage.headers)
  return (
    <div style={{ backgroundColor: "#D4AC0D" }}>
      <nav className="navbar navbar-light">
        <Link className="navbar-brand" to={"/"} style={{ color: "black" }}>
          Blue Area Yellow Pages
        </Link>
        <nav className="navbar navbar-expand-lg navbar-light ">
          <div className="container-fluid" id="first-con">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" to={"/"}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/traffic-details"}>
                    Traffic Details
                  </Link>
                </li>
                <li className="nav-item">
                  {localStorage.jwtToken ? (
                    <Link className="nav-link" to={"/dashboard"}>
                      Account
                    </Link>
                  ) : (
                    <Link className="nav-link" to={"/register"}>
                      Sign Up
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
}

export default NavBar;
