import { FormProvider, useForm, useWatch } from 'react-hook-form'

import { RoundedButton } from '../../../../buttons/rounded-button';
import { EmailInput } from '../../../../inputs/email';

export const PasswordRecoveryRequestForm = ({ recoverPasswordHandler }) => {
	const methods = useForm({ 
		defaultValues: { 
			email: ''
		}
	});

	const { email } = useWatch({ control: methods.control });

	const dataIsProvided = !methods.formState.errors && email;

	return (
		<FormProvider { ...methods }> 
			<form onSubmit={ methods.handleSubmit(recoverPasswordHandler) }> 
				<EmailInput focus={true} />
				<p>На это email  будет отправлено письмо с инструкциями по восстановлению пароля</p>
				<RoundedButton submit={true} isAvailable={dataIsProvided}>ВОССТАНОВИТЬ</RoundedButton>
			</form>
		</FormProvider>
	)
}