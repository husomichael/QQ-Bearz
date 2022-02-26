const arakanReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ARAKAN_PHOTOS':
      return {...state, photos: action.payload};
    case 'SET_ARAKAN_DEATHS':
      return {...state, deaths: action.payload};
    default:
      return state;
  };
};

export default photosReducer;