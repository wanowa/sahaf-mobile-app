import {ID_CHANGE} from '../constants';
const initialState = {
  id: 0,
};
const idReducer = (state = initialState, action) => {
  switch (action.type) {
    case ID_CHANGE:
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
};
export default idReducer;
