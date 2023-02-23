import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/root-reducer';
/* eslint-disable */
export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
