import React from "react";
import { Navigate } from "react-router-dom";
import { isLogin } from "../utils";
import { DASHBOARD_ROUTE } from "../utils/constant";

const PublicRoute = ({ component: Component, ...rest }) => {
  return isLogin() ? <Navigate to={DASHBOARD_ROUTE} /> : <Component {...rest} />;
};

export default PublicRoute;
