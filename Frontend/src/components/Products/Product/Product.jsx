import React, {useEffect} from 'react';
import {
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	IconButton,
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './productStyle';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../actions/cart';


const Product = ({ product }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	// console.log(product)
	const handleAddCart = () => {
		dispatch(addToCart(product.id, 1));
	};

  // useEffect(() => {
  //   console.log(product)
  // })

	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.media}
				image={product.image.url}
				title={product.name}
			/>
			<CardContent>
				<div className={classes.cardContent}>
					<Typography variant="h5" gutterBottom>
						{product.name}
					</Typography>
					<Typography variant="h5" gutterBottom>
						{product.price.formatted_with_symbol}
					</Typography>
				</div>
				<Typography
					dangerouslySetInnerHTML={{ __html: product.description }}
					variant="body2"
					color=""
				/>
			</CardContent>
			<CardActions disableSpacing className={classes.cardActions}>
				<IconButton aria-label="Add to Cart" onClick={handleAddCart}>
					<AddShoppingCart />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default Product;
