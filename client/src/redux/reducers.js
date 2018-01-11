import { combineReducers } from 'redux';

import auth from './reducers/auth'

export default function createReducer(asyncReducers) {
    return combineReducers({
        auth,
        ...asyncReducers
    });
}