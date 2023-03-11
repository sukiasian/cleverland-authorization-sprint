import { useEffect, useRef } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'

import hidePasswordIcon from '../../../assets/images/icons/hide-password-icon.svg';
import showPasswordIcon from '../../../assets/images/icons/show-password-icon.svg';
import { setPasswordVisibility } from '../../../redux/actions/actions';
import { appIsAtRegisterURL } from '../../../utils/functions';
import { PASSWORD_UPDATE_INPUTS, REGISTER_INPUTS } from '../../../utils/input-names';
import { getRegexValidationClassnameThroughExtractingErrorsFromErrorsArray, regexValidation } from '../regex-validation-by-patterns';

const PASSWORD_VALIDATION_ERRORS_NAMES = {
	atLeastOneCapitalLetter: 'atLeastOneCapitalLetter',
	atLeastOneDigit: 'atLeastOneDigit', 
	atLeastEightCharacters: 'atLeastEightCharacters'
}

const getRegexErrorsForPasswordValidation = (value) => ({
	atLeastOneCapitalLetter: !value.match(/(?=.*[A-Z])+/),
	atLeastOneDigit: !value.match(/(?=.*\d)/),
	atLeastEightCharacters: !value.match(/.{8,}/)
});

const NotifyingTip = ({ errors }) => (
	appIsAtRegisterURL 
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
);



export const PasswordInput = ({ confirmation, focus }) => { 
	const { passwordVisibility } = useSelector((state) => state.app);
	
	const inputRef = useRef(null);

	const { control, register } = useFormContext();
	const { errors } = useFormState({ control });

	const { ref, ...rest } = register(
		confirmation 
			? 
				PASSWORD_UPDATE_INPUTS.passwordConfirmation 
			: 
				REGISTER_INPUTS.password, 
		{ 
			validate: { 
				regexValidation: regexValidation(getRegexErrorsForPasswordValidation)
			
			}
		}
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
		// setValue(REGISTER_INPUTS.password, 'helloworld');

		return () => { 
			dispatch(setPasswordVisibility(null));
		}
	}, []); // eslint-disable-line

	return (
		<div className='input-container input-container_password'> 
			<input 
				className={`input ${appIsAtRegisterURL && errors?.password ? 'input_invalid' : ''}`}
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
			<NotifyingTip errors={errors} control={control}/>
		</div>
	)
}