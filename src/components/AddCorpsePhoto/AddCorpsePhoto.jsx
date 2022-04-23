import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';

//A component for future iterations of QQ Bearz.
function AddCorpsePhoto() {

  const history = useHistory();
  const dispatch = useDispatch();
  const [photoTitle, setPhotoTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  function handleSubmit(){
    // if (selectedFile != '' && clipTitle != '') {
      console.log('selectedFile:', selectedFile);
      dispatch({
        type: 'ADD_ARAKAN_PHOTO',
        payload: { image: selectedFile, title: photoTitle }
      });
    // };
  };

  function goToArakanDeathCounter(){
    history.push('/arakandeathcounter')
  }

  function handlePhotoTitle(e){
    setPhotoTitle(e.target.value);
  };

  return (
    <div>
      <Button onClick={goToArakanDeathCounter}>
        Back
      </Button>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h3">
          Add a Photo of Arakan's Corpse
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 3}}
      >
        <TextField
          placeholder="Photo Title"
          value={photoTitle}
          onChange={handlePhotoTitle}
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
        accept="image/*"
        onChange={(e) => setSelectedFile(e.target.files[0])} />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 3}}
      >
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default AddCorpsePhoto;