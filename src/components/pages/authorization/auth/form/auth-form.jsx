import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';

import { RoundedButton } from '../../../../buttons/rounded-button';
import { PasswordInput } from '../../../../inputs/password';
import { UsernameInput } from '../../../../inputs/username/username-input';

export const AuthForm = ({ authUserHandler }) => {
	const methods = useForm({
		mode: 'onChange',
		defaultValues: { 
			identifier: '',
			password: ''
		}
	});

	return (
		<FormProvider {...methods}>
			<form className='form form_auth' data-test-id='auth-form' onSubmit={methods.handleSubmit(authUserHandler)}>
				<UsernameInput focus={true} />
				<PasswordInput />
				<Link className='link link_text' to='/forgot-pass'>
					<p className='paragraph paragraph_grey font_small form_hint'>Забыли логин или пароль?</p>
				</Link>
				<RoundedButton submit={true} isAvailable={true}>ВОЙТИ</RoundedButton>
			</form>
		</FormProvider>
	)
}