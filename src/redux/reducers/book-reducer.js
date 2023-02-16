import { CHANGE_ACTIVE_BOOK_IMAGE, FETCH_BOOK } from '../types/types';

const initialState = {
  book: null,
  activeBookImage: 0,
};

export const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOK:
      return { ...state, book: action.payload };
    case CHANGE_ACTIVE_BOOK_IMAGE:
      return { ...state, activeBookImage: action.payload };
    default:
      return state;
  }
};
