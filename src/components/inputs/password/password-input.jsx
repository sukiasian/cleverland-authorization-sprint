import { useEffect, useRef } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'

import hidePasswordIcon from '../../../assets/images/icons/hide-password-icon.svg';
import showPasswordIcon from '../../../assets/images/icons/show-password-icon.svg';
import { setPasswordVisibility } from '../../../redux/actions/actions';
import { checkAppIsAtRegistrationURL } from '../../../utils/functions';
import { getRegexErrorsForPasswordValidation, PASSWORD_VALIDATION_ERRORS_NAMES, REGISTER_INPUTS } from '../../../utils/input-utils';
import { CLIENT_URL_PATHNAMES } from '../../../utils/url-pathnames';
import { getRegexValidationClassnameThroughExtractingErrorsFromErrorsArray, regexValidation } from '../regex-validation-by-patterns';

const NotifyingTip = () => { 
	const { formState: { errors } } = useFormContext();

	const appIsAtRegistrationURL = checkAppIsAtRegistrationURL();
	const appIsAtPasswordChangeURL = document.location.hash.includes(`${CLIENT_URL_PATHNAMES.FORGOT_PASS}`);

	return (appIsAtRegistrationURL || appIsAtPasswordChangeURL) 
		? 
			<p>Пароль {' '}
				<span 
					className={
						getRegexValidationClassnameThroughExtractingErrorsFromErrorsArray(
							errors, 
							REGISTER_INPUTS.password, 
							PASSWORD_VALIDATION_ERRORS_NAMES.atLeastEightCharacters
						)
					}
				>
					не менее 8 символов
				</span>, {' '}
				<span 
					className={
						getRegexValidationClassnameThroughExtractingErrorsFromErrorsArray(
							errors, 
							REGISTER_INPUTS.password, 
							PASSWORD_VALIDATION_ERRORS_NAMES.atLeastOneCapitalLetter)
						}
				>
					с заглавной буквой</span> и {' '}
				<span 
					className={
						getRegexValidationClassnameThroughExtractingErrorsFromErrorsArray(
							errors, 
							REGISTER_INPUTS.password, 
							PASSWORD_VALIDATION_ERRORS_NAMES.atLeastOneDigit)
					}
				>
					цифрой
				</span>
			</p> 
		: 
			null
				}


export const PasswordInput = ({ confirmation, focus }) => { 
	const appIsAtRegistrationURL = checkAppIsAtRegistrationURL();

	const { passwordVisibility } = useSelector((state) => state.app);
	
	const inputRef = useRef(null);

	const { control, register } = useFormContext();
	const { errors } = useFormState({ control });

	const { ref, ...rest } = register(
		REGISTER_INPUTS.password,
			
		appIsAtRegistrationURL 
			? 
				{ 
					validate: { 
						regexValidation: regexValidation(getRegexErrorsForPasswordValidation)
					}
				}
			: 
				{}
	) 

	const dispatch = useDispatch();

	const togglePasswordVisibility = () => { 
		dispatch(setPasswordVisibility(!passwordVisibility));
	}

	useEffect(() => { 
		dispatch(setPasswordVisibility(false));

		if(focus) { 
			inputRef.current.focus()
		}

		return () => { 
			dispatch(setPasswordVisibility(null));
		}
	}, []); // eslint-disable-line

	return (
		<div className='input-container input-container_password'> 
			<input 
				className={`input ${appIsAtRegistrationURL && errors?.password ? 'input_invalid' : ''}`}
				type={ passwordVisibility ? 'text' : 'password' }
				placeholder={confirmation ? 'Подтверждение пароля' : 'Пароль'} 
				{ ...rest}  
				ref={(e) => { 
					ref(e);

					if(focus) { 
						inputRef.current = e;
					}
				}}
			/> 
			<button type='button' onClick={togglePasswordVisibility}>
				<img src={ 
					passwordVisibility 
						? 
							hidePasswordIcon
						:  
							showPasswordIcon 
					} 
					alt='Показать / скрыть пароль'
				/>
			</button>
			<NotifyingTip confirmation={confirmation} />
		</div>
	)
}