import { Grid, TextField } from "@material-ui/core";
import React from "react";

const InputForm = ({ label, name, value, onChange, required }) => {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      ></TextField>
    </Grid>
  );
};

export default InputForm;
