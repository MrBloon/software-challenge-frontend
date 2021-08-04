import { FETCH_GENESETS } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_GENESETS:
      return action.payload;
    default:
      return state;
  }
}
