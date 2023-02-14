import { FETCH_BOOKS, FETCH_CATEGORIES } from '../types/types';

const initialState = {
  books: [],
  categories: [],
};
export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return { ...state, books: [...state.books, action.payload] };
    case FETCH_CATEGORIES:
      return { ...state, categories: [...state.categories, action.payload] };

    default:
      return state;
  }
};
