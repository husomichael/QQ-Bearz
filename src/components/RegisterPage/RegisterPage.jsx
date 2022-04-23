import React from "react";
import { Box } from "@mui/material";
import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";

function RegisterPage() {
  const history = useHistory();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 15 }}
    >
      <div>
        <RegisterForm />

        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </button>
        </center>
      </div>
    </Box>
  );
}

export default RegisterPage;
