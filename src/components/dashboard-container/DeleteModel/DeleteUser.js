import React from "react";
import { useDispatch } from "react-redux";
import { getUserList, deleteUserFromList } from "../../../store/action";
import "../UserList/UsersList.scss";

// delete operation for selected user
const DeleteUser = ({ setShowDeleteModal, deletingId }) => {
  const dispatch = useDispatch();
  // here after deleting getting remaining users list
  const getUpdatedUserList = () => {
    dispatch(getUserList());
  };
  // dispatching new update state deleting the user
  const deleteUserHandler = () => {
    dispatch(deleteUserFromList(deletingId, getUpdatedUserList));
  };
  return (
    <>
      <div className="adminContainer">
        <div id="myModal" className=" modalDelete">
          <div className="modalContent">
            <div>
              <h2>
                Are you sure, You want to delete it <small>!!</small>
              </h2>
              <div className="centerTheContext">
                {/* delete button */}
                <button
                  type="button"
                  onClick={() => {
                    deleteUserHandler();
                    setShowDeleteModal(false);
                  }}
                  className="actionButtons success"
                >
                  Yes
                </button>{" "}
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                  }}
                  className="actionButtons danger"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteUser;
