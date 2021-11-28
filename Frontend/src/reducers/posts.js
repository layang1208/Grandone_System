import * as actions from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
	switch (action.type) {
		case actions.START_LOADING:
			return { ...state, isLoading: true };
		case actions.END_LOADING:
			return { ...state, isLoading: false };
		case actions.FETCH_POSTS:
			return {
				...state,
				posts: action.payload.data,
				currentPage: action.payload.currentPage,
				numberOfPages: action.payload.numberOfPages,
			};
		case actions.FETCH_POST:
			return {
				...state,
				post: action.payload,
			};
		case actions.FETCH_SEARCHPOSTS:
			return {
				...state,
				posts: action.payload.data,
			};
		case actions.CREATE_POST:
			// spread previous post and save new post inside the payload
			return { ...state, posts: [...state, action.payload] };
		case actions.UPDATE_POST:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
			};
		case actions.UPDATE_LIKE:
			return {
				...state,
				posts: state.posts.map((post) =>
					//update(replace) the newPost if the post in payload's id is equal to the previous post's in posts
					//the rest of posts will remain the same
					post._id === action.payload._id ? action.payload : post
				),
			};
		case actions.ADD_COMMENT:
			return {
				...state,
				// return other posts in state
				// update the post with a new comment
				posts: state.posts.map((post) => {
					if (post._id === action.payload._id) {
						return action.payload;
					}
					return post;
				}),
			};
		case actions.DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload),
			};
		default:
			return state;
	}
};
