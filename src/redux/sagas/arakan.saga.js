import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addArakanPhoto(action){
  try{
    const headers = {
      'content-type': 'multipart/form-data'
    };
    const imageForm = new FormData();
    imageForm.append('image', action.payload.image);
    const response = yield axios({
      method: 'POST',
      url: `/api/arakan`,
      headers: headers, 
      data: imageForm
    })
    yield put({
      type: 'FETCH_ARAKAN_PHOTOS',
    })
  }catch(error){
    console.log('addArakanPhoto catch error:', error);
  };
};

function* fetchArakanPhotos(action){
  try{
    const response = yield axios({
      method: 'GET',
      url: `/api/arakan`
    })
    yield put({
      type: 'SET_ARAKAN_PHOTOS',
      payload: response.data
    })
  }catch(error){
    console.log('fetchArakanPhotos catch error:', error);
  };
};

function* deleteArakanPhoto(action){
  try{
    const response = yield axios({
      method: 'DELETE',
      url: `/api/arakan/${action.payload.id}`,
    })
    yield put({
      type: 'FETCH_ARAKAN_PHOTOS'
    })
  }catch(error){
    console.log('deleteArakanPhoto catch error:', error);
  };
};

function* fetchArakanDeaths(action){
  try{
    const response = yield axios({
      method: 'GET',
      url: `/api/arakan/deaths`,
    })
    yield put({
      type: 'SET_ARAKAN_DEATHS',
      payload: response.data
    })
  }catch(error){
    console.log('fetchArakanDeaths catch error:', error);
  };
};

function* addArakanDeath(action){
  console.log('addArakanDeath payload:', action.payload);
  try{
    const response = yield axios({
      method: 'PUT',
      url: '/api/arakan/deaths',
      data: action.payload
    })
    yield put({
      type: 'FETCH_ARAKAN_DEATHS'
    })
  }catch(error){
    console.log('addArakanDeath catch error:', error);
  };
};

function* uploadsSaga(){
  yield takeEvery('ADD_ARAKAN_PHOTO', addArakanPhoto);
  yield takeEvery('FETCH_ARAKAN_PHOTOS', fetchArakanPhotos);
  yield takeEvery('DELETE_ARAKAN_PHOTO', deleteArakanPhoto);
  yield takeEvery('FETCH_ARAKAN_DEATHS', fetchArakanDeaths);
  yield takeEvery('ADD_ARAKAN_DEATH', addArakanDeath);
};

export default uploadsSaga;