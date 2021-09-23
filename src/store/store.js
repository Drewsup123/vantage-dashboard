import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './index';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;