import {CLEAR_NEW_LEAGUE_CREATED, CLEAR_NEW_LEAGUE_JOINED, CREATE_LEAGUE, CREATE_LEAGUE_ERROR, CREATE_LEAGUE_SUCCESS, GET_LEAGUES, GET_LEAGUES_ERROR, GET_LEAGUES_SUCCESS, GET_LEAGUE_DETAILS, GET_LEAGUE_DETAILS_ERROR, GET_LEAGUE_DETAILS_SUCCESS, JOIN_LEAGUE, JOIN_LEAGUE_ERROR, JOIN_LEAGUE_SUCCESS} from 'store/types';
import axios from 'axios';
import config from 'config';

export const getLeagues = (userId) => async (dispatch) => {
  dispatch({type: GET_LEAGUES});
  try {
    const res = await axios.get(config.backendUrl + '/leagues?user_id=' + userId);
    dispatch({
      type: GET_LEAGUES_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: GET_LEAGUES_ERROR,
      payload: e,
    });
  }
};

export const getLeagueDetails = (leagueId, userId) => async (dispatch) => {
  dispatch({type: GET_LEAGUE_DETAILS});
  try {
    const res = await axios.get(config.backendUrl + '/leagues/' + leagueId + '?user_id=' + userId);
    dispatch({
      type: GET_LEAGUE_DETAILS_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: GET_LEAGUE_DETAILS_ERROR,
      payload: e
    })
  }
};

export const createLeague = ({leagueName, leagueSeason, userId, userName}) => async (dispatch) => {
  dispatch({type: CREATE_LEAGUE});
  try {
    const body = {
      "owner_user_id": userId,
      "owner_user_name": userName,
      "league_name": leagueName,
      "season": leagueSeason,
    }
    const res = await axios.post(config.backendUrl + '/leagues', body)
    dispatch({
      type: CREATE_LEAGUE_SUCCESS,
      payload: res.data,
      request: body,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: CREATE_LEAGUE_ERROR,
      payload: e,
    });
  }
}

export const clearNewLeagueCreated = () => async (dispatch) => {
  dispatch({type: CLEAR_NEW_LEAGUE_CREATED});
}

export const joinLeague = ({leagueId, userId, inviteToken, userName}) => async (dispatch) => {
  if (!leagueId || !inviteToken || !userId || !userName) {
    return
  }

  dispatch({type: JOIN_LEAGUE});
  try {
    const body = {
      "league_id": leagueId,
      "user_id": userId,
      "invite_token": inviteToken,
      "user_name": userName,
    }
    const res = await axios.post(config.backendUrl + '/leagues/join', body)
    dispatch({
      type: JOIN_LEAGUE_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: JOIN_LEAGUE_ERROR,
      payload: e,
    });
  }
}

export const clearNewLeagueJoined = () => async (dispatch) => {
  dispatch({type: CLEAR_NEW_LEAGUE_JOINED});
}
