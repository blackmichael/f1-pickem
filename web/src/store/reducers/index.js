import { combineReducers } from 'redux';
import leaguesReducer from './leaguesReducers';

export default combineReducers({
    leaguesList: leaguesReducer
})