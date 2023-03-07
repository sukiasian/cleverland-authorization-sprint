import { HIDE_ALERT, HIDE_LOADER, SHOW_ALERT, SHOW_LOADER, TOGGLE_USER_MENU } from '../types/types';

const initialState = {
  isLoading: true,
  alert: null,
  HOST: 'https://strapi.cleverland.by',
  userMenuIsOpen: false
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

    default:
      return state;
  }
};
