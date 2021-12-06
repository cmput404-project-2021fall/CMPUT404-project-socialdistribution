import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Form,
  ListGroup,
  ListGroupItem,
  Nav,
  Alert,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Avatar from "../images/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  likePost,
  postingComment,
  getPosts,
} from "../actions/postActions";
import {
  checkFollowingStatus,
  followingUserCheck,
} from "../actions/userActions";
import Message from "../components/Message";
import { Callbacks } from "jquery";

// return a post of prop within card
function Posts(prop) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const postLike = useSelector((state) => state.postLike);
  const { error: postLikeError, reponse: postLikeResponse } = postLike;
  // post comments
  const postComment = useSelector((state) => state.postComment);
  const { error: postCommentError, reponse: postCommentResponse } = postComment;
  // show or reveal comment tab
  const [commentTab, setCommentTab] = useState(false);
  // states of share button
  const [share, setShare] = useState(false);
  // states of like button
  const [like, setLike] = useState(null);
  // number of likes
  const [numLikes, setNumLikes] = useState(prop ? prop.post.numLikes : 0);
  // comment content
  const [commentContent, setCommentContent] = useState("");
  // error message if there's error
  const [message, setMessage] = useState("");

  // check if followed
  const checkFollowing = useSelector((state) => state.checkFollowing);
  const { error: error1, response: response1 } = checkFollowing;

  const getUserFollower = useSelector((state) => state.getUserFollower);
  const { error: error2, response: response2 } = getUserFollower;

  // display liked if a post is already liked
  if (like == null) {
    prop.liked.forEach((element) => {
      if (element.object == prop.post.url) {
        setLike(true);
      }
    });
    if (like !== null) {
      setLike(false);
    }
  }

  // share functionalities have not been finished yet
  const sharePost = () => {
    if (/*your didn't share/create this post &&*/ !share) {
      setShare(true);
      // add a new Post to db
    }
  };

  var post_author_id = "";
  var post_id = "";
  // parse prop.post.id to get author id and post id
  let arr = prop.post.id.split("/");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "author") {
      post_author_id = arr[i + 1];
    } else if (arr[i] == "posts") {
      post_id = arr[i + 1];
    }
  }

  // comment tab
  const commentHandler = () => {
    if (!commentTab) {
      setCommentTab(true);
    } else {
      setCommentTab(false);
    }
  };

  // like a post
  const likeHandler = () => {
    setLike(true);
    dispatch(likePost(prop.post.url, post_author_id));
    setNumLikes(prop.post.numLikes);
  };

  // check if the post is writen by the user
  const isMyPost =
    prop != null && userInfo != null
      ? userInfo.author_id == post_author_id
        ? true
        : false
      : false;

  useEffect(() => {
    if (userInfo && !isMyPost) {
      // check if I am following view_user
      dispatch(checkFollowingStatus(post_author_id, userInfo.author_id));
      // check if param following me
      dispatch(followingUserCheck(post_author_id));
    }
  }, []);

  const [meFollowThem, setMeFollowThem] = useState();
  const [theyFollowMe, setTheyFollowMe] = useState();

  // get the following relation between the two users
  if ((response1 || error1) && (response2 || error2) && meFollowThem == null) {
    // do I follow them?
    if (error1 == "Follower Author Not Found") {
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

  const CommonMark = require("commonmark");
  const ReactRenderer = require("commonmark-react-renderer");

  const parser = new CommonMark.Parser();
  const renderer = new ReactRenderer();

  // get post content
  var content = prop ? prop.post.content : "";

  if (prop.post.contentType == "text/markdown") {
    const input = content;
    const ast = parser.parse(input);
    content = renderer.render(ast);
  }

  // delete a post
  const postDelete = useSelector((state) => state.postDelete);
  const { error, success, post } = postDelete;

  const deleteHandler = () => {
    dispatch(deletePost(post_id));
  };

  const user_id = prop.post.author.id.split("/").pop();

  const commentSubmitHandler = (e) => {
    e.preventDefault();
    if (commentContent == "") {
      setMessage("Enter your comment.");
    } else {
      // remove extra message banner
      setMessage();
      dispatch(postingComment(commentContent, post_author_id, post_id));
    }
  };

  // show friend posts only if it's friend only type and its author is user's friend
  if (
    (prop.post.visibility == "FRIENDS" && meFollowThem && theyFollowMe) ||
    prop.post.visibility != "FRIENDS" ||
    (userInfo && isMyPost)
  ) {
    return (
      <div className="m-5">
        {error && <Message variant="danger">{error}</Message>}
        {postLikeError && <Message variant="danger">{postLikeError}</Message>}
        <Card>
          <Card.Body>
            <div className="d-flex">
              <Card.Img
                className="m-1"
                src={Avatar}
                style={{ width: "6rem", height: "6rem" }}
              />
              <LinkContainer
                to={{
                  pathname: "/profile/" + post_author_id,
                  state: { user_id: user_id },
                }}
                style={{ fontSize: "1.5rem" }}
              >
                <Nav.Link className="m-2 justify-content-center">
                  {prop.post.author.displayName}
                </Nav.Link>
              </LinkContainer>
              {isMyPost ? (
                <DropdownButton
                  className="ms-auto mx-1"
                  id="bg-vertical-dropdown-1"
                >
                  <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={deleteHandler}>
                    Delete
                  </Dropdown.Item>
                </DropdownButton>
              ) : prop.post.visibility == "PRIVATE" ? (
                <Alert className="ms-auto mx-1 mb-5">Private Post</Alert>
              ) : (
                ""
              )}
            </div>
            <Card.Title className="m-3 text-center">
              <u>{prop.post.title}</u>
            </Card.Title>
            {prop.post && prop.post.contentType != "text/image" ? (
              <Card.Text className="mx-3 my-4" width="100%">
                {content}
              </Card.Text>
            ) : (
              <img
                width="100%"
                src={
                  prop.post.content
                    ? "data:image/png;base64" + prop.post.content
                    : null
                }
              ></img>
            )}

            <Row className="justify-content-between m-1">
              <Col className="d-flex align-items-center">
                Likes: {numLikes}&nbsp;&nbsp;&nbsp; Comments:{" "}
                {prop.post.commentsSrc.comments.length}
              </Col>
              <Col className="text-end">
                <Button
                  className={like || userInfo == null ? "m-1 disabled" : "m-1"}
                  style={{ width: "7rem" }}
                  variant="success"
                  onClick={() => likeHandler()}
                >
                  {like ? "Liked" : "Like"}
                </Button>
                <Button
                  className={
                    (userInfo && prop.post.visibility == "PUBLIC") ||
                    (userInfo && prop.post.author.id == userInfo.author.id) ||
                    prop.post.visibility == "PRIVATE"
                      ? "m-1"
                      : "m-1 disabled"
                  }
                  style={{ width: "7rem" }}
                  variant="info"
                  onClick={() => commentHandler()}
                >
                  Comment
                </Button>
                <Button
                  className="m-1"
                  style={{ width: "7rem" }}
                  variant="warning"
                  onClick={sharePost}
                >
                  {share ? "Shared" : "Share"}
                </Button>
              </Col>
            </Row>
            {commentTab ? (
              <div className="border rounded p-3">
                <ListGroup className="m-1">
                  {prop.post.commentsSrc.comments.map((comment) => (
                    <ListGroup.Item>
                      <div style={{ fontWeight: "bold", display: "inline" }}>
                        {comment.author.displayName}:
                      </div>
                      {"   "}
                      {comment.comment}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                {message && <Message variant="danger">{message}</Message>}
                <Form onSubmit={commentSubmitHandler}>
                  <Form.Group className="my-2" controlId="content">
                    <Form.Control
                      as="textarea"
                      rows={2}
                      onChange={(e) => setCommentContent(e.target.value)}
                    />
                  </Form.Group>
                  <div className="d-flex align-items-end justify-content-end px-5">
                    <Button className="btn" type="submit" variant="primary">
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            ) : (
              ""
            )}
          </Card.Body>
        </Card>
      </div>
    );
  } else {
    return "";
  }
}

export default Posts;
