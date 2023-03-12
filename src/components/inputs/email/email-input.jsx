import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { REGISTER_INPUTS } from '../../../utils/input-utils'
import { emailRegexValidation } from '../regex-validation-by-patterns';

import style from './email-input.module.css';

const Hint = () => { 
	const { formState: { errors } } = useFormContext();

	const spanShouldBeRed = () => errors[REGISTER_INPUTS.email] ? 'paragraph_red' : '';

	return (
		<p className='paragraph input-hint'>
			<span className={spanShouldBeRed()} data-test-id='hint'>Введите корректный e-mail</span>
		</p>
	)
}

export const EmailInput = ({ focus }) => { 
	const inputRef = useRef(null);
	
	const { register } = useFormContext();
	const { ref, ...rest } = register(
		REGISTER_INPUTS.email, 
		{ 
			validate: { 
				isEmail: emailRegexValidation
			}
		}
	);

	useEffect(() => { 
		if(focus) { 
			inputRef.current.focus();
		}
	}, []); // eslint-disable-line

	return (
		<div className={`input-container ${style['input-container_email']}`}>
			<input  
				className='input'
				autoComplete='off'
				type='email' 
				{ ...rest }	
				ref={(e) => { 
					ref(e);

					if(focus) { 
						inputRef.current = e; // eslint-disable-line
					}
				}}
			/>
			<p className={style.placeholder}>E-mail</p>
			<Hint />
		</div>
	)
}