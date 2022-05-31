import { GET_RACE_SCORES, GET_RACE_SCORES_ERROR, GET_RACE_SCORES_SUCCESS } from 'store/types';
import { Map } from 'immutable';

const initialState = {
  raceScoresMap: Map({}),
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RACE_SCORES:
      return {
        ...state,
        loading: true,
      }

    case GET_RACE_SCORES_SUCCESS:
      return {
        ...state,
        // instead of replacing the attribute, just replace the race score entry
        raceScoresMap: state.raceScoresMap.set(action.raceId, action.payload),
        loading: false,
      };

    case GET_RACE_SCORES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
