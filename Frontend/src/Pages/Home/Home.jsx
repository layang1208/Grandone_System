import React from "react";
import useStyles from "./homeStyles";
import { Container } from "@material-ui/core";
const Home = () => {
	const classes = useStyles();
	return (
		<Container className={classes.container}>
			<div>Home</div>
		</Container>
	);
};

export default Home;
