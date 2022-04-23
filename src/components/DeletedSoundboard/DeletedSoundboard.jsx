import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import SoundboardItem from "../SoundboardItem/SoundboardItem.jsx";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Cancel } from "@mui/icons-material";


function DeletedSoundboard() {
  const dispatch = useDispatch();
  const soundclips = useSelector((store) => store.soundclips);
  const user = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [clipTitle, setClipTitle] = useState("");

  useEffect(() => {
    fetchSoundClips();
    fetchTags();
  }, []);

  function fetchSoundClips() {
    dispatch({
      type: "FETCH_SOUND_CLIPS",
    });
  };

  function fetchTags() {
    dispatch({
      type: "FETCH_TAGS",
    });
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 12 }}
      >
        <Typography variant="h6">Deleted Clips</Typography>
      </Box>
      <Grid container spacing={1} sx={{ mt: 5, ml: 0.4 }}>
        {soundclips.map((soundclip) => {
          if(soundclip.deleted == true){
            return (
              <Grid item xs={2} key={soundclip.id}>
                {/* <SoundboardItem soundclip={soundclip} /> */}
              </Grid>
            );
          };
        })}
      </Grid>
    </div>
  );
}

export default DeletedSoundboard;
