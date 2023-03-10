import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUserRegistrationCurrentStep } from '../../../../redux/actions/actions';
import { AuthenticationWindow } from '../../../layouts/window-elements/authentication-window/authentication-window';
import { SwitchAuthType } from '../../../switch-authorization-type/switch-auth-type';

import { RegisterForm } from './form';

export const Register = () => {
	const { userRegistrationCurrentStep } = useSelector((state) => state.auth);
	
	const dispatch = useDispatch(); 

	const totalSteps = 3;

	useEffect(() => () => { 
		dispatch(setUserRegistrationCurrentStep(null));
	}, [dispatch])

	return (
			<AuthenticationWindow 
				heading="Регистрация" 
				paragraph={`Шаг ${userRegistrationCurrentStep} из ${totalSteps}`} 
				form={<RegisterForm />} 
				bottomChildren={<SwitchAuthType />}/>
	)
}