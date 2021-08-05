import { FETCH_GENESET } from '../actions/index';
import { UPDATE_GENESET } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_GENESET:
      return action.payload;
    case UPDATE_GENESET:
      const copiedState = state.slice(0);
      copiedState.push(action.payload);
      return copiedState
    default:
      return state;
  }
}
