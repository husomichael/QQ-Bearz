import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Button  } from '@mui/material';

function Soundboard() {

  const history = useHistory();

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