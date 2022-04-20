import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, FormControl, Stack, TextField, Typography, Button, Grid, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText  } from '@mui/material';
import SoundboardItem from '../SoundboardItem/SoundboardItem.jsx';
import AddSoundClipModal from '../AddSoundClipModal/AddSoundClipModal.jsx';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Cancel, Tag } from "@mui/icons-material";
import { DropzoneArea } from 'material-ui-dropzone';
import './Soundboard.css';

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

  //////////////////// TAGS /////////////////////////

  const [tags, SetTags] = useState([]);
  const tagRef = useRef();

  const handleDelete = (value) => {
    const newtags = tags.filter((val) => val !== value);
    SetTags(newtags);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    SetTags([...tags, tagRef.current.value]);
    tagRef.current.value = "";
  };

  const Tags = ({ data, handleDelete }) => {
    return (
      <Box
        sx={{
          background: "#283240",
          height: "100%",
          display: "flex",
          padding: "0.4rem",
          margin: "0 0.5rem 0 0",
          justifyContent: "center",
          alignContent: "center",
          color: "#ffffff",
        }}
      >
        <Stack direction='row' gap={1}>
          <Typography>{data}</Typography>
          <Cancel
            sx={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(data);
            }}
          />
        </Stack>
      </Box>
    );
  };

  //////////////////// END TAGS /////////////////////////

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
          <VolumeUpIcon size="small" sx={{color: 'blue', pr: 1, mt: 2}} />
          <Typography sx={{pt: 2.2}}>
            Add to Soundboard
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
          sx={{mt: 2, width: '100%'}}
          required
          id="standard-required"
          label="Add a Title"
          variant="standard"
        />
          <Box sx={{ flexGrow: 1, mt: 2, mb: 5 }}>
            <form onSubmit={handleOnSubmit}>
              <TextField
                inputRef={tagRef}
                fullWidth
                variant='standard'
                size='small'
                sx={{ margin: "1rem 0" }}
                margin='none'
                placeholder={tags.length < 5 ? "Enter tags" : ""}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                      {tags.map((data, index) => {
                        return (
                          <Tags data={data} handleDelete={handleDelete} key={index} />
                        );
                      })}
                    </Box>
                  ),
                }}
              />
            </form>
          </Box>
          <DropzoneArea
            className="dropzone"
            onChange={(files) => console.log('Files:', files)}
          />
        </DialogContent>
        <DialogActions sx={{mr: '25%', ml: '25%'}}>
          <Button sx={{pl: 7, pr: 7}} variant="contained" color="error" onClick={handleClose}>Cancel</Button>
          <Button sx={{pl: 7, pr: 7}} variant="contained" onClick={handleClose}>Upload</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Soundboard;