import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Button, Grid } from '@mui/material';
import ArakanDeathCounterItem from '../ArakanDeathCounterItem/ArakanDeathCounterItem.jsx';

//A component for future iterations of QQ Bearz.
function ArakanDeathCounter(){

  const dispatch = useDispatch();
  const history = useHistory();
  const arakan = useSelector((store) => store.arakan);
  const arakandeaths = useSelector((store) => store.arakandeaths)

  console.log('arakan up one:', arakan);

  // useEffect(() => {
  //   dispatch({
  //     type: 'FETCH_ARAKAN_DEATHS'
  //   })
  // }, []);

  // useEffect(() => {
  //   dispatch({
  //     type: 'FETCH_ARAKAN_PHOTOS'
  //   });
  // }, [])

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
        <Typography variant="h2" sx={{mt: 4}}>
          Arakan Deaths: {arakandeaths.death_count}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button onClick={addDeath} variant="contained" sx={{mt: 4}}>
          Add To Deaths
        </Button>
        <Button onClick={goToAddPhoto} variant="contained" sx={{mt: 4, ml: 4}}>
          Add Corpse Photo
        </Button>
      </Box>
      <Grid container spacing={1} maxHeight="88%" mt={4} sx={{padding: '10px'}}>
        {arakan.map((photo) =>{
          return(
            <Grid item xs={4} key={photo.id}>
              <ArakanDeathCounterItem photo={photo} />
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
};

export default ArakanDeathCounter;