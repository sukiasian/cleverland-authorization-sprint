import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { annualizeAuthUser, setRegisterUser, setUserRegistrationCurrentStep } from '../../../../redux/actions/actions';
import { CLIENT_URL_PATHNAMES } from '../../../../utils/url-pathnames';
import { RoundedButton } from '../../../buttons/rounded-button';
import { AuthenticationWindow } from '../../../layouts/window-elements/authentication-window/authentication-window';
import { LoadingWindow } from '../../../layouts/window-elements/loading-window/loading-window';
import { StatusBlock } from '../../../status-block';
import { SwitchAuthType } from '../../../switch-authorization-type/switch-auth-type';

import { RegisterForm } from './form';

export const Register = () => {
	const [registerUserDataForRetryingRequest, setRegisterUserDataForRetryingRequest] = useState(null);

	const { userRegistrationCurrentStep, registerUser } = useSelector((state) => state.auth);

	const dispatch = useDispatch(); 

	const totalSteps = 3;

	const emailIsNotAccepted= registerUser?.response?.data?.error?.status === 400;
	const unknownErrorOccured = 
		registerUser && 
		registerUser.response && 
		registerUser.response.data && 
		registerUser.response.data.error && 
		registerUser.response.data.error.status !== 400;

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
			dispatch(annualizeAuthUser());
		}, 
	[]); // eslint-disable-line

	/* спиннер решается либо через useEffect (то есть если нажата кнопка, то реквест отправлен, а если респонс пришел, то state переменная loading присваивается false) */

	return (
		<React.Fragment> 
			{/* <LoadingWindow */}
			{
				registerUser 
					? 
						null 
					: 
						<AuthenticationWindow 
							heading="Регистрация" 
							paragraph={`${userRegistrationCurrentStep} шаг из ${totalSteps}`} 
							form={<RegisterForm registerUserHandler={register} />} 
							bottomChildren={<SwitchAuthType />}
						/>
			}

			{
				registerUser?.status === 200 ? 
						<StatusBlock 
							heading='Регистрация успешна'
							paragraph='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
							buttonOrLinkComponent={<Link to='/auth'>ВХОД</Link>}
						/>
					: 
						null
			}

			<LoadingWindow />

			{ 
				emailIsNotAccepted
					? 
						<StatusBlock 
							heading={statusBlockMutualHeading} 
							paragraph='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail' 
							buttonOrLinkComponent={<Link to={CLIENT_URL_PATHNAMES.REGISTRATION}>Назад к регистрации</Link>}
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