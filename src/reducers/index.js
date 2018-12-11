import { combineReducers } from 'redux';
import copyReducer from './copyReducer';
import sectionReducer from './sectionReducer'
import refReducer from './refReducer'

export default combineReducers({
    copyReducer,
    sectionReducer,
    refReducer
})
