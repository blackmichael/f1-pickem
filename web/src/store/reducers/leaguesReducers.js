import {GET_LEAGUES, GET_LEAGUES_ERROR} from '../types';
import {Map} from 'immutable';

const initialState = {
  leaguesList: [],
  leaguesMap: Map({}),
  loading: true,
};

export default function(state = initialState, action) {
  const leaguesMap = {};
  switch (action.type) {
    case GET_LEAGUES:
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
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
