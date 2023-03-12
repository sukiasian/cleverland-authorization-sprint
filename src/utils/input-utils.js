export const REGISTER_INPUTS = { 
	email: 'email',
	password: 'password',
	username: 'username',
	firstName: 'firstName',
	lastName: 'lastName',
	phone: 'phone'
};

export const AUTH_INPUTS = {
	identifier: 'identifier',
    password: 'password'
}

export const PASSWORD_RECOVERY_REQUEST_INPUTS = { 
	email: 'email'
}

export const PASSWORD_UPDATE_INPUTS = { 
	password: 'password',
  	passwordConfirmation: 'passwordConfirmation',
  	code: 'code' // coming from URL
}

export const PASSWORD_VALIDATION_ERRORS_NAMES = {
	atLeastOneCapitalLetter: 'atLeastOneCapitalLetter',
	atLeastOneDigit: 'atLeastOneDigit', 
	atLeastEightCharacters: 'atLeastEightCharacters'
}

export const getRegexErrorsForPasswordValidation = (value) => ({
	atLeastOneCapitalLetter: !value.match(/(?=.*[A-Z])+/),
	atLeastOneDigit: !value.match(/(?=.*\d)/),
	atLeastEightCharacters: !value.match(/.{8,}/)
});
