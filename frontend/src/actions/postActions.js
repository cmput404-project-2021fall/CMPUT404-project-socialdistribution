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
} from "../constants/postConstants";

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
      console.log("start");
      console.log(content);
      console.log(contentType);
      console.log("over");

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

export const postReset = () => (dispatch) => {
  dispatch({ type: POST_RESET });
};

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

      const { data } = await axios.post(
        `/api/author/${poster_id}/posts/${post_id}/comments`,
        {
          type: "comment",
          author: userInfo.author,
          comment: comment,
        },
        config
      );

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

    const { data } = await axios.delete(
      `/api/author/${userInfo.author_id}/posts/${post_id}`,
      config
    );

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

    const { data } = await axios.post(
      `/api/author/${poster_id}/inbox/`,
      {
        summary: `${userInfo.author.displayName} liked your post.`,
        type: "Like",
        author: userInfo.author,
        object: post_url,
      },
      config
    );

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
