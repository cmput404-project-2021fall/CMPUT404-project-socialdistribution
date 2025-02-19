import axios from "axios";
import {
  POST_CREATE_FAIL,
  POST_CREATE_SUCCESS,
  POST_CREATE_REQUEST,
  POST_RESET,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAIL,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAIL,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  GET_LIKED_REQUEST,
  GET_LIKED_FAIL,
  GET_LIKED_SUCCESS,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
} from "../constants/postConstants";

// create a post
export const createPost =
  (title, content, contentType, visibility) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/author/${userInfo.author_id}/posts/`,
        {
          author: userInfo.author_id,
          title: title,
          contentType: contentType,
          content: content,
          visibility: visibility,
        },
        config
      );

      dispatch({
        type: POST_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// reset post
export const postReset = () => (dispatch) => {
  dispatch({ type: POST_RESET });
};

// get all posts
export const getPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/posts/`, config);

    dispatch({
      type: POST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// update database
export const updateDB = () => async (dispatch, getState) => {
  try {
    let host = window.location.host;
    fetch("https://" + host + "/api/update")
      .then((res) => res.json())
      .then((data) => console.log(data));
  } catch (error) {}
};

// add comment to a post
export const postingComment =
  (comment, poster_id, post_id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_COMMENT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${userInfo.token}`,
        },
      };

      const { data } = await axios
        .post(
          `/api/author/${poster_id}/posts/${post_id}/comments`,
          {
            type: "comment",
            author: userInfo.author,
            comment: comment,
          },
          config
        )
        .then(() => dispatch(getPosts()));

      dispatch({
        type: POST_COMMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_COMMENT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// get all comments of a post
export const getAllComments =
  (author_id, post_id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_COMMENTS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/author/${author_id}/posts/${post_id}/comments`,
        config
      );

      dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_COMMENTS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// delete a post
export const deletePost = (post_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${userInfo.token}`,
      },
    };

    const { data } = await axios
      .delete(`/api/author/${userInfo.author_id}/posts/${post_id}`, config)
      .then(window.location.reload());

    dispatch({
      type: POST_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// like a post
export const likePost = (post_url, poster_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_LIKE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${userInfo.token}`,
      },
    };

    const { data } = await axios
      .post(
        `/api/author/${poster_id}/inbox/`,
        {
          summary: `${userInfo.author.displayName} liked your post.`,
          type: "Like",
          author: userInfo.author,
          object: post_url,
        },
        config
      )
      .then(window.location.reload());

    dispatch({
      type: POST_LIKE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_LIKE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// get posts that are liked by the user
export const getLikedPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_LIKED_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/author/${userInfo.author_id}/liked`,
      config
    );

    dispatch({
      type: GET_LIKED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LIKED_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// get all notifications from inbox
export const getAllNotifications = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_NOTIFICATIONS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/author/${userInfo.author_id}/inbox/all/`,
      config
    );

    dispatch({
      type: GET_NOTIFICATIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_NOTIFICATIONS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
