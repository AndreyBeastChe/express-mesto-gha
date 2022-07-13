import React from "react";
import { Redirect } from "react-router-dom";

function ProtectedRoute({ children, loggedIn }) {
  return loggedIn ? children : <Redirect to="./signin" />;
}

export default ProtectedRoute;
