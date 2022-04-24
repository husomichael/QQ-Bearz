import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
} from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function GrantAccess() {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector((store) => store.users);
  const user = useSelector((store) => store.user);
  const [userrank, setUserRank] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  function handleUserRank(e) {
    setUserRank(e.target.value);
  }

  function fetchUsers() {
    dispatch({
      type: "FETCH_USERS",
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 10 }}
    >
      {user.access > 2 && (
        <TableContainer sx={{ maxWidth: "800px" }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="right">Rank</TableCell>
                <TableCell align="right">Requested Access</TableCell>
                <TableCell align="right">Manage Access</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.username}</TableCell>
                  {row.access == 1 && (
                    <TableCell align="right">New User</TableCell>
                  )}
                  {row.access == 2 && (
                    <TableCell align="right">Member</TableCell>
                  )}
                  {row.access == 3 && (
                    <TableCell align="right">Moderator</TableCell>
                  )}
                  {row.access == 4 && (
                    <TableCell align="right">Admin</TableCell>
                  )}
                  {row.soundboard_access && (
                    <TableCell
                      align="right"
                      sx={{ color: "green", fontSize: "18px" }}
                    >
                      Requested
                    </TableCell>
                  )}
                  {!row.soundboard_access && (
                    <TableCell
                      align="right"
                      sx={{ color: "green", fontSize: "18px" }}
                    ></TableCell>
                  )}
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => history.push(`/selecteduser/${row.id}`)}
                    >
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {user.access < 3 && <h1>404</h1>}
    </Box>
  );
};

export default GrantAccess;

