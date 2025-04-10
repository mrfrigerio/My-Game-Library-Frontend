import React, { useEffect, useRef } from "react";
import {
  FormControl,
  FormLabel,
  TextField as MUITextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IRHTextField {
  name: string;
  label?: string;
  defaultValue?: string;
  placeholder: string;
  [key: string]: string | boolean | number | undefined;
}

export const TextField: React.FC<IRHTextField> = ({
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
    <FormControl size="small" sx={{ width: "100%" }}>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field }) => (
          <FormLabel sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              color={theme.palette.mode === "light" ? "#343734" : "#f4f4f4"}
              sx={{ fontSize: "1.1rem", mb: 2 }}
            >
              {label}
            </Typography>
            <MUITextField
              {...field}
              spellCheck={false}
              // placeholder={placeholder}
              label={placeholder}
              autoComplete="off"
              fullWidth
              error={!!errors[name]}
              helperText={errors[name]?.message as React.ReactNode}
              size="small"
              variant="outlined"
              {...rest}
            />
          </FormLabel>
        )}
      />
    </FormControl>
  );
};
