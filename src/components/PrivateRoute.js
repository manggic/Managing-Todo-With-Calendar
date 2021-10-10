import { useAuth } from "contexts/AuthContext";
import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/signin" />
      }
    ></Route>
  );
}

export default PrivateRoute;
