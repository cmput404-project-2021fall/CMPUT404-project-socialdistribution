import React, { useState, useEffect } from "react";
import { Card, Nav } from "react-bootstrap";
import Posts from "./Posts";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { getPosts, getLikedPosts, updateDB } from "../actions/postActions";
import { getGithubEvent, getAuthorDetail } from "../actions/userActions";

// Content of home page; tabs to select which list of posts to view
function HomeContent() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(1);

  const getLiked = useSelector((state) => state.getLiked);
  const { error: getLikedError, response } = getLiked;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetail = useSelector((state) => state.userDetail);
  const { userInfo: userDetailInfo } = userDetail;

  const postList = useSelector((state) => state.postList);
  const { error, success, post } = postList;

  const [message, setMessage] = useState("");
  const likedPosts = response ? response.items : [];
  const posts = post ? post.items : [];

  // is this posted by me?
  const isMyPost = (p) => {
    let idList = p.author.id.split("/");
    let id = "";
    for (let i = 0; i < idList.length; i++) {
      if (idList[i] == "author") {
        id = idList[i + 1];
        break;
      }
    }
    if (userInfo && id == userInfo.author_id) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    dispatch(getLikedPosts());
    dispatch(getPosts());
    dispatch(getAuthorDetail());
    // dispatch(updateDB());
  }, []);

  const github_url = userDetailInfo ? userDetailInfo : "";

  const github_id =
    github_url && github_url.github
      ? github_url.github.match("[^/]+(?!.*/)")[0]
      : "";

  // add github event to stream
  const githubData = useSelector((state) => state.githubEvent);
  useEffect(() => {
    if (github_id) {
      dispatch(getGithubEvent(github_id));
    }
  }, [github_id]);

  const githubEvent = githubData.loading == false ? githubData.response : [];

  var githubActivities = [];
  var githubAvatarUrl = "";

  if (githubEvent) {
    for (var i = 0; i < githubEvent.length; i++) {
      var githubActivity = {
        user_name: githubEvent[i].actor.display_login,
        type:
          githubEvent[i].type == "PushEvent"
            ? "push to"
            : githubEvent[i].type == "PullRequestEvent"
            ? "pull from"
            : githubEvent[i].type == "CreateEvent"
            ? "create"
            : githubEvent[i].type == "WatchEvent"
            ? "watch"
            : "",
        repo_name: githubEvent[i].repo.name,
        time: githubEvent[i].created_at,
      };
      githubActivities.push(githubActivity);
      githubAvatarUrl = githubEvent[0].actor.avatar_url;
    }
  }

  return (
    <div className="m-2">
      {message && <Message variant="danger">{message}</Message>}
      <Nav fill variant="tabs" defaultActiveKey="1">
        <Nav.Item>
          <Nav.Link eventKey="1" onClick={() => setTab(1)}>
            All Posts
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          {userInfo ? (
            <Nav.Link eventKey="2" onClick={() => setTab(2)}>
              Friend Posts
            </Nav.Link>
          ) : (
            <Nav.Link eventKey="2" disabled>
              Friend Posts
            </Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {userInfo ? (
            <Nav.Link eventKey="3" onClick={() => setTab(3)}>
              My Posts
            </Nav.Link>
          ) : (
            <Nav.Link eventKey="3" disabled>
              My Posts
            </Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {userInfo ? (
            <Nav.Link eventKey="4" onClick={() => setTab(4)}>
              GitHub Activity
            </Nav.Link>
          ) : (
            <Nav.Link eventKey="4" disabled>
              GitHub Activity
            </Nav.Link>
          )}
        </Nav.Item>
      </Nav>
      {tab === 1 ? (
        likedPosts &&
        posts.map((p) =>
          userInfo != null ? (
            <Posts post={p} liked={likedPosts} />
          ) : p.visibility == "PUBLIC" ? (
            <Posts post={p} liked={likedPosts} />
          ) : (
            ""
          )
        )
      ) : tab === 2 ? (
        likedPosts &&
        posts.map((p) =>
          p.visibility == "FRIENDS" && !isMyPost(p) ? (
            <Posts post={p} liked={likedPosts} />
          ) : (
            ""
          )
        )
      ) : tab === 3 ? (
        likedPosts &&
        posts.map((p) =>
          isMyPost(p) ? <Posts post={p} liked={likedPosts} /> : ""
        )
      ) : githubActivities.length == 0 ? (
        <Card className="m-5">
          <Card.Body>
            <Card.Title className="m-3 text-center">
              No activity available.
            </Card.Title>
          </Card.Body>
        </Card>
      ) : (
        githubActivities.map((p) => (
          <Card className="m-5">
            <Card.Body>
              <div className="d-flex">
                <Card.Img
                  className="m-1"
                  src={githubAvatarUrl}
                  style={{ width: "6rem", height: "6rem" }}
                />
                <Nav.Link className="m-2 justify-content-center">
                  {p.user_name}
                </Nav.Link>
              </div>
              <Card.Title className="m-3 text-center">
                <u>
                  {p.type} {p.repo_name} <br /> at {p.time}
                </u>
              </Card.Title>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}
export default HomeContent;
