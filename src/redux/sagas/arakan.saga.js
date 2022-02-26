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

function* uploadsSaga(){
  yield takeEvery('ADD_ARAKAN_PHOTO', addArakanPhoto);
  yield takeEvery('FETCH_ARAKAN_PHOTOS', fetchArakanPhotos);
  yield takeEvery('DELETE_ARAKAN_PHOTO', deleteArakanPhoto);
};

export default uploadsSaga;