import React from "react";

function Login() {
  return (
    <div className="login-box">
      <h1>Sign In</h1>
      <br />
      <form action="/dashboard">
        <div className="form-group">
          <h5 htmlFor="usr">Name:</h5>
          <input type="text" className="form-control cus-input" id="usr" />
        </div>
        <div className="form-group">
          <h5 htmlFor="pass">Password:</h5>
          <input type="password" className="form-control cus-input" id="pass" />
        </div>
        <button className="btn btn-primary mt-4">Submit</button>
      </form>
    </div>
  );
}

export default Login;
