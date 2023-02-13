import { combineReducers } from 'redux';
import { appReducer } from './app-reducer';
import { booksReducer } from './books-reducer';

export const rootReducer = combineReducers({ books: booksReducer, app: appReducer });
