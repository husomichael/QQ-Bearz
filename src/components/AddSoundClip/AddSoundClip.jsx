import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Button, TextField, Container } from '@mui/material';
import './AddSoundClip.css';

function AddSoundClip() {

  const history = useHistory();
  const dispatch = useDispatch();
  const [clipTitle, setClipTitle] = useState('');
  const [input, setInput] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  function goToSoundboard(){
    history.push('/soundboard');
  };

  function handleSubmit(){
    if (selectedFile != '' && clipTitle != '') {
      console.log('selectedFile:', selectedFile);
      dispatch({
        type: 'ADD_SOUND_CLIP',
        payload: { clip: selectedFile, tags: tags, title: clipTitle }
      });
      goToSoundboard();
    };
  };

  function handleClipTitle(e){
    setClipTitle(e.target.value);
  };

  function handleSetTags(e){
    setTags(e.target.value);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();
  
    if ((key === ',' || key === 'Enter') && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags(prevState => [...prevState, trimmedInput]);
      setInput('');
    }
  
    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }
  
    setIsKeyReleased(false);
  };
  
  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index) => {
    setTags(prevState => prevState.filter((tag, i) => i !== index))
  };

  return (
    <div>
     <Container sx={{width: '600px'}}>
      <Button onClick={goToSoundboard}>
        Back
      </Button>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h3">
          Submit a new Soundclip
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 3}}
      >
        <TextField
          placeholder="Add a Title"
          value={clipTitle}
          onChange={handleClipTitle}
          sx={{
            backgroundColor: 'white'
          }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 3}}
      >
        <div className="tags">
          {tags.map((tag, index) => (
            <div className="tag">
              {tag}
              <button onClick={() => deleteTag(index)}>x</button>
            </div>
          ))}
          <input
            value={input}
            placeholder="Enter a tag"
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onChange={onChange}
          />
        </div>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 3}}
      >
        <input type="file"
        accept="audio/mp3"
        onChange={(e) => setSelectedFile(e.target.files[0])} />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{mt: 3}}
      >
        <Button onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      </Container>
    </div>
  );
};

export default AddSoundClip;