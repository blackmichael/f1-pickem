import {GET_LEAGUES, GET_LEAGUES_ERROR, GET_LEAGUES_SUCCESS} from 'store/types';
import axios from 'axios';
import config from 'config';

export const getLeagues = (userId) => async (dispatch) => {
  dispatch({type: GET_LEAGUES});
  try {
    const res = await axios.get(config.backendUrl + '/leagues/' + userId);
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
