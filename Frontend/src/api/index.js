import http from "../service/httpService";
import { commerce } from "../lib/commerce";
import { backendAPI } from "../config.json";

const postAPI = backendAPI + "/posts";

const fetchPosts = () => http.get(postAPI);
const createPost = (newPost) => http.post(postAPI, newPost);
const updatePost = (id, newPost) => http.patch(`${postAPI}/${id}`, newPost);
const updateLike = (id) => http.patch(`${postAPI}/${id}/like`);
const deletePost = (id) => http.delete(`${postAPI}/${id}`);

const fetchProducts = () => commerce.products.list();

export {
  fetchPosts,
  createPost,
  fetchProducts,
  updatePost,
  updateLike,
  deletePost,
};
