const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Post } = require("../models/posts");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.post("/", async (req, res) => {
  const newPost = new Post(
    _.pick(req.body, ["creator", "title", "message", "tags", "selectedFile"])
  );
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
});
router.patch("/:id", validateObjectId, async (req, res) => {
  try {
    const { id } = req.params;
    const newPost = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      // for auto refreshing the card
      newPost,
      {
        // to return the updated new object
        new: true,
      }
    );
    res.status(201).send(updatedPost);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
});

router.delete("/:id", validateObjectId, async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(201).send("Post deleted");
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
});

router.patch("/:id/like", validateObjectId, async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  try {
    const updateLike = await Post.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    res.json(updateLike);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
});

module.exports = router;
