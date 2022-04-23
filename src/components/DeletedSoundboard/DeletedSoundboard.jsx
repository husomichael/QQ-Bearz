import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Grid } from "@mui/material";
import DeletedSoundboardItem from "../DeletedSoundboardItem/DeletedSoundboardItem.jsx";

function DeletedSoundboard() {
  const dispatch = useDispatch();
  const soundclips = useSelector((store) => store.soundclips);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    fetchSoundClips();
  }, []);

  function fetchSoundClips() {
    dispatch({
      type: "FETCH_SOUND_CLIPS",
    });
  }

  return (
    <div>
      {user.access > 2 && (
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
              if (soundclip.deleted == true) {
                return (
                  <Grid item xs={2} key={soundclip.id}>
                    <DeletedSoundboardItem soundclip={soundclip} />
                  </Grid>
                );
              }
            })}
          </Grid>
        </div>
      )}
      {user.access < 3 && (
        <div>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 10 }}
          >
            <h1>404</h1>
          </Box>
        </div>
      )}
    </div>
  );
}

export default DeletedSoundboard;
