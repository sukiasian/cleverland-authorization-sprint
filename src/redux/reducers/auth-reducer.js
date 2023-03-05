import { AUTH_USER, CHANGE_ACTIVE_BOOK_IMAGE, CHANGE_ACTIVE_BOOK_TITLE, FETCH_BOOK, REGISTER_USER, REQUEST_PASSWORD_RECOVERY, UPDATE_FORGOTTEN_PASSWORD } from '../types/types';

const initialState = {};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, registerUser: action.payload };
    case AUTH_USER:
      return { ...state, authUser: action.payload };
    case REQUEST_PASSWORD_RECOVERY:
      return { ...state, requestPasswordRecovery: action.payload };
	case UPDATE_FORGOTTEN_PASSWORD: 
	  return { ...state, updateForgottenPassword: action.payload };
    default:
      return state;
  }
};
