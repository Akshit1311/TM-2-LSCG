import React from "react";

// CSS
import "./site.css";
import Login from "./Login";

function Site() {
  return (
    <React.Fragment>
      <div className="site">
        <div className="left-container">
          <Login />
        </div>
        <div className="right-container">
          <div className="banner">LONDON STRATEGY & CONSULTING GROUP</div>
          <div className="soc-icons">
            <i class="fa soc-icon fa-linkedin" aria-hidden="true"></i>
            <i class="fa soc-icon fa-envelope-open-o" aria-hidden="true"></i>
            <i class="fa soc-icon fa-facebook" aria-hidden="true"></i>
            <i class="fa soc-icon fa-instagram" aria-hidden="true"></i>
            <i class="fa soc-icon fa-twitter" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      {/* <div className="tm-features">
        <div className="container">
          <div className="col-lg-3">
            <h1>Transaction Monitoring Features</h1>
          </div>
          <div className="col-lg-9"></div>
        </div>
      </div> */}
    </React.Fragment>
  );
}

export default Site;
