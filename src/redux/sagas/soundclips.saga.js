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
  console.log('delete action.payload:', action.payload)
  try{
    const response = yield axios({
      method: 'PUT',
      url: `/api/soundclips/delete/${action.payload.id}`,
      data: action.payload
    })
    yield put({
      type: 'FETCH_SOUND_CLIPS',
    })
  }catch(error){
    console.log('deleteSoundClip catch error:', error);
  };
};

function* restoreSoundClip(action){
  console.log('restore action.payload:', action.payload)
  try{
    const response = yield axios({
      method: 'PUT',
      url: `/api/soundclips/restore/${action.payload.id}`,
      data: action.payload
    })
    yield put({
      type: 'FETCH_SOUND_CLIPS',
    })
  }catch(error){
    console.log('updateSoundClip catch error:', error);
  };
};

function* fetchTags(action){
  try{
    const response = yield axios({
      method: 'GET',
      url: `/api/soundclips/tags`,
    })
    yield put({
      type: 'SET_TAGS',
      payload: response.data
    })
  }catch(error){
    console.log('fetchTags catch error:', error);
  };
};

function* soundClipsSaga(){
  yield takeEvery('ADD_SOUND_CLIP', addSoundClip);
  yield takeEvery('FETCH_SOUND_CLIPS', fetchSoundClips);
  yield takeEvery('DELETE_SOUND_CLIP', deleteSoundClip);
  yield takeEvery('FETCH_TAGS', fetchTags);
  yield takeEvery('RESTORE_SOUND_CLIP', restoreSoundClip);
};

export default soundClipsSaga;