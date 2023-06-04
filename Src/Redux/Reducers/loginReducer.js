const INITIAL_STATE = {
  accessToken: null,
  name: null,
  myId: null,
  myBolum: null,
  type: null,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOKEN':
      return {...state, accessToken: action.accessToken};
    case 'NAME':
      return {...state, name: action.name};
    case 'MY_ID':
      return {...state, myId: action.myId};
    case 'MY_SECTION':
      return {...state, myBolum: action.myBolum};
    case 'TYPE':
      return {...state, type: action.type};
    default:
      return state;
  }
};
