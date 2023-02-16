import React, { useEffect } from "react";
import "../Profile/Profile.scss";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, getUserInfomation } from "../../../store/action";

//admin and user dashboard profile
const Profile = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { role, dashboardProfile } = state;
  const dispatch = useDispatch();
  // after updating new data we navigate to update component with string
  const navigateHandler = () => {
    navigate(PATHS.update, { state: { updatingType: "dashboardProfile" } });
  };

  //here after edit in profile we dispatching the updated data
  const EditUserDeatilesHandler = (id) => {
    dispatch(getUserInfomation(id, navigateHandler, role));
  };
  // first getting corresponding user or admin data
  useEffect(() => {
    dispatch(getUserProfile(dashboardProfile?.id, role));
  }, []);
  return (
    <div>
      <div className="userContainer">
        {/* based on the role dashboards changes here */}
        <div>
          <h2 className="title">Welcome {dashboardProfile?.firstname}</h2>

          <div className="editButtonStyle">
            {" "}
            <button
              type="button"
              onClick={() => {
                EditUserDeatilesHandler(dashboardProfile?.id);
              }}
              className="editButton primary"
            >
              Edit
            </button>
          </div>
        </div>
        <ul className="responsiveTable">
          <li className="tableRow">
            <div className="dataContainer">
              {" "}
              <div className="col headers">FirstName</div>
              <div className="col  details">{dashboardProfile?.firstname}</div>
            </div>
            <div className="dataContainer">
              {" "}
              <div className="col headers">LastName</div>
              <div className="col  details">{dashboardProfile?.lastname}</div>
            </div>
            <div className="dataContainer">
              {" "}
              <div className="col headers">Role</div>
              <div className="col  details">{dashboardProfile?.role}</div>
            </div>
            <div className="dataContainer">
              {" "}
              <div className="col headers">Mobile</div>
              <div className="col  details">{dashboardProfile?.mobile}</div>
            </div>
            <div className="dataContainer">
              {" "}
              <div className="col headers"> Address</div>
              <div className="col  details">{dashboardProfile?.address}</div>
            </div>
            <div className="dataContainer">
              {" "}
              <div className="col headers">Gender</div>
              <div className="col  details">{dashboardProfile?.gender}</div>
            </div>
            <div className="dataContainer">
              {" "}
              <div className="col headers"> DOB</div>
              <div className="col  details">{dashboardProfile?.dob}</div>
            </div>
            <div className="dataContainer">
              {" "}
              <div className="col headers"> Email</div>
              <div className="col  details">{dashboardProfile?.email}</div>
            </div>
            <div className="dataContainer">
              {" "}
              <div className="col headers">City </div>
              <div className="col  details">{dashboardProfile?.city}</div>
            </div>
            <div className="dataContainer">
              {" "}
              <div className="col headers"> State</div>
              <div className="col  details">{dashboardProfile?.state}</div>
            </div>
            <div className="dataContainer">
              {" "}
              <div className="col headers">Country </div>
              <div className="col  details">{dashboardProfile?.country}</div>
            </div>
            <div className="dataContainer">
              {" "}
              <div className="col headers"> Pincode</div>
              <div className="col details">{dashboardProfile?.pincode}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
