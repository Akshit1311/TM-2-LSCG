import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";

function Header() {
  return (
    <div className="navbar">
      {/* <Router forceRefresh> */}
      {/* <i className="fa fa-bars hamburger"></i> */}
      <Link to="/">
        <img
          src={require("../images/logo.png")}
          alt="LSCG"
          className="nav-logo"
        />
      </Link>
      {/* <Link to="/">
          <img
            src={require("../images/bank-logo.png")}
            alt="LSCG"
            className="nav-logo"
          />
        </Link> */}
      {/* <Link to="/">Home</Link> */}
      &nbsp;
      <Link className="navb-links" to="/dashboard">
        Dashboard
      </Link>
      <Link className="navb-links" to="/graphs">
        Graphs
      </Link>
      <Link className="navb-links" to="/upload">
        Upload
      </Link>
      {/* </Router> */}
      {/* <a href="/">Graphs</a> */}
    </div>
  );
}

export default Header;
