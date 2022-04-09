import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Grid  } from '@mui/material';
import SoundboardItem from '../SoundboardItem/SoundboardItem.jsx';

function Soundboard() {

  const dispatch = useDispatch();
  const history = useHistory();
  const soundclips = useSelector((store) => store.soundclips);
  const tags = useSelector((store) => store.tags);

  useEffect(() => {
    fetchSoundClips();
    fetchTags();
  }, []);

  function goToAddSoundClip(){
    history.push('/addsoundclip');
  };

  function fetchSoundClips(){
    dispatch({
      type: 'FETCH_SOUND_CLIPS'
    });
  };

  function fetchTags(){
    dispatch({
      type: 'FETCH_TAGS'
    });
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
      <Grid container spacing={1} maxHeight="88%" mt={4} sx={{padding: '10px'}}>
        {soundclips.map((soundclip) =>{
          return(
            <Grid item xs={4} key={soundclip.id}>
              <SoundboardItem soundclip={soundclip} />
            </Grid>
          )
        })}
      </Grid>
    </div>
  );
};

export default Soundboard;