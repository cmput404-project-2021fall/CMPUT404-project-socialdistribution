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
import Message from "../components/Message";
import { Callbacks } from "jquery";
import { getGithubEvent } from "../actions/userActions";

// return a post of prop within card
function Posts(prop) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const postLike = useSelector((state) => state.postLike);
  const { error: postLikeError, reponse: postLikeResponse } = postLike;
  const postComment = useSelector((state) => state.postComment);
  const { error: postCommentError, reponse: postCommentResponse } = postComment;

  const [commentTab, setCommentTab] = useState(false);
  const [share, setShare] = useState(false);
  const [like, setLike] = useState(null);
  const [numLikes, setNumLikes] = useState(prop ? prop.post.numLikes : 0);
  const [commentContent, setCommentContent] = useState("");
  const [message, setMessage] = useState("");

  // did I like this post already?
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

  const commentHandler = () => {
    if (!commentTab) {
      setCommentTab(true);
    } else {
      setCommentTab(false);
    }
  };

  const likeHandler = () => {
    setLike(true);
    dispatch(likePost(prop.post.url, post_author_id));
    setNumLikes(prop.post.numLikes);
  };

  // is this post written by me?
  const isMyPost =
    prop != null && userInfo != null
      ? userInfo.author_id == post_author_id
        ? true
        : false
      : false;

  const CommonMark = require("commonmark");
  const ReactRenderer = require("commonmark-react-renderer");

  const parser = new CommonMark.Parser();
  const renderer = new ReactRenderer();

  var content = prop ? prop.post.content : "";

  if (prop.post.contentType == "text/markdown") {
    const input = content;
    const ast = parser.parse(input);
    content = renderer.render(ast);
  }

  const postDelete = useSelector((state) => state.postDelete);
  const { error, success, post } = postDelete;

  const deleteHandler = () => {
    dispatch(deletePost(post_id));
    window.location.reload();
  };

  const user_id = prop.post.author.id.split("/").pop();

  // console.log("debug");
  // const githubEvent = useSelector((state) => state.githubEvent);
  // const { erro, respons } = githubEvent;
  // const githubEvent = null;
  // useEffect(() => {
  //   dispatch(getGithubEvent());
  // }, [githubEvent]);
  const githubEvent = dispatch(getGithubEvent()); // TODO


  const commentSubmitHandler = (e) => {
    e.preventDefault();
    if (commentContent == "") {
      setMessage("Enter your comment.");
    } else {
      // remove extra message banner
      setMessage();
      dispatch(postingComment(commentContent, post_author_id, post_id));
      dispatch(getPosts());
    }
  };

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
          <Card.Text className="mx-3 my-4">{content}</Card.Text>
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
}

export default Posts;
