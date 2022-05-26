import {GET_RACE_SCORES, GET_RACE_SCORES_ERROR} from 'store/types';
import {Map} from 'immutable';

const initialState = {
  raceScoresMap: Map({}),
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RACE_SCORES:
      return {
        ...state,
        // instead of replacing the attribute, just replace the race score entry
        raceScoresMap: state.raceScoresMap.set(action.raceId, action.payload),
        loading: false,
      };

    case GET_RACE_SCORES_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
