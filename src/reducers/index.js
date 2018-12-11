import { combineReducers } from 'redux';
import copyReducer from './copyReducer';
import sectionReducer from './sectionReducer'
import refReducer from './refReducer'
import templateReducer from './templateReducer'

export default combineReducers({
    copyReducer,
    sectionReducer,
    refReducer,
    templateReducer
})
