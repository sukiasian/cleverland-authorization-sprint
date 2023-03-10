import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setUserRegistrationCurrentStep } from '../../../../../redux/actions/actions';

import { InputsBySteps } from './inputs-by-steps/inputs-by-steps';

// при потере фокуса либо по нажатию кнопки “следующий шаг”, подсвечиватся полностью красным текст подсказки

export const RegisterForm = () => { 
	// const { register, handleSubmit, formState, formState: { errors }, control } = useForm({ 
	const dispatch = useDispatch();

	const methods = useForm({ 
		mode: 'onChange',
		defaultValues: { 
			username: '',
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			phone: ''
		},
		
	})

	
	const registerUser = (value) => { 
		// should be used for handleSubmit(registerUser);
	}
	
	useEffect(() => () => { 
		dispatch(setUserRegistrationCurrentStep(1));
	}, []); // eslint-disable-line 

	return (
		<FormProvider { ...methods }> 
			<form onSubmit={methods.handleSubmit(registerUser)}>
				<InputsBySteps />
			</form>
		</FormProvider>
	)
};