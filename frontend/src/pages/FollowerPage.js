import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Button,
  LinkContainer,
} from "react-bootstrap";
import Headers from "../components/Headers";
import SideBar from "../components/SideBar";
import FollowerItem from "../components/FollowerItem";
import { useDispatch, useSelector } from "react-redux";
import { getFollowerList } from "../actions/userActions";

function NotificationPage() {
  const dispatch = useDispatch();
  const followerList = useSelector((state) => state.followerList);
  const { error, response } = followerList;
  console.log(followerList);

  useEffect(() => {
    dispatch(getFollowerList());
  }, []);

  return (
    <Container className="App fluid min-vh-100 min-vw-100 d-flex flex-column p-0">
      <Headers />
      <Row className="flex-grow-1 m-0">
        <Col className="bg-secondary col-md-2 border">
          <SideBar />
        </Col>

        <Col className="my-2">
          <Row className="m-1">
            <Alert variant="info">My Followers/ Friends</Alert>
          </Row>
          {response &&
            response.items.map((f) => (
              <Row className="m-1">
                <FollowerItem follower={f} />
              </Row>
            ))}
        </Col>
      </Row>
    </Container>
  );
}

export default NotificationPage;
