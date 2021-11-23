import React, { useState } from "react";
import {
	Avatar,
	Container,
	Paper,
	Typography,
	Grid,
	Button,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import useStyles from "./authStyle";
import AuthInput from "../common/AuthTextInput";
import { useForm, FormProvider } from "react-hook-form";
import { useHistory } from "react-router";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";

import { useDispatch } from "react-redux";
import { signIn, signUp } from "../../actions/auth";
const Auth = () => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);

	const initState = {
		firstname: "",
		lastname: "",
		password: "",
		confirmPassword: "",
	};

	const [formData, setFormData] = useState(initState);
	const methods = useForm();
	const history = useHistory();
	const dispatch = useDispatch();
	const onSubmit = (e) => {
		e.preventDefault();
		// console.log(formData);
		if (isSignUp) {
			dispatch(signUp(formData, history));
		} else {
			dispatch(signIn(formData, history));
		}
	};
	const handleShowPassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const switchMode = () => {
		setIsSignUp((isSignUp) => !isSignUp);
		setShowPassword(false);
	};

	const clientId = process.env.REACT_APP_GOOGLE_CLIENTID;
	const googleSuccess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;
		try {
			dispatch({ type: "AUTH", data: { result, token } });
			history.push("/");
		} catch (error) {}
	};
	const googleError = (error) => {
		console.log(error);
		console.log("Google log in unsuccessful");
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlined />
				</Avatar>
				<Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
				<FormProvider {...methods}>
					<form className={classes.form} onSubmit={onSubmit}>
						<Grid container spacing={2}>
							{isSignUp ? (
								<>
									<AuthInput
										name="firstname"
										label="First Name"
										handleChange={handleChange}
										handleShowPassword={handleShowPassword}
										autoFocus
										half
									></AuthInput>
									<AuthInput
										name="lastname"
										label="Last Name"
										handleChange={handleChange}
										autoFocus
										half
									></AuthInput>
								</>
							) : null}
							<AuthInput
								name="email"
								label="Email"
								type="email"
								handleChange={handleChange}
								autoFocus
							></AuthInput>
							<AuthInput
								name="password"
								label="Password"
								type={showPassword ? "text" : "password"}
								handleChange={handleChange}
								handleShowPassword={handleShowPassword}
								autoFocus
							></AuthInput>
							{isSignUp && (
								<AuthInput
									name="confirmPassword"
									label="Confirm Password"
									handleChange={handleChange}
									type="password"
								></AuthInput>
							)}
						</Grid>

						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.submit}
							fullWidth
						>
							{isSignUp ? "Sign Up" : "Sign In"}
						</Button>
						<GoogleLogin
							clientId={clientId}
							render={(renderProps) => (
								<Button
									className={classes.googleButton}
									color="secondary"
									variant="contained"
									fullWidth
									onClick={renderProps.onClick}
									disable={renderProps.disabled}
									startIcon={<Icon />}
								>
									Google Sign In
								</Button>
							)}
							onSuccess={googleSuccess}
							onFailure={googleError}
							cookiePolicy="single_host_origin"
						/>
						<Grid container justifyContent="flex-end" spacing={3}>
							<Grid item>
								<Button onClick={switchMode}>
									{isSignUp
										? "Already have an account? Sign In"
										: "Don't have an account? Sign Up"}
								</Button>
							</Grid>
						</Grid>
					</form>
				</FormProvider>
			</Paper>
		</Container>
	);
};

export default Auth;
