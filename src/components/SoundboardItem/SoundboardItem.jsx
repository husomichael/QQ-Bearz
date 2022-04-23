import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  IconButton,
  Fade,
  Tooltip,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  MenuItem,
  Menu,
  Typography,
  Paper,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlinedIcon from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function SoundboardItem({ soundclip }) {
  const dispatch = useDispatch();
  // const [audioPlay, setAudioPlay] = useState(false);
  const user = useSelector((store) => store.user);
  var audio = new Audio(soundclip.url);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // when the MoreVertIcon is clicked and delete is chosen it will dispatch the delete request
  function handleDeleteButton() {
    dispatch({
      type: "DELETE_SOUND_CLIP",
      payload: { id: soundclip.id, url: soundclip.url },
    });
    handleClose();
  }

  function handlePlay() {
    audio.play();
  }

  const handleDeleteMenu = () => {
    //TODO: add admin conditional
    if (user.id == soundclip.user_id || user.access > 2)
      return (
        <div>
          <IconButton
            aria-label="more"
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ mt: 3 }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem sx={{ color: "red" }} onClick={handleDeleteButton}>
              Delete
            </MenuItem>
          </Menu>
        </div>
      );
  };

  return (
    <Tooltip title={`Uploaded by: ${soundclip.username}`} placement="top">
      <Card sx={{ mt: 0.5, pb: 3, pt: 3, width: "170px", height: "130px" }}>
        <CardContent
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: "center" }}
        >
          <VolumeUpIcon
            fontSize="medium"
            onClick={handlePlay}
            sx={{ cursor: "pointer", mb: 1.5, pr: 7, pl: 7, color: "#03C04A" }}
          />
          <br />
          <Typography variant="h7" onClick={handlePlay} sx={{ cursor: "pointer", maxWidth: "140px" }}>
            {soundclip.title}
          </Typography>
          <br />
          {handleDeleteMenu()}
        </CardContent>
      </Card>
    </Tooltip>
  );
}

export default SoundboardItem;
