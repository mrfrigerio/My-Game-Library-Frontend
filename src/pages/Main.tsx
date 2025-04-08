import React from "react";
import { Box } from "@mui/material";
import { GameCard } from "../components/GameCard";

export const Main: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100% - 65px)",
        marginTop: "65px",
        width: "100%",
        flex: 1,
        backgroundColor: "#242424",
      }}
    >
      <GameCard />
    </Box>
  );
};
