import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Grid, Dialog, DialogTitle, DialogActions  } from '@mui/material';
import SoundboardItem from '../SoundboardItem/SoundboardItem.jsx';
import AddSoundClipModal from '../AddSoundClipModal/AddSoundClipModal.jsx';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

function Soundboard() {

  const dispatch = useDispatch();
  const history = useHistory();
  const soundclips = useSelector((store) => store.soundclips);
  // const tags = useSelector((store) => store.tags);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetchSoundClips();
    fetchTags();
  }, []);

  function goToAddSoundClip(){
    history.push('/addsoundclip');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // function goToAddSoundClip(){
  //   return(
  //     <div>
  //       <Dialog open={open} onClose={handleClose}>
  //         <DialogTitle>Test</DialogTitle>
  //         <DialogActions>
  //         <Button onClick={handleClose}>Cancel</Button>
  //         <Button onClick={handleClose}>Subscribe</Button>
  //       </DialogActions>
  //       </Dialog>
  //     </div>
  //   )
  // };

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
        <Typography variant="h5">
          Soundboard
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
        sx={{width: '150px'}}
        onClick={goToAddSoundClip}>
          <AddCircleOutlineOutlinedIcon fontSize="small" sx={{mr: 1}}/> Add a Clip
        </Button>
      </Box>
      <Grid container spacing={1} sx={{ mt:5}}>
        {soundclips.map((soundclip) =>{
          return(
            <Grid item xs={2} key={soundclip.id}>
              <SoundboardItem soundclip={soundclip} />
            </Grid>
          )
        })}
      </Grid>
    </div>
  );
};

export default Soundboard;