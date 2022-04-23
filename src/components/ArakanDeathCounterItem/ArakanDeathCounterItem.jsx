import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Card, CardActionArea, CardMedia, MenuItem, Menu} from '@mui/material';

//A component for future iterations of QQ Bearz.

function ArakanDeathCounterItem({photo}) {
  // hooks being used
  const dispatch = useDispatch();
  // pieces of state being used
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  console.log('photo in item:', photo);

  // when a photo is clicked and view fill size chosen it will being opened in a new window
  // const openInNewTab = () => {
  //   const newWindow = window.open(photo.url '_blank', 'noopener,noreferrer')
  //   if (newWindow) newWindow.opener = null
  //   handleClose();
  // };

  // when a photo is clicked and delete is chosen it will dispatch the delete request
  function handleDeleteButton(){
    dispatch({
      type: 'DELETE_PHOTO',
      payload: {id: photo.id}
    })
    toast.success(`Photo deleted!`);
    handleClose();
  }

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
      <Card sx={{ maxWidth: '100%', boxshadow: 3 }}>
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

      </Card>
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
    </Box>
  )
};

export default ArakanDeathCounterItem;
