import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom'

import { annualizeRequestPasswordRecovery, annualizeResetPassword } from '../../../redux/actions/actions';

import { PasswordUpdate } from './password-update';
import { RecoveryRequest } from './recovery-request';

export const ForgotPass = () => { 
	const [searchParams] = useSearchParams();

	const dispatch = useDispatch();

	const code = searchParams.get('code');

	useEffect(() => { 
		dispatch(annualizeResetPassword);
		dispatch(annualizeRequestPasswordRecovery());
	}, []); // eslint-disable-line

	return code 
		? 
			<PasswordUpdate code={code}/> 
		: 
			<RecoveryRequest />
}