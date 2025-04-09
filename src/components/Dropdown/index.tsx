import { Controller } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IconButton, InputAdornment, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface DropdownProps {
  values: string[];
  placeholder: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
}

export const Dropdown: React.FC<DropdownProps> = ({
  values,
  placeholder,
  name,
  control,
}) => {
  return (
    <FormControl size="small" sx={{ width: "100%" }}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            size="small"
            fullWidth
            displayEmpty
            value={field.value || ""}
            onChange={field.onChange}
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <Typography variant="body1" color="textSecondary">
                    {placeholder}
                  </Typography>
                );
              }

              return selected;
            }}
            endAdornment={
              field.value && (
                <InputAdornment sx={{ marginRight: "30px" }} position="end">
                  <IconButton size="small" onClick={() => field.onChange("")}>
                    <ClearIcon sx={{ fontSize: "15px" }} />
                  </IconButton>
                </InputAdornment>
              )
            }
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              {placeholder}
            </MenuItem>
            {values.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};
