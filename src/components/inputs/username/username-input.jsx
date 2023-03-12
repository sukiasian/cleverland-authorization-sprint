import React, { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { checkAppIsAtRegistrationURL } from '../../../utils/functions';
import { AUTH_INPUTS, REGISTER_INPUTS } from '../../../utils/input-utils';
import { getRegexValidationClassnameThroughExtractingErrorsFromErrorsArray, regexValidation } from '../regex-validation-by-patterns';

import style from './username-input.module.css';

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
	const appIsAtRegistrationURL = checkAppIsAtRegistrationURL();

	return appIsAtRegistrationURL
		? 
			<p className='paragraph input-hint' data-test-id='hint'>
				Используйте для логина {' '}
					<span 
						className={
							checkAppIsAtRegistrationURL() 
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
							appIsAtRegistrationURL 
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
		:
			null
}

export const UsernameInput = ({ focus }) => {
	const appIsAtRegistrationURL = checkAppIsAtRegistrationURL();

	const inputRef = useRef();
	
	const { register } = useFormContext();
	const { ref, ...rest } = register(
		appIsAtRegistrationURL ? REGISTER_INPUTS.username : AUTH_INPUTS.identifier, 
		appIsAtRegistrationURL 
			? 
				{
					validate: { 
						regexValidation: regexValidation(getRegexErrorsForUsernameValidation)
					}
				} 
			: 
				{}
		); 
		
	useEffect(() => { 
		if(focus) { 
			inputRef?.current.focus();
		}
	}, []); // eslint-disable-line

 	return (
		<div className={`input-container ${style['input-container_username']}}`}>
			<input 
				className='input'
				{ ...rest }
				autoComplete='off'
				ref={(e) => { 
					ref(e);

					if(focus) { 
						inputRef.current = e; // eslint-disable-line
					}
				}}
			/>
			<p className={style.placeholder}>
				{
					appIsAtRegistrationURL 
						? 
							'Придумайте логин для входа' 
						: 
								'Логин' 
				}
			</p>
			<NotifyingTip />
		</div>

	)

}