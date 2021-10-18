const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Post } = require("../models/posts");
const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.post("/", auth, async (req, res) => {
  const post = req.body;
  const newPost = new Post({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
});
router.patch("/:id", [auth, validateObjectId], async (req, res) => {
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

router.delete("/:id", [auth, validateObjectId], async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(201).send("Post deleted");
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
});

router.patch("/:id/like", [auth, validateObjectId], async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ messsage: "Unauthenticated" });
  const post = await Post.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));
  // if the like does not exist, add a new like
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    // return the likes beside the user's like
    post.likes.filter((id) => id !== String(req.userId));
  }
  try {
    const updateLike = await Post.findByIdAndUpdate(id, post, { new: true });
    res.json(updateLike);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
});

module.exports = router;
