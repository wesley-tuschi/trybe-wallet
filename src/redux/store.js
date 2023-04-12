// configure aqui sua store
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

if (window.Cypress) {
  window.store = store;
}

export default store;
