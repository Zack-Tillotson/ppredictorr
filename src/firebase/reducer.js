import actions from '../actions';

function getInitialState() {
  return {
    isLoggedIn: false,
    userId: '',
    data: {},
    connected: false,
    serverTimeOffset: 0
  }
}

export default (state = getInitialState(), action) => {
  switch(action.type) {
    case actions.firebase:
      if(action.path == '.info/auth') {
        const isLoggedIn = !!action.data;
        const userId = isLoggedIn ? action.data.uid : '';
        return {...state, isLoggedIn, userId, authInfo: action.data};
      } else if(action.path == '.info/connected') {
        return {...state, connected: action.data};
      } else if(action.path == '.info/serverTimeOffset') {
        return {...state, serverTimeOffset: action.data};
      } else {

        // Got actual data from Firebase
        const data = state.data;
        data[action.path] = action.data;
        return {...state, data};
      }
      break;
  }
  return state;
}