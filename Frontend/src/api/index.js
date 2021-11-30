import http from '../service/httpService';
import { commerce } from '../lib/commerce';
import { backendAPI } from '../config.json';

//Auth API
const postAPI = backendAPI + '/posts';
const authAPI = backendAPI + '/auth';
const newUserAPI = backendAPI + '/users';
const signIn = (formData) => http.post(authAPI, formData);
const signUp = (formData) => http.post(newUserAPI, formData);

// Post API
const fetchPosts = (page) => http.get(`${postAPI}?page=${page}`);
const fetchPost = (id) => http.get(`${postAPI}/${id}`);
const fetchPostBySearch = (query) =>
	http.get(
		`${postAPI}/search?searchQuery=${query.search || 'none'}&tags=${query.tags}`
	);
const createPost = (newPost) => http.post(postAPI, newPost);
const updatePost = (id, newPost) => http.put(`${postAPI}/${id}`, newPost);
const updateLike = (id) => http.patch(`${postAPI}/${id}/like`);
const addComment = (comment, id) =>
	http.post(`${postAPI}/${id}/comments`, { comment });
const deletePost = (id) => http.delete(`${postAPI}/${id}`);

//Product Cart API
const fetchProducts = () => commerce.products.list();
const createCart = () => commerce.cart.retrieve();
const addToCart = (productId, quantity) =>
	commerce.cart.add(productId, quantity);
const updateToCart = (productId, quantity) =>
	commerce.cart.update(productId, { quantity });
const removeFromCart = (productId) => commerce.cart.remove(productId);
const emptyCart = () => commerce.cart.empty();


// Checkout API
const refreshCart = () => commerce.cart.refresh();
const captureCheckout = (checkoutTokenId, newOrder) =>
	commerce.checkout.capture(checkoutTokenId, newOrder);



export {
	fetchPosts,
	fetchPost,
	fetchPostBySearch,
	createPost,
	updatePost,
	updateLike,
	addComment,
	deletePost,
	fetchProducts,
	createCart,
	addToCart,
	updateToCart,
	removeFromCart,
	emptyCart,
	refreshCart,
	captureCheckout,
	signIn,
	signUp,
};
