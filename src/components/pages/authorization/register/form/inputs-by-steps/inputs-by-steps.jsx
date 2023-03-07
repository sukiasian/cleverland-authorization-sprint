import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUserRegistrationCurrentStep } from '../../../../../../redux/actions/actions';

const StepOneInputs = () => { 
	const { userRegistrationCurrentStep } = useSelector((state) => state.auth);

	return userRegistrationCurrentStep === 1 
		? 
			<React.Fragment> 
				<input placeholder='Придумайте логин для входа'/>
				<p>Используйте для логина латинский алфавит и цифры</p>
				<input placeholder='Пароль'/>
				<p>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>
			</React.Fragment> 
		: 
			null
}
const StepTwoInputs = () => { 
	const { userRegistrationCurrentStep } = useSelector((state) => state.auth);

	return userRegistrationCurrentStep === 2 
	? 
		<React.Fragment> 
				<input placeholder='Имя'/>
				<input placeholder='Фамилия'/>
			</React.Fragment> 
	: 
		null;
}

const StepThreeInputs = () => { 
	const { userRegistrationCurrentStep} = useSelector((state) => state.auth);

	return userRegistrationCurrentStep === 3 
	? 
		<React.Fragment>
			<input placeholder='Номер телефона' />
			<input placeholder='E-mail' />
		</React.Fragment> 
	: 
		null;
}

const NextStepButton = () => { 
	const { userRegistrationCurrentStep } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const button = {
		text: null,
		onClick: null,
		type: null
	};

	const incrementStep = () => { 
		dispatch(setUserRegistrationCurrentStep(userRegistrationCurrentStep + 1));
	};
	const registerUser = () => {};
	
	switch (userRegistrationCurrentStep) { 
		case 1: 
			button.text = 'Следующий шаг';
			button.onClick = incrementStep;
			button.type = 'button'
	
			break;

		case 2: 
			button.text = 'Последний шаг';
			button.onClick = incrementStep;
			button.type = 'button';

			break;

		case 3: 
			button.text = 'Зарегистрироваться';
			button.onClick = registerUser;
			button.type = 'submit';

			break;

		default: 
			break;

		}

		return <button type={button.type === 'button' ? 'button' : 'submit'} onClick={button.onClick}>{button.text}</button>
}

export const InputsBySteps = () => 
	//  можно поменять направление стрелок навигации истории так чтобы при нажатии назад менялся шаг а не роут

	 <React.Fragment>
			<StepOneInputs />
			<StepTwoInputs />
			<StepThreeInputs />
			<NextStepButton />
		</React.Fragment>
