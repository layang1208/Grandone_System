import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Grid, TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

function FormInput({
  name,
  label,
  half,
  handleChange,
  type,
  autoFocus,
  handleShowPassword,
}) {
  const { control } = useFormContext();
  // const isError = false;

  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            onChange={handleChange}
            autoFocus={autoFocus}
            label={label}
            type={type}
            variant="outlined"
            InputProps={
              name === "password" && {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }
            defaultValue=""
            fullWidth
            required
            gutterBottom
          />
        )}
        // error={isError}
      ></Controller>
    </Grid>
  );
}

export default FormInput;
