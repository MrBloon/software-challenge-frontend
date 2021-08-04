import { FETCH_GENESET } from '../actions/index';
import { UPDATE_GENESET } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_GENESET:
      return action.payload;
    case UPDATE_GENESET:
      return action.payload;
    default:
      return state;
  }
}
