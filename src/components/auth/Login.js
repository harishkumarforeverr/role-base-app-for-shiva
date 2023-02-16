import React, { useState } from "react";
import { login } from "../../utils";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import {
  DASHBOARD_ROUTE,
  SIDEBAR_ADMIN,
  SIDEBAR_USER,
} from "../../utils/constant";
import {
  handleChangeEmailUtils,
  handleChangePasswordUtils,
  regexEmail,
  regexPassword,
} from "../../utils/validation";
import { getLoginAuth } from "../../store/action";
import { useDispatch } from "react-redux";
import { getUser } from "../../service/user";
import { getdecrptedPassword } from "../../utils/encrypt-password";
import { types } from "../../store/types";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // initial state of error
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  // initial state of inputfields
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const ErrorHandler = (name, bool, message, errorName) => {
    setError((prev) => ({
      ...prev,
      [name]: bool,
      [errorName]: message,
    }));
  };

  const emailErrorHandler = (name, bool, message) => {
    setError((prev) => ({
      ...prev,
      [name]: bool,
      mailMessage: message,
      credentialsMessage: "",
    }));
  };
  const passwordErrorHandler = (name, bool, passwordMessage) => {
    setError((prev) => ({
      ...prev,
      // [name]: bool,
      // passwordMessage,
      credentialsMessage: "",
    }));
  };
  //after successfull validation navigate to corresponding dashboard
  const navigateHandler = (credentialsMessage) => {
    if (credentialsMessage === "") {
      navigate(DASHBOARD_ROUTE);
      login(); // set the token key
    } else {
      setError((prev) => ({
        ...prev,
        credentialsMessage,
      }));
    }
  };
  // input validation for email and password
  const loginHandler = async (e) => {
    e.preventDefault();
    const ErrorObj = {};
    for (const property in formData) {
      if (property) {
        ErrorObj[property] = false;
        if (property === "email") {
          if (formData[property] === "") {
            ErrorObj[property] = true;
            ErrorHandler(
              property,
              true,
              "This Field Is Required",
              "mailMessage"
            );
          } else if (!regexEmail.test(formData[property])) {
            // testing here "it is valid format or not"
            // when wrong field entered
            ErrorObj[property] = true;
            ErrorHandler(
              property,
              true,
              "please enter a valid email",
              "mailMessage"
            );
          }
        }
      }
    }
    //dispatching the login action here
    const index = Object.values(ErrorObj).findIndex(
      (argObj) => argObj === true
    );
    if (index < 0) {
      let updatedFormData = {
        ...formData,
        email: String(formData.email).toLocaleLowerCase(),
      };
      const { email, password } = updatedFormData;
      let role = "";
      let credentialsMessage = "";
      let dashboardProfile = [];
      let payload = {};
      let result = await getUser(email);
      // validating correct email and password here
      if (result.length === 0) {
        role = "";
        credentialsMessage = "Invalid Credentials";
      } else if (
        String(getdecrptedPassword(result[0].password)) !== String(password)
      ) {
        role = "";
        credentialsMessage = "Invalid Credentials";
      } else {
        const [res] = result;
        role = res?.role;
        dashboardProfile = res;
        credentialsMessage = "";
      }
      payload = {
        role,
        dashboardProfile,
        sidebar: role === "admin" ? SIDEBAR_ADMIN : SIDEBAR_USER,
      };
      dispatch({
        type: types.login,
        payload,
      });
      navigateHandler(credentialsMessage);
    }
  };

  const emailChangeHandler = (e) => {
    handleChangeEmailUtils(e, setFormData, emailErrorHandler);
  };
  const passwordChangeHandler = (e) => {
    handleChangePasswordUtils(e, setFormData, passwordErrorHandler);
  };
  return (
    // login page
    <div>
      <div className="loginWrapper">
        <div className="loginDetails">
          <div className="loginImg">
            <img src={require("../../assets/loginImg.PNG")} alt="loginImage" />
          </div>
          <div>
            <form className="loginForm">
              <div className="loginTag">
                <h4>Welcome</h4>
              </div>
              <div className="information">
                <h2 className="title">Login</h2>
                <div className="inputGroup">
                  <label htmlFor="Email">Email</label>{" "}
                  <input
                    onChange={emailChangeHandler}
                    type="email"
                    name="email"
                    id="email"
                  />
                  {error.email && (
                    <p className="errorMessage errorSpacing">
                      {error.mailMessage}
                    </p>
                  )}
                </div>
                <div className="inputGroup">
                  <label htmlFor="Password">Password</label>{" "}
                  <input
                    onChange={passwordChangeHandler}
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
                <div className="errorMessage ">{error.credentialsMessage}</div>
                {/* submit the login here */}
                <div className="button">
                  {" "}
                  <input
                    onClick={loginHandler}
                    type="submit"
                    value="Login"
                    className="submitButton"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
