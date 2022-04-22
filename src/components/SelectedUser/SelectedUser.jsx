import { Typography, Box, Button, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function SelectedUser() {
  const dispatch = useDispatch();
  const params = useParams();
  const selectedUser = useSelector((store) => store.selectedUser);
  const user = useSelector((store) => store.user);
  const [userAccess, setUserAccess] = useState("");

  useEffect(() => {
    fetchSelectedUser();
    setUserAccess(selectedUser.access);
  }, []);

  function fetchSelectedUser() {
    dispatch({
      type: "FETCH_SELECTED_USER",
      payload: params.id,
    });
  }


  console.log('userAccess:', userAccess);
  //// MENU ////

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    if(e.target.value == 1){
      setUserAccess(1);
    }else if(e.target.value == 2){
      setUserAccess(2);
    }else if(e.target.value == 3){
      setUserAccess(3);
    };
  };

  function handleMenuSelect(){
    if(userAccess == 1){
      return "New User"
    }else if(userAccess == 2){
      return "Member"
    }else if(userAccess == 3){
      return "Moderator"
    };
  };

  ////////////

  return (
    <div>
      {user.access > 2 && (
        <div>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4">User: {selectedUser.username}</Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{mt: 5}}>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              {handleMenuSelect()}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem value={1} onClick={handleClose}>New User</MenuItem>
              <MenuItem value={2} onClick={handleClose}>Member</MenuItem>
              {user.access > 3 && (
                <MenuItem value={3} onClick={handleClose}>Moderator</MenuItem>
              )}
            </Menu>
          </Box>
        </div>
      )}
      {user.access < 3 && (
        <Box display="flex" justifyContent="center" alignItems="center"><h1>404</h1></Box>
      )}
    </div>
  );
};

export default SelectedUser;