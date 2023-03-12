import { FormProvider, useForm, useWatch } from 'react-hook-form'

import { RoundedButton } from '../../../../buttons/rounded-button';
import { EmailInput } from '../../../../inputs/email';

export const PasswordRecoveryRequestForm = ({ requestPasswordRecoveryHandler }) => {
	const methods = useForm({ 
		defaultValues: { 
			email: ''
		}
	});

	const { email } = useWatch({ control: methods.control });

	const dataIsProvided = !methods.formState.errors && email;

	return (
		<FormProvider { ...methods }> 
			<form data-test-id='send-email-form' onSubmit={ methods.handleSubmit(requestPasswordRecoveryHandler) }> 
				<EmailInput focus={true} />
				<p>На это email  будет отправлено письмо с инструкциями по восстановлению пароля</p>
				<RoundedButton submit={true} isAvailable={dataIsProvided}>ВОССТАНОВИТЬ</RoundedButton>
			</form>
		</FormProvider>
	)
}