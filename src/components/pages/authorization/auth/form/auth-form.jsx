import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { RoundedOrangeButton } from '../../../../buttons/rounded-orange-button/rounded-orange-button';

export const AuthForm = () => {
	const { form } = useForm();
	const dispatch = useDispatch();

	const login = () => {
		// dispatch(login);
	}
	
	return (
		<form>
			<input placeholder='Логин' />
			<input placeholder='Пароль' />
			<Link to='/forgot-pass'>Забыли логин или пароль?</Link>
			<RoundedOrangeButton onClick={login}>Войти</RoundedOrangeButton>
		</form>
	)
}