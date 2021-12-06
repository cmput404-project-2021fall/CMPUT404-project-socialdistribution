import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Stack, Alert } from "react-bootstrap";
import Headers from "../components/Headers";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/postActions";
import Posts from "../components/Posts";

const SearchResultPage = (props) => {


  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postList = useSelector((state) => state.postList);
  const { post } = postList;

  const getLiked = useSelector((state) => state.getLiked);
  const { error: getLikedError, response } = getLiked;
  const likedPosts = response ? response.items : [];

  const searchText = props.match.params.id;

  useEffect(() => {
    if (post == null) {
      dispatch(getPosts());
    }
  }, [dispatch, post]);

  const [message, setMessage] = useState("");
  const posts = post ? post.items : [];

  var searchResultPosts = [];

  if(searchText==" "){
    for( var i=0;i<posts.length;i++){ 
      searchResultPosts.push(posts[i]);
    }
  }else{
    for( var i=0;i<posts.length;i++){ 
      if ( (posts[i].title&&posts[i].title.indexOf(searchText) != -1) || (posts[i].content&&posts[i].content.indexOf(searchText) != -1)) {
        searchResultPosts.push(posts[i]);
      }
    }
  }
  return (
    <Container className="App fluid min-vh-100 min-vw-100 d-flex flex-column p-0">
      <Headers searchCategory={"post"}/>
      <Row className="flex-grow-1 m-0">
        <Col className="bg-secondary col-md-2 border">
          <SideBar />
        </Col>
        <Col>
                <div>
                <Alert className="m-1" variant="info">
                  Search results for posts
                </Alert>    
                </div>
                {searchResultPosts.map((p) => (
                  <Posts post={p} liked={likedPosts}/>
                ))}  
                              
        </Col>
      </Row>
    </Container>
  );
}

export default SearchResultPage;
