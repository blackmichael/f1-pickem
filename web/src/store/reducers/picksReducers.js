import { SUBMIT_PICKS, SUBMIT_PICKS_ERROR, SUBMIT_PICKS_SUCCESS } from '../types';

const initialState = {
  submittedAt: '',
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SUBMIT_PICKS:
      return {
        ...state,
        loading: true,
      }

    case SUBMIT_PICKS_SUCCESS:
      return {
        ...state,
        submittedAt: action.payload.submitted_at,
        loading: false,
      };

    case SUBMIT_PICKS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
