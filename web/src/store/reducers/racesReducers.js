import {GET_RACES, GET_RACES_ERROR} from '../types';
import {Map} from 'immutable';

const initialState = {
  racesBySeason: Map({}),
  raceById: Map({}),
  loading: true,
};

export default function(state = initialState, action) {
  const racesBySeason = state.racesBySeason;
  const raceById = state.raceById;
  switch (action.type) {
    case GET_RACES:
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
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
