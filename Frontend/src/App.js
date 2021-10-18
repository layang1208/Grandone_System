import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

import Contact from "../src/components/Contact";
import About from "../src/components/About";
import Menu from "../src/components/Menu";
import { Products, Navbar, Cart, Checkout } from "./components";
import { commerce } from "./lib/commerce";

import PostsPage from "./Pages/PostsPage/PostsPage";
import Home from "./Pages/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [error, setError] = useState({});

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
          <Route path="/posts">
            <PostsPage />
          </Route>
          <Route path="/auth" component={Auth} />
          <Route exact path="/" component={Home} />

          {/* <Route exact path="/" component={Home} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            <Route exact path="/menu" component={Menu} /> */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
