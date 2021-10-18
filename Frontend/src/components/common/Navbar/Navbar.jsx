import React, { useState, useEffect } from "react";
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
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "@material-ui/icons";
import useStyle from "./navbarStyle";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

// import "../../css/style.css";
import logo from "../../../img/grandone logo_2.png";

const Navbar = ({ totalItems }) => {
  const classes = useStyle();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };
  // console.log(user?.result.name);
  // console.log(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    const token = user?.token;

    //JWT
    setUser(JSON.parse(localStorage.getItem("profile")));
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
        <div className={classes.grow}></div>
        <div className={classes.cart}>
          {location.pathname === "/menu" && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
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

    // <div className="navbar">
    //   <a href="/home">Home</a>
    //   <a href="/about">About</a>
    //   <a href="/profile">Profile</a>
    //   <a href="/contact">Contact</a>
    // </div>
  );
};

export default Navbar;
