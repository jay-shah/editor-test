import { combineReducers } from 'redux';
import copyReducer from './copyReducer';
import sectionReducer from './sectionReducer'

export default combineReducers({
    copyReducer,
    sectionReducer
})
