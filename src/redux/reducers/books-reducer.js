import { CHANGE_ACTIVE_CATEGORY, FETCH_BOOKS, FETCH_CATEGORIES } from '../types/types';

const initialState = {
  books: [],
  categories: [],
  activeCategory: 'Все книги',
};
export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return { ...state, books: [...state.books, action.payload] };
    case FETCH_CATEGORIES:
      return { ...state, categories: [...state.categories, action.payload] };
    case CHANGE_ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload };

    default:
      return state;
  }
};
