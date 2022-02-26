const arakanReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ARAKAN_PHOTOS':
      return {...state, photos: action.payload};
    case 'SET_ARAKAN_DEATHS':
      return {...state, deaths: action.payload[0].death_count};
    default:
      return state;
  };
};

export default arakanReducer;