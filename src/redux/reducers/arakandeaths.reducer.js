const arakanDeathReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ARAKAN_DEATHS':
      return action.payload
    default:
      return state;
  };
};

export default arakanDeathReducer;