import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import arakan from './arakan.reducer';
import arakandeaths from './arakandeaths.reducer';
import soundclips from './soundclips.reducer';
import tags from './tags.reducer';
import users from './users.reducer';
import selectedUser from './selectedUser.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  arakan, //arakan death photos and counter
  arakandeaths, //arakan death counter reducer
  soundclips, //soundclips reducer
  tags, //soundclips tags reducer
  users, //users for admin view
  selectedUser, //selected user for managing access
});

export default rootReducer;
