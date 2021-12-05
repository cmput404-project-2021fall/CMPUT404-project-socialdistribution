import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userDetailEditReducer,
  userDetailReducer,
  userFriendlistReducer,
  userLoginReducer,
  userRegisterReducer,
  getUserFollowerReducer,
  checkFollowingReducer,
  friendRequestReducer,
  followerListReducer,
  userListReducer,
  githubEventReducer,
  unfollowReducer,
} from "./reducers/userReducers";
import {
  postCreateReducer,
  postDeleteReducer,
  postListReducer,
  postCommentReducer,
  postLikeReducer,
  getCommentsReducer,
  getLikedReducer,
  getNotificationsReducer,
} from "./reducers/postReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailReducer,
  userDetailEdit: userDetailEditReducer,
  userFriendlist: userFriendlistReducer,
  postCreate: postCreateReducer,
  postList: postListReducer,
  postDelete: postDeleteReducer,
  postComment: postCommentReducer,
  postLike: postLikeReducer,
  getComments: getCommentsReducer,
  getLiked: getLikedReducer,
  getUserFollower: getUserFollowerReducer,
  checkFollowing: checkFollowingReducer,
  friendRequest: friendRequestReducer,
  followerList: followerListReducer,
  getNotifications: getNotificationsReducer,
  userList: userListReducer,
  githubEvent: githubEventReducer,
  unfollow: unfollowReducer,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
