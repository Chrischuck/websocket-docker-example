import { createStore, applyMiddleware } from 'redux';
import createReducer from './reducers';
import thunk from 'redux-thunk';


export default function configureStore() {
  const store = createStore(createReducer(), applyMiddleware(thunk));
  store.asyncReducers = {}
  return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
}