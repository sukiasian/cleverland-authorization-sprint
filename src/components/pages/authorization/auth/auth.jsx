import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { annualizeAuthUser, setAuthUser } from '../../../../redux/actions/actions';
import { CLIENT_URL_PATHNAMES } from '../../../../utils/url-pathnames';
import { RoundedButton } from '../../../buttons/rounded-button';
import { AuthenticationWindow } from '../../../layouts/window-elements/authentication-window/authentication-window';
import { LoadingWindow } from '../../../layouts/window-elements/loading-window/loading-window';
import { StatusBlock } from '../../../status-block';
import { SwitchAuthType } from '../../../switch-authorization-type/switch-auth-type';

import { AuthForm } from './form';

import style from './auth.module.css'; 

export const Auth = () => {
	const [authUserDataForRetryingRequest, setAuthUserDataForRetryingRequest] = useState(null);

	const { authUser } = useSelector((state) => state.auth);
	
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const authFailedWithError = authUser?.response?.data?.error;
	
	const authNewUser = (value) => {
		dispatch(setAuthUser(value));
		setAuthUserDataForRetryingRequest(value);
	}

	const retryAuthUser = () => { 
		dispatch(setAuthUser(authUserDataForRetryingRequest));
	}

	useEffect(() => () => {
		dispatch(annualizeAuthUser());
	}, []); // eslint-disable-line

	return (
		<React.Fragment>
			{ authUser
				? 
					null
				: 
					<React.Fragment>
						<LoadingWindow />
						<AuthenticationWindow 
							heading='Вход в личный кабинет'
							form={<AuthForm authUserHandler={ authNewUser } />}
							bottomChildren={<SwitchAuthType />} 
						/>
					 </React.Fragment>
			}

			{ authFailedWithError 
				?  
					<StatusBlock 
						heading='Вход не выполнен' 
						paragraph='Что-то пошло не так. Попробуйте еще раз' 
						buttonOrLinkComponent={
							<RoundedButton 
								onClick={retryAuthUser}
							>
								ПОВТОРИТЬ
							</RoundedButton>
						}
					/>
				: 
					null
			}
		</React.Fragment>
	);
}