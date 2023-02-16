import React from "react";
import { Navigate } from "react-router-dom";
import Container from "../components/common/Container";
import { isLogin } from "../utils";

const PrivateRoute = ({ component: Component, visibleSide = true, ...rest }) => {
  return (
    // Show the component and sidebar only when the user is logged in
    // Otherwise, Navigate the user to / page

    isLogin() ? (
      <Container visibleSide={visibleSide}>
        <Component {...rest} />
      </Container>
    ) : (
      <Navigate to="/" />
    )
  );
};

export default PrivateRoute;
