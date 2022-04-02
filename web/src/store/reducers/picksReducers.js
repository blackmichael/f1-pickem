import {SUBMIT_PICKS, SUBMIT_PICKS_ERROR} from '../types';

const initialState = {
  submittedAt: '',
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_PICKS:
      return {
        ...state,
        submittedAt: action.payload.submitted_at,
        loading: false,
      };

    case SUBMIT_PICKS_ERROR:
      return {
        loading: false,
        error: action.payload,
        submittedAt: '',
      };

    default:
      return state;
  }
}
