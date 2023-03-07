import { useForm } from 'react-hook-form'

import { RoundedOrangeButton } from '../../../../buttons/rounded-orange-button/rounded-orange-button';

export const PasswordRecoveryRequestForm = () => {
	const { form } = useForm();

	return (
		<form> 
			<input placeholder='Email'/>
			<p>На это email  будет отправлено письмо с инструкциями по восстановлению пароля</p>
			<RoundedOrangeButton>ВОССТАНОВИТЬ</RoundedOrangeButton>
		</form>
	)
}