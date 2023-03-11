import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';

import { RoundedButton } from '../../../../buttons/rounded-button';
import { PasswordInput } from '../../../../inputs/password';
import { UsernameInput } from '../../../../inputs/username/username-input';

export const AuthForm = ({ authUserHandler }) => {
	const inputRef = useRef(null);	

	const methods = useForm({
		mode: 'onChange',
		defaultValues: { 
			username: '',
			password: ''
		}
	});
	
	return (
		<FormProvider {...methods} >
			<form onSubmit={methods.handleSubmit(authUserHandler)}>
				<UsernameInput innerRef={inputRef} />
				<PasswordInput />
				<Link to='/forgot-pass'>Забыли логин или пароль?</Link>
				<RoundedButton submit={true}> Войти </RoundedButton>
			</form>
		</FormProvider>
	)
}