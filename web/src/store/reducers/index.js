import { combineReducers } from 'redux';
import leaguesReducer from './leaguesReducers';
import picksReducer from './picksReducers';

export default combineReducers({
    leaguesList: leaguesReducer,
    picksSubmittedAt: picksReducer
})