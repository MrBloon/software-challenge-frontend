import { FETCH_CARS, FETCH_CAR, CAR_CREATED, REMOVE_CAR } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_CARS: {
      return action.payload;
    }
    case FETCH_CAR: {
      return [action.payload];
    }
    case REMOVE_CAR:
      return state.filter((car) => car !== action.payload);
    default: {
      return state;
    }
  }
}
