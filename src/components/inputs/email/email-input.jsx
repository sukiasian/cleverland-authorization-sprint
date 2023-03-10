import { useFormContext } from 'react-hook-form';

import { REGISTER_INPUTS } from '../../../utils/input-names'

export const EmailInput = ({ innerRef }) => { 
	const { register } = useFormContext();

	const { ref, ...rest } = register(REGISTER_INPUTS.email);

	return (
		<input 
			type='email' 
			placeholder='E-mail' 
			{ ...rest }	
			ref={(e) => { 
				ref(e);

				if(innerRef) { 
					innerRef.current = e; // eslint-disable-line
				}
			}}
		/>
	)

}