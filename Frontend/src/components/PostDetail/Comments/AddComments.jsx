import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { addComment } from '../../../actions/posts';
import useStyles from './AddCommentsStyle';

const AddComments = ({ post }) => {
	const user = JSON.parse(localStorage.getItem('profile'));
	const classes = useStyles();

	const [comments, setComments] = useState(post?.comments);
	const [comment, setComment] = useState('');
	const dispatch = useDispatch();
	const commentsRef = useRef();

	const handleComment = async () => {
		const commentFormat = `${user?.result?.name}: ${comment}`;
		const newComments = await dispatch(addComment(commentFormat, post._id));
		setComments(newComments);
		setComment('');

		commentsRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div>
			<div className={classes.commentsOuterContainer}>
				<div className={classes.commentsInnerContainer}>
					<Typography gutterBottom variant="h6">
						Comments
					</Typography>
					{comments?.map((comment, i) => (
						<Typography key={i} gutterBottom variant="subtitle1">
						
							<strong>{comment.split(': ')[0]}</strong>
							{comment.split(':')[1]}
						</Typography>
					))}
                    {/* handle with ref scroll */}
					<div ref={commentsRef} />
				</div>

				<div style={{ width: '70%' }}>
					<Typography gutterBottom variant="h6">
						Write a comment
					</Typography>
					<TextField
						fullWidth
						rows={4}
						variant="outlined"
						label="Comment"
						multiline
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<br />
					<Button
						style={{ marginTop: '10px' }}
						fullWidth
						disabled={!comment.length}
						color="primary"
						variant="contained"
						onClick={handleComment}
					>
						Comment
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AddComments;
