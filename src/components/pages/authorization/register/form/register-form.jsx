import { useForm } from 'react-hook-form';

import { InputsBySteps } from './inputs-by-steps/inputs-by-steps';



export const RegisterForm = () => {
	const form = useForm();

	return <form>
		<InputsBySteps />
	</form>
};