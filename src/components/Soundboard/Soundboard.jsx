import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Typography, Button, Grid, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText  } from '@mui/material';
import SoundboardItem from '../SoundboardItem/SoundboardItem.jsx';
import AddSoundClipModal from '../AddSoundClipModal/AddSoundClipModal.jsx';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

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

  // function goToAddSoundClip(){
  //   history.push('/addsoundclip');
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function goToAddSoundClip(){
    setOpen(true);
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
        sx={{mt: 10}}
      >
        <Typography variant="h6">
          Soundboard
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 3, mb: 10}}
      >
        <Button 
        variant="contained"
        sx={{width: '150px', height: '50px'}}
        onClick={goToAddSoundClip}>
          <AddCircleOutlineOutlinedIcon fontSize="small" sx={{mr: 1}}/> Add a Clip
        </Button>
      </Box>
      <Grid container spacing={1} sx={{ mt:5, ml: .4}}>
        {soundclips.map((soundclip) =>{
          return(
            <Grid item xs={2} key={soundclip.id}>
              <SoundboardItem soundclip={soundclip} />
            </Grid>
          )
        })}
      </Grid>
      <Dialog  
      fullWidth="md" 
      open={open} 
      onClose={handleClose}
      sx={{}}>
        <DialogTitle display="flex">
          <VolumeUpIcon size="small" sx={{color: 'blue', pr: 1}} />
          <Typography sx={{mt: .3}}>
            Add to Soundboard
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            sx={{mt: 1, width: '90%'}}
            required
            id="outlined-required"
            label="Add a Title"
            inputProps={{
              maxlength: 28
            }}
          />
          <TextField
            sx={{mt: 1, width: '90%'}}
            required
            id="outlined-required"
            label="Add a Title"
            inputProps={{
              maxlength: 28
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Soundboard;