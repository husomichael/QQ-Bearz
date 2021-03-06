import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
};

function* submitSoundboardRequest() {
  try{
    const response = yield axios({
      method: 'PUT',
      url: `/api/user/soundboardrequest`
    })
    yield put({
      type: 'FETCH_USER'
    })
  }catch(error){
    console.log('submitSoundboardRequest catch error:', error);
  };
};

function* fetchUsers(){
  try{
    const response = yield axios({
      method: 'GET',
      url: `/api/user/admin`
    })
    yield put({
      type: 'SET_USERS',
      payload: response.data
    })
  }catch(error){
    console.log('fetchUsers catch error:', error);
  };
};

function* fetchSelectedUser(action){
  try{
    const response = yield axios({
      method: 'GET',
      url: `/api/user/selected/${action.payload}`
    })
    yield put({
      type: 'SET_SELECTED_USER',
      payload: response.data
    })
  }catch(error){
    console.log('fetchSelectedUser error:', error);
  };
};

function* updateUserAccess(action){
  console.log('saga payload:', action.payload)
  try{
    const response = yield axios({
      method: 'PUT',
      url: `/api/user/selected/${action.payload.id}`,
      data: action.payload
    })
    yield put({
      type: 'FETCH_USERS'
    })
  }catch(error){
    console.log('updateUserAccess error:', error);
  };
};

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('SUBMIT_SOUNDBOARD_REQUEST', submitSoundboardRequest)
  yield takeLatest('FETCH_USERS', fetchUsers);
  yield takeLatest('FETCH_SELECTED_USER', fetchSelectedUser);
  yield takeLatest('UPDATE_USER_ACCESS', updateUserAccess);
}

export default userSaga;
