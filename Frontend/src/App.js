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
	const user = JSON.parse(localStorage.getItem('profile'));
	
	return (
		<div>
			<Router>
				<Container maxWidth="xl">
					<Navbar />
					<Switch>
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
					</Switch>
				</Container>
			</Router>
		</div>
	);
};

export default App;
