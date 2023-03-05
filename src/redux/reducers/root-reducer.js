import { combineReducers } from 'redux';

import { appReducer } from './app-reducer';
import { authReducer } from './auth-reducer';
import { bookReducer } from './book-reducer';
import { booksReducer } from './books-reducer';

export const rootReducer = combineReducers({ books: booksReducer, book: bookReducer, app: appReducer, auth: authReducer });
