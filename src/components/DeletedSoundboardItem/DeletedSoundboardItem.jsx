import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  Fade,
  Tooltip,
  Card,
  CardContent,
  MenuItem,
  Menu,
  Typography,
  useRadioGroup,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import toast from "react-hot-toast";

function DeletedSoundboardItem({ soundclip }) {
  const dispatch = useDispatch();
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

  // when the MoreVertIcon is clicked and restore is chosen it will dispatch the restore request
  function handleRestoreButton() {
    dispatch({
      type: "RESTORE_SOUND_CLIP",
      payload: { id: soundclip.id, url: soundclip.url },
    });
    toast.success(`Soundclip restored!`);
    handleClose();
  }

  function handlePlay() {
    audio.play();
  }

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
            sx={{ cursor: "pointer", mb: 1.5, pr: 7, pl: 7, color: "#ff6666" }}
          />
          <br />
          <Typography
            variant="h7"
            onClick={handlePlay}
            sx={{ cursor: "pointer", maxWidth: "140px" }}
          >
            {soundclip.title}
          </Typography>
          <br />
          {user.access > 2 && (
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
                <MenuItem sx={{ color: "green" }} onClick={handleRestoreButton}>
                  Restore
                </MenuItem>
              </Menu>
            </div>
          )}
        </CardContent>
      </Card>
    </Tooltip>
  );
}

export default DeletedSoundboardItem;
