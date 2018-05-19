import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './redux';

const store = createStore(
  reducer,
  applyMiddleware( thunk , loggerMiddleware )
);

export default store;
