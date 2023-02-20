import { CHANGE_ACTIVE_CATEGORY, FETCH_BOOKS, FETCH_CATEGORIES, SORT_ASCENDING, SORT_DESCENDING } from '../types/types';

const initialState = {
  books: [],
  categories: [],
  activeCategory: 'Все книги',
  sortBooks: [],
  sortButton: 'DESC',
};
export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return { ...state, books: [...state.books, action.payload] };
    case FETCH_CATEGORIES:
      return { ...state, categories: [...state.categories, action.payload] };
    case CHANGE_ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload };
    case SORT_ASCENDING:
      return { ...state, sortBooks: action.payload, sortButton: 'ASC' };
    case SORT_DESCENDING:
      return {
        ...state,
        sortBooks: action.payload,
        sortButton: 'DESC',
      };
    default:
      return state;
  }
};
