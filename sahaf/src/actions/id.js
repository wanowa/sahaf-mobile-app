import {ID_CHANGE} from '../constants';
export function changeId(id) {
  return {
    type: ID_CHANGE,
    payload: id,
  };
}
