import React, { useState, useEffect } from "react";
import "../UserForm/UserForm.scss";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmationModel from "../ConfirmationModel/ConfirmationModel";
import { REGIONS, PATHS } from "../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewUserInfomation,
  updateUserInfomation,
  updateGetUserList,
} from "../../../store/action";
import {
  handleChangeEmailUtils,
  handleChangePasswordUtils,
  regexEmail,
} from "../../../utils/validation";
import {
  getdecrptedPassword,
  getEncryptedPassword,
} from "../../../utils/encrypt-password";
const initialErrorState = {
  confirmPasswordMessage: "",
  firstname: false,
  lastname: false,
  mobile: false,
  address: false,
  gender: false,
  dob: false,
  email: false,
  city: false,
  pincode: false,
  state: false,
  country: false,
  password: false,
  confirmPassword: false,
};

const stateList = [];
const countryList = [];
// here we updating the admin and user details , creating the new user
const UpdateUser = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [error, setError] = useState(initialErrorState);
  let [formData, setFormData] = useState();
  const [selectedCountry, setselectedCountry] = useState("");
  const [show, setShow] = useState(false);
  const { profile, updating } = useSelector((state) => state);
  //here we continuosly update the state with updated data if user or admin change the details 
  //with decrypted password and country
  useEffect(() => {
    const { password, confirmPassword, country } = profile;
    const updatedprofile = {
      ...profile,
      password: password === "" ? "" : getdecrptedPassword(password),
      confirmPassword:
        password === "" ? "" : getdecrptedPassword(confirmPassword),
    };
    setselectedCountry(country);
    setFormData(updatedprofile);
  }, [profile, updating]);
  const navigateHandler = () => {
    setShow(true);
    setError(initialErrorState);
    setTimeout(() => {
      setShow(false);
      navigate(-1);
    }, 2000);
  };
  const navigateHandlerToUserList = () => {
    setShow(true);
    setError(initialErrorState);
    setTimeout(() => {
      setShow(false);
      navigate(PATHS.usersList);
    }, 2000);
  };
  const dispatch = useDispatch();

  const emailErrorHandler = (name, bool, emailMessage) => {
    setError((prev) => ({
      ...prev,
      [name]: bool,
      emailMessage,
    }));
  };
  const passwordErrorHandler = (name, bool, passwordMessage) => {
    setError((prev) => ({
      ...prev,
      [name]: bool,
      passwordMessage,
    }));
  };
  const errorHandler = (name, bool, msg) => {
    const errorMessage = `${name}Message`;
    setError((prev) => ({
      ...prev,
      [name]: bool,
      [errorMessage]: msg,
    }));
  };
  const emailChangeHandler = (e) => {
    handleChangeEmailUtils(e, setFormData, emailErrorHandler);
  };
  const passwordChangeHandler = (e) => {
    handleChangePasswordUtils(e, setFormData, passwordErrorHandler);
  };
  const handleChangePasswordConfirm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value === "") {
      errorHandler(name, true, "Field Is Mandatory");
    } else if (value) {
      if (value !== formData.password) {
        errorHandler(name, true, "Password Doesn't Match");
      } else {
        errorHandler(name, false, "");
      }
    }
  };
  const zipCodeHandler = (e) => {
    const { name, value } = e.target;
    if (value.length > 6) return;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value === "") {
      errorHandler(name, true, "Field Is Mandatory");
    } else if (value) {
      if (value.length < 6) {
        errorHandler(name, true, "Zipcode Must Be Min 6 Digits");
      } else {
        errorHandler(name, false, "");
      }
    }
  };
  const mobileNumberChangeHandler = (e) => {
    const { name, value } = e.target;
    if (value.length > 10) return;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value === "") {
      errorHandler(name, true, "Field Is Mandatory");
    } else if (value) {
      if (value.length < 10) {
        errorHandler(name, true, "Mobile Number Min In 10 Digits");
      } else {
        errorHandler(name, false, "");
      }
    }
  };
  // updating the formData which user entered values here
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value === "") {
      errorHandler(name, true, "Field Is Mandatory");
    } else if (value) {
      if (value.length < 3) {
        errorHandler(name, true, `${name} Must Be Min 3 Digits`);
      } else {
        errorHandler(name, false, "");
      }
    }
  };
  const countryStateHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value === "") {
      errorHandler(name, true, "Field Is Mandatory");
    } else if (value) {
      errorHandler(name, false, "");
    }
  };
  const countryHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value === "") {
      setselectedCountry("");
      errorHandler(name, true, "Field Is Mandatory");
    } else if (value) {
      setselectedCountry(value);
      errorHandler(name, false, "");
    }
  };
  // updating the formData which user entered values here
  const genderHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value === "") {
      errorHandler(name, true, "Field Is Mandatory");
    } else if (value) {
      errorHandler(name, false, "");
    }
  };

  // input validation
  const submitHandler = (e) => {
    e.preventDefault();
    const ErrorObj = {};
    for (const property in formData) {
      if (property) {
        ErrorObj[property] = false;
        if (property === "firstname") {
          if (formData[property].length < 3) {
            ErrorObj[property] = true;
            errorHandler(property, true, "Field Contain Min 3 Letters");
          }
        }
        if (property === "lastname") {
          if (formData[property].length < 3) {
            ErrorObj[property] = true;
            errorHandler(property, true, "Field Contain Min 3 Letters");
          }
        }
        if (property === "mobile") {
          if (formData[property].length < 10) {
            ErrorObj[property] = true;
            errorHandler(property, true, "Field Is Mandatory");
          }
        }
        if (property === "address") {
          if (formData[property].length < 6) {
            ErrorObj[property] = true;
            errorHandler(property, true, "Field Contain Min 6 Letters");
          }
        }
        if (property === "gender") {
          if (formData[property] === "") {
            ErrorObj[property] = true;
            errorHandler(property, true, "Field Is Mandatory");
          }
        }
        if (property === "dob") {
          if (!formData[property]) {
            ErrorObj[property] = true;
            errorHandler(property, true, "Field Is Mandatory");
          }
        }
        if (property === "email") {
          if (!regexEmail.test(formData[property])) {
            ErrorObj[property] = true;
            errorHandler(property, true, "Please Enter Valid Email");
          }
        }
        if (property === "city") {
          if (formData[property].length < 3) {
            ErrorObj[property] = true;
            errorHandler(property, true, "Field Contain Min 6 Letters");
          }
        }
        if (property === "pincode") {
          if (formData[property].length < 6) {
            ErrorObj[property] = true;
            errorHandler(property, true, "Field Contain Min 6 Letters");
          }
        }
        if (property === "state") {
          if (!formData[property]) {
            ErrorObj[property] = true;
            errorHandler(property, true, "Field Is Mandatory");
          }
        }
        if (property === "country") {
          if (!formData[property]) {
            ErrorObj[property] = true;
            errorHandler(property, true, "Field Is Mandatory");
          }
        }
        if (property === "password") {
          if (formData[property].length <= 5) {
            ErrorObj[property] = true;
            errorHandler(
              property,
              true,
              "This Field is Required Min 5 Characters",
              "passwordMessage"
            );
          }
        }
        if (property === "confirmPassword") {
          if (formData[property] !== formData.password) {
            ErrorObj[property] = true;
            errorHandler(property, true, "Incorrect Password");
          }
        }
      }
    }
    //dispatching the some actions here for update details
    //admin , user , userlist and creating the new user
    const index = Object.values(ErrorObj).findIndex(
      (argObj) => argObj === true
    );
    if (index >= 0) {
      setError((prev) => ({
        ...prev,
        ...ErrorObj,
      }));
    } else {
      let updatedFormdata = null;
      // formData.password and formData.confirmPassword
      updatedFormdata = {
        ...formData,
        email: String(formData.email).toLocaleLowerCase(),
        password: getEncryptedPassword(formData.password),
        confirmPassword: getEncryptedPassword(formData.confirmPassword),
      };
      if (updating) {
        if (state.updatingType === "dashboardProfile") {
          dispatch(
            updateUserInfomation(
              profile.id,
              updatedFormdata,
              navigateHandler,
              profile.role
            )
          );
        } else if (state.updatingType === "user") {
          dispatch(
            updateGetUserList(
              profile.id,
              updatedFormdata,
              navigateHandlerToUserList,
              profile.role
            )
          );
        }
      } else {
        dispatch(
          addNewUserInfomation(updatedFormdata, navigateHandler, "user")
        );
      }
    }
  };

  return (
    <div>
      <div className="updateUserWrapper">
        <form action="" className="updateUserForm">
          {/* on condition basis dynamically change the title  */}
          <h2> {updating ? "Update Details" : "Add New User"}</h2>
          <div className="updateUserFields">
            {/* these are the inputfields with prefilled data(exxisitng data or updated data) */}
            <div className="inputFiledsGroup">
              <input
                onChange={inputChangeHandler}
                type="text"
                name="firstname"
                value={formData?.firstname}
                id="firstname"
              />
              <label htmlFor="firstname">First Name</label>
              {error.firstname && (
                <p className="validationErrors">{error.firstnameMessage} </p>
              )}
            </div>
            <div className="inputFiledsGroup">
              <input
                onChange={inputChangeHandler}
                type="text"
                name="lastname"
                value={formData?.lastname}
                id="lastname"
              />
              <label htmlFor="lastname">Last Name</label>
              {error.lastname && (
                <p className="validationErrors">{error.lastnameMessage} </p>
              )}
            </div>
            <div className="inputFiledsGroup">
              <input
                onChange={passwordChangeHandler}
                type="password"
                name="password"
                value={formData?.password}
                id="password"
              />
              <label htmlFor="password">password</label>
              {error.password && (
                <p className="validationErrors">{error.passwordMessage} </p>
              )}
            </div>
            <div className="inputFiledsGroup">
              <input
                onChange={handleChangePasswordConfirm}
                type="password"
                name="confirmPassword"
                value={formData?.confirmPassword}
                id="confirmPassword"
              />
              <label htmlFor="confirmPassword">confirm Password</label>
              {error.confirmPassword && (
                <p className="validationErrors">
                  {error.confirmPasswordMessage}{" "}
                </p>
              )}
            </div>
            <div className="inputFiledsGroup">
              <input
                onChange={mobileNumberChangeHandler}
                type="number"
                name="mobile"
                value={formData?.mobile}
                id="mobile"
              />
              <label htmlFor="mobile">Mobile</label>{" "}
              {error.mobile && (
                <p className="validationErrors">{error.mobileMessage} </p>
              )}
            </div>{" "}
            <div className="inputFiledsGroup">
              <input
                onChange={inputChangeHandler}
                type="text"
                name="address"
                value={formData?.address}
                id="address"
              />
              <label htmlFor="address">Address</label>{" "}
              {error.address && (
                <p className="validationErrors">{error.addressMessage} </p>
              )}
            </div>
            <div>
              <div className="displayColumn">
                <label htmlFor="gender">Gender</label>
                <select
                  onChange={genderHandler}
                  name="gender"
                  value={formData?.gender}
                  id="gender"
                >
                  <option value="">select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {error.gender && (
                  <p className="optionsValidation">{error.genderMessage} </p>
                )}
              </div>
            </div>
            <div
              style={{
                marginTop: "-1.2rem",
              }}
              className="inputFiledsGroup"
            >
              <div>DOB</div>
              <input
                onChange={inputChangeHandler}
                type="date"
                name="dob"
                value={formData?.dob}
                id="dob"
              />
              {error.dob && (
                <p className="validationErrors">{error.dobMessage} </p>
              )}
            </div>{" "}
            <div className="inputFiledsGroup">
              <input
                onChange={emailChangeHandler}
                type="text"
                name="email"
                value={formData?.email}
                id="email"
              />
              <label htmlFor="email">Email</label>{" "}
              {error.email && (
                <p className="validationErrors">{error.emailMessage} </p>
              )}
            </div>
            <div className="inputFiledsGroup">
              <input
                onChange={inputChangeHandler}
                type="text"
                name="city"
                value={formData?.city}
                id="city"
              />
              <label htmlFor="city">City</label>{" "}
              {error.city && (
                <p className="validationErrors">{error.cityMessage} </p>
              )}
            </div>
            <div className="inputFiledsGroup">
              <input
                onChange={zipCodeHandler}
                type="number"
                name="pincode"
                min={6}
                max={6}
                value={formData?.pincode}
                id="pincode"
              />
              <label htmlFor="pincode">Pincode</label>{" "}
              {error.pincode && (
                <p className="validationErrors">{error.pincodeMessage} </p>
              )}
            </div>
            <div>
              <div className="displayColumn">
                <label htmlFor="country">Country</label>
                <select
                  onChange={countryHandler}
                  type="text"
                  name="country"
                  value={formData?.country}
                  id="country"
                >
                  <option value="">select country</option>
                  {Object.keys(REGIONS).map((name) => {
                    return <option value={name}>{name}</option>;
                  })}
                </select>
                {error.country && (
                  <p className="optionsValidation">{error.countryMessage} </p>
                )}
              </div>
            </div>
            <div>
              <div className="displayColumn">
                <label htmlFor="state">State</label>{" "}
                <select
                  onChange={countryStateHandler}
                  type="text"
                  name="state"
                  value={formData?.state}
                  id="state"
                >
                  <option value="">
                    {selectedCountry == ""
                      ? "select country 1st"
                      : "select state"}
                  </option>

                  {/* {stateList.map(({ name }) => {
                    return <option value={name}>{name}</option>;
                  })} */}
                  {/* REgioj */}
                  {REGIONS[selectedCountry]?.map((name) => {
                    return <option value={name}>{name}</option>;
                  })}
                  {}
                </select>
                {error.state && (
                  <p className="optionsValidation">{error.stateMessage} </p>
                )}
              </div>
            </div>
          </div>
          <br />
          {/* this is the submit button for update and adding           */}
          <div className="displayButtons">
            <div className="buttons">
              {" "}
              <input
                onClick={submitHandler}
                type="submit"
                value={updating ? "UPDATE" : "ADD"}
                className="actionButtons"
              />
              {/* this is for cancel button */}
              <input
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
                value="Cancel"
                className="actionButtons"
              />
            </div>
          </div>
        </form>
      </div>
      {/* // after adding all fields it will redirect to ConfirmationModel updating the fields */}
      {show && <ConfirmationModel updating={updating} />}
    </div>
  );
};

export default UpdateUser;
