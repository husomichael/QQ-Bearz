import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Grid } from "@mui/material";
import DeletedSoundboardItem from "../DeletedSoundboardItem/DeletedSoundboardItem.jsx";


//This component is appending slightly left compared to every other component.
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
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 12 }}
          >
            <Typography variant="h6">Deleted Clips</Typography>
          </Box>
          <Grid container spacing={1} sx={{ mt: 19.3, ml: 0.4 }}>
            {soundclips.map((soundclip) => {
              if (soundclip.deleted == true) {
                return (
                  <Grid item xs={2} key={soundclip.id}>
                    <DeletedSoundboardItem soundclip={soundclip} />
                  </Grid>
                );
              };
            })}
          </Grid>
    </div>
  );
};

export default DeletedSoundboard;
