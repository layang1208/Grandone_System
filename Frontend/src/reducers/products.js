import * as actions from '../constants/actionTypes';

export default (state = { isLoading: true, products: [] }, action) => {
	switch (action.type) {
		case actions.START_LOADING:
			return { ...state, isLoading: true };
		case actions.END_LOADING:
			return { ...state, isLoading: false };
		case actions.FETCH_PRODUCTS:
			return {
				...state,
				products: action.payload,
				// currentPage: action.payload.currentPage,
				// numberOfPages: action.payload.numberOfPages,
			};
    
		default:
			return state;
	}
};
