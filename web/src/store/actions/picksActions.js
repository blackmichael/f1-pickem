import {SUBMIT_PICKS, SUBMIT_PICKS_ERROR} from 'store/types';
import axios from 'axios';
import config from 'config';

export const submitPicks = (picks) => async (dispatch) => {
  try {
    const res = await axios.post(config.backendUrl + '/picks', picks);
    dispatch({
      type: SUBMIT_PICKS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: SUBMIT_PICKS_ERROR,
      payload: e,
    });
  }
};
