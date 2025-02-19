import React, { useState, useEffect } from "react";
import { Form, Button, Stack, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { authorFriendlist } from "../actions/userActions";
import { createPost, postReset } from "../actions/postActions";
import { useHistory } from "react-router-dom";
import { render } from "@testing-library/react";


// form page for making a new post; redirect user to login if they are not logged in
function PostForm() {
  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState("text/plain");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [file, setFile] = useState("");
  const [cate, setCate] = useState("text/plain");
  

  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  // create the post
  const postCreate = useSelector((state) => state.postCreate);
  const { error, success, post } = postCreate;

  // get the users friend list
  const userFriendlist = useSelector((state) => state.userFriendlist);
  const { error: friendError, userFriends } = userFriendlist;

  useEffect(() => {
    if (userFriends == null) {
      dispatch(authorFriendlist());
    }
  }, [dispatch, userFriends]);

  // private post receiving friend's ID; if user only has 1 friend, set it to that 1 friend
  const [privateReceiver, setPrivateReceiver] = useState(
    userFriends != null
      ? userFriends.items.length == 1
        ? userFriends.items.id
        : ""
      : ""
  );

  // encode the image to base 64 and dispatch when an image is uploaded
  const encodeFileBase64 = () => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        dispatch(createPost(title, Base64, contentType, visibility));

      };
      reader.onerror = (error) => {
        console.log("error: ", error);
      };
    }else{
      setMessage("Please upload an image");
    }
  }; 

  const submitHandler = (e) => {
    e.preventDefault();
    // if the user upload an image and the title is not empty, encode it
    if(cate=="text/image"){
      if(title == ""){
        setMessage("Please fill in title to make a post.");
      }
      else{
        encodeFileBase64();
      }
    }
    else{
    
    // if the user make a plain text post, just create a post and dispatch
    if (title == "" || content == "") {
      setMessage("Please fill in title and content to make a post.");
    } else {
      // remove extra message banner
      setMessage();
      dispatch(createPost(title, content, contentType, visibility));
    }}
  };

  const fileHandler = (e) => {
    setFile(e.target.files[0])
  }
  const renderDiff = () => {
    console.log(cate);
  }

  let history = useHistory();

  useEffect(() => {
    // redirect user to homepage if post creation is successful
    if (success) {
      history.push("/");
      window.location.reload();
      dispatch(postReset());
    }
  }, [history, dispatch, success]);
  
  
  return (
    <div>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      <Form
        className="justfiy-content-center align-center"
        onSubmit={submitHandler}
      >
        <Form.Group className="m-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="title"
            placeholder="Title here"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
          
        <Form.Group className="m-3">
          <Form.Label>Content Type</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => {
              setContentType(e.target.value);
              setCate(e.target.value);
            }}
          >
            <option value="text/plain">Plain Text</option>
            <option value="text/markdown">CommonMark</option>
            <option value="text/image">Image</option>
          </Form.Control>
        </Form.Group>
  
        <Form.Group className="m-3">
          <Form.Label>Visibility</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => {
              setVisibility(e.target.value);
            }}
          >
            <option value="PUBLIC">Public Post</option>
            {/* Should change to friends later */}
            <option value="FRIENDS">Friends Post</option>
            <option value="PRIVATE">Private Post</option>
          </Form.Control>
          {visibility == "PRIVATE" ? (
            <Form.Control
              as="select"
              size="sm"
              className="my-1"
              onChange={(e) => {
                setPrivateReceiver(e.target.value);
              }}
            >
              {userFriends.items.map((friend) => (
                <option value={friend.id}>{friend.displayName}</option>
              ))}
            </Form.Control>
          ) : (
            ""
          )}
        </Form.Group>
        <Form.Group className="m-3" controlId="content">
          {cate!="text/image" &&
            <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={(e) => setContent(e.target.value)}
            />
            </Form.Group>
          }
          {cate=="text/image" &&
            <Stack>
            <Form.Label>Image</Form.Label>
            <input type="file" class="form-control" accept="image/*" onChange={fileHandler}></input>
            <img width="300" src={file? URL.createObjectURL(file):null}></img>
          </Stack>
          }

        </Form.Group>
        <div className="d-flex align-items-end justify-content-end px-5">
          <Button className="btn" type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default PostForm;
