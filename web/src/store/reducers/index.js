import {combineReducers} from 'redux';
import leaguesReducer from './leaguesReducers';
import picksReducer from './picksReducers';
import raceScoresReducer from './raceScoresReducers';

export default combineReducers({
  leagues: leaguesReducer,
  picksSubmittedAt: picksReducer,
  raceScores: raceScoresReducer,
});
