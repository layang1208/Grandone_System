import * as api from '../api';
import * as actions from '../constants/actionTypes';

const getProducts = () => async (dispatch) => {
	try {
		dispatch({ type: actions.START_LOADING });
		const { data } = await api.fetchProducts();
		// console.log(data);
		dispatch({ type: actions.FETCH_PRODUCTS, payload: data });
		dispatch({ type: actions.END_LOADING });
	} catch (error) {
		console.log(error);
	}
};


export { getProducts };
