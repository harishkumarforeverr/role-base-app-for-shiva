import React from "react";
import "./Container.scss";
import { logout } from "../../utils";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// sidebar
const Container = (props) => {
  const navigate = useNavigate();
  const sidebar = useSelector((state) => state.sidebar);
  return (
    <>
      <div className={`${props.visibleSide ? "dashboardContainer" : ""}`}>
        <div
          style={{
            display: props.visibleSide ? "block" : "none",
          }}
          className="sidebar"
        >
          {sidebar.map((siderObj) => {
            return (
              <div className="sidebarTitle ">
                <NavLink className={"navLink"} activeClassName="activeClass" to={siderObj.link}>
                  {siderObj.title}{" "}
                </NavLink>{" "}
              </div>
            );
          })}
          {/* logout operation */}
          <div className="logoutButton">
            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <div>{props.children} </div>
      </div>
    </>
  );
};

export default Container;
