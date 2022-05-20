import {GET_RACES, GET_RACES_ERROR} from 'store/types';
import axios from 'axios';
import config from 'config';

export const getRaces = (season) => async (dispatch) => {
  try {
    const res = await axios.get(config.backendUrl + '/races/' + season);
    dispatch({
      type: GET_RACES,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: GET_RACES_ERROR,
      payload: e,
    });
  }
};
