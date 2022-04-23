import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Grid } from "@mui/material";

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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 12 }}
    >
      {user.access > 2 && (
        <div>
          <Typography variant="h6">Deleted Clips</Typography>
          <Grid container spacing={1} sx={{ mt: 5, ml: 0.4 }}>
            {soundclips.map((soundclip) => {
              if (soundclip.deleted == true) {
                return (
                  <Grid item xs={2} key={soundclip.id}>
                    {/* <DeletedSoundboardItem soundclip={soundclip} /> */}
                  </Grid>
                );
              }
            })}
          </Grid>
        </div>
      )}
      {user.access < 3 && (
        <h1>404</h1>
      )}
    </Box>
  );
}

export default DeletedSoundboard;
