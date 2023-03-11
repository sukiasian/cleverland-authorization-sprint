import axios from 'axios';

import { COOKIES_KEY, setCookieValue } from '../../utils/cookies';
import { SERVER_URL_PATHNAMES } from '../../utils/url-pathnames';
import {
  CHANGE_ACTIVE_BOOK_IMAGE,
  CHANGE_ACTIVE_BOOK_TITLE,
  CHANGE_ACTIVE_CATEGORY,
  CHANGE_SORT_ICON,
  FETCH_BOOK,
  FETCH_BOOKS,
  FETCH_CATEGORIES,
  FILTER_BOOKS,
  HIDE_ALERT,
  HIDE_LOADER,
  SEARCH_BOOKS,
  SET_AUTH_USER,
  SET_LOADING_SPIN_IS_OPEN,
  SET_PASSWORD_VISIBILITY,
  SET_REGISTER_USER,
  SET_REQUEST_PASSWORD_RECOVERY,
  SET_RESET_PASSWORD,
  SET_USER_IS_AUTHORIZED,
  SET_USER_REGISTRATION_CURRENT_STEP,
  SHOW_ALERT,
  SHOW_LOADER,
  SORT_ASCENDING,
  SORT_DESCENDING,
  TOGGLE_USER_MENU,
} from '../types/types';

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
export function showAlert(text) {
  return {
    type: SHOW_ALERT,
    payload: text,
  };
}
export function hideAlert() {
  return {
    type: HIDE_ALERT,
  };
}
export function changeActiveCategory(category) {
  return {
    type: CHANGE_ACTIVE_CATEGORY,
    payload: category,
  };
}
export function changeActiveBookImage(imageIndex) {
  return {
    type: CHANGE_ACTIVE_BOOK_IMAGE,
    payload: imageIndex,
  };
}
export function changeActiveBookTitle(title) {
  return {
    type: CHANGE_ACTIVE_BOOK_TITLE,
    payload: title,
  };
}
export function sortAscending(books) {
  return {
    type: SORT_ASCENDING,
    payload: books,
  };
}
export function sortDescending(books) {
  return {
    type: SORT_DESCENDING,
    payload: books,
  };
}
export function changeSortIcon() {
  return {
    type: CHANGE_SORT_ICON,
  };
}
export function searchBooks(text) {
  return {
    type: SEARCH_BOOKS,
    payload: text,
  };
}
export function filterBooks(books) {
  return {
    type: FILTER_BOOKS,
    payload: books,
  };
}
export function fetchBooks() {
  /* eslint-disable */
  return async function (dispatch) {
    try {
      dispatch(showLoader());
      return await axios('https://strapi.cleverland.by/api/books').then(function (response) {
        dispatch({ type: FETCH_BOOKS, payload: response.data });
        dispatch(hideLoader());
      });
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showAlert('Что-то пошло не так. Обновите страницу через некоторое время.'));
    }
  };
}

export function fetchBook(id) {
  /* eslint-disable */
  return async function (dispatch) {
    try {
      dispatch(showLoader());
      return await axios(`https://strapi.cleverland.by/api/books/${id}`).then(function (response) {
        dispatch({ type: FETCH_BOOK, payload: response.data });
        dispatch(hideLoader());
      });
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showAlert('Что-то пошло не так. Обновите страницу через некоторое время.'));
    }
  };
}

export function fetchCategories() {
  /* eslint-disable */
  return async function (dispatch) {
    try {
      dispatch(showLoader());
      return await axios('https://strapi.cleverland.by/api/categories').then(function (response) {
        dispatch({ type: FETCH_CATEGORIES, payload: response.data });
        dispatch(hideLoader());
      });
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showAlert('Что-то пошло не так. Обновите страницу через некоторое время.'));
    }
  };
}

export function setRegisterUser(payload) { 
	return async function (dispatch) { 
		try { 
			dispatch(_setLoadingSpinIsOpen(true));

			const response = await axios.post(SERVER_URL_PATHNAMES.REGISTER, payload);

			dispatch(_registerNewUser(response));
		
			const date = new Date();

			setCookieValue('jwt', response.jwt, 90);
		} catch (error) {
			dispatch(_registerNewUser(error));
		} finally { 
			dispatch(_setLoadingSpinIsOpen(false));
		}
	}
}

export function annualizeRegisterUser() { 
	return { 
		type: SET_REGISTER_USER,
		payload: null
	}
}

function _registerNewUser(payload) {
	return {
		type: SET_REGISTER_USER,
		payload
	}
} 

function _setJwtCookie() { 
	const date = new Date();
}

export function setAuthUser(payload) { 
	return async function (dispatch, getState) { 
		try { 
			dispatch(_setLoadingSpinIsOpen(true));
			
			const response = await axios.post(SERVER_URL_PATHNAMES.AUTH, payload);
			
			setCookieValue(COOKIES_KEY.USER_IS_AUTHORIZED, 'true', 90);
			
			dispatch(_authNewUser(response));
			dispatch(setUserIsAuthorized(true));
		} catch (error) {
			dispatch(_authNewUser(error));
		} finally { 
			dispatch(_setLoadingSpinIsOpen(false));
		}
	}
}

export function annualizeAuthUser() { 
	return { 
		type: SET_AUTH_USER,
		payload: null
	}
}

function _authNewUser (payload) { 
	return { 
		type: SET_AUTH_USER,
		payload
	}
}

export function setUserIsAuthorized(payload) { 
	return { 
		type: SET_USER_IS_AUTHORIZED, 
		payload
	}
}


export function setRequestPasswordRecovery(payload) { 
	return async function (dispatch, getState) { 
		try { 
			dispatch(_setLoadingSpinIsOpen(true));
			
			const response = await axios.post(SERVER_URL_PATHNAMES.FORGOT_PASS, payload);

			dispatch(_setRequestPasswordRecovery(response));
		} catch (error) {

		} finally { 
			dispatch(_setLoadingSpinIsOpen(false));
		}
	}
}

function _setRequestPasswordRecovery(payload) { 
	return { 
		type: SET_REQUEST_PASSWORD_RECOVERY, 
		payload
	}
}

export function annualizeRequestPasswordRecovery() { 
	return { 
		type: SET_REQUEST_PASSWORD_RECOVERY, 
		payload: null
	}
}

export function setResetPassword(payload) { 
	return async function (dispatch, getState) { 
		try { 
			dispatch(_setLoadingSpinIsOpen(true));

			const response = await axios.post(SERVER_URL_PATHNAMES.RESET_PASS, payload);

			dispatch(_setResetPassword(response));
		} catch (error) {

		} finally { 
			dispatch(_setLoadingSpinIsOpen(false));
		}
	}
}

function _setResetPassword(payload) { 
	return { 
		type: SET_RESET_PASSWORD, 
		payload
	}
}

export function annualizeResetPassword() { 
	_setResetPassword(null);
}

export function setUserRegistrationCurrentStep(payload) { 
	return { 
		type: SET_USER_REGISTRATION_CURRENT_STEP,
		payload
	}
}

export function toggleUserMenu() { 
	return { 
		type: TOGGLE_USER_MENU
	}
}

export function setPasswordVisibility(payload) { 
	return { 
		type: SET_PASSWORD_VISIBILITY,
		payload
	}
}

function _setLoadingSpinIsOpen(payload) { 
	return {
		type: SET_LOADING_SPIN_IS_OPEN,
		payload
	}
}

