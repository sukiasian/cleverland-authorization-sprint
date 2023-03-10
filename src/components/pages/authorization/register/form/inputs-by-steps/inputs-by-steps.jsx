import React, { useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { setUserRegistrationCurrentStep } from '../../../../../../redux/actions/actions';
import { REGISTER_INPUTS } from '../../../../../../utils/input-names';
import { RoundedButton } from '../../../../../buttons/rounded-button';
import { EmailInput } from '../../../../../inputs/email';
import { FirstName } from '../../../../../inputs/first-name';
import { LastName } from '../../../../../inputs/last-name';
import { PasswordInput } from '../../../../../inputs/password';
import { PhoneInput } from '../../../../../inputs/phone';
import { UsernameInput } from '../../../../../inputs/username/username-input';

const StepOneInputs = ({ innerRef, incrementStep }) => { 
	const { userRegistrationCurrentStep } = useSelector((state) => state.auth);

	const { control, errors } = useFormContext();
	const { username, password } = useWatch({ control })

	const dataIsProvided = username && password && !errors?.username && !errors?.password;

	return userRegistrationCurrentStep === 1 
		? 
			<React.Fragment>
				<UsernameInput innerRef={innerRef} />
				<PasswordInput />
				<RoundedButton 
					available={dataIsProvided}
					onClick={dataIsProvided ? incrementStep : null}
				>
					Следующий шаг
				</RoundedButton>
			</React.Fragment>
		: 
			null
}
const StepTwoInputs = ({ innerRef, incrementStep }) => { 
	const { userRegistrationCurrentStep } = useSelector((state) => state.auth);

	const { formState: { errors }, control, register } = useFormContext();
	const { firstName, lastName } = useWatch({ control });

	const dataIsProvided = firstName && lastName && !errors?.firstName && !errors?.lastName;

	return userRegistrationCurrentStep === 2 
		? 
			<React.Fragment>
				<FirstName innerRef={innerRef} />
				<LastName innerRef={innerRef} />
				<RoundedButton 
					isAvailable={dataIsProvided} 
					onClick={dataIsProvided ? incrementStep : null}
				>
					Последний шаг
				</RoundedButton>
			</React.Fragment>
		: 
			null;
}

const StepThreeInputs = ({ innerRef }) => { 
	const { userRegistrationCurrentStep} = useSelector((state) => state.auth);

	const { control, formState: { errors }, register } = useFormContext();

	const { email, phone } = useWatch({ control });

	const dataIsProvided = email && phone && !errors?.email && !errors?.phone;

	return userRegistrationCurrentStep === 3 
		? 
			 <React.Fragment>
				<PhoneInput innerRef={innerRef}/>
				<EmailInput />
				<RoundedButton 
					isAvailable={dataIsProvided} 
					submit={true}
				> 
					Зарегистрироваться
				</RoundedButton>
			</React.Fragment>
		: 
			null;
}

export const InputsBySteps = () => {
	const { userRegistrationCurrentStep } = useSelector((state) => state.auth);
	
	const inputRef = useRef(null);
	
	const dispatch = useDispatch();
	
	const incrementStep = () => { 
		dispatch(setUserRegistrationCurrentStep(userRegistrationCurrentStep + 1));
	};

	useEffect(() => {
		if(inputRef.current) {
			inputRef.current.focus();
		}
	}, [userRegistrationCurrentStep]); // eslint-disable-line

	return (
		<React.Fragment>
			<StepOneInputs innerRef={inputRef} incrementStep={incrementStep} />
			<StepTwoInputs innerRef={inputRef} incrementStep={incrementStep} />
			<StepThreeInputs innerRef={inputRef} />
		</React.Fragment>
	)
}
