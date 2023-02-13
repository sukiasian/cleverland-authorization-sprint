import axios from 'axios';
import { FETCH_BOOKS, HIDE_LOADER, SHOW_LOADER } from '../types/types';

export function showLoader() {
  return {
    type: SHOW_LOADER,
  };
}
export function hideLoader() {
  return {
    type: HIDE_LOADER,
  };
}
export function fetchBooks() {
  /* eslint-disable */
  return async function (dispatch) {
    dispatch(showLoader());
    return await axios('https://strapi.cleverland.by/api/books').then(function (response) {
      dispatch({ type: FETCH_BOOKS, payload: response.data });
      dispatch(hideLoader());
    });
  };
}
