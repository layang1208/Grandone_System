import * as api from '../api';
import * as actions from '../constants/actionTypes';

const getPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: actions.START_LOADING });
		const { data } = await api.fetchPost(id);
		// console.log(data)
		dispatch({
			type: actions.FETCH_POST,
			payload: data,
		});
		// dispatch({ type: actions.END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: actions.START_LOADING });
		const {
			data: { data, currentPage, numberOfPages },
		} = await api.fetchPosts(page);
		// console.log(data)
		dispatch({
			type: actions.FETCH_POSTS,
			payload: { data, currentPage, numberOfPages },
		});
		dispatch({ type: actions.END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

const getPostBySearch = (searchQuery) => async (dispatch) => {
	try {
		dispatch({ type: actions.START_LOADING });
		const {
			data: { data },
		} = await api.fetchPostBySearch(searchQuery);
		dispatch({ type: actions.FETCH_SEARCHPOSTS, payload: { data } });
		dispatch({ type: actions.END_LOADING });
	} catch (error) {
		console.log(error);
	}
};
const createPost = (post, history) => async (dispatch) => {
	try {
		dispatch({ type: actions.START_LOADING });
		const { data } = await api.createPost(post);

		history.push(`/posts/${data._id}`);
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
	const user = localStorage.getItem('profile');
	try {
		const { data } = await api.updateLike(id, user?.token);
		dispatch({ type: actions.UPDATE_LIKE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

const addComment = (comment, id) => async (dispatch) => {
	try {
		const { data } = await api.addComment(comment, id);
    dispatch({ type: actions.ADD_COMMENT, payload: data})
		return data.comments
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

export {
	getPost,
	getPosts,
	getPostBySearch,
	createPost,
	updatePost,
	updateLike,
	addComment,
	deletePost,
};
