import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material'

function RequestAccess() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  console.log('user:', user);

  function handleRequestSubmit(){
    dispatch({
      type: "SUBMIT_SOUNDBOARD_REQUEST",
    });
  };

  function requestAccessConditional() {
    if(user.access == 1){
      return(
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{mt: 15}}
          >
            <Typography variant="h4">
              Request Access
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 15}}
          >
            <Typography variant="p" sx={{maxWidth: '500px', fontStyle: 'italic'}}>
              To access the ability to contribute to the soundboard by uploading soundclips, submit a request for access by clicking the button below.
            </Typography>
          </Box>
          {/* If user hasn't submitted a request, show Submit Request button */}
          {!user.soundboard_access && (
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 15 }}
          >
            <Button onClick={handleRequestSubmit} size="large" variant="contained" color="success">
              Submit Request
            </Button>
          </Box>
          )}
          {/* If user has submitted a request, show "Request Submitted!" text instead. */}
          {user.soundboard_access && (
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 15 }}
          >
            <Typography variant="h5" sx={{color: "#388e3c"}}>
              Request Submitted!
            </Typography>
          </Box>
          )}
        </Box>
      )
    };
  };

  return (
    <div>
      {requestAccessConditional()}
    </div>
  )
};

export default RequestAccess;