import { SET_AUTH_USER, SET_REGISTER_USER, SET_REQUEST_PASSWORD_RECOVERY, SET_UPDATE_FORGOTTEN_PASSWORD,SET_USER_IS_AUTHORIZED,SET_USER_REGISTRATION_CURRENT_STEP } from '../types/types';

const initialState = {
	registerUser: null,
	authUser: null,
	requestPasswordRecovery: null,
	updateForgottenPassword: null,
	userRegistrationCurrentStep: 1, 
	userIsAuthorized: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGISTER_USER:
      return { ...state, registerUser: action.payload };
    case SET_AUTH_USER:
      return { ...state, authUser: action.payload };
    case SET_REQUEST_PASSWORD_RECOVERY:
      return { ...state, requestPasswordRecovery: action.payload };
	case SET_UPDATE_FORGOTTEN_PASSWORD: 
	  return { ...state, updateForgottenPassword: action.payload };
	case SET_USER_REGISTRATION_CURRENT_STEP: 
	  return { ...state, userRegistrationCurrentStep: action.payload };
	case SET_USER_IS_AUTHORIZED: 
		return { ...state, userIsAuthorized: action.payload }
    default:
      return state;
  }
};
