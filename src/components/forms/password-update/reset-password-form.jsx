import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { RoundedButton } from '../../buttons/rounded-button';
import { PasswordInput } from '../../inputs/password';
import { PasswordConfirmationInput } from '../../inputs/password-confirmation';

export const ResetPasswordForm = ({ resetPasswordHandler }) => {
	const methods = useForm({ 
		defaultValues: { 
			password: '',
			passwordConfirmation: '',
		}
	});

	const { password, passwordConfirmation } = useWatch({ control: methods.control });

	const dataIsProvided = password && passwordConfirmation && !methods.formState.errors.password && !methods.formState.errors.passwordConfirmation

	return (
		<FormProvider { ...methods }> 
			<form data-test-id='reset-password-form' onSubmit={methods.handleSubmit(resetPasswordHandler)}> 
				<PasswordInput focus={true} />
				<PasswordConfirmationInput />
				<RoundedButton submit={true} isAvailable={dataIsProvided}>СОХРАНИТЬ ИЗМЕНЕНИЯ</RoundedButton>
			</form>
		</FormProvider>
	)
}