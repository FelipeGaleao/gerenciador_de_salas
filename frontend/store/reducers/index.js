import { combineReducers } from "redux";
import userReducer from "../../store/reducers/users/";

export default combineReducers({
  user: userReducer,
});