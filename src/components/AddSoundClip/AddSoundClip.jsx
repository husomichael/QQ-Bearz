import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';

function AddSoundClip() {

  const history = useHistory();
  const dispatch = useDispatch();
  const [clipTitle, setClipTitle] = useState('');
  const [tags, setTags] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  function goToSoundboard(){
    history.push('/soundboard');
  };

  function handleSubmit(){
    // if (selectedFile != '' && clipTitle != '') {
      console.log('selectedFile:', selectedFile);
      dispatch({
        type: 'ADD_SOUND_CLIP',
        payload: { clip: selectedFile, tags: tags, title: clipTitle }
      });
    // };
  };

  function handleClipTitle(e){
    setClipTitle(e.target.value);
  };

  function handleSetTags(e){
    setTags(e.target.value);
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
          onChange={handleClipTitle}
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
          onChange={handleSetTags}
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
        accept="audio/mp3"
        onChange={(e) => setSelectedFile(e.target.files[0])} />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 3}}
      >
        <Button onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default AddSoundClip;