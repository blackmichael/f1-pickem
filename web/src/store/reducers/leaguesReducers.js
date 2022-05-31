import { GET_LEAGUES, GET_LEAGUES_ERROR, GET_LEAGUES_SUCCESS } from '../types';
import { Map } from 'immutable';

const initialState = {
  leaguesList: [],
  leaguesMap: Map({}),
  loading: false,
};

export default function (state = initialState, action) {
  const leaguesMap = {};
  switch (action.type) {
    case GET_LEAGUES:
      return {
        ...state,
        loading: true,
      }

    case GET_LEAGUES_SUCCESS:
      action.payload.leagues.forEach(
        (league) => (leaguesMap[league.id] = league),
      );
      return {
        ...state,
        leaguesList: action.payload.leagues,
        leaguesMap: Map(leaguesMap),
        loading: false,
      };

    case GET_LEAGUES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
