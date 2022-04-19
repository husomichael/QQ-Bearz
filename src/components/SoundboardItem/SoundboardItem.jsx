import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Card, CardContent, CardActionArea, CardMedia, MenuItem, Menu, Typography, Paper} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

function SoundboardItem({soundclip}) {

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  var audio = new Audio(`${soundclip.url}`);
  
  console.log(audio);

  // const { getAudioDurationInSeconds } = require('get-audio-duration');
  // // From a readable stream...

  // const fs = require('fs');
  // const stream = fs.createReadStream(soundclip.url);

  // getAudioDurationInSeconds(stream).then((duration) => {
  //   console.log(duration);
  // });

  // when a soundclip is clicked and delete is chosen it will dispatch the delete request
  function handleDeleteButton(){
    dispatch({
      type: 'DELETE_SOUND_CLIP',
      payload: {id: soundclip.id}
    })
    toast.success(`Soundclip deleted!`);
    handleClose();
  };

  function handlePlay(){
    audio.play();
  };

  // handles the opening and closing of the menu with the options in it
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{mt: 1, pb: 3, pt: 3, mr: 6, cursor: 'pointer', width: '170px', height: '130px'}}
      onClick={handlePlay}
    >
      {/* <Card sx={{ maxWidth: '100%', boxshadow: 3 }}>
        <CardActionArea>
          <CardMedia
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            component="img"
            height="140"
            image={photo.url}
            alt="Open Full Size Image"
            onClick={handleClick}
          />
        </CardActionArea>

      </Card> */}
      {/* <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={openInNewTab}>View Full Size</MenuItem>
        <MenuItem onClick={handleDeleteButton}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Cancel</MenuItem>
      </Menu> */}
      <CardContent sx={{textAlign: 'center'}}>
        <VolumeUpIcon />
        <Typography variant='h6' sx={{ maxWidth: '140px'}}>
          {soundclip.title}
        </Typography>
        <Typography sx={{fontStyle: 'italic', fontWeight: 'light', fontSize: '10px', pt: 2}}>
          Uploaded by: {soundclip.username}
        </Typography>
      </CardContent>
    </Card>
  )
};

export default SoundboardItem;