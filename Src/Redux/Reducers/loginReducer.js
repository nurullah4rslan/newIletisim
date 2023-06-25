const INITIAL_STATE = {
  accessToken: null,
  name: null,
  myId: null,
  mySection: null,
  personType: null,
  advisoryId: null,
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
      return {...state, mySection: action.mySection};
    case 'PERSON_TYPE':
      return {...state, personType: action.personType};
    case 'ADVISORY_ID':
      return {...state, advisoryId: action.advisoryId};
    default:
      return state;
  }
};
