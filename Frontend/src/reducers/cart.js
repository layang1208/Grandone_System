import * as actions from '../constants/actionTypes';

export default (state = { isLoading: true, cart: [] }, action) => {
	switch (action.type) {
		case actions.START_LOADING:
			return { ...state, isLoading: true };
		case actions.END_LOADING:
			return { ...state, isLoading: false };

		case actions.CREATE_CART:
			return { ...state, cart: action.payload };
		case actions.ADDTO_CART:
			return { ...state, cart: action.payload };
		case actions.UPDATETO_CART:
			return {
				...state,
				cart: action.payload,
			};
		case actions.REMOVEFROM_CART:
			return { ...state, cart: action.payload };

		case actions.EMPTY_CART:
			return { ...state, cart: action.payload };

		default:
			return state;
	}
};
