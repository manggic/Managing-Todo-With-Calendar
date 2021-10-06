import React, { useState, useEffect } from "react";
import DateContainer from "./components/DateContainer";
import "./App.css";

import "antd/dist/antd.css";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import MonthCalendar from "./components/MonthCalendar";
import SignIn from "components/SignIn";
import NotFound from "components/NotFound";
const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route
            path="/"
            exact
            component={() => {
              return <MonthCalendar />;
            }}
          />
          <Route
            path="/signin"
            exact
            component={() => {
              return <SignIn />;
            }}
          />

          <Route
            path="*"
            exact
            component={() => {
              return <NotFound />;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
