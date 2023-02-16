import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

// Create a Redux store holding the state of  app.
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
