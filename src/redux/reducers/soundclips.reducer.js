const soundclipsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SOUND_CLIPS':
      return action.payload
    default:
      return state;
  };
};

export default soundclipsReducer;