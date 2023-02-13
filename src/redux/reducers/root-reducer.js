import { combineReducers } from 'redux';
import { booksReducer } from './books-reducer';

export const rootReducer = combineReducers({ books: booksReducer });
