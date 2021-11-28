import React, { useState, useEffect } from 'react';

import { Paper, TextField, Button, Typography, Grid } from '@material-ui/core';
import useStyles from './postFormStyle';

import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useHistory } from 'react-router-dom';
import FileBase from 'react-file-base64';

const PostForm = ({ currentId, setCurrentId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const [data, setData] = useState({
		// creator: "",
		title: '',
		message: '',
		tags: '',
		selectedFile: '',
	});
	// get the post needs to be edited

	const post = useSelector(
		(state) =>
			currentId && state.posts.posts.find((post) => post._id === currentId)
	);

	const user = JSON.parse(localStorage.getItem('profile'));

	const clear = () => {
		setCurrentId(null);
		setData({
			// creator: "",
			title: '',
			message: '',
			tags: ''			,
			selectedFile: '',
		});
	};
	const handleTitleChange = (e) => {
		setData({ ...data, title: e.target.value });
	};
	const handleMessageChange = (e) => {
		setData({ ...data, message: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (currentId) {
			dispatch(updatePost(currentId, { ...data, name: user?.result?.name }));
		} else {
			dispatch(createPost({ ...data, name: user?.result?.name }, history));
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
		<Paper className={classes.paper} elevation={6}>
			<div className={classes.toolbar} />
			<form
				onSubmit={handleSubmit}
				className={`${classes.root} ${classes.form}`}
				autoComplete="off"
				noValidate
			>
				<Grid>
					<Typography variant="h5">
						{currentId ? 'Edit' : 'Create'} a Post
					</Typography>

					<TextField
						name="title"
						label="Title"
						variant="outlined"
						fullWidth
						value={data.title}
						onChange={handleTitleChange}
					/>
					<TextField
						name="message"
						label="Message"
						variant="outlined"
						fullWidth
						value={data.message}
						onChange={handleMessageChange}
					/>
					<TextField
						name="tags"
						label="Tags"
						variant="outlined"
						fullWidth
						value={data.tags}
						onChange={(e) =>
							setData({ ...data, tags: e.target.value.split(',') })
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

export default PostForm;
