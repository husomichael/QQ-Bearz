import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';

function AddSoundClip() {

  const history = useHistory();
  const [clipTitle, setClipTitle] = useState('');
  const [tags, setTags] = useState('');

  function goToSoundboard(){
    history.push('/soundboard');
  };

  return (
    <div>
      <Button onClick={goToSoundboard}>
        Back
      </Button>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h3">
          
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 3}}
      >
        <TextField
          placeholder="Add a Title"
          value={clipTitle}
          onChange={setClipTitle}
          sx={{
            backgroundColor: 'white'
          }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 3}}
      >
        <TextField
          placeholder="Add Tags"
          value={tags}
          onChange={setTags}
          sx={{
            backgroundColor: 'white'
          }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 3}}
      >
        <input type="file"
        accept="audio/mp3" />
      </Box>
    </div>
  );
};

export default AddSoundClip;