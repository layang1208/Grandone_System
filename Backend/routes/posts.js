const express = require('express');
const router = express.Router();
const _ = require('lodash');
const validateObjectId = require('../middleware/validateObjectId');
const { Post } = require('../models/posts');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
	const { page } = req.query;
	try {
		// define a limit items per page
		const limit = 3;
		// calculate the start index
		const startIndex = (Number(page) - 1) * limit;
		// calculate the total of post using db.collection.countDocuments(query,options)
		const total = await Post.countDocuments({});

		// const posts = await Post.find();
		// find posts for this page sorted from new to old
		const posts = await Post.find()
			.sort({ id: -1 })
			.limit(limit)
			.skip(startIndex);

		res.status(200).json({
			data: posts,
			currentPage: Number(page),
			numberOfPages: Math.ceil(total / limit),
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

router.get('/search', async (req, res) => {
	const { searchQuery, tags } = req.query;
	try {
		// RegExp => regular expression for mongodb
		const title = new RegExp(searchQuery, 'i');
		console.log(title);
		console.log(tags);
		const posts = await Post.find({
			$or: [{ title: title }, { tags: { $in: tags.split(',') } }],
		});
		res.json({ data: posts });
	} catch (error) {
		console.log(error);
		// res.status(404).json({ message: error.message });
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const post = await Post.findById(id);
		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

router.post('/', auth, async (req, res) => {
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

router.put('/:id', [auth, validateObjectId], async (req, res) => {
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

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
	const { id } = req.params;
	try {
		await Post.findByIdAndDelete(id);
		res.status(201).send('Post deleted');
	} catch (error) {
		res.status(409).send({ message: error.message });
	}
});

router.patch('/:id/like', [auth, validateObjectId], async (req, res) => {
	const { id } = req.params;
	console.log(req.userId);

	if (!req.userId) return res.json({ messsage: 'Unauthenticated' });
	const post = await Post.findById(id);

	const index = post.likes.findIndex((id) => id === String(req.userId));

	// if the like does not exist, add a new like
	if (index === -1) {
		post.likes.push(req.userId);
	} else {
		// return the likes beside the user's like
		post.likes = post.likes.filter((id) => id !== String(req.userId));
	}
	try {
		const updateLike = await Post.findByIdAndUpdate(id, post, { new: true });
		res.json(updateLike);
	} catch (error) {
		res.status(409).send({ message: error.message });
	}
});

router.post('/:id/comments', async (req, res) => {
	const { id } = req.params;
	const { comment } = req.body;
	console.log(req.body);
	const post = await Post.findById(id);
	post.comments.push(comment);

	const updatePost = await Post.findByIdAndUpdate(id, post, { new: true });

	res.json(updatePost);
});

module.exports = router;
