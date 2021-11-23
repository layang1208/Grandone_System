import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
	Typography,
	Grid,
	Button,
	MenuItem,
	Select,
	InputLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import FormInput from "../common/CustomTextInput";
import { commerce } from "../../lib/commerce";

const AddressForm = ({ checkoutToken, next }) => {
	const methods = useForm();
	const [shippingCountries, setShippingCountries] = useState([]);
	const [shippingCountry, setShippingCountry] = useState("");
	const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
	const [shippingSubdivision, setShippingSubdivision] = useState("");
	const [shippingOptions, setShippingOptions] = useState([]);
	const [shippingOption, setShippingOption] = useState("");

	// returns only the countries which can be shipped to the current checkout
	const fetchCountries = async (checkoutTokenId) => {
		try {
			let { countries } = await commerce.services.localeListShippingCountries(
				checkoutTokenId
			);
			setShippingCountries(countries);
			// get the first specific country key as default in select
			setShippingCountry(Object.keys(countries)[0]);
		} catch (error) {}
	};

	const fetchSubdivisions = async (checkoutTokenId, countryCode) => {
		try {
			let { subdivisions } =
				await commerce.services.localeListShippingSubdivisions(
					checkoutTokenId,
					countryCode
				);
			setShippingSubdivisions(subdivisions);
			setShippingSubdivision(Object.keys(subdivisions)[0]);
		} catch (error) {}
	};

	const fetchOptions = async (checkoutTokenId, country, region = null) => {
		try {
			const options = await commerce.checkout.getShippingOptions(
				checkoutTokenId,
				{
					country,
					region,
				}
			);
			setShippingOptions(options);
			setShippingOption(options[0].id);
		} catch (error) {}
	};

	const countries = Object.entries(shippingCountries).map(([code, value]) => ({
		id: code,
		label: value,
	}));
	const subdivisions = Object.entries(shippingSubdivisions).map(
		([code, value]) => ({
			id: code,
			label: value,
		})
	);
	const options = shippingOptions.map((option) => ({
		id: option.id,
		label: `${option.description} - ${option.price.formatted_with_symbol}`,
	}));

	useEffect(() => {
		fetchCountries(checkoutToken.id);
	}, []);

	useEffect(() => {
		if (shippingCountry) fetchSubdivisions(checkoutToken.id, shippingCountry);
	}, [shippingCountry]);

	useEffect(() => {
		if (shippingSubdivision)
			fetchOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
	}, [shippingSubdivision]);
	// console.log(shippingCountries);
	// console.log(shippingCountry);
	return (
		<>
			<Typography variant="h6" gutterBottom>
				Shipping Address
			</Typography>
			<FormProvider {...methods}>
				{/* ** */}
				<form
					onSubmit={methods.handleSubmit((data) =>
						next({
							...data,
							shippingCountry,
							shippingSubdivision,
							shippingOption,
						})
					)}
				>
					<Grid container spacing={3}>
						<FormInput name="firstName" label="First Name" />
						<FormInput name="lastName" label="Last Name" />
						<FormInput name="address1" label="Address" />
						<FormInput name="email" label="Email" />
						<FormInput name="city" label="City" />
						<FormInput name="zip" label="Zip/Postal Code" />
						<Grid item xs={12} sm={6}>
							<InputLabel>Country</InputLabel>
							<Select
								onChange={(e) => setShippingCountry(e.target.value)}
								value={shippingCountry}
								fullWidth
							>
								{countries.map((country) => (
									<MenuItem key={country.id} value={country.id}>
										{country.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Province</InputLabel>
							<Select
								onChange={(e) => setShippingSubdivision(e.target.value)}
								value={shippingSubdivision}
								fullWidth
							>
								{subdivisions.map((subdivision) => (
									<MenuItem key={subdivision.id} value={subdivision.id}>
										{subdivision.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel> Shipping Options</InputLabel>
							<Select
								onChange={(e) => setShippingOption(e.target.value)}
								value={shippingOption}
								fullWidth
							>
								{options.map((option) => (
									<MenuItem key={option.id} value={option.id}>
										{option.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
					</Grid>
					<br />
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Button component={Link} to="/cart" variant="outlined">
							Back to Cart
						</Button>
						<Button type="submit" variant="contained" color="primary">
							Next
						</Button>
					</div>
				</form>
			</FormProvider>
		</>
	);
};

export default AddressForm;
