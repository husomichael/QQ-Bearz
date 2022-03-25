import React from 'react';
import { useHistory } from 'react-router-dom';
import {Box, Typography, Grid, Button} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

function UserProfile() {

  const history = useHistory();
  const user = useSelector((store) => store.user);

  console.log(user);

  //Link profile with Blizzard API
  //Append account / character info to set profile page.

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2" sx={{mt: 4}}>
          {user.username}'s Profile
        </Typography>
      </Box>
    </div>
  );
};

export default UserProfile;