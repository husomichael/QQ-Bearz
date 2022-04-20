import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Alert, FormControl, Stack, TextField, Typography, Button, Grid, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText  } from '@mui/material';
import SoundboardItem from '../SoundboardItem/SoundboardItem.jsx';
import AddSoundClipModal from '../AddSoundClipModal/AddSoundClipModal.jsx';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Cancel, Tag } from "@mui/icons-material";
import { DropzoneArea } from 'material-ui-dropzone';
import { useDropzone } from 'react-dropzone'

import toast from 'react-hot-toast';
import './Soundboard.css';

function Soundboard() {

  const dispatch = useDispatch();
  const history = useHistory();
  const soundclips = useSelector((store) => store.soundclips);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');

  useEffect(() => {
    fetchSoundClips();
    fetchTags();
  }, []);

  //////////////////// DROPZONE /////////////////////
  
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  function handleSelectedMp3(){
    if(selectedFile != ''){
      return(
        <Typography textAlign="center" sx={{mt:1, mb:1, color: '#38AEE5'}}>
          {`${selectedFile.name} selected.`}
        </Typography>
      )
    }else{
      return(
        <Typography textAlign="center" sx={{mt:1, mb:1, color: '#black'}}>
          {`No file selected.`}
        </Typography>
      )
    }
  };

  // const onDrop = useCallback(acceptedFiles => {
  //   alert(acceptedFiles[0].name)
  //   console.log("Now you can do anything with"+
  //         " this file as per your requirement")
  // }, [])
  
  // const { getInputProps, getRootProps } = useDropzone({ onDrop })

  //////////////////// END DROPZONE /////////////////////

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

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

  const handleSelectFile = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile);
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

  function handleClipTitle(e){
    setClipTitle(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
    toast.success(`Hellooooo`)
  };

  const handleClose = () => {
    setOpen(false);
    console.log('selectedFile:', selectedFile);
    toast.success(`Mp3 Uploaded!`);
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
          {/* <DropzoneArea
            acceptedFiles={['audio/*']}
            dropzoneText={"Drag and Drop Here or Browse Files"}
            filesLimit={1}
            maxFileSize={2097152}
            showPreviewsInDropzone={true}
            showAlerts={true}
            cancelButtonText={"cancel"}
            submitButtonText={"submit"}
            onChange={(files) => setSelectedFile(files)}
          /> */}
          {/*  //////////////////////////////////////// */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{mt: 5, mb: 5}}
          >
          <input
            accept="audio/mp3"
            type="file"
            id="select-mp3"
            style={{ display: 'none' }}
            onChange={e => setSelectedFile(e.target.files[0])}
          />
          <label htmlFor="select-mp3">
            <Button sx={{pt: 10, pb: 10, pr: 21, pl: 21, border: '2px dashed', borderColor: '#EEEEEE', color: '#89CFF0'}} variant="outlined" color="primary" component="span">
              Select mp3 to upload
            </Button>
          </label>
          </Box>
          {handleSelectedMp3()}
          {/* <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
          </div> */}
        </DialogContent>
        <DialogActions sx={{mr: '25%', ml: '25%'}}>
          <Button sx={{pl: 7, pr: 7, mb: 4}} variant="contained" color="error" onClick={handleClose}>Cancel</Button>
          <Button sx={{pl: 7, pr: 7, mb: 4}} variant="contained" onClick={handleClose}>Upload</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Soundboard;