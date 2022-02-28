import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Button } from '@mui/material';
import ArakanDeathCounterItem from '../ArakanDeathCounterItem/ArakanDeathCounterItem.jsx';

function ArakanDeathCounter(){

  const dispatch = useDispatch();
  const history = useHistory();
  const arakan = useSelector((store) => store.arakan);
  const arakandeaths = useSelector((store) => store.arakandeaths)

  console.log('arakan up one:', arakan);

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
      payload: {deaths: arakandeaths.death_count+ 1}
    });
  };

  function goToAddPhoto(){
    history.push(`/addcorpsephoto`);
  };
  console.log(arakan);
  return(
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2">
          Arakan Deaths: {arakandeaths.death_count}
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
        {arakan.map((photo) =>{
          return(
            <div key={photo.id}>
              <ArakanDeathCounterItem photo={photo} />
            </div>
          )
        })}
    </div>
  )
};

export default ArakanDeathCounter;