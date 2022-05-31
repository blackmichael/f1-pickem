import {GET_RACE_SCORES, GET_RACE_SCORES_ERROR, GET_RACE_SCORES_SUCCESS} from 'store/types';
import axios from 'axios';
import config from 'config';

export const getRaceScores = (leagueId, raceId) => async (dispatch) => {
  dispatch({type: GET_RACE_SCORES});
  try {
    const res = await axios.get(config.backendUrl + '/race-scores/' + leagueId + '/' + raceId,);
    dispatch({
      type: GET_RACE_SCORES_SUCCESS,
      payload: res.data,
      raceId: raceId,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: GET_RACE_SCORES_ERROR,
      payload: e,
    });
  }
};
