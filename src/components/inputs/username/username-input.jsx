import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { REGISTER_INPUTS } from '../../../utils/input-names';
import { getRegexValidationClassnameThroughExtractingErrorsFromErrorsArray, regexValidation } from '../regex-validation-by-patterns';

const appIsAtRegisterURL = window.location.hash.includes('register');

const USERNAME_VALIDATION_ERRORS_NAMES = {
	latinOnly: 'latinOnly',
	atLeastOneDigit: 'atLeastOneDigit', 
}

const getRegexErrorsForUsernameValidation = (value) => ({ 
	latinOnly:  !value.match(/^[a-zA-Z\d]+$/),
	atLeastOneDigit: !value.match(/\d/)
});

const NotifyingTip = () => { 
	const { formState: { errors }} = useFormContext();

	return (
		<p>
			Используйте для логина {' '}
				<span 
					className={
						appIsAtRegisterURL 
							? 
								getRegexValidationClassnameThroughExtractingErrorsFromErrorsArray(
									errors, 
									REGISTER_INPUTS.username, 
									USERNAME_VALIDATION_ERRORS_NAMES.latinOnly
								) 
							: 
								''
					}
				> 
					латинский алфавит и {' '}
				</span> 
				<span
					className={
						appIsAtRegisterURL 
							? 
								getRegexValidationClassnameThroughExtractingErrorsFromErrorsArray(
									errors, 
									REGISTER_INPUTS.username, 
									USERNAME_VALIDATION_ERRORS_NAMES.atLeastOneDigit
								) 
							: 
								''
					}
				> 
					цифры 
				</span>
		</p>
	)
}

export const UsernameInput = ({ innerRef }) => { 
	const { register } = useFormContext();

	const { ref, ...rest } = register(
		REGISTER_INPUTS.username, 
		{ 
			validate: { 
				regexValidation: regexValidation(getRegexErrorsForUsernameValidation)
			}
		} 
	); 

 	return (
		<React.Fragment> 
			<input 
				className=''
				placeholder={
					appIsAtRegisterURL 
						? 
							'Придумайте логин для входа' 
						: 
							'Логин' 
				} 
				{ ...rest }
				ref={(e) => { 
					ref(e);

					innerRef.current = e; // eslint-disable-line
				}}
			/>
			{ appIsAtRegisterURL ? <NotifyingTip /> : null }
		</React.Fragment>

	)

}