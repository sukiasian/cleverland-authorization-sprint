import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setRegisterUser, setUserRegistrationCurrentStep } from '../../../../redux/actions/actions';
import { RoundedButton } from '../../../buttons/rounded-button';
import { AuthenticationWindow } from '../../../layouts/window-elements/authentication-window/authentication-window';
import { LoadingWindow } from '../../../layouts/window-elements/loading-window/loading-window';
import { StatusBlock } from '../../../status-block';
import { SwitchAuthType } from '../../../switch-authorization-type/switch-auth-type';

import { RegisterForm } from './form';

export const Register = () => {
	const [registerUserDataForRetryingRequest, setRegisterUserDataForRetryingRequest] = useState(null);

	const { userRegistrationCurrentStep, registerUser } = useSelector((state) => state.auth);
	const { loadingSpinIsOpen } = useSelector((state) => state.app);

	const dispatch = useDispatch(); 

	const totalSteps = 3;

	const emailIsNotAccepted= registerUser?.error?.status === 400;
	const unknownErrorOccured = registerUser && registerUser.error && registerUser.error.status !== 400;

	const statusBlockMutualHeading = 'Данные не сохранились';
	
	const register = (value) => { 
		dispatch(setRegisterUser(value));
		setRegisterUserDataForRetryingRequest(value);
	}

	const retryUserRegistration = () => { 
		dispatch(registerUser(registerUserDataForRetryingRequest));
	}
	
	useEffect(() => 
		() => { 
			dispatch(setUserRegistrationCurrentStep(1));
			dispatch(setRegisterUser(null));
		}, 
	[]); // eslint-disable-line

	/* спиннер решается либо через useEffect (то есть если нажата кнопка, то реквест отправлен, а если респонс пришел, то state переменная loading присваивается false) */

	return (
		<React.Fragment> 
			{/* <LoadingWindow */}
			{
				registerUser ? 
						<StatusBlock 
							heading='Регистрация успешна'
							paragraph='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
							buttonOrLinkComponent={<Link to='/auth'>ВХОД</Link>}
						/>
					: 
						<AuthenticationWindow 
							heading="Регистрация" 
							paragraph={`Шаг ${userRegistrationCurrentStep} из ${totalSteps}`} 
							form={<RegisterForm registerUserHandler={register} />} 
							bottomChildren={<SwitchAuthType />}
						/>
			}

			{ loadingSpinIsOpen ? <LoadingWindow /> : null }

			{ 
				emailIsNotAccepted
					? 
						<StatusBlock 
							heading={statusBlockMutualHeading} 
							paragraph='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail' 
							buttonOrLinkComponent={<Link to="/register">Назад к регистрации</Link>}
						/> 
					: 
						null 
			}

			{
				unknownErrorOccured
					? 
						<StatusBlock
							heading={statusBlockMutualHeading}
							paragraph='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте еще раз'
							buttonOrLinkComponent={<RoundedButton onClick={retryUserRegistration}>Повторить</RoundedButton>}
						/>
					: 
						null
			}
		</React.Fragment>
	)
}