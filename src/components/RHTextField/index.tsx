import React, { useEffect, useRef } from "react";
import { FormLabel, TextField, Typography, useTheme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IRHTextField {
  name: string;
  label?: string;
  defaultValue?: string;
  placeholder: string;
  [key: string]: string | boolean | number | undefined;
}

export const RHTextField: React.FC<IRHTextField> = ({
  name,
  label,
  placeholder,
  defaultValue = "",
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const theme = useTheme();

  const isMounted = useRef(true); // Initial value _isMounted = true

  useEffect(() => {
    return () => {
      // Component Will Unmount
      isMounted.current = false;
    };
  }, []);

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => (
        <FormLabel>
          <Typography
            variant="subtitle1"
            color={theme.palette.mode === "light" ? "#343734" : "#f4f4f4"}
            sx={{ fontSize: "1.1rem", mb: 2 }}
          >
            {label}
          </Typography>
          <TextField
            {...field}
            spellCheck={false}
            // placeholder={placeholder}
            label={placeholder}
            autoComplete="off"
            fullWidth
            error={!!errors[name]}
            helperText={errors[name]?.message as React.ReactNode}
            size="small"
            {...rest}
          />
        </FormLabel>
      )}
    />
  );
};
