import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Grid, TextField, InputAdornment, IconButton } from "@material-ui/core";

const FormInput = ({ name, label, required }) => {
	const { control } = useFormContext();
	// const isError = false;

	return (
		<Grid item xs={12} sm={6}>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						label={label}
						defaultValue=""
						fullWidths
						gutterBottom
						required
					/>
				)}
				// error={isError}
			></Controller>
		</Grid>
	);
};

export default FormInput;
