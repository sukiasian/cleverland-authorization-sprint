import { PasswordUpdateForm } from '../../../forms/password-update/password-update-form'
import { AuthenticationWindow } from '../../../layouts/window-elements/authentication-window/authentication-window'

const RecoveryTip = () => <p>После сохранения войдите в библиотеку, используя новый пароль</p>

export const PasswordUpdate = () => 
	<AuthenticationWindow 
		heading='Восстановление пароля' 
		bottomChildren={<RecoveryTip />} 
		form={<PasswordUpdateForm />}
	/>