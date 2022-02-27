import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Button } from '@mui/material';

function ArakanDeathCounter(){

  const dispatch = useDispatch();
  const arakan = useSelector((store) => store.arakan);

  useEffect(() => {
    dispatch({
      type: 'FETCH_ARAKAN_DEATHS'
    })
  }, []);

  useEffect(() => {
    dispatch({
      type: 'FETCH_ARAKAN_PHOTOS'
    });
  }, [])

  function addDeath(){
    dispatch({
      type: 'ADD_ARAKAN_DEATH',
      payload: {deaths: arakan.deaths + 1}
    });
  };

  function goToAddPhoto(){
    history.push(`/addcorpsephoto`);
  };

  return(
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2">
          Arakan Deaths: {arakan.deaths}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button onClick={addDeath} variant="contained">
          Add To Deaths
        </Button>
        <Button onClick={goToAddPhoto} variant="contained">
          Add Corpse Photo
        </Button>
      </Box>
    </div>
  )
};

export default ArakanDeathCounter;