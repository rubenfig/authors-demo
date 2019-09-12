import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import mainReducer from '../reducers/main';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  return createStore(
    combineReducers({
      main: mainReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
};



