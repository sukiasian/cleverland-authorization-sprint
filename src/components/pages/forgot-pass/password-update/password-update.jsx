import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { annualizeResetPassword, setResetPassword } from '../../../../redux/actions/actions';
import { CLIENT_URL_PATHNAMES } from '../../../../utils/url-pathnames';
import { RoundedButton } from '../../../buttons/rounded-button';
import { ResetPasswordForm } from '../../../forms/password-update';
import { AuthenticationWindow } from '../../../layouts/window-elements/authentication-window/authentication-window';
import { LoadingWindow } from '../../../layouts/window-elements/loading-window/loading-window';
import { StatusBlock } from '../../../status-block';

const RecoveryTip = () => <p>После сохранения войдите в библиотеку, используя новый пароль</p>

export const PasswordUpdate = ({ code }) => { 
	const [passwordDataForRetryingRequest, setPasswordDataForRetryingRequest] = useState(null);
	
	const { resetPassword } = useSelector((state) => state.auth);
	
	const dispatch = useDispatch();

	const passwordUpdateError = resetPassword?.response?.data?.error;
	const passwordUpdateSuccess = resetPassword?.status === 200;

	const resetPasswordHandler = (value) => { 
		const data = { 
			...value,
			code
		};

		dispatch(setResetPassword(data));
		setPasswordDataForRetryingRequest(data);
	}

	const retryResetPassword = () => { 
		dispatch(setResetPassword(passwordDataForRetryingRequest))
	}

	useEffect(() => () => { 
		dispatch(annualizeResetPassword());
	}, []); // eslint-disable-line

	return (
		<React.Fragment> 
		{ 
			resetPassword
				? 
					null
				:
					<AuthenticationWindow 
							heading='Восстановление пароля' 
							bottomChildren={<RecoveryTip />} 
							form={
								<ResetPasswordForm resetPasswordHandler={resetPasswordHandler} />
							}
						/>
		}

		<LoadingWindow />

		{
			passwordUpdateError 
				? 
					<StatusBlock 
						heading='Данные не сохранились' 
						paragraph='Что-то пошло не так. Попробуйте еще раз' 
						buttonOrLinkComponent={
							<RoundedButton onClick={retryResetPassword}>ПОВТОРИТЬ</RoundedButton>
						}
					/>
				: 
					null
		}

		{
			passwordUpdateSuccess
				? 
					<StatusBlock 
						heading='Новые данные сохранены' 
						paragraph='Зайдите в личный кабинет, используя свои логин и пароль' 
						buttonOrLinkComponent={<Link to={CLIENT_URL_PATHNAMES.AUTH}>ВХОД</Link>}
					/>
				: 
					null

		}
	</React.Fragment>
	)
}