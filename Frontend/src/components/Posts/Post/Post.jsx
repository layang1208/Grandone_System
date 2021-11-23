import React from "react";
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	Button,
	ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import moment from "moment";
import useStyles from "./postStyle";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePost, updateLike } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("profile"));
	const history = useHistory();
	const ifCurrentUser = () => {};

	const openPostDetail = (e) => {
		history.push(`/posts/${post._id}`);
	};
	const Likes = () => {
		if (post.likes.length > 0) {
			return post.likes.find(
				(like) => like === (user?.result.googleId || user?.result._id)
			) ? (
				<>
					<ThumbUpAltIcon fontSize="small" />
					&nbsp;
					{post.likes.length > 2
						? `You and ${post.likes.length - 1} others`
						: `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize="small" />
					&nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
				</>
			);
		}
		// console.log(post.likes.length);
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
					onClick={() => {
						dispatch(updateLike(post._id));
					}}
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
									style={{ color: "white" }}
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
