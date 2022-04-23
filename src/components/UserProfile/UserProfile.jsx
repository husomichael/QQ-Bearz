import React from 'react';
import { useHistory } from 'react-router-dom';
import {Box, Typography} from '@mui/material';
import { useSelector } from 'react-redux';

function UserProfile() {

  const history = useHistory();
  const user = useSelector((store) => store.user);

  console.log(user);

  //TODO: Link profile with Blizzard API
  //TODO: Append account / character info to set profile page.

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