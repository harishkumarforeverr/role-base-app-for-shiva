import React, { useState, useEffect } from "react";
import "../UserList/UsersList.scss";
import DeleteUser from "../DeleteModel/DeleteUser";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchUserCreation,
  getUserInfomation,
  getUserList,
} from "../../../store/action";
import Pagination from "../../common/Pagination";

// list of the users table format in admin dashboard
const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchUser, setSearchUser] = useState("");
  const [pagination, setPagination] = useState({ start: 0, end: 4 });
  const state = useSelector((state) => state);
  const { usersList } = state;
  const [users, setUsers] = useState(usersList);
  const [deletingId, setDeletingId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // navigate to update component
  const navigateHandler = () => {
    navigate(PATHS.update, { state: { updatingType: "user" } });
  };
  // here navigate to update component
  const navigateCreateHandler = () => {
    navigate(PATHS.create);
  };
  // dispatching the updated detils for user in userlist and navigate to update component
  const editProfileHandler = (profile) => {
    dispatch(getUserInfomation(profile.id, navigateHandler, profile.role));
  };
  //here we dispatching the new user details empty navigate to PATHS.create
  const addUserHandler = () => {
    dispatch(dispatchUserCreation(navigateCreateHandler));
  };
  //here dispatching the all the users with role as user
  useEffect(() => {
    dispatch(getUserList());
  }, []);
  //updating the state for list of the users
  useEffect(() => {
    setUsers(usersList);
  }, [usersList]);
  
  //here it is for search button functionality
  const searchHandler = (e) => {
    const newUserList = usersList.filter(
      (user) =>
        String(user.firstname)
          .toLowerCase()
          .includes(String(searchUser).toLowerCase()) ||
        String(user.lastname)
          .toLowerCase()
          .includes(String(searchUser).toLowerCase()) ||
        String(user.email)
          .toLowerCase()
          .includes(String(searchUser).toLowerCase()) ||
        String(user.mobile)
          .toLowerCase()
          .includes(String(searchUser).toLowerCase()) ||
        String(user.dob)
          .toLowerCase()
          .includes(String(searchUser).toLowerCase()) ||
        String(user.role)
          .toLowerCase()
          .includes(String(searchUser).toLowerCase()) ||
        String(user.address)
          .toLowerCase()
          .includes(String(searchUser).toLowerCase()) ||
        String(user.city)
          .toLowerCase()
          .includes(String(searchUser).toLowerCase()) ||
        String(user.state)
          .toLowerCase()
          .includes(String(searchUser).toLowerCase()) ||
        String(user.country)
          .toLowerCase()
          .includes(String(searchUser).toLowerCase()) ||
        String(user.pincode)
          .toLowerCase()
          .includes(String(searchUser).toLowerCase()) ||
        String(user.gender)
          .toLowerCase()
          .includes(String(searchUser).toLowerCase())
    );
    console.log("ssssssssssssss", newUserList, searchUser);
    setUsers(newUserList);
  };
  
  //update and take the input in searchbar filed
  const searchInputChangeHandler = (e) => {
    const { value } = e.target;
    if (value === "") {
      setUsers(usersList);
    } else setSearchUser(value);
  };
  return (
    <>
      <div className="adminContainer">
        <h2 className="title">Users List </h2>
        <div className="adminDashboardHeader">
          {/* this is the button for creating new user */}
          <div>
            <button
              type="button"
              onClick={addUserHandler}
              className="actionButtons primary"
            >
              Add User
            </button>
          </div>
          {/* this is for search */}
          <div className="globalSearch">
            <input
              onChange={searchInputChangeHandler}
              placeholder="Search Here"
            />
            <div>
              <button
                onClick={searchHandler}
                type="button"
                className="globalSearchButton success"
              >
                search
              </button>
            </div>
          </div>
        </div>

        {/* //users list of table mock data */}
        <ul className="responsiveTable">
          <li className="tableTitle">
            <div className="col col-1">FirstName</div>
            <div className="col col-2">LastName</div>
            <div className="col col-3">Email</div>
            <div className="col col-4">Mobile</div>
            <div className="col col-5">Gender</div>
            <div className="col col-6"> DOB</div>
            <div className="col col-7">Role</div>
            <div className="col col-8"> Address</div>
            <div className="col col-9">City </div>
            <div className="col col-10"> State</div>
            <div className="col col-11">Country </div>
            <div className="col col-12"> Pincode</div>
            <div className="col col-13"> </div>
          </li>
          {/* here we aranage the list of users with updated state and arrange pagination aswell */}
          {users.slice(pagination.start, pagination.end).map((profile) => {
            return (
              <li className="tableRow">
                <div className="col col-1">{profile?.firstname}</div>
                <div className="col col-2">{profile?.lastname}</div>
                <div className="col col-3">{profile?.email}</div>
                <div className="col col-4">{profile?.mobile}</div>
                <div className="col col-5">{profile?.gender}</div>
                <div className="col col-6">{profile?.dob}</div>
                <div className="col col-7">{profile?.role}</div>
                <div className="col col-8">{profile?.address}</div>
                <div className="col col-9">{profile?.city}</div>
                <div className="col col-10">{profile?.state}</div>
                <div className="col col-11">{profile?.country}</div>
                <div className="col col-12">{profile?.pincode}</div>
                <div
                  style={{
                    display: "flex",
                  }}
                  className="col col-13"
                  data-label=""
                >
                  <i className="fa-solid fa-user"></i>
                  {/* this is for updating the user details in userlist */}
                  <button
                    type="button"
                    onClick={() => {
                      editProfileHandler(profile);
                    }}
                    className="actionButtons primary"
                  >
                    Edit
                  </button>{" "}
                  {/* this is for delete operation */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteModal(true);
                      setDeletingId(profile.id);
                    }}
                    className="actionButtons danger"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        {/* //pagination */}
        <div className="pagination">
          <Pagination
            recordPerPage={4}
            length={users.length}
            setPagination={setPagination}
          />
        </div>
      </div>
      {/* // showing DeleteUser Model */}
      {showDeleteModal && (
        <DeleteUser
          deletingId={deletingId}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </>
  );
};

export default UsersList;
