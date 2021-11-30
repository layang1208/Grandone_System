import * as api from '../api';
import * as actions from '../constants/actionTypes';

const createCart = () => async (dispatch) => {
	try {
		const data = await api.createCart();
		dispatch({ type: actions.CREATE_CART, payload: data });
	} catch (error) {
		console.error(error);
	}
};

const addToCart = (id, number) => async (dispatch) => {
	try {
		const { cart } = await api.addToCart(id, number);
		dispatch({ type: actions.ADDTO_CART, payload: cart });
	} catch (error) {
		console.log(error);
	}
};

const updateToCart = (id, number) => async (dispatch) => {
	try {
		const { cart } = await api.updateToCart(id, number);
		console.log(cart);
		dispatch({ type: actions.UPDATETO_CART, payload: cart });
	} catch (error) {
		console.log(error);
	}
};

const removeFromCart = (id) => async (dispatch) => {
	try {
		const { cart } = await api.removeFromCart(id);
		dispatch({ type: actions.REMOVEFROM_CART, payload: cart });
	} catch (error) {
		console.log(error);
	}
};

const emptyCart = () => async (dispatch) => {
	try {
		const { cart } = await api.emptyCart();
		dispatch({ type: actions.EMPTY_CART, payload: cart });
	} catch (error) {
		console.log(error);
	}
};

export { createCart, addToCart, updateToCart, removeFromCart, emptyCart };
