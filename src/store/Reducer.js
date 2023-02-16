
import { INITIAL_STORE_STATE } from "../utils/constant";
import { types } from "./types";

 function rootReducer(state = INITIAL_STORE_STATE, action) {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        ...action.payload,
      };
    case types.updateProfile:
      return {
        ...state,
        profile: action.payload,
        updating: true,
      };
    case types.dashboardProfile:
      return {
        ...state,
        dashboardProfile: action.payload,
      };
    case types.addUser:
      return {
        ...state,
        profile: INITIAL_STORE_STATE.profile,
        updating: false,
      };
    case types.addNewUserToStore:
      return {
        ...state,
        usersList: action.payload,
      };
    //
    default:
      return state;
  }
}

export default rootReducer;