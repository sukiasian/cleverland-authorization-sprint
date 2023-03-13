import { useEffect } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import hidePasswordConfirmationIcon from '../../../assets/images/icons/hide-password-icon.svg';
import showPasswordConfirmationIcon from '../../../assets/images/icons/show-password-icon.svg';
import { setPasswordConfirmationVisibility } from '../../../redux/actions/actions';
import { checkAppIsAtRegistrationURL } from '../../../utils/functions';
import { getRegexErrorsForPasswordValidation, PASSWORD_UPDATE_INPUTS } from '../../../utils/input-utils';
import { regexValidation } from '../regex-validation-by-patterns';

import style from './password-confirmation-input.module.css';

export const PasswordConfirmationInput = () => { 
	const appIsAtRegistrationURL = checkAppIsAtRegistrationURL();

	const { passwordConfirmationVisibility } = useSelector((state) => state.app);
	
	const { control, register } = useFormContext();
	const { errors } = useFormState({ control });

	const dispatch = useDispatch();

	const togglePasswordConfirmationVisibility = () => { 
		dispatch(setPasswordConfirmationVisibility(!passwordConfirmationVisibility));
	}

	useEffect(() => { 
		dispatch(setPasswordConfirmationVisibility(false));

		return () => { 
			dispatch(setPasswordConfirmationVisibility(null));
		}
	}, []); // eslint-disable-line

	return (
		<div className='input-container input-container_password'> 
			<input 
				className={`input ${appIsAtRegistrationURL && errors?.password ? 'input_invalid' : ''}`}
				type={ passwordConfirmationVisibility ? 'text' : 'password' }
				placeholder="Подтверждение пароля" 
				{ ...register(
					PASSWORD_UPDATE_INPUTS.passwordConfirmation,
		
					appIsAtRegistrationURL 
						? 
							{ 
								validate: { 
									regexValidation: regexValidation(getRegexErrorsForPasswordValidation)
								}
							}
						: 
							{}
				)}  
			/> 
			<button type='button' className={`button button_holder ${style.button_holder}`} onClick={togglePasswordConfirmationVisibility}>
				{ passwordConfirmationVisibility 
					? 
						<img 
							id='password-visibility' 
							src={hidePasswordConfirmationIcon} 
							alt='Показать / скрыть пароль' 
							data-test-id='eye-closed'
						/> 
					: 
						<img 
							id='password-visibility' 
							src={showPasswordConfirmationIcon} 
							alt='Показать / скрыть пароль' 
							data-test-id='eye-closed'
						/> }
			</button>
		</div>
	)
}