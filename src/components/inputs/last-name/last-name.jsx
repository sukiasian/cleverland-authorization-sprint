import { useFormContext } from 'react-hook-form';

import { REGISTER_INPUTS } from '../../../utils/input-utils'

import style from './last-name-input.module.css';

const Hint = () => { 
	const { formState: { errors } } = useFormContext();

	const spanShouldBeRed = () => errors[REGISTER_INPUTS.lastName] ? 'paragraph_red' : ''

	return <p className='paragraph input-hint' data-test-id='hint'><span className={spanShouldBeRed()} data-test-id='hint'>Поле не может быть пустым</span></p>
}

export const LastName = ({ innerRef }) => { 
	const { register } = useFormContext();

	const { ref, ...rest } = register(REGISTER_INPUTS.lastName);

	return (
		<div className={`input-container ${style['input-container_last-name']}`}> 
			<input 
				className='input'
				type='text' 
				{ ...rest }	
				ref={(e) => { 
					ref(e);

					if(innerRef) { 
						innerRef.current = e; // eslint-disable-line
					}
				}}
			/>
			<p className={style.placeholder}>Фамилия</p>
			<Hint />
		</div>
	)

}