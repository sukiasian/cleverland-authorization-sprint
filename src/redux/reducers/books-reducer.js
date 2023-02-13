import { FETCH_BOOKS, LIST_MODE, WINDOW_MODE } from '../types/types';

const initialState = {
  books: [],
};
export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return { ...state, books: [...state.books, action.payload] };
    case WINDOW_MODE:
      return { ...state, buttonMode: 'window' };
    case LIST_MODE:
      return { ...state, buttonMode: 'list' };

    default:
      return state;
  }
};
