import { GET_RACES, GET_RACES_ERROR, GET_RACES_SUCCESS } from '../types';
import { Map } from 'immutable';

const initialState = {
  racesBySeason: Map({}),
  raceById: Map({}),
  loading: false,
};

export default function (state = initialState, action) {
  const racesBySeason = state.racesBySeason;
  const raceById = state.raceById;

  switch (action.type) {
    case GET_RACES:
      return {
        ...state,
        loading: true,
      }

    case GET_RACES_SUCCESS:
      if (action.payload.races.length > 0) {
        racesBySeason[action.payload.races[0].season] = action.payload.races;
        action.payload.races.forEach(
          (race) => (raceById[race.id] = race),
        );
      } else {
        console.log("no races found");
      }
      return {
        ...state,
        racesBySeason: racesBySeason,
        raceById: raceById,
        loading: false,
      };

    case GET_RACES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
