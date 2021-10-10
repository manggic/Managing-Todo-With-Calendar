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
import { AuthProvider } from "contexts/AuthContext";
import PrivateRoute from "components/PrivateRoute";
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Switch>
            <PrivateRoute
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
      </AuthProvider>
    </Router>
  );
};

export default App;
