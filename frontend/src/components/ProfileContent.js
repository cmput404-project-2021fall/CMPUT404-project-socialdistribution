import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image, Alert } from "react-bootstrap";
import Avatar from "../images/avatar.jpg";
import EditIcon from "../images/edit.png";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../components/Message";
import {
  getAuthorDetail,
  getUsers,
  checkFollowingStatus,
  followingUserCheck,
  sendFriendRequest,
  unfollowUser,
} from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import jQuery from "jquery";

function ProfileContent(props) {
  // update this page when view correctly returns author detail

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: myInfo } = userLogin;

  const userDetail = useSelector((state) => state.userDetail);
  const { userInfo } = userDetail;

  const checkFollowing = useSelector((state) => state.checkFollowing);
  const { error, response } = checkFollowing;

  const getUserFollower = useSelector((state) => state.getUserFollower);
  const { error: error2, response: response2 } = getUserFollower;

  const friendRequest = useSelector((state) => state.friendRequest);
  const { error: FRerror, response: FRresponse } = friendRequest;

  const unfollow = useSelector((state) => state.unfollow);
  const { error: unfollowError, response: unfollowResponse } = unfollow;

  const view_user_id =
    myInfo.author_id != props.view_user_id ? props.view_user_id : null;

  useEffect(() => {
    if (view_user_id == null) {
      dispatch(getAuthorDetail());
    } else {
      dispatch(getAuthorDetail(view_user_id));
      // check if param2 follows param1; use this to check if I follow them
      dispatch(checkFollowingStatus(view_user_id, myInfo.author_id));
      // check if param follows me
      dispatch(followingUserCheck(view_user_id));
    }
  }, []);

  // setup boolean to make things more organized
  const [meFollowThem, setMeFollowThem] = useState();
  const [theyFollowMe, setTheyFollowMe] = useState();

  if ((response || error) && (response2 || error2) && meFollowThem == null) {
    // do I follow them?
    if (error == "Follower Author Not Found") {
      setMeFollowThem(false);
    } else {
      setMeFollowThem(true);
    }
    // do they follow me?
    if (error2 == "Follower Author Not Found") {
      setTheyFollowMe(false);
    } else {
      setTheyFollowMe(true);
    }
  }

  const friendRequestHandler = () => {
    dispatch(sendFriendRequest(view_user_id, myInfo.author, userInfo));
  };

  const unfollowHandler = () => {
    dispatch(unfollowUser(view_user_id));
    window.location.reload();
  };

  return (
    <div className="m-5">
      <Alert
        className="alert-primary text-center p-2"
        style={{ width: "auto" }}
      >
        {view_user_id
          ? userInfo && userInfo.displayName + "'s Profile Page"
          : "My Profile Page"}
      </Alert>
      <Row className="justify-content-between">
        <Col md={8}>
          <Row className="justify-content-between">
            <Col md={6}>
              <Image src={Avatar} width="100%" className="mb-5" />
            </Col>
            {view_user_id ? null : (
              <Col md={2} className="d-flex flex-column mt-auto">
                <LinkContainer
                  to="/editprofile"
                  className="p-2 my-5"
                  style={{ backgroundColor: "orange" }}
                >
                  {/* visible if it's ur own profile */}
                  <Button>
                    <Image src={EditIcon} width="50%" />
                  </Button>
                </LinkContainer>
              </Col>
            )}
          </Row>
          <Alert>
            Display Name:&#160;&#160;
            <h5 className="d-inline">{userInfo ? userInfo.displayName : ""}</h5>
          </Alert>
          <Alert>
            Github:&#160;&#160;
            <h5 className="d-inline">{userInfo ? userInfo.github : ""}</h5>
          </Alert>
        </Col>
        {/* show or hide request buttons*/}
        {view_user_id ? (
          <Col md={2} className="text-center">
            {meFollowThem && theyFollowMe ? (
              <Alert className="text-center" variant="info">
                Friends
              </Alert>
            ) : meFollowThem && !theyFollowMe ? (
              <Alert className="text-center" variant="secondary">
                Following
              </Alert>
            ) : (
              ""
            )}
            {!meFollowThem && !theyFollowMe ? (
              <Button className="m-2" onClick={() => friendRequestHandler()}>
                Add Friend
              </Button>
            ) : meFollowThem ? (
              <Button
                className="m-2"
                variant="danger"
                onClick={() => unfollowHandler()}
              >
                Unfollow
              </Button>
            ) : (
              ""
            )}
          </Col>
        ) : null}
      </Row>
    </div>
  );
}

export default ProfileContent;
