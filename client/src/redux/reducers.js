import { combineReducers } from 'redux';

import chat from './reducers/chat'

export default function createReducer(asyncReducers) {
    return combineReducers({
        chat,
        ...asyncReducers
    });
}