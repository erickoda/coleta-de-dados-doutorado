import { TextField, TextFieldProps } from "@mui/material";
import React, { FC } from "react";

type NumberInputProps = {} & TextFieldProps;

const NumberInput = ({ ...props }: NumberInputProps) => {
  return (
    <>
      <TextField size="small" variant="outlined" type="text" {...props} />
    </>
  );
};

export default NumberInput;
