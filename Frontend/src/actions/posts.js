import * as api from "../api";
import * as actions from "../constants/actionTypes";

const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: actions.FETCH_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: actions.CREATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: actions.UPDATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

const updateLike = (id) => async (dispatch) => {
  try {
    const { data } = await api.updateLike(id);
    dispatch({ type: actions.UPDATE_LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: actions.DELETE_POST, payload: id });
  } catch (error) {}
};

export { getPosts, createPost, updatePost, updateLike, deletePost };
