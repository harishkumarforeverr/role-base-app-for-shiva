import React from "react";
import "../UserList/UsersList.scss";
import "./ConfirmationModel.scss";

// here we display confirmation message to user
const ConfirmationModel = ({ updating }) => {
  return (
    <>
      <div className="adminContainer">
        <div id="myModal" className=" modalContentConfirmationContainer">
          <div className="modalContentConfirmation">
            <div className="modalContent">
              <h3>
                {updating ? "updated" : "Added"} successfully <small>!!</small>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModel;
