import { FETCH_BOOK } from '../types/types';

const initialState = {
  book: null,
};

export const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOK:
      return { ...state, book: action.payload };
    default:
      return state;
  }
};
