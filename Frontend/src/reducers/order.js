import * as actions from '../constants/actionTypes';

export default (state = { isLoading: true, order: [], cart: [] }, action) => {
	switch (action.type) {
		case actions.START_LOADING:
			return { ...state, isLoading: true };
		case actions.END_LOADING:
			return { ...state, isLoading: false };

		case actions.REFRESH_CART:
			return { ...state, cart: action.payload };

		case actions.CAPTURE_CHECKOUT:
			return { ...state, order: action.payload };

		default:
			return state;
	}
};
