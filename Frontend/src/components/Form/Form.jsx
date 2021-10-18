import React, { useState, useEffect } from "react";

import { Paper, TextField, Button, Typography, Grid } from "@material-ui/core";
import useStyles from "./formStyle";

import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

import FileBase from "react-file-base64";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    // creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  // get the post needs to be edited
  const post = useSelector(
    (state) => currentId && state.posts.find((post) => post._id === currentId)
  );

  const user = JSON.parse(localStorage.getItem("profile"));

  const clear = () => {
    setCurrentId(null);
    setData({
      // creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, { ...data, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...data, name: user?.result?.name }));
    }
    clear();
  };
  useEffect(() => {
    if (post) {
      setData(post);
    }
  }, [post]);
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to create your own posts and like other's posts
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <div className={classes.toolbar} />
      <form
        onSubmit={handleSubmit}
        className={`${classes.root} ${classes.form}`}
        autoComplete="off"
        noValidate
      >
        <Grid>
          <Typography variant="h5">
            {currentId ? "Edit" : "Create"} a Post
          </Typography>

          {/* <TextField
            name="creator"
            label="Creator"
            variant="outlined"
            fullWidth
            value={data.creator}
            onChange={(e) => setData({ ...data, creator: e.target.value })}
          /> */}
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <TextField
            name="message"
            label="Message"
            variant="outlined"
            fullWidth
            value={data.message}
            onChange={(e) => setData({ ...data, message: e.target.value })}
          />
          <TextField
            name="tags"
            label="Tags"
            variant="outlined"
            fullWidth
            value={data.tags}
            onChange={(e) =>
              setData({ ...data, tags: e.target.value.split(",") })
            }
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setData({ ...data, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Submit
          </Button>
          <Button
            onClick={clear}
            variant="contained"
            color="secondary"
            size="small"
            fullWidth
          >
            Clear
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default Form;
