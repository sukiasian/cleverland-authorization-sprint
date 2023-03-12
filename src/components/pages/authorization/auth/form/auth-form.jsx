import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';

import { RoundedButton } from '../../../../buttons/rounded-button';
import { PasswordInput } from '../../../../inputs/password';
import { UsernameInput } from '../../../../inputs/username/username-input';

export const AuthForm = ({ authUserHandler }) => {
	const methods = useForm({
		mode: 'onChange',
		defaultValues: { 
			username: '',
			password: ''
		}
	});

	return (
		<FormProvider {...methods}>
			<form className='form form_auth' onSubmit={methods.handleSubmit(authUserHandler)}>
				<UsernameInput focus={true} />
				<PasswordInput />
				<Link to='/forgot-pass'>
					<p className='paragraph paragraph_grey font_small'>Забыли логин или пароль?</p>
				</Link>
				<RoundedButton submit={true} isAvailable={true}>ВОЙТИ</RoundedButton>
			</form>
		</FormProvider>
	)
}