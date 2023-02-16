import {
  addUser,
  getAllUser, 
  getUserById,
  updateUserById,
  deleteUser,
} from "../service/user"; 
import { types } from "./types";

 
export const getUserInfomation = (id, navigateHandler, role) => {
  return async (dispatch) => {
    let result = [];

    result = await getUserById(id, role);

    dispatch({
      type: types.updateProfile,
      payload: result[0],
    });
    navigateHandler();
  };
};
export const getUserProfile = (id, role) => {
  return async (dispatch) => {
    let result = [];
    result = await getUserById(id, role);
    dispatch({
      type: types.dashboardProfile,
      payload: result[0],
    });
  };
};

export const dispatchUserCreation = (navigateHandler) => {
  return async (dispatch) => {
    dispatch({
      type: types.addUser,
    });
    navigateHandler();
  };
};
export const updateUserInfomation = (id, data, navigateHandler, role) => {
  return async (dispatch) => {
    let result = [];
    result = await updateUserById(id, { ...data, role });
    dispatch({
      type: types.updateProfile,
      payload: result.data,
    });
    navigateHandler();
  };
};

export const updateGetUserList = (id, data, navigateHandler, role) => {
  return async (dispatch) => {
    await updateUserById(id, { ...data, role });
    const usersList = await getAllUser();
    dispatch({
      type: types.addNewUserToStore,
      payload: usersList,
    });
    navigateHandler();
  };
};

export const addNewUserInfomation = (data, navigateHandler, role) => {
  return async (dispatch) => {
    await addUser({ ...data, role });
    const usersList = await getAllUser();
    dispatch({
      type: types.addNewUserToStore,
      payload: usersList,
    });
    navigateHandler();
  };
};

export const getUserList = () => {
  return async (dispatch) => {
    const usersList = await getAllUser();
    dispatch({
      type: types.addNewUserToStore,
      payload: [...usersList],
    });
  };
};

export const deleteUserFromList = (id, getUpdatedUserList) => {
  return async (dispatch) => {
    await deleteUser(id);
    getUpdatedUserList();
  };
};
