import { combineReducers } from 'redux';
import copyReducer from './copyReducer';
import sectionReducer from './sectionReducer'
import refReducer from './refReducer'
import templateReducer from './templateReducer'
import modalReducer from './modalReducer'
import updateUUIDReducer from './updateUUIDReducer'
import updateIPAddrReducer from './updateIPAddrReducer'

export default combineReducers({
    copyReducer,
    sectionReducer,
    refReducer,
    templateReducer,
    modalReducer,
    updateUUIDReducer,
    updateIPAddrReducer
})
