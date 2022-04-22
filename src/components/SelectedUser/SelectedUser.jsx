import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function SelectedUser() {
  const dispatch = useDispatch();
  const params = useParams();
  // const selectedUser = useSelector((store) => store.selectedUser);
  const user = useSelector((store) => store.user);
  const [useraccess, setUserAccess] = useState("");

  useEffect(() => {
    fetchSelectedUser();
  }, []);

  function fetchSelectedUser() {
    dispatch({
      type: "FETCH_SELECTED_USER",
      payload: params.id,
    });
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {user.access > 2 && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h4">Selected User: {}</Typography>
        </Box>
      )}
      {user.access < 3 && (
        <h1>404</h1>
      )}
    </Box>
  );
};

export default SelectedUser;