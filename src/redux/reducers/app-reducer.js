import { HIDE_ALERT, HIDE_LOADER, SET_LOADING_SPIN_IS_OPEN, SET_PASSWORD_CONFIRMATION_VISIBILITY, SET_PASSWORD_VISIBILITY,SHOW_ALERT, SHOW_LOADER, TOGGLE_USER_MENU } from '../types/types';

const initialState = {
  isLoading: true,
  alert: null,
  HOST: 'https://strapi.cleverland.by',
  userMenuIsOpen: false,
  passwordVisibility: null,
  passwordConfirmationVisibility: null,
  loadingSpinIsOpen: null
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, isLoading: true };
    case HIDE_LOADER:
      return { ...state, isLoading: false };
    case SHOW_ALERT:
      return { ...state, alert: action.payload };
    case HIDE_ALERT:
      return { ...state, alert: null };
	case TOGGLE_USER_MENU: 
		return { ...state, userMenuIsOpen: !state.userMenuIsOpen }
	case SET_PASSWORD_VISIBILITY: 
		return { ...state, passwordVisibility: action.payload }
	case SET_PASSWORD_CONFIRMATION_VISIBILITY: 
		return { ...state, passwordConfirmationVisibility: action.payload }
	case SET_LOADING_SPIN_IS_OPEN: 
		return { ...state, loadingSpinIsOpen: action.payload }

    default:
      return state;
  }
};
