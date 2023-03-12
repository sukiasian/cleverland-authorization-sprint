import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setRequestPasswordRecovery } from '../../../../redux/actions/actions';
import { GoBackBar } from '../../../go-back-bar/go-back-bar';
import { AuthenticationWindow } from '../../../layouts/window-elements/authentication-window/authentication-window';
import { LoadingWindow } from '../../../layouts/window-elements/loading-window/loading-window';
import { StatusBlock } from '../../../status-block';
import { SwitchAuthType } from '../../../switch-authorization-type/switch-auth-type';

import { PasswordRecoveryRequestForm } from './form';

export const RecoveryRequest = () => {
	const { requestPasswordRecovery } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const requestPasswordRecoveryHandler = (value) => { 
		dispatch(setRequestPasswordRecovery(value));
	}

	return requestPasswordRecovery 
		? 
			<StatusBlock 
				heading='Письмо выслано' 
				paragraph='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
			/>
		: 
			<React.Fragment>
				<AuthenticationWindow 
					topChildren={<GoBackBar text='ВХОД В ЛИЧНЫЙ КАБИНЕТ'/>}
					form={<PasswordRecoveryRequestForm requestPasswordRecoveryHandler={requestPasswordRecoveryHandler}/>}
					bottomChildren={<SwitchAuthType />}
				/> 
				<LoadingWindow />
			 </React.Fragment>
}