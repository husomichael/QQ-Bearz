const arakanReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ARAKAN_PHOTOS':
      return action.payload
    default:
      return state;
  };
};

export default arakanReducer;