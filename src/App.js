import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Login from "./components/auth/Login";
import UsersList from "./components/dashboard-container/UserList/UsersList";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import UpdateUser from "./components/dashboard-container/UserForm/UserForm";
import { PATHS } from "./utils/constant";
import Profile from "./components/dashboard-container/Profile/Profile";
import ImageSlider from "./components/dashboard-container/ImageSlider/ImageSlider";
import "./utils/encrypt-password";
import "./utils/constant";
const App = () => {
  return (
    <Routes>
      {/* /// public and private route setup here and relavant PATHS has set here */}
      <Route path={PATHS.login} element={<PublicRoute component={Login} />} />
      <Route
        path={PATHS.dashboard}
        element={<PrivateRoute visibleSide component={Profile} />}
      />
      <Route
        path={PATHS.usersList}
        element={<PrivateRoute visibleSide component={UsersList} />}
      />{" "}
      <Route
        path={PATHS.update}
        element={<PrivateRoute visibleSide={false} component={UpdateUser} />}
      />
      <Route
        path={PATHS.create}
        element={<PrivateRoute visibleSide={false} component={UpdateUser} />}
      />
      <Route
        path={PATHS.imageSlider}
        element={<PrivateRoute visibleSide component={ImageSlider} />}
      />
    </Routes>
  );
};

export default App;
