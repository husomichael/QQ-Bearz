import { Typography, Box, Button, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function SelectedUser() {
  const dispatch = useDispatch();
  const params = useParams();
  const selectedUser = useSelector((store) => store.selectedUser);
  const user = useSelector((store) => store.user);
  const [userAccess, setUserAccess] = useState("");

  useEffect(() => {
    fetchSelectedUser();
    setUserAccess(selectedUser.access);
  }, []);

  function fetchSelectedUser() {
    dispatch({
      type: "FETCH_SELECTED_USER",
      payload: params.id,
    });
  }

  function handleSubmitChanges(){
    
  }

  console.log("userAccess:", userAccess);
  //// MENU ////

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    if (e.target.value == 1) {
      setUserAccess(1);
    } else if (e.target.value == 2) {
      setUserAccess(2);
    } else if (e.target.value == 3) {
      setUserAccess(3);
    }
  };

  function handleMenuSelect() {
    if (userAccess == 1) {
      return "New User";
    } else if (userAccess == 2) {
      return "Member";
    } else if (userAccess == 3) {
      return "Moderator";
    }
  }

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  ////////////

  return (
    <div>
      {user.access > 2 && (
        <div>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 15 }}
          >
            <Typography variant="h4">Manage access for </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 8 }}
          >
            <Typography variant="h4" sx={{color: 'blue'}}>{selectedUser.username}</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 8 }}
          >
            <Button
              id="demo-customized-button"
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {handleMenuSelect()}
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem value={1} onClick={handleClose}>
                New User
              </MenuItem>
              <MenuItem value={2} onClick={handleClose}>
                Member
              </MenuItem>
              {user.access > 3 && (
                <MenuItem value={3} onClick={handleClose}>
                  Moderator
                </MenuItem>
              )}
            </StyledMenu>
          </Box>
            {selectedUser.access != userAccess && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 18 }}
            >
              <Button variant="contained" color="success">
                Submit Changes
              </Button>
            </Box>
            )}
        </div>
      )}
      {user.access < 3 && (
        <Box display="flex" justifyContent="center" alignItems="center" onClick={handleSubmitChanges}>
          <h1>404</h1>
        </Box>
      )}
    </div>
  );
}

export default SelectedUser;
