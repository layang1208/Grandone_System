import React, { useState, useEffect } from 'react';
import {
	AppBar,
	ToolBar,
	IconButton,
	Badge,
	MenuItem,
	Menu,
	Typography,
	Toolbar,
	Button,
	Avatar,
} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from '@material-ui/icons';
import useStyle from './navbarStyle';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

// import "../../css/style.css";
import logo from '../../../img/grandone logo_2.png';

import decode from 'jwt-decode';

const Navbar = () => {
	const classes = useStyle();
	const location = useLocation();
	const dispatch = useDispatch();
	const history = useHistory();

	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const { cart } = useSelector((state) => state.cart);

	const logout = () => {
		dispatch({ type: 'LOGOUT' });
		history.push('/');
		setUser(null);
	};
	// console.log(user?.result.name);
	// console.log(JSON.parse(localStorage.getItem("profile")));

	useEffect(() => {
		const token = user?.token;
		if (token) {
			const decodeToken = decode(token);

			// transform ticks to date, check if the token has expired
			if (decodeToken.exp * 1000 < new Date().getTime()) logout();
		}

		//JWT
		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location]);

	return (
		<AppBar position="fixed" className={classes.appBar} color="inherit">
			<Toolbar>
				<div>
					<Typography
						component={Link}
						to="/"
						variant="h6"
						className={classes.title}
						color="inherit"
					>
						<img
							src={logo}
							alt="Grandone Chicken"
							height="25px"
							className={classes.image}
						/>
						Grandone Chicken
					</Typography>
				</div>
				<div>
					<ul className={classes.pageLinks}>
						<li>
							<Typography
								component={Link}
								to="/posts"
								variant="subtitle1"
								color="inherit"
								className={classes.pageLink}
							>
								Blog
							</Typography>
						</li>
						<li>
							<Typography
								component={Link}
								to="/menu"
								variant="subtitle1"
								color="inherit"
								className={classes.pageLink}
							>
								Menu
							</Typography>
						</li>
						<li>
							<Typography
								component={Link}
								to="/about"
								variant="subtitle1"
								color="inherit"
								className={classes.pageLink}
							>
								About
							</Typography>
						</li>
						<li>
							<Typography
								component={Link}
								to="/contact"
								variant="subtitle1"
								color="inherit"
								className={classes.pageLink}
								style={{transition: 'all ease 0.5s'}}
							>
								Contact
							</Typography>
						</li>
					</ul>
				</div>
				<div className={classes.grow}></div>
				<div className={classes.cart}>
					{location.pathname === '/menu' && (
						<div className={classes.button}>
							<IconButton
								component={Link}
								to="/menu/cart"
								aria-label="Show cart items"
								color="inherit"
							>
								<Badge badgeContent={cart.total_items} color="secondary">
									<ShoppingCart />
								</Badge>
							</IconButton>
						</div>
					)}
				</div>
				{user ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.avatar}
							alt={user?.result.name}
							src={user?.result.imageUrl}
						>
							{user?.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant="h6">
							{user?.result.name}
						</Typography>
						<Button
							variant="contained"
							className={classes.logout}
							color="secondary"
							onClick={logout}
						>
							Logout
						</Button>
					</div>
				) : (
					<div className={classes.auth}>
						<Button
							variant="contained"
							color="primary"
							component={Link}
							to="/auth"
						>
							Sign in
						</Button>
					</div>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
