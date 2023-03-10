import { AUTH_USER, REGISTER_USER, REQUEST_PASSWORD_RECOVERY, SET_USER_REGISTRATION_CURRENT_STEP,UPDATE_FORGOTTEN_PASSWORD } from '../types/types';

const initialState = {
	registerUser: null,
	authUser: null,
	requestPasswordRecovery: null,
	updateForgottenPassword: null,
	userRegistrationCurrentStep: 1
};

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
	case SET_USER_REGISTRATION_CURRENT_STEP: 
	  return { ...state, userRegistrationCurrentStep: action.payload };
	
    default:
      return state;
  }
};
