import React, { useState } from "react";
import useStyles from "./cartStyle";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import CartItem from "./CartItem/CartItem";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, updateToCart, removeFromCart, emptyCart }) => {
  const classes = useStyles();
  if (!cart.line_items) return "Loading";
  const handleEmptyCart = () => emptyCart();
  const renderEmptyCart = () => (
    <>
      <Typography variant="subtitle1">
        You have no items in your cart. Start to add some
      </Typography>
      <Link to="/menu" className={classes.link}>
        Go To Menu
      </Link>
    </>
  );

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <CartItem
              item={item}
              updateToCart={updateToCart}
              removeFromCart={removeFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
  console.log(cart);
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Cart
      </Typography>
      {!cart.line_items.length ? renderEmptyCart() : renderCart()}
    </Container>
  );
};

export default Cart;
