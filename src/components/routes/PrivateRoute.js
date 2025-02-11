import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  console.log(token, "from orv");

  return token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
