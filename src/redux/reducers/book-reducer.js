import { CHANGE_ACTIVE_BOOK_IMAGE, CHANGE_ACTIVE_BOOK_TITLE, FETCH_BOOK } from '../types/types';

const initialState = {
  book: null,
  activeBookImage: 0,
  activeBookTitle: '',
};

export const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOK:
      return { ...state, book: action.payload };
    case CHANGE_ACTIVE_BOOK_IMAGE:
      return { ...state, activeBookImage: action.payload };
    case CHANGE_ACTIVE_BOOK_TITLE:
      return { ...state, activeBookTitle: action.payload };
    default:
      return state;
  }
};
