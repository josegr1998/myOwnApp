import { combineReducers } from "redux";
import { PostReducer } from "./PostReducer";
import { UserReducer } from "./UserReducer";

const reducers = combineReducers({
  posts: PostReducer,
  users: UserReducer,
});
export default reducers;
