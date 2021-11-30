import React from 'react';
import {
	Typography,
	Button,
	Card,
	CardActions,
	CardMedia,
	CardContent,
} from '@material-ui/core';
import useStyles from './cartItemStyle';
import { useDispatch, useSelector } from 'react-redux';

import { updateToCart, removeFromCart } from '../../../actions/cart';

const CartItem = ({ item }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const handleDeleteOneToCart = () => {
		dispatch(updateToCart(item.id, item.quantity - 1));
	};
	const handleAddOneToCart = () => {
		dispatch(updateToCart(item.id, item.quantity + 1));
	};
	const handleRemoveItem = () => {
		dispatch(removeFromCart(item.id));
	};

	return (
		<Card>
			<CardMedia
				image={item.image.url}
				alt={item.name}
				className={classes.media}
			></CardMedia>
			<CardContent className={classes.cardContent}>
				<Typography variant="h4">{item.name}</Typography>
				<Typography variant="h5">
					{item.line_total.formatted_with_symbol}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<div className={classes.buttons}>
					<Button type="button" size="small" onClick={handleDeleteOneToCart}>
						-
					</Button>
					<Typography>{item.quantity}</Typography>
					<Button type="button" size="small" onClick={handleAddOneToCart}>
						+
					</Button>
					<Button
						variant="contained"
						type="button"
						color="secondary"
						onClick={handleRemoveItem}
					>
						Remove
					</Button>
				</div>
			</CardActions>
		</Card>
	);
};

export default CartItem;
