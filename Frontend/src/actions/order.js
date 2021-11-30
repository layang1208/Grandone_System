import * as api from '../api';
import * as actions from '../constants/actionTypes';

const captureCheckout = (checkoutTokenId, newOrder) => async (dispatch) => {
	const incomingOrder = await api.captureCheckout(checkoutTokenId, newOrder);
	console.log(incomingOrder);
	dispatch({ type: actions.CAPTURE_CHECKOUT, payload: incomingOrder });
};
const refreshCart = () => async (dispatch) => {
	try {
		const newCart = await api.refreshCart();
		dispatch({ type: actions.REFRESH_CART, payload: newCart });
	} catch (error) {
		console.log(error);
	}
};
// const createToken = (cartId, type ) => async (dispatch) => {
// 	try {
// 		const token = await api.createToken(cartId, type);

// 		dispatch({ type: actions.CREATE_TOKEN, payload: token})
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

export { captureCheckout, refreshCart };
