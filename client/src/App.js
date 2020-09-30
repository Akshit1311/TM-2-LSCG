import React from "react";
import "./App.css";
import Header from "./components/Header";
import Transactions from "./components/Transactions";
import Graphs from "./components/Graphs";

import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Site from "./components/Landing/Site";
import FileUpload from "./components/FileUpload/FileUpload";
import NewFU from "./components/FileUpload/NewFU";

function App() {
  return (
    <div className="App">
      <Router forceRefresh>
        <Header />
        <Route exact path="/" component={Site} />
        <Route exact path="/dashboard" component={Transactions} />
        <Route exact path="/graphs" component={Graphs} />
        <Route exact path="/upload" component={NewFU} />
        {/* <Route exact path="/newfu" component={NewFU} /> */}
      </Router>
      {/* <Transactions /> */}
    </div>
  );
}

export default App;
