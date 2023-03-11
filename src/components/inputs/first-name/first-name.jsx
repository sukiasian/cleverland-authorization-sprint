import React, { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { REGISTER_INPUTS } from '../../../utils/input-names'

const NotifyingTip = () => { 
	const { formState: { errors } } = useFormContext();

	const spanShouldBeRed = (errorName) => errors[REGISTER_INPUTS.firstName] ? 'paragraph_red' : ''

	return <p><span className={spanShouldBeRed()}>Поле не может быть пустым</span></p>
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
		<React.Fragment>
			<input 
				type='text' 
				placeholder='Имя' 
				{ ...rest }	
				ref={(e) => { 
					ref(e);

					if(focus) { 
						inputRef.current = e; // eslint-disable-line
					}
				}}
			/>
			<NotifyingTip />
		</React.Fragment>
	)

}