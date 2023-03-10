import { useFormContext } from 'react-hook-form';

import { REGISTER_INPUTS } from '../../../utils/input-names'

export const LastName = ({ innerRef }) => { 
	const { register } = useFormContext();

	const { ref, ...rest } = register(REGISTER_INPUTS.lastName);

	return (
		<input 
			type='text' 
			placeholder='Фамилия' 
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