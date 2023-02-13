import { FETCH_BOOKS } from '../types/types';

const initialState = {
  books: [],
};
export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return { ...state, books: [...state.books, action.payload] };

    default:
      return state;
  }
};
