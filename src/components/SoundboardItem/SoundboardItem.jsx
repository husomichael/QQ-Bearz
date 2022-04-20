import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardContent, CardActionArea, CardMedia, MenuItem, Menu, Typography, Paper} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DeleteIcon from '@mui/icons-material/Delete';

function SoundboardItem({soundclip}) {

  const dispatch = useDispatch();
  // const [audioPlay, setAudioPlay] = useState(false);
  const user = useSelector((store) => store.user);
  var audio = new Audio(soundclip.url);
  console.log('user:', user);

  // audio.onended = handleEnded;

  // let volumeIcon =  {color: 'blue'}

  // function handleEnded(){
  //   setAudioPlay(false);
  // };

  // function handleIcon(){
  //   if(audioPlay == false){
  //     return (
  //       <VolumeUpIcon />
  //     )
  //   }else{
  //     return (
  //       <VolumeUpIcon sx={{color: 'blue'}}/>
  //     )
  //   };
  // }

  // when a soundclip is clicked and delete is chosen it will dispatch the delete request
  function handleDeleteButton(){
    console.log('delete');
    dispatch({
      type: 'DELETE_SOUND_CLIP',
      payload: {id: soundclip.id}
    })
    toast.success(`Soundclip deleted!`);
  };

  function handlePlay(){
    audio.play();
  };

  const handleTrash = () => {
    //TODO: add admin conditional
    if(user.id == soundclip.user_id)
    return (
      <DeleteIcon fontSize="small" onClick={handleDeleteButton} sx={{ bottom: 0, pt: 1, color: 'red'}}/>
    )
  };

  return (
    <Card
      sx={{mt: .5, pb: 3, pt: 3, width: '170px', height: '130px'}}
    >
      <CardContent sx={{textAlign: 'center'}}>
        <VolumeUpIcon onClick={handlePlay} sx={{cursor: 'pointer', mb: 1}}/>
        <br />
        <Typography variant='h7' sx={{ maxWidth: '140px'}}>
          {soundclip.title}
        </Typography>
        <Typography sx={{fontStyle: 'italic', fontWeight: 'light', fontSize: '10px', pt: 2}}>
          Uploaded by: {soundclip.username}
        </Typography>
        {handleTrash()}
      </CardContent>
    </Card>
  )
};

export default SoundboardItem;