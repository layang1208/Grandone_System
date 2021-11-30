import React, { useState, useEffect } from 'react';
import useStyles from './menuPageStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/products';
import { createCart } from '../../actions/cart';
import { Navbar } from '../../components';
import {
	Grid,
	Grow,
	Container,
	Paper,
	AppBar,
	TextField,
	Button,
} from '@material-ui/core';
import { Products } from '../../components';

const MenuPage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => state.cart);


	useEffect(() => {
		dispatch(getProducts());
		dispatch(createCart());
	}, []);
	return (
		<>
			<Navbar />
			<Products />
		</>
	);
};

export default MenuPage;
