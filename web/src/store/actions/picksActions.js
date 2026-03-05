import {SUBMIT_PICKS, SUBMIT_PICKS_ERROR, SUBMIT_PICKS_SUCCESS} from 'store/types';
import axios from 'axios';
import config from 'config';
import { mockApi } from 'mocks/mockApi';


export const submitPicks = (picks) => async (dispatch) => {
  dispatch({type: SUBMIT_PICKS});
  try {
    const res = config.isDemoMode
      ? await mockApi.submitPicks(picks)
      : await axios.post(config.backendUrl + '/picks', picks);
    dispatch({
      type: SUBMIT_PICKS_SUCCESS,
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
