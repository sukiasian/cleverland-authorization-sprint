import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { AUTH_INPUTS } from '../../../../../utils/input-names';
import { RoundedButton } from '../../../../buttons/rounded-button';


export const AuthForm = () => {
	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();
	
	const { identifier, password } = AUTH_INPUTS;
	
	const login = () => {
		// dispatch(login);
	}
	
	return (
		<form>
			<input placeholder='Логин' { ...register(identifier) } />
			<input placeholder='Пароль' { ...register(password) } />
			<Link to='/forgot-pass'>Забыли логин или пароль?</Link>
			<RoundedButton onClick={login}> Войти </RoundedButton>
		</form>
	)
}