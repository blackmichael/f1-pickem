import {GET_LEAGUES, GET_LEAGUES_ERROR} from 'store/types';
import axios from 'axios';
import config from 'config';

export const getLeagues = () => async (dispatch) => {
  try {
    const res = await axios.get(config.backendUrl + '/leagues');
    dispatch({
      type: GET_LEAGUES,
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
