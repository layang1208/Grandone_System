import { Grid } from "@material-ui/core";
import React from "react";
import Product from "./Product/Product";
import useStyle from "./productsStyles";

const Products = ({ products, addToCart }) => {
  const classes = useStyle();
  console.log(products.data);
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
