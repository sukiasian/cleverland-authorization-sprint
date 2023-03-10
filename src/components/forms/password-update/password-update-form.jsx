import { useForm } from 'react-hook-form';

import { PASSWORD_UPDATE_INPUTS } from '../../../utils/input-names';

export const PasswordUpdateForm = () => {
	const { register } = useForm();
	

	const { password, passwordConfirmation } = PASSWORD_UPDATE_INPUTS;

	// нужно раздобыть code из useParams - и объединить его с данными из формы 

	return <form> 
		<input placeholder="Новый пароль" { ...register(password) } />
		<p>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>
		<input placeholder="Повторите пароль" { ...register(passwordConfirmation) } />
	</form>
}