import React, { useState, useEffect } from "react";
import { Grid, Grow, Container } from "@material-ui/core";
import useStyles from "./postsPageStyle";
//redux config
import { useDispatch } from "react-redux";
// import actions
import { getPosts } from "../../actions/posts";

import { Posts, Form } from "../../components";
const PostsPage = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container className={classes.container}>
      <Grow in>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="space-between"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Grow>
    </Container>
  );
};

export default PostsPage;
