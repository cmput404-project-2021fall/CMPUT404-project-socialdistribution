import React, { useState, useEffect, Component } from "react";
import {
  Container,
  Nav,
  Row,
  Col,
  Card,
  Alert,
  Button,
  LinkContainer,
} from "react-bootstrap";
import Posts from "./Posts";
import { useDispatch, useSelector } from "react-redux";
import { authorFriendlist } from "../actions/userActions";
import Message from "./Message";
import { getPosts } from "../actions/postActions";

function NotificationContent(prop) {
  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { error, loading, userInfo } = userDetail;

  useEffect(() => {
    if (userInfo == null) {
      dispatch(authorFriendlist());
    }
  }, [dispatch, userInfo]);

  // TODO: this should be user request passed in
  console.log(prop.notification);

  // handleClick() {
  //     this.setState(prevState => ({
  //       isToggleOn: !prevState.isToggleOn
  //     }));
  // }

  return (
    <Col md={6}>
      <Card className="m-1">
        <Card.Body className="text-center">
          <div className="d-flex">
            <Card.Title></Card.Title>
            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          </div>

          {prop.notification.type == "post" ? (
            <Alert variant="primary">
              {prop.notification.author.displayName} sent you a post titled "
              {prop.notification.title}"
            </Alert>
          ) : (
            <Alert variant="primary">{prop.notification.summary}</Alert>
          )}

          {prop.notification.type == "Follow" ? (
            <Button className="m-1" variant="success">
              Accept
            </Button>
          ) : (
            ""
          )}
          {prop.notification.type == "Follow" ? (
            <Button className="m-1" variant="danger">
              Decline
            </Button>
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}
export default NotificationContent;
