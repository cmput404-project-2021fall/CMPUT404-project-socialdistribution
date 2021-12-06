import React, { useState, useEffect, Component } from "react";
import { useHistory } from "react-router-dom";

import { Container, Nav, Row, Col, Card, Alert, Button } from "react-bootstrap";
import Headers from "../components/Headers";
import SideBar from "../components/SideBar";
import HomeContent from "../components/HomeContent";
import NotificationContent from "../components/NotificationContent";

import { getAllNotifications } from "../actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { authorFriendlist } from "../actions/userActions";
import { getPosts } from "../actions/postActions";

function NotificationPage() {
  const dispatch = useDispatch();
  let history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // redirect user to homepage if user is not logged in
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  // get notifications and display them by NotificationContent
  const getNotifications = useSelector((state) => state.getNotifications);
  const { error, response } = getNotifications;

  useEffect(() => {
    dispatch(getAllNotifications());
  }, []);

  return (
    <Container className="App fluid min-vh-100 min-vw-100 d-flex flex-column p-0">
      <Headers />
      <Row className="flex-grow-1 m-0">
        <Col className="bg-secondary col-md-2 border">
          <SideBar />
        </Col>
        <Col className="my-1">
          <Row className="m-1">
            <Alert variant="info">Notifications</Alert>
          </Row>

          <Row className="m-1 ">
            {response &&
              response.items.map((notif) => (
                <NotificationContent notification={notif} />
              ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default NotificationPage;
