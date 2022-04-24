import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/material';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 15}}
      >
        <RegisterForm />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <h4>Already a Member?</h4>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <button className="btn btn_sizeSm" onClick={onLogin}>
          Login
        </button>
      </Box>
    </div>
  );
};

export default LandingPage;
