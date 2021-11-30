import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
	Route,
} from 'react-router-dom';
import { Container } from '@material-ui/core';

import { Products, Navbar, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';

import PostsPage from './Pages/PostsPage/PostsPage';
import MenuPage from './Pages/MenuPage/MenuPage';
import PostDetail from './components/PostDetail/PostDetail';
import Home from './Pages/Home/Home';
import Auth from './components/Auth/Auth';

import { useDispatch, useSelector } from 'react-redux';

const App = () => {

	const dispatch = useDispatch();
	// const [products, setProducts] = useState([]);
	// const [cart, setCart] = useState({});
	const [order, setOrder] = useState({});
	const [error, setError] = useState({});

	const user = JSON.parse(localStorage.getItem('profile'));
	// const { cart } = useSelector((state) => state.cart);

	// const fetchProducts = async () => {
	// 	try {
	// 		const { data } = await commerce.products.list();
	// 		setProducts(data);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	// const fetchCart = async () => {
	// 	// automatically create a cart by calling retrieve()
	// 	setCart(await commerce.cart.retrieve());
	// };

	// const addToCart = async (productId, quantity) => {
	// 	try {
	// 		const { cart } = await commerce.cart.add(productId, quantity);
	// 		setCart(cart);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	// const updateToCart = async (productId, quantity) => {
	// 	try {
	// 		const { cart } = await commerce.cart.update(productId, { quantity });
	// 		setCart(cart);
	// 	} catch (error) {}
	// };
	// const removeFromCart = async (productId) => {
	// 	const { cart } = await commerce.cart.remove(productId);
	// 	setCart(cart);
	// };
	// const emptyCart = async () => {
	// 	const { cart } = await commerce.cart.empty();
	// 	setCart(cart);
	// };
	// const refreshCart = async () => {
	// 	const newCart = await commerce.cart.refresh();
	// 	setCart(newCart);
	// };
	// const captureCheckout = async (checkoutTokenId, newOrder) => {
	// 	try {
	// 		const incomingOrder = await commerce.checkout.capture(
	// 			checkoutTokenId,
	// 			newOrder
	// 		);
	// 		setOrder(incomingOrder);

	// 		console.log(incomingOrder);
	// 	} catch (error) {
	// 		setError(error.data.error.message);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchProducts();
	// 	fetchCart();
	// }, []);

	return (
		<div>
			<Router>
				<Container maxWidth="xl">
					<Navbar />
					<Switch>
						{/* <Route path="/checkout">
							<Checkout
								cart={cart}
								order={order}
								captureCheckout={captureCheckout}
								refreshCart={refreshCart}
								error={error}
							/>
						</Route> */}
						<Route path="/menu" exact component={MenuPage} />
						<Route path="/menu/cart" exact component={Cart} />
						<Route path="/menu/checkout" exact component={Checkout} />
						<Route path="/posts" exact component={PostsPage} />
						<Route path="/posts/search" exact component={PostsPage} />
						<Route path="/posts/:id" exact component={PostDetail} />
						<Route
							path="/auth"
							exact
							component={() => (!user ? <Auth /> : <Redirect to="/menu" />)}
						/>
						<Route path="/" exact component={() => <Redirect to="/posts" />} />

						{/* <Route exact path="/" component={Home} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            <Route exact path="/menu" component={Menu} /> */}
					</Switch>
				</Container>
			</Router>
		</div>
	);
};

export default App;
