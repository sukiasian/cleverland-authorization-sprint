import { FormProvider, useForm } from 'react-hook-form';

import { PasswordInput } from '../../inputs/password';

export const ResetPasswordForm = ({ resetPasswordHandler }) => {
	const methods = useForm({ 
		defaultValues: { 
			password: '',
			passwordConfirmation: '',
		}
	});

	return (
		<FormProvider { ...methods }> 
			<form onSubmit={methods.handleSubmit(resetPasswordHandler)}> 
				<PasswordInput focus={true} />
				<PasswordInput confirmation={true} />
			</form>
		</FormProvider>
	)
}