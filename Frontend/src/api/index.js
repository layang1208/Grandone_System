import http from "../service/httpService";
import { commerce } from "../lib/commerce";
import { backendAPI } from "../config.json";

const postAPI = backendAPI + "/posts";
const authAPI = backendAPI + "/auth";
const newUserAPI = backendAPI + "/users";

const fetchPosts = (page) => http.get(`${postAPI}?page=${page}`);
const fetchPost = (id) => http.get(`${postAPI}/${id}`);

const fetchPostBySearch = (query) =>
	http.get(
		`${postAPI}/search?searchQuery=${query.search || "none"}&tags=${query.tags}`
	);
const createPost = (newPost) => http.post(postAPI, newPost);
const updatePost = (id, newPost) => http.put(`${postAPI}/${id}`, newPost);
const updateLike = (id) => http.patch(`${postAPI}/${id}/like`);
const deletePost = (id) => http.delete(`${postAPI}/${id}`);

const signIn = (formData) => http.post(authAPI, formData);
const signUp = (formData) => http.post(newUserAPI, formData);
const fetchProducts = () => commerce.products.list();

export {
	fetchPosts,
  fetchPost,
	fetchPostBySearch,
	createPost,
	fetchProducts,
	updatePost,
	updateLike,
	deletePost,
	signIn,
	signUp,
};
