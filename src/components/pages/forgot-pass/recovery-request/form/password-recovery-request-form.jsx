import { useForm } from 'react-hook-form'

import { PASSWORD_RECOVERY_REQUEST_INPUTS } from '../../../../../utils/input-names';
import { RoundedButton } from '../../../../buttons/rounded-button';

export const PasswordRecoveryRequestForm = () => {
	const { register } = useForm();
	const { email } = PASSWORD_RECOVERY_REQUEST_INPUTS;

	return (
		<form> 
			<input placeholder='Email' { ...register(email) } />
			<p>На это email  будет отправлено письмо с инструкциями по восстановлению пароля</p>
			<RoundedButton>ВОССТАНОВИТЬ</RoundedButton>
		</form>
	)
}