import React, { useState, useEffect } from "react";
import {
	Grid,
	Grow,
	Container,
	Paper,
	AppBar,
	TextField,
	Button,
} from "@material-ui/core";

import ChipInput from "material-ui-chip-input";

import useStyles from "./postsPageStyle";
//redux config
import { useDispatch } from "react-redux";

// import actions
import { getPosts, getPostBySearch } from "../../actions/posts";

import { Posts, PostForm, Pagination } from "../../components";

import { useHistory, useLocation } from "react-router-dom";

// url search params, to know which page currently on
// and which search Term user looking for
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const PostsPage = () => {
	const [currentId, setCurrentId] = useState(0);
	const dispatch = useDispatch();
	const query = useQuery();
	const classes = useStyles();
	const history = useHistory();

	//state
	const [search, setSearch] = useState();
	const [tags, setTags] = useState([]);
	const page = query.get("page") || 1;
	const searchQuery = query.get("searchQuery");

	const handleAddTags = (tag) => setTags([...tags, tag]);
	const handleDeleteTags = (tag) => setTags(tags.filter((t) => t !== tag));
	const searchPost = () => {
		if (search || tags) {
			//dispatch get search post
			// console.log(JSON.stringify(search))
			// console.log(JSON.stringify(search).replace(/\s/g, " "))
			dispatch(
				getPostBySearch({
					search: search.trim(),
					tags: tags.join(","),
				})
			);
			history.push(
				`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
			);
		} else {
			//redirect back
			history.push("/");
		}
	};

	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			// search post
			searchPost();
		}
	};
	// useEffect(() => {
	// 	dispatch(getPosts());
	// }, [currentId, dispatch]);

	return (
		<Grow in>
			<Container className={classes.container} maxWidth="xl">
				<Grid
					container
					justifyContent="space-between"
					alignItems="stretch"
					spacing={3}
					className={classes.gridContainer}
				>
					<Grid item xs={12} sm={6} md={9}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppBar
							className={classes.appBarSearch}
							position="static"
							color="inherit"
						>
							<TextField
								name="search"
								variant="outlined"
								label="Search"
								fullWidth
								value={search}
								onChange={(e) => {
									setSearch(e.target.value);
								}}
								onKeyDown={handleKeyPress}
							/>
							<ChipInput
								defaultValue={["foo"]}
								style={{ margin: "10px 0" }}
								value={tags}
								onAdd={(tag) => handleAddTags(tag)}
								onDelete={(tag) => handleDeleteTags(tag)}
								label="Search Tags"
								variant="outlined"
							/>
							<Button
								onClick={searchPost}
								className={classes.searchButton}
								variant="contained"
								color="primary"
							>
								Search
							</Button>
						</AppBar>
						<PostForm currentId={currentId} setCurrentId={setCurrentId} />
						{!searchQuery && !tags.length && (
							<Paper elevation={6}>
								<Pagination page={page} className={classes.pagination} />
							</Paper>
						)}
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default PostsPage;
