import React from "react";
import { Box } from "@mui/material";
import { LoginForm } from "../components/LoginForm";

export const Login: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // height: "calc(100% - 100px)",
        flex: 1,
        backgroundColor: "#242424",
      }}
    >
      <LoginForm isOpen handleClose={() => {}} />
    </Box>
  );
};
