import { useFormContext } from 'react-hook-form'

import { REGISTER_INPUTS } from '../../../utils/input-names';

export const PhoneInput = ({ innerRef}) => { 
	const { register } = useFormContext();

	const { ref, ...rest } = register(REGISTER_INPUTS.phone); 

	return (
		<input 
			placeholder='Номер телефона' 
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