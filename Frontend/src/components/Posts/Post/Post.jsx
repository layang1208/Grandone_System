import React, { useState } from 'react';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	Button,
	ButtonBase,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import moment from 'moment';
import useStyles from './postStyle';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deletePost, updateLike } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [likes, setLikes] = useState(post?.likes);
	const user = JSON.parse(localStorage.getItem('profile'));
	const history = useHistory();

	const userId = user?.result.googleId || user?.result._id;
	// Like is an array of users who like this post
	const hasLiked = post.likes.find((id) => id === userId);

	const openPostDetail = (e) => {
		history.push(`/posts/${post._id}`);
	};

	const handleLikeClick = async () => {
		dispatch(updateLike(post._id));

		// if user has liked this post, he want to unlike the post after a new click
		if (hasLiked) {
			setLikes(post.likes.filter((id) => id !== userId));
		}
		// if user has not liked this post, he want to like the post after a new click
		else {
			setLikes([...post.likes, userId]);
		}
	};
	const Likes = () => {
		if (likes.length > 0) {
			return likes.find((like) => like === userId) ? (
				<>
					<ThumbUpAltIcon fontSize="small" />
					&nbsp;
					{likes.length > 2
						? `You and ${likes.length - 1} others`
						: `${likes.length} like${likes.length > 1 ? 's' : ''}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize="small" />
					&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
				</>
			);
		}
		// console.log(likes.length);
		return (
			<>
				<ThumbUpAltOutlined fontSize="small" />
				&nbsp;Like
			</>
		);
	};
	return (
		<Card className={classes.card} raised elevation={3}>
			<ButtonBase className={classes.cardActions} onClick={openPostDetail}>
				<CardMedia
					className={classes.media}
					image={post.selectedFile}
					title={post.title}
				/>
				<div className={classes.overlay}>
					<Typography variant="h6">{post.name}</Typography>
					<Typography variant="body2">
						{moment(post.createdAt).fromNow()}
					</Typography>
				</div>

				<div className={classes.details}>
					<Typography variant="body2" color="textSecondary">
						{post.tags.map((tag) => `#${tag.trim()} `)}
					</Typography>
				</div>
				<Typography className={classes.title} variant="h4" gutterBottom>
					{post.title}
				</Typography>
				<CardContent className={classes.cardContent}>
					<Typography variant="body2" color="textSecondary" gutterBottom>
						{post.message}
					</Typography>
				</CardContent>
			</ButtonBase>
			<CardActions className={classes.cardActions}>
				<Button
					size="small"
					color="primary"
					// if do not have current user, can not press the button
					disable={!user?.result}
					onClick={handleLikeClick}
				>
					<Likes />
					{/* <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like &nbsp;
          {post.likeCount} */}
				</Button>

				{
					//if user exist, show delete button
					(user?.result.googleId === post?.creator ||
						user?.result._id === post?.creator) && (
						<>
							{/* show delete button only user is exist */}
							<Button
								size="small"
								color="primary"
								onClick={() => {
									dispatch(deletePost(post._id));
								}}
							>
								<DeleteIcon fontSize="small" />
								Delete
							</Button>
							{/* show edit button only user is exist */}
							<div className={classes.overlay2}>
								<Button
									style={{ color: 'white' }}
									size="small"
									onClick={() => {
										setCurrentId(post._id);
									}}
								>
									<MoreHorizIcon />
								</Button>
							</div>
						</>
					)
				}
			</CardActions>
		</Card>
	);
};

export default Post;
