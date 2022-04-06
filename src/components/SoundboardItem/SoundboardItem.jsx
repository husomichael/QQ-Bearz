import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Card, CardActionArea, CardMedia, MenuItem, Menu, Typography} from '@mui/material';

function SoundboardItem({soundclip}) {

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  var audio = new Audio(`${soundclip.url}`);

  console.log('soundclip:', soundclip);

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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{mt: 1}}
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
      <Typography onClick={handlePlay}>
        {soundclip.title}

      </Typography>
    </Box>
  )
};

export default SoundboardItem;