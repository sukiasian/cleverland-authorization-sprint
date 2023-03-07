import { useForm } from 'react-hook-form'

export const PasswordUpdateForm = () => {
	const { form } = useForm();

	return <form> 
		<input placeholder="Новый пароль"/>
		<p>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>
		<input placeholder="Повторите пароль" />
	</form>
}