import React, { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { REGISTER_INPUTS } from '../../../utils/input-utils'

import style from './first-name-input.module.css';

const Hint = () => { 
	const { formState: { errors } } = useFormContext();

	const spanShouldBeRed = () => errors[REGISTER_INPUTS.firstName] ? 'paragraph_red' : ''

	return <p className='paragraph input-hint'><span className={spanShouldBeRed()} data-test-id='hint'>Поле не может быть пустым</span></p>
}

export const FirstName = ({ focus }) => { 
	const inputRef = useRef(null);

	const { register } = useFormContext();
	const { ref, ...rest } = register(REGISTER_INPUTS.firstName, { minLength: 1 });

	useEffect(() => { 
		if(focus) { 
			inputRef.current.focus();
		}
	}, []); // eslint-disable-line

	return (
		<div className={`input-container ${style['input-container_first-name']}`}> 
			<input 
				className='input'
				type='text' 
				{ ...rest }	
				ref={(e) => { 
					ref(e);

					if(focus) { 
						inputRef.current = e; // eslint-disable-line
					}
				}}
			/>
			<p className={style.placeholder}>Имя</p>
			<Hint />
		</div>
	)

}