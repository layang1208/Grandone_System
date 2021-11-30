import React, { useState, useEffect } from 'react';
import {
	Typography,
	Button,
	Divider,
	Paper,
	Step,
	Stepper,
	StepLabel,
	CircularProgress,
	CssBaseline,
} from '@material-ui/core';
import useStyles from './checkoutFormStyle';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import Confirmation from '../ConfirmationForm/Confirmation';
import { commerce } from '../../../lib/commerce';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';


const CheckoutForm = ({ captureCheckout, error, refreshCart }) => {
	const [activeStep, setActiveStep] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [shippingData, setShippingData] = useState({});
	const classes = useStyles();
	const steps = ['Shipping Detail', 'Make Your Payment'];
	const history = useHistory();

	const dispatch = useDispatch();

	const { cart } = useSelector((state) => state.cart);
	const { order } = useSelector((state) => state.order);



	const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
	const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
	const next = (data) => {
		setShippingData(data);
		nextStep();
	};
	const createToken = async () => {
		try {
			const token = await commerce.checkout.generateToken(cart.id, {
				type: 'cart',
			});
			setCheckoutToken(token);
		} catch (error) {
			// go to home page if error occurs
			if (activeStep !== steps.length) history.push('/menu');
		}
	};
	useEffect(() => {
		createToken();
	}, [cart]);

	if (error) {
		<>
			<Typography variant="h5">Error: {error}</Typography>
			<br />
			<Button component={Link} to="/menu" variant="outlined">
				Back To Home
			</Button>
		</>;
	}

	const Form = () =>
		activeStep === 0 ? (
			<AddressForm checkoutToken={checkoutToken} next={next} />
		) : (
			<PaymentForm
				shippingData={shippingData}
				checkoutToken={checkoutToken}
				backStep={backStep}
				nextStep={nextStep}
				// captureCheckout={captureCheckout}
				// refreshCart={refreshCart}
			/>
		);
	console.log(shippingData);
	return (
		<>
			<CssBaseline />
			<div className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length ? (
						<Confirmation />
					) : (
						// check if the token is generate before the first render
						checkoutToken && <Form />
					)}
				</Paper>
			</main>
		</>
	);
};

export default CheckoutForm;
