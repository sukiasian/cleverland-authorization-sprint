import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form'

import { REGISTER_INPUTS } from '../../../utils/input-utils';

export const PhoneInput = ({ focus}) => {
	const inputRef = useRef(null);
	
	const { register } = useFormContext();
	const { ref, ...rest } = register(REGISTER_INPUTS.phone); 

	useEffect(() => {
		if(focus) { 
			inputRef.current.focus();
		}
	}, []); // eslint-disable-line

	return (
		<input 
			placeholder='Номер телефона' 
			{ ...rest } 
			ref={(e) => { 
				ref(e);

				if(focus) { 
					inputRef.current = e; // eslint-disable-line
				}
			}}
	 	/>
	)
}