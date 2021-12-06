import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Image,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Avatar from "../images/avatar.jpg";

function FollowerItem(prop) {
  
  // get follower info passed in
  var author_id = "";
  let arr = prop.follower.id.split("/");

  // get the id from follower info
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "author") {
      author_id = arr[i + 1];
    }
  }

  return (
    <Col md="auto">
      <div className="item">
        <Card
          className="m-1"
          style={{ border: "groove", borderRadius: "1rem" }}
        >
          <Card.Body className="text-center">
            <Card.Img
              src={Avatar}
              className="m-1"
              style={{ width: "6rem", height: "6rem" }}
            />

            <Card.Title className="m-1">{prop.follower.displayName}</Card.Title>
            <LinkContainer
              to={{
                pathname: "/profile/" + author_id,
              }}
            >
              <Button className="m-1" variant="success">
                View Profile
              </Button>
            </LinkContainer>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
}

export default FollowerItem;
