import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { REGISTER_INPUTS } from '../../../utils/input-utils'

export const EmailInput = ({ focus }) => { 
	const inputRef = useRef(null);
	
	const { register } = useFormContext();
	const { ref, ...rest } = register(REGISTER_INPUTS.email);

	useEffect(() => { 
		if(focus) { 
			inputRef.current.focus();
		}
	}, []); // eslint-disable-line

	return (
		<input 
			type='email' 
			placeholder='E-mail' 
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