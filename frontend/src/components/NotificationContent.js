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
import { authorFriendlist, acceptFriendRequest } from "../actions/userActions";
import Message from "./Message";
import { useHistory } from "react-router-dom";

function NotificationContent(prop) {
  const dispatch = useDispatch();
  const history = useHistory();

  const acceptFriend = useSelector((state) => state.acceptFriend);
  const { error, response } = acceptFriend;

  const acceptRquestHandler = () => {
    let requester_id = parseId(prop);
    dispatch(acceptFriendRequest(requester_id));
    response && window.location.reload();
  };

  const parseId = (p) => {
    let idList = p.notification.actor.id.split("/");
    let id = "";
    for (let i = 0; i < idList.length; i++) {
      if (idList[i] == "author") {
        id = idList[i + 1];
        break;
      }
    }
    return id;
  };

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
            <Button
              className="m-1"
              variant="success"
              onClick={() => acceptRquestHandler()}
            >
              Accept
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
