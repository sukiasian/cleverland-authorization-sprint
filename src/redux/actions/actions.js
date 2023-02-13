import axios from 'axios';
import { FETCH_BOOKS, LIST_MODE, WINDOW_MODE } from '../types/types';

export function fetchBooks() {
  return function (dispatch) {
    return axios('https://strapi.cleverland.by/api/books').then((response) =>
      dispatch({ type: FETCH_BOOKS, payload: response })
    );
  };
}
export function changeWindowMode() {
  return { type: WINDOW_MODE };
}
export function changeListMode() {
  return { type: LIST_MODE };
}
