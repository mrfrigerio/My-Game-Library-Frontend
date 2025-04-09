import { Theme, useTheme } from "@mui/material/styles";
import Input from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { IconButton, InputAdornment, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const Dropdown: React.FC<{ values: string[]; placeholder: string }> = ({
  values,
  placeholder,
}) => {
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 180 }}>
        <Select
          size="small"
          displayEmpty
          autoWidth
          value={personName}
          onChange={handleChange}
          input={<Input sx={{ backgroundColor: "#1E1E1E", borderRadius: 2 }} />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return (
                <Typography variant="caption" sx={{ ml: 2 }}>
                  {placeholder}
                </Typography>
              );
            }

            return (
              <Typography variant="caption" sx={{ ml: 2 }}>
                {selected.join(", ")}
              </Typography>
            );
          }}
          endAdornment={
            personName?.length > 0 && (
              <InputAdornment sx={{ marginRight: "30px" }} position="end">
                <IconButton size="small" onClick={() => setPersonName([])}>
                  <ClearIcon sx={{ fontSize: "15px" }} />
                </IconButton>
              </InputAdornment>
            )
          }
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <Typography variant="caption">{placeholder}</Typography>
          </MenuItem>
          {values.map((value) => (
            <MenuItem
              key={value}
              value={value === "Todos" ? "Plataforma" : value}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
