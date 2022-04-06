import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button  } from '@mui/material';

// var audio = new Audio("soundfile.wav");

// document.onclick = function() {
//   audio.play();
// }

function Soundboard() {

  const dispatch = useDispatch();
  const history = useHistory();
  const soundclips = useSelector((store) => store.soundclips);

  useEffect(() => {
    dispatch({
      type: 'FETCH_SOUND_CLIPS'
    })
  }, []);

  function goToAddSoundClip(){
    history.push('/addsoundclip');
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2">
          QQ Soundboard
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 3}}
      >
        <Button 
        variant="contained"
        onClick={goToAddSoundClip}>
          Add New SoundClip
        </Button>
      </Box>
    </div>
  );
};

export default Soundboard;