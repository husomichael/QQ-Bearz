import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addSoundClip(action){
  console.log('action.payload:', action.payload);
  try{
    const headers = {
      'content-type': 'multipart/form-data'
    };
    const soundClip = new FormData();
    soundClip.append('soundclip', action.payload.clip);
    soundClip.append('title', action.payload.title);
    soundClip.append('tags', action.payload.tags);
    //Probably need a one to many tags table.
    const response = yield axios({
      method: 'POST',
      url: `/api/soundclips/`,
      headers: headers, 
      data: soundClip
    })
    yield put({
      type: 'FETCH_SOUND_CLIPS'
    })
  }catch(error){
    console.log('addSoundClip catch error:', error);
  };
};

function* fetchSoundClips(action){
  try{
    const response = yield axios({
      method: 'GET',
      url: `/api/soundclips`,
    })
    yield put({
      type: 'SET_SOUND_CLIPS',
      payload: response.data
    })
  }catch(error){
    console.log('fetchSoundClips catch error:', error);
  };
};

function* deleteSoundClip(action){
  try{
    const response = yield axios({
      method: 'DELETE',
      url: `/api/soundclips/${action.payload}`,
    })
    yield put({
      type: 'FETCH_SOUND_CLIPS',
      payload: response.data
    })
  }catch(error){
    console.log('deleteSoundClip catch error:', error);
  };
};

function* soundClipsSaga(){
  yield takeEvery('ADD_SOUND_CLIP', addSoundClip);
  yield takeEvery('FETCH_SOUND_CLIPS', fetchSoundClips);
  yield takeEvery('DELETE_SOUND_CLIP', deleteSoundClip);
};

export default soundClipsSaga;