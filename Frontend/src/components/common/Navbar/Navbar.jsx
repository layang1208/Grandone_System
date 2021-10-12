import React from "react";
import {
  AppBar,
  ToolBar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
  Toolbar,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "@material-ui/icons";
import useStyle from "./navbarStyle";
// import "../../css/style.css";
import logo from "../../../img/grandone logo_2.png";
const Navbar = ({ totalItems }) => {
  const classes = useStyle();
  const location = useLocation();

  return (
    <AppBar position="fixed" className={classes.appBar} color="inherit">
      <Toolbar>
        <Typography
          component={Link}
          to="/menu"
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
        <div className={classes.grow}></div>
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
