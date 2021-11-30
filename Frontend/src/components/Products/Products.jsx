import React, { useState } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import Product from './Product/Product';
import useStyle from './productsStyles';
import { useSelector } from 'react-redux';

const Products = () => {
	const classes = useStyle();
	const { products, isLoading } = useSelector((state) => state.products);

	if (!products && !isLoading) console.log('no posts');
	return isLoading ? (
		<CircularProgress />
	) : (
		<Grid className={classes.container} container justify="stretch" spacing={4}>
			{products.map((product) => (
				<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
					<Product product={product} />
				</Grid>
			))}
		</Grid>
	);
};

export default Products;
