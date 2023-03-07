import { useForm } from 'react-hook-form';

import { AuthenticationWindow } from '../../../layouts/window-elements/authentication-window/authentication-window';
import { SwitchAuthType } from '../../../switch-authorization-type/switch-auth-type';

import { AuthForm } from './form';

import style from './auth.module.css'; 

export const Auth = () => { 
	const { register } = useForm();
	const a = 5;

	return (
			<AuthenticationWindow 
				heading='Вход в личный кабинет'
				form={<AuthForm />}
				bottomChildren={<SwitchAuthType />}
			/>
	)
}