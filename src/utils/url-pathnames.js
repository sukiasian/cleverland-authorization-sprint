export const CLIENT_URL_PATHNAMES = { 
	HOME: '',
	AUTH: 'auth',
	REGISTRATION: 'registration',
	FORGOT_PASS: 'forgot-pass',
	RESET_PASS: 'reset-password',
	CONTRACT: 'contract',
	TERMS: 'terms'
};

const _apiHost = 'https://strapi.cleverland.by/api'; // eslint-disable-line

export const SERVER_URL_PATHNAMES = { 
	REGISTER: `${_apiHost}/auth/local/register`,
	AUTH: `${_apiHost}/auth/local`,
	FORGOT_PASS: `${_apiHost}/auth/forgot-password`, 
	RESET_PASS: `${_apiHost}/auth/reset-password`, 
} 