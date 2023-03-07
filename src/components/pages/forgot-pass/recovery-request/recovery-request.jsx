import { GoBackBar } from '../../../go-back-bar/go-back-bar';
import { AuthenticationWindow } from '../../../layouts/window-elements/authentication-window/authentication-window';
import { SwitchAuthType } from '../../../switch-authorization-type/switch-auth-type';

import { PasswordRecoveryRequestForm } from './form';

export const RecoveryRequest = () => 
	<AuthenticationWindow 
		topChildren={<GoBackBar text='ВХОД В ЛИЧНЫЙ КАБИНЕТ'/>}
		form={<PasswordRecoveryRequestForm />}
		bottomChildren={<SwitchAuthType />}
	/>