import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form'

import { REGISTER_INPUTS } from '../../../utils/input-utils';

import style from './phone-input.module.css';

const Hint = () => { 
	const { formState: { errors } } = useFormContext();

	const spanShouldBeRed = () => errors[REGISTER_INPUTS.phone] ? 'paragraph_red' : '';

	return <p className='paragraph input-hint' data-test-id='hint'><span className={`${spanShouldBeRed()}`}> В формате +375 (xx) xxx-xx-xx </span></p>
}

export const PhoneInput = ({ focus}) => {
	const inputRef = useRef(null);
	
	const { register } = useFormContext();
	const { ref, ...rest } = register(
		REGISTER_INPUTS.phone,
		{
			validate: (val) => {}
		}
	); 

	useEffect(() => {
		if(focus) { 
			inputRef.current.focus();
		}
	}, []); // eslint-disable-line

	return (
		<div className={`input-container ${style['input-container_phone']}`}> 
			<input 
				className='input'
				{ ...rest } 
				ref={(e) => { 
					ref(e);

					if(focus) { 
						inputRef.current = e; // eslint-disable-line
					}
				}}
			/>
			<p className={style.placeholder}>Номер телефона</p>
			<Hint />
		</div>
	)
}