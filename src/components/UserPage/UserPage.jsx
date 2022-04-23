import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Paper } from "@mui/material";

function UserPage() {
  const user = useSelector((store) => store.user);
  return (
    <Paper
        sx={{ pt: 1, mt: 15, ml: 45, mr: 45, width: '500px', height: '635px', backgroundColor: "#F5F5F5"}}
      >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h3" sx={{mt: 10}}>Hello, {user.username}!</Typography>
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
    </Paper>
  )
};

export default UserPage;
