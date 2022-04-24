import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import SoundboardItem from "../SoundboardItem/SoundboardItem.jsx";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Cancel } from "@mui/icons-material";
import toast from 'react-hot-toast';


function Soundboard() {
  const dispatch = useDispatch();
  const soundclips = useSelector((store) => store.soundclips);
  const user = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [clipTitle, setClipTitle] = useState("");

  useEffect(() => {
    fetchSoundClips();
  }, []);

  //////////////////// TAGS /////////////////////////

  const [tags, SetTags] = useState([]);
  const tagRef = useRef();

  const handleDelete = (value) => {
    const newtags = tags.filter((val) => val !== value);
    SetTags(newtags);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    SetTags([...tags, tagRef.current.value]);
    tagRef.current.value = "";
  };

  const Tags = ({ data, handleDelete }) => {
    return (
      <Box
        sx={{
          background: "#283240",
          height: "100%",
          display: "flex",
          padding: "0.4rem",
          margin: "0 0.5rem 0 0",
          justifyContent: "center",
          alignContent: "center",
          color: "#ffffff",
        }}
      >
        <Stack direction="row" gap={1}>
          <Typography>{data}</Typography>
          <Cancel
            sx={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(data);
            }}
          />
        </Stack>
      </Box>
    );
  };

  //////////////////// END TAGS /////////////////////////

  function handleClipTitle(e) {
    setClipTitle(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile("");
    SetTags([]);
    setClipTitle("");
  };

  function goToAddSoundClip() {
    setOpen(true);
  };

  function fetchSoundClips() {
    dispatch({
      type: "FETCH_SOUND_CLIPS",
    });
  };

  function fetchTags() {
    dispatch({
      type: "FETCH_TAGS",
    });
  };

  function handleSubmitMp3() {
    if (selectedFile != "" && clipTitle != "") {
      console.log("selectedFile:", selectedFile);
      dispatch({
        type: "ADD_SOUND_CLIP",
        payload: { clip: selectedFile, tags: tags, title: clipTitle },
      });
      handleClose();
      toast.success(`Soundclip submitted!`);
    } else if (selectedFile == "") {
      alert("Select a file to upload!");
    } else if (clipTitle == "") {
      alert("Add a Title!");
    };
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 12 }}
      >
        <Typography variant="h6">Soundboard</Typography>
      </Box>
      {/* If user has been granted soundboard access, show Add Soundclip Button */}
      {user.access > 1 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 3, mb: 10 }}
        >
          <Button
            variant="contained"
            sx={{ width: "150px", height: "50px" }}
            onClick={goToAddSoundClip}
          >
            <AddCircleOutlineOutlinedIcon fontSize="small" sx={{ mr: 1 }} /> Add a
            Clip
          </Button>
        </Box>
      )}
      <Grid container spacing={1} sx={{ mt: 5, ml: 0.4 }}>
        {soundclips.map((soundclip) => {
          if(soundclip.deleted == false) {
            return (
              <Grid item xs={2} key={soundclip.id}>
                <SoundboardItem soundclip={soundclip} />
              </Grid>
            );
          };
        })}
      </Grid>
      <Dialog fullWidth="md" open={open} onClose={handleClose} sx={{}}>
        <DialogTitle display="flex">
          <VolumeUpIcon size="small" sx={{ color: "blue", pr: 1, mt: 2 }} />
          <Typography sx={{ pt: 2.2 }}>Add to Soundboard</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mt: 2, width: "100%" }}
            required
            inputProps={{
              maxlength: 38,
            }}
            id="standard-required"
            label="Add a Title"
            variant="standard"
            value={clipTitle}
            onChange={handleClipTitle}
          />
          <Box sx={{ flexGrow: 1, mt: 2, mb: 5 }}>
            <form onSubmit={handleOnSubmit}>
              <TextField
                inputRef={tagRef}
                fullWidth
                variant="standard"
                size="small"
                sx={{ margin: "1rem 0" }}
                margin="none"
                placeholder={tags.length < 5 ? "Enter tags" : ""}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                      {tags.map((data, index) => {
                        return (
                          <Tags
                            data={data}
                            handleDelete={handleDelete}
                            key={index}
                          />
                        );
                      })}
                    </Box>
                  ),
                }}
              />
            </form>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 5 }}
          >
            <input
              accept="audio/mp3"
              type="file"
              id="select-mp3"
              style={{ display: "none" }}
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <label htmlFor="select-mp3">
              <Button
                sx={{
                  pt: 10,
                  pb: 10,
                  pr: 21,
                  pl: 21,
                  border: "2px dashed",
                  borderColor: "#EEEEEE",
                  color: "#89CFF0",
                }}
                variant="outlined"
                color="primary"
                component="span"
              >
                Select mp3 to upload
              </Button>
            </label>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 5 }}
          >
            <Typography sx={{ color: "#D6D6D6", fontSize: "12px", mr: 18 }}>
              Accepted File Type: .mp3
            </Typography>
            <Typography sx={{ color: "#D6D6D6", fontSize: "12px", ml: 18 }}>
              Max Size: 2mb
            </Typography>
          </Box>
          {selectedFile == "" && (
            <Typography
              textAlign="center"  
              sx={{ mt: 1, mb: 1, color: "#black", fontSize: "22px" }}  
            >
              No file selected.
            </Typography>
          )}
          {selectedFile != "" && (
            <Typography
             textAlign="center"
              sx={{ mt: 1, mb: 1, color: "#38AEE5", fontSize: "22px" }}
            >
              {`${selectedFile.name} selected.`}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ mr: "25%", ml: "25%" }}>
          <Button
            sx={{ pl: 7, pr: 7, mb: 4 }}
            variant="contained"
            color="error"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{ pl: 7, pr: 7, mb: 4 }}
            variant="contained"
            onClick={handleSubmitMp3}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Soundboard;
