import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { GameCard } from "../components/GameCard";
import { Dropdown } from "../components/Dropdown";

export const Home: React.FC = () => {
  const filledArray = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <Box
      sx={{
        height: "calc(100% - 100px)",
        marginTop: "100px",
        backgroundColor: "#121212",
        overflowY: "scroll",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={"end"}
        sx={{ mb: 2, pr: 3, width: "100%" }}
      >
        <Box>
          <Typography
            variant="h2"
            color="textPrimary"
            sx={{ fontWeight: "bold" }}
          >
            Top jogos
          </Typography>
          <Typography variant="caption" color="textPrimary">
            Baseado no ranking dos usuários
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Dropdown
            placeholder="Ordenar por"
            values={[
              "Relevância",
              "Popularidade",
              "Data lançamento",
              "Média de notas",
            ]}
          />
          <Dropdown
            placeholder="Plataforma"
            values={[
              "Todas",
              "Playstation",
              "Xbox",
              "Nintendo",
              "PC",
              "Android",
              "iOS",
            ]}
          />
        </Stack>
      </Stack>

      <Masonry spacing={3} sx={{}} columns={5}>
        {filledArray.map((_, index) => (
          <Box key={index} sx={{ display: "flex", width: "100%" }}>
            <GameCard />
          </Box>
        ))}
      </Masonry>
    </Box>
  );
};
