import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 15 }}
      >
        <h2>Hello, {user.username}!</h2>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 10 }}
      >
        <Typography variant="p" sx={{ maxWidth: "450px" }}>
          Welcome to QQ Bearz! Be sure to check out the Soundboard. All users
          are able to experience the soundboard. If you wish to contribute to
          the soundboard, be sure to head to the request access page at the top.
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 15 }}
      >
        <LogOutButton className="btn" />
      </Box>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
