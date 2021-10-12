import React, { Component } from "react";
import { Typography } from "@material-ui/core";
const Home = () => {
  return (
    <div className="homePage">
      <Typography
        variant="h6"
        color="primary"
        component="h2"
        nowrap
        gutterBottom
        align="center"
      >
        Grandone Home
      </Typography>
    </div>
  );
};

export default Home;
