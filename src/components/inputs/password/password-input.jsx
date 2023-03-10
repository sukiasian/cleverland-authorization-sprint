import { useEffect } from 'react';
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
);



export const PasswordInput = ({ confirmation }) => { 
	const { control, register } = useFormContext();
	const { passwordVisibility } = useSelector((state) => state.app);

	const { errors } = useFormState({ control });

	const dispatch = useDispatch();

	const togglePasswordVisibility = () => { 
		dispatch(setPasswordVisibility(!passwordVisibility));
	}

	useEffect(() => { 
		dispatch(setPasswordVisibility(false));

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
				{ ...register(
					confirmation 
						? 
							PASSWORD_UPDATE_INPUTS.passwordConfirmation 
						: 
							REGISTER_INPUTS.password, 
					{ 
						validate: { 
							regexValidation: regexValidation(getRegexErrorsForPasswordValidation)
						
						}
					}) 
				}  
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