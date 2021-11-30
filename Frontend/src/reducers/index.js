import { combineReducers } from 'redux';
import products from './products';
import posts from './posts';
import cart from './cart';
import order from './order';
import authReducer from './auth';

export const reducers = combineReducers({
	posts,
	products,
	cart,
	order,
	authReducer,
});
