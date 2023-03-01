import { CLEAR_NEW_LEAGUE_CREATED, CLEAR_NEW_LEAGUE_JOINED, CREATE_LEAGUE, CREATE_LEAGUE_ERROR, CREATE_LEAGUE_SUCCESS, GET_LEAGUES, GET_LEAGUES_ERROR, GET_LEAGUES_SUCCESS, GET_LEAGUE_DETAILS, GET_LEAGUE_DETAILS_ERROR, GET_LEAGUE_DETAILS_SUCCESS, JOIN_LEAGUE, JOIN_LEAGUE_ERROR, JOIN_LEAGUE_SUCCESS } from '../types';
import { Map } from 'immutable';

const initialState = {
  leaguesList: [],
  leaguesMap: Map({}),
  loading: false,
  createLeagueLoading: false,
  newLeagueInviteToken: null,
  newLeagueId: null,
  joinLeagueLoading: false,
  joinLeagueError: null,
  newLeagueJoined: false,
  leagueDetailsError: null,
  leagueDetailsLoading: false,
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

    case GET_LEAGUE_DETAILS:
      return {
        ...state,
        leagueDetailsLoading: true,
      };

    case GET_LEAGUE_DETAILS_SUCCESS:
      return {
        ...state,
        leaguesList: state.leaguesList.concat(action.payload),
        leaguesMap: state.leaguesMap.merge({
          [action.payload.id]: action.payload
        }),
        leagueDetailsLoading: false,
      };

    case GET_LEAGUE_DETAILS_ERROR:
      return {
        ...state,
        leagueDetailsError: action.payload,
        leagueDetailsLoading: false,
      };

    case CREATE_LEAGUE:
      return {
        ...state,
        createLeagueLoading: true,
      }

    case CREATE_LEAGUE_SUCCESS:
      const newLeague = {
        id: action.payload.league_id,
        name: action.request.league_name,
        season: action.request.season,
        invite_token: action.payload.invite_token,
      };
      const updatedLeaguesList = state.leaguesList.concat(newLeague);
      const updatedLeaguesMap = state.leaguesMap.merge({
        [newLeague.id]: newLeague
      });
      return {
        ...state,
        createLeagueLoading: false,
        newLeagueInviteToken: action.payload.invite_token,
        leaguesList: updatedLeaguesList,
        leaguesMap: updatedLeaguesMap,
        newLeagueId: action.payload.league_id,
      }

    case CREATE_LEAGUE_ERROR:
      return {
        ...state,
        createLeagueLoading: false,
        error: action.payload,
      }

    case CLEAR_NEW_LEAGUE_CREATED:
      return {
        ...state,
        newLeagueId: null,
      }

    case JOIN_LEAGUE:
      return {
        ...state,
        joinLeagueLoading: true,
      }

    case JOIN_LEAGUE_SUCCESS:
      return {
        ...state,
        joinLeagueLoading: false,
        newLeagueJoined: true,
      }

    case JOIN_LEAGUE_ERROR:
      return {
        ...state,
        joinLeagueError: action.payload,
        joinLeagueLoading: false,
      }

    case CLEAR_NEW_LEAGUE_JOINED:
      return {
        ...state,
        newLeagueJoined: false,
        joinLeagueError: null,
      }

    default:
      return state;
  }
}
