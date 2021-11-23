import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Redirect,
	Route,
} from "react-router-dom";
import { Container } from "@material-ui/core";

import Contact from "../src/components/Contact";
import About from "../src/components/About";
import Menu from "../src/components/Menu";
import { Products, Navbar, Cart, Checkout } from "./components";
import { commerce } from "./lib/commerce";

import PostsPage from "./Pages/PostsPage/PostsPage";
import PostDetail from "./components/PostDetail/PostDetail";
import Home from "./Pages/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});
	const [order, setOrder] = useState({});
	const [error, setError] = useState({});

	const user = JSON.parse(localStorage.getItem("profile"));

	const fetchProducts = async () => {
		try {
			const { data } = await commerce.products.list();
			setProducts(data);
		} catch (error) {
			console.log(error);
		}
	};
	const fetchCart = async () => {
		// automatically create a cart by calling retrieve()
		setCart(await commerce.cart.retrieve());
	};

	const addToCart = async (productId, quantity) => {
		try {
			const { cart } = await commerce.cart.add(productId, quantity);
			setCart(cart);
		} catch (error) {
			console.log(error);
		}
	};
	const updateToCart = async (productId, quantity) => {
		try {
			const { cart } = await commerce.cart.update(productId, { quantity });
			setCart(cart);
		} catch (error) {}
	};
	const removeFromCart = async (productId) => {
		const { cart } = await commerce.cart.remove(productId);
		setCart(cart);
	};
	const emptyCart = async () => {
		const { cart } = await commerce.cart.empty();
		setCart(cart);
	};
	const refreshCart = async () => {
		const newCart = await commerce.cart.refresh();
		setCart(newCart);
	};
	const captureCheckout = async (checkoutTokenId, newOrder) => {
		try {
			const incomingOrder = await commerce.checkout.capture(
				checkoutTokenId,
				newOrder
			);
			setOrder(incomingOrder);

			console.log(incomingOrder);
		} catch (error) {
			setError(error.data.error.message);
		}
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	return (
		<div>
			<Router>
				<Container maxWidth="xl">
					<Navbar totalItems={cart.total_items} />
					<Switch>
						<Route path="/menu">
							<Products products={products} addToCart={addToCart} />
						</Route>
						<Route path="/cart">
							<Cart
								cart={cart}
								emptyCart={emptyCart}
								updateToCart={updateToCart}
								removeFromCart={removeFromCart}
							/>
						</Route>
						<Route path="/checkout">
							<Checkout
								cart={cart}
								order={order}
								captureCheckout={captureCheckout}
								refreshCart={refreshCart}
								error={error}
							/>
						</Route>
						<Route path="/" exact component={() => <Redirect to="/posts" />} />
						<Route path="/posts" exact component={PostsPage} />
						<Route path="/posts/search" exact component={PostsPage} />
						<Route path="/posts/:id" exact component={PostDetail} />
						<Route
							path="/auth"
							exact
							component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
						/>

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
