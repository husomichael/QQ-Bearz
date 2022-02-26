import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';

function ArakanDeathCounter(){

  

  return(
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2">
          Arakan Deaths: {arakanDeaths}
        </Typography>
      </Box>
    </div>
  )
};

export default ArakanDeathCounter;