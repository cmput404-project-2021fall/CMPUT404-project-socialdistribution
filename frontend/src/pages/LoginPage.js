import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import Headers from "../components/Headers";
import Message from "../components/Message";
import { login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import jQuery from "jquery";

function LoginPage({ location, history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, loggedUsername } = userLogin;

  // reference: https://stackoverflow.com/a/50735730
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  var csrftoken = getCookie("csrftoken");

  useEffect(() => {
    if (loggedUsername != null) {
      history.push(redirect);
    }
  }, [history, loggedUsername, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (username == "" || password == "") {
      setMessage("Please fill in the username/ password.");
    } else {
      dispatch(login(username, password, csrftoken));
    }
  };
  return (
    <div>
      <Headers />
      <Form onSubmit={submitHandler}>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        <div className="form-group">
          <label
            style={{ color: "orange", marginTop: "100px", marginLeft: "40%" }}
          >
            Username
          </label>
          <input
            style={{
              color: "orange",
              marginTop: "5px",
              marginLeft: "40%",
              width: "300px",
            }}
            type="text"
            className="form-control"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label
            style={{ color: "orange", marginTop: "10px", marginLeft: "40%" }}
          >
            Password
          </label>
          <input
            style={{
              color: "orange",
              marginTop: "5px",
              marginLeft: "40%",
              width: "300px",
            }}
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          style={{
            backgroundColor: "orange",
            marginTop: "15px",
            marginLeft: "43%",
          }}
          type="submit"
          className="btn btn-primary btn-block"
        >
          Login
        </button>

        <Link to="/signup">
          <button
            style={{
              backgroundColor: "orange",
              marginTop: "15px",
              marginLeft: "70px",
            }}
            className="btn btn-primary btn-block"
          >
            Signup
          </button>
        </Link>
      </Form>
    </div>
  );
}

export default LoginPage;
