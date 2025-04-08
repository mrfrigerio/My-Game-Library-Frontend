import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { gameData } from "../../assets/game-data";
import {
  BsPlaystation,
  BsXbox,
  BsNintendoSwitch,
  BsMicrosoft,
} from "react-icons/bs";
import { Box, Stack, Tooltip } from "@mui/material";

export function GameCard() {
  return (
    <Card
      sx={{
        width: 260,
        position: "relative",
        borderRadius: 2,
        ":hover": {
          transition: "0.5s",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          backgroundColor: "#1e1e1e",
          transform: "scale(1.02)",
          cursor: "pointer",
        },
      }}
    >
      <Tooltip title="Favoritar" placement="left">
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          size="small"
        >
          <FavoriteBorderIcon />
        </IconButton>
      </Tooltip>

      {/* <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={gameData.name}
        subheader={gameData.released}
      /> */}
      <CardMedia
        component="img"
        height="140"
        image={gameData.background_image}
        alt=""
      />
      <CardContent>
        <Typography variant="h6" sx={{}}>
          {gameData.name}
        </Typography>
      </CardContent>
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <CardActions disableSpacing>
          <Tooltip title="PC">
            <IconButton size="small">
              <BsMicrosoft size={14} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Playstation">
            <IconButton size="small">
              <BsPlaystation />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xbox">
            <IconButton size="small">
              <BsXbox size={14} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Nintendo Switch">
            <IconButton size="small">
              <BsNintendoSwitch size={14} />
            </IconButton>
          </Tooltip>
        </CardActions>
        <Tooltip title="Metacritic Score">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 1,
              border: "1px solid",
              borderColor: gameData.metacritic > 80 ? "#6DC74A" : "#F3C848",
              padding: "1px 5px",
              borderRadius: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: gameData.metacritic > 80 ? "#6DC74A" : "#F3C848",
                fontWeight: 600,
              }}
            >
              {gameData.metacritic}
            </Typography>
          </Box>
        </Tooltip>
      </Stack>
    </Card>
  );
}
