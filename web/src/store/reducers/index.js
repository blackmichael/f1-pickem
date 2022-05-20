import {combineReducers} from 'redux';
import leaguesReducer from './leaguesReducers';
import picksReducer from './picksReducers';
import raceScoresReducer from './raceScoresReducers';
import racesReducers from './racesReducers';

export default combineReducers({
  leagues: leaguesReducer,
  picksSubmittedAt: picksReducer,
  raceScores: raceScoresReducer,
  races: racesReducers,
});
